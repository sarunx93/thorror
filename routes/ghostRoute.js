import express from "express";
import {
  createGhost,
  getSingleGhost,
  getAllGhosts,
  updateGhost,
  deleteGhost,
  uploadImage,
} from "../controllers/ghostController.js";
import authenticateUser from "../middleware/auth.js";
const router = express.Router();
router
  .route("/")
  .get(authenticateUser, getAllGhosts)
  .post(authenticateUser, createGhost);
router.route("/uploadImage").post(authenticateUser, uploadImage);
router
  .route("/:id")
  .patch(authenticateUser, updateGhost)
  .get(authenticateUser, getSingleGhost)
  .delete(authenticateUser, deleteGhost);
module.exports = router;
