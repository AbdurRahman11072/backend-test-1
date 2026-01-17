"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const customError_1 = __importDefault(require("./app/error/customError"));
const globalErrorHandler_1 = __importDefault(require("./app/middleware/globalErrorHandler"));
const routes_1 = require("./app/routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    origin: [
        "*",
        "http://localhost:3000",
        "https://green-university-five.vercel.app/",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
}));
app.use(express_1.default.json());
app.use(routes_1.appRouter);
app.get("/", (req, res) => {
    res.send("Hello there");
});
app.all(/(.*)/, (req, res, next) => {
    const msg = `Can't find this route: ${req.originalUrl}`;
    const error = new customError_1.default(msg, 404);
    next(error);
});
app.use(globalErrorHandler_1.default);
exports.default = app;
