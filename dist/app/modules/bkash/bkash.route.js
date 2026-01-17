"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BkashRoutes = void 0;
const express_1 = require("express");
const bkashAPI_1 = require("./bkashAPI");
const router = (0, express_1.Router)();
router.post("/create", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { amount, orderId } = req.body;
        const result = yield (0, bkashAPI_1.createBkashPayment)(amount, orderId);
        res.json(result);
    }
    catch (error) {
        console.error("bKash create error:", error.message);
        res.status(500).json({ error: "Payment creation failed" });
    }
}));
router.post("/execute", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { paymentID } = req.body;
        const result = yield (0, bkashAPI_1.executeBkashPayment)(paymentID);
        res.json(result);
    }
    catch (error) {
        console.error("bKash execute error:", error.message);
        res.status(500).json({ error: "Payment execution failed" });
    }
}));
exports.BkashRoutes = router;
