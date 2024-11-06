import { Request, Response } from "express";
import { AdminServices } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminSearchableFilds } from "./admin.constant";
const getAdmins = async (req: Request, res: Response) => {
  try {
    const filters = pick(req.query, adminSearchableFilds);
    const result = await AdminServices.getAllFromDB(filters);
    res.status(200).json({
      success: true,
      message: "Admin created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.name || "Something went wrong",
      error: error,
    });
  }
};

export const AdminController = {
  getAdmins,
};
