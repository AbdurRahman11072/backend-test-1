"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHandler = void 0;
//This is a async function to that helps us to make async function look clean
const asyncHandler = (requestHandler) => {
    // this is a anonimus function that take async function and if there is a error it send the error to global error handler for clean look
    return (req, res, next) => {
        Promise.resolve(requestHandler(req, res, next)).catch((error) => {
            next(error);
        });
    };
};
exports.asyncHandler = asyncHandler;
