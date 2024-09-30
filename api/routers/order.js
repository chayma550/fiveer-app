import express from "express";
import { verifyToken } from "../utils/verifyToken.js";
import {  getOrder, intent } from "../controllers/order.js";
const router = express.Router();

//router.post("/:gigId",verifyToken,createOrder);
router.post("/create-payment-intent/:id",verifyToken,intent);
router.get("/",verifyToken,getOrder)
export default router