import { Admin, Prisma, UserRole, UserStatus } from "@prisma/client";
import prisma from "../../utls/prismaClient";
import { adminSearchableFileds } from "./admin.constant";
import { calculatePagination } from "../../../shared/calculatePagination";

const getAllFromDB = async (params: any, options: any) => {
  const { searchTerm, ...filterData } = params;
  const { page, limit, sortBy, sortOrder, skip } = calculatePagination(options);
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
  andConditions.push({
    isDeleted: false,
  });

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  const result = await prisma.admin.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });
  const total = await prisma.admin.count({
    where: whereConditions,
  });
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};
const getAdminById = async (id: string) => {
  const result = await prisma.admin.findUnique({
    where: {
      id,
      isDeleted: false,
    },
  });
  return result;
};
const updateIntoDb = async (id: string, data: Partial<Admin>) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.admin.update({
    where: {
      id,
    },
    data,
  });
  return result;
};
const deleteFromDb = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
      isDeleted: false,
    },
  });
  const result = await prisma.$transaction(async (client) => {
    const adminDelete = await client.admin.delete({
      where: {
        id,
      },
    });
    await client.user.delete({
      where: {
        email: adminDelete.email,
      },
    });
    return adminDelete;
  });

  return result;
};
const softDeleteFromDb = async (id: string) => {
  await prisma.admin.findUniqueOrThrow({
    where: {
      id,
    },
  });
  const result = await prisma.$transaction(async (client) => {
    const adminDelete = await client.admin.update({
      where: {
        id,
      },
      data: {
        isDeleted: true,
      },
    });
    await client.user.update({
      where: {
        email: adminDelete.email,
      },
      data: {
        status: UserStatus.Deleted,
      },
    });
    return adminDelete;
  });

  return result;
};

export const AdminServices = {
  getAllFromDB,
  getAdminById,
  updateIntoDb,
  deleteFromDb,
  softDeleteFromDb,
};
