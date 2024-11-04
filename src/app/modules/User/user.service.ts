import { UserRole } from "@prisma/client";
import prisma from "../../utls/prismaClient";
import * as bcrypt from "bcrypt";

const createAdmin = async (data: any) => {
  const hashedPassword = await bcrypt.hash(data.password, 12);
  const userData = {
    email: data.admin.email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  };
  const result = await prisma.$transaction(async (transaction) => {
    await transaction.user.create({
      data: userData,
    });
    const admin = transaction.admin.create({
      data: data.admin,
    });
    return admin;
  });
  return result;
};

export const userServices = {
  createAdmin,
};
