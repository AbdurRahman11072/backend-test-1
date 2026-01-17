"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const mongoose_1 = require("mongoose");
const paymentSchema = new mongoose_1.Schema({
    transactionId: {
        type: String,
        require: true,
        unique: true,
    },
    userId: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        require: true,
    },
    paymentMethod: {
        type: String,
        require: true,
        default: "Bkash",
    },
    amount: {
        type: Number,
        require: true,
    },
    phoneNumber: {
        type: String,
        require: true,
    },
}, {
    timestamps: true,
});
exports.Payment = (0, mongoose_1.model)("payment", paymentSchema);
