import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import { createConversation, getConversations, getSingleConversation, updateConversation } from "../controllers/conversation.js";

const router = express.Router();
router.post("/",verifyToken,createConversation);
router.get("/",verifyToken,getConversations);
router.get("/single/:id",verifyToken,getSingleConversation);
router.put("/:id",verifyToken,updateConversation)


export default router