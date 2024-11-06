import { Prisma } from "@prisma/client";
import prisma from "../../utls/prismaClient";

const getAllFromDB = (params:any) => {
    const {searchTerm, ...filterData}= params
  const andConditions: Prisma.AdminWhereInput[] = [];
  console.log(params.searchTerm);

  if (searchTerm) {
    andConditions.push({
      OR: ["name", "email"].map((field) => ({
        [field]: {
          contains: searchTerm,
          mode: "insensitive",
        },
      })),
    });
  }
  if(Object.keys(filterData).length > 0){
    andConditions.push({
        AND: Object.keys(filterData).map(key =>({
            [key]: filterData[key]
        }))
    })
  }

  const whereConditions: Prisma.AdminWhereInput = { AND: andConditions };
  const result = prisma.admin.findMany({
    where: whereConditions,
  });
  return result;
};

export const AdminServices = {
  getAllFromDB,
};
