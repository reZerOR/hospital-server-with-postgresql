import prisma from "../../utls/prismaClient"

const getAllFromDB = ()=>{
    const result  = prisma.admin.findMany()
    return result
}

export const AdminServices = {
    getAllFromDB
}