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
exports.getBkashToken = getBkashToken;
exports.createBkashPayment = createBkashPayment;
exports.executeBkashPayment = executeBkashPayment;
const axios_1 = __importDefault(require("axios"));
const BASE_URL = process.env.BKASH_BASE_URL;
const credentials = {
    app_key: process.env.BKASH_APP_KEY,
    app_secret: process.env.BKASH_APP_SECRET,
    username: process.env.BKASH_USERNAME,
    password: process.env.BKASH_PASSWORD,
};
let id_token = null;
function getBkashToken() {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios_1.default.post(`${BASE_URL}/token/grant`, {
            app_key: credentials.app_key,
            app_secret: credentials.app_secret,
        }, {
            headers: {
                username: credentials.username,
                password: credentials.password,
                "Content-Type": "application/json",
            },
        });
        id_token = res.data.id_token;
        return id_token;
    });
}
function createBkashPayment(amount, orderId) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!id_token)
            yield getBkashToken();
        const payload = {
            mode: "0011",
            payerReference: " ",
            callbackURL: "https://your-domain.com/api/bkash/execute",
            amount,
            currency: "BDT",
            intent: "sale",
            merchantInvoiceNumber: orderId,
        };
        const res = yield axios_1.default.post(`${BASE_URL}/tokenized/checkout/create`, payload, {
            headers: {
                authorization: id_token,
                "x-app-key": credentials.app_key,
                "Content-Type": "application/json",
            },
        });
        return res.data;
    });
}
function executeBkashPayment(paymentID) {
    return __awaiter(this, void 0, void 0, function* () {
        const res = yield axios_1.default.post(`${BASE_URL}/tokenized/checkout/execute`, { paymentID }, {
            headers: {
                authorization: id_token,
                "x-app-key": credentials.app_key,
                "Content-Type": "application/json",
            },
        });
        return res.data;
    });
}
