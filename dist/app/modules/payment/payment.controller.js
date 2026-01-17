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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const asyncHandler_1 = require("../../utils/asyncHandler");
const payment_model_1 = require("./payment.model");
const CreatePayment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = req.body;
    const result = payment_model_1.Payment.create(data);
    res.status(http_status_1.default.OK).json({
        status: "Success",
        message: "Payment Successful",
        data: result,
    });
}));
const getAllPayment = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield payment_model_1.Payment.find().lean();
    res.status(200).json({
        status: "Success",
        message: "Payment details have been found",
        data: result,
    });
}));
const GetPaymentById = (0, asyncHandler_1.asyncHandler)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const result = yield payment_model_1.Payment.findOne({ userId: id }).exec();
    res.status(200).json({
        status: "Success",
        message: "Payment details have been found",
        data: result,
    });
}));
exports.paymentController = {
    GetPaymentById,
    CreatePayment,
    getAllPayment,
};
