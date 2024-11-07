import { Router } from "express";
import { AdminController } from "./admin.controller";

const router = Router();

router.get("/", AdminController.getAdmins);
router.get("/:id", AdminController.getByIdFromDB);
router.patch("/:id", AdminController.updateIntoDb);
router.delete("/:id", AdminController.deleteFromDb);
router.delete("/soft/:id", AdminController.deleteFromDb);

export const adminRoutes = router;
