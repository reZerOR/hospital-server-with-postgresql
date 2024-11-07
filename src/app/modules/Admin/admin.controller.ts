import { AdminServices } from "./admin.service";
import { pick } from "../../../shared/pick";
import { adminFilterableFileds } from "./admin.constant";
import sendResponse from "../../../shared/sendResponse";
import catchAsync from "../../../shared/catchAsync";

const getAdmins = catchAsync(async (req, res) => {
  const filters = pick(req.query, adminFilterableFileds);
  const options = pick(req.query, ["page", "limit", "sortBy", "sortOrder"]);
  const result = await AdminServices.getAllFromDB(filters, options);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin data fetched!",
    meta: result.meta,
    data: result.data,
  });
});

const getByIdFromDB = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.getAdminById(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin data fetched by id!",
    data: result,
  });
});

const updateIntoDb = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.updateIntoDb(id, req.body);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin data updated!",
    data: result,
  });
});

const deleteFromDb = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AdminServices.deleteFromDb(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin data deleted!",
    data: result,
  });
});

const softDeleteFromDb = catchAsync(async (req, res) => {
  const { id } = req.params;
  const result = await AdminServices.softDeleteFromDb(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Admin data deleted!",
    data: result,
  });
});

export const AdminController = {
  getAdmins,
  getByIdFromDB,
  updateIntoDb,
  deleteFromDb,
  softDeleteFromDb,
};
