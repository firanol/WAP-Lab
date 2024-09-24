import express, { json } from "express";
import { addInquiryHandler } from "../../controllers/inquiries/inquiries.controller";

const router = express.Router();

router.post("/", json(), addInquiryHandler);

export default router;
