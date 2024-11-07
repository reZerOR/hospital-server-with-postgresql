import { Router } from "express";
import { AdminController } from "./admin.controller";
import validateRequest from "../../middlewares/validationRequest";
import { adminValidationSchemas } from "./admin.validation";

const router = Router();

router.get("/", AdminController.getAdmins);
router.get("/:id", AdminController.getByIdFromDB);
router.patch(
  "/:id",
  validateRequest(adminValidationSchemas.update),
  AdminController.updateIntoDb
);
router.delete("/:id", AdminController.deleteFromDb);
router.delete("/soft/:id", AdminController.deleteFromDb);

export const adminRoutes = router;
