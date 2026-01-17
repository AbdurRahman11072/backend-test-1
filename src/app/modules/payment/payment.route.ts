import { Router } from "express";
import { paymentController } from "./payment.controller";

const router = Router();

router.get("/", paymentController.getAllPayment);
router.get("/:id", paymentController.GetPaymentById);

router.post("/post-payment", paymentController.CreatePayment);

export const PaymentRoutes = router;
