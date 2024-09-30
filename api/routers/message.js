import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createMessage,  getMessages ,getMessage} from "../controllers/message.js";
const router = express.Router();
router.post("/",verifyToken,createMessage);
router.get("/:id",verifyToken,getMessage)
router.get("/:id", verifyToken, getMessages);



export default router