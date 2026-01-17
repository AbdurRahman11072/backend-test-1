"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BusBooking = void 0;
const mongoose_1 = require("mongoose");
const busBookingSchema = new mongoose_1.Schema({
    uId: {
        type: String,
        require: true,
    },
    userName: {
        type: String,
        require: true,
    },
    userEmail: {
        type: String,
        require: true,
    },
    totalPassanger: {
        type: String,
        require: true,
    },
    bookingSubject: {
        type: String,
        require: true,
    },
    bookingDescription: {
        type: String,
        require: true,
    },
    bookingTime: {
        type: String,
        require: true,
    },
    bookingDate: {
        type: String,
        require: true,
    },
    feedback: {
        type: String,
        default: "",
    },
    status: {
        type: String,
        require: true,
        enum: ["Accepted", "Rejected", "Pending"],
    },
}, {
    timestamps: true,
});
exports.BusBooking = (0, mongoose_1.model)("BusBooking", busBookingSchema);
