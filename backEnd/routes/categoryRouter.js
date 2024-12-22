import express from "express";

import {
  createCategory,
  editCategory,
  getAllCategories,
} from "../controllers/categoryController.js";
import { restrictTo, validateLoggedIn } from "../controllers/authController.js";
import { uploadPhoto, upploadToCloud } from "../utilities.js";

const router = express.Router();
router.get("/allCategories", getAllCategories);
router.use(validateLoggedIn);
router.use(restrictTo("Admin"));
router.post("/", createCategory);
router.patch("/:id", uploadPhoto, upploadToCloud, editCategory);
export default router;
