"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../config/index");
const zodValidator = (schema) => {
    return (req, res, next) => {
        const result = schema.safeParse(req.body);
        const isDev = index_1.config.NODE_ENV === "DEV";
        // show what type of validation error is showing
        if (!result.success) {
            const errorDetails = result.error.issues.map((issue) => {
                const path = issue.path.join();
                const message = issue.message;
                return { path, message };
            });
            // send error details as response to user
            return res.status(400).json(Object.assign({ status: "Failed", message: "Validation Error", error: errorDetails }, (isDev && {
                stackTrace: result.error,
            })));
        }
        next();
    };
};
exports.default = zodValidator;
