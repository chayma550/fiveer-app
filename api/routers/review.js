import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createReview, deleteReview, getReview } from "../controllers/review.js";
const router = express.Router();
router.post("/",verifyToken,createReview);
router.get("/:gigId",getReview);
router.delete("/",verifyToken,deleteReview)


export default router