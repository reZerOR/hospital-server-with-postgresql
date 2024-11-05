import { Request, Response } from "express";
import { AdminServices } from "./admin.service";

const getAdmins = async(req: Request, res:Response)=>{
    const result = await AdminServices.getAllFromDB(); 
    res.status(200).json({
        success: true,
        message: 'Admin created successfully!',
        data: result
      })
}

export const AdminController = {
    getAdmins
}