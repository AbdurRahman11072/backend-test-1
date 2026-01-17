import { Router, Request, Response } from "express";
import { createBkashPayment, executeBkashPayment } from "./bkashAPI";

const router = Router();

router.post("/create", async (req: Request, res: Response) => {
  try {
    const { amount, orderId } = req.body;
    const result = await createBkashPayment(amount, orderId);
    res.json(result);
  } catch (error: any) {
    console.error("bKash create error:", error.message);
    res.status(500).json({ error: "Payment creation failed" });
  }
});

router.post("/execute", async (req: Request, res: Response) => {
  try {
    const { paymentID } = req.body;
    const result = await executeBkashPayment(paymentID);
    res.json(result);
  } catch (error: any) {
    console.error("bKash execute error:", error.message);
    res.status(500).json({ error: "Payment execution failed" });
  }
});
export const BkashRoutes = router;
