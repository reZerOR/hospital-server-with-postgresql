import { Prisma } from "@prisma/client";
import prisma from "../../utls/prismaClient";
import { adminSearchableFileds } from "./admin.constant";
import { calculatePagination } from "../../../shared/calculatePagination";

const getAllFromDB = (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;
  const { limit, sortBy, sortOrder, skip } = calculatePagination(options);
  const andConditions: Prisma.AdminWhereInput[] = [];
  console.log(params.searchTerm);

  if (searchTerm) {
    andConditions.push({
      OR: adminSearchableFileds.map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map((key) => ({
        [key]: filterData[key],
      })),
    });
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  const result = prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  return result;
};

export const AdminServices = {
  getAllFromDB,
};
