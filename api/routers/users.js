import express from "express";
import { deleteUser,  getUser,  } from "../controllers/user.js";
import { verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

router.delete("/:id",verifyToken,deleteUser)
router.get("/:id",verifyToken,getUser)










export default router