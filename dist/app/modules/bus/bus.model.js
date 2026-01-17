"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Bus = void 0;
const mongoose_1 = require("mongoose");
const busSchema = new mongoose_1.Schema({
    busId: {
        type: String,
        required: true,
        unique: true,
    },
    busName: {
        type: String,
        required: true,
    },
    busRoute: {
        type: String,
        required: true,
    },
    busImg: {
        type: String,
        required: true,
    },
    busDestination: {
        type: [String],
        required: true,
        validate: {
            validator: (arr) => arr.length > 0,
            message: "At least one destination is needed",
        },
    },
    busDriverId: {
        type: String,
        required: true,
        unique: true,
    },
    busDepartureTime: {
        type: String, // You can also use Date if you prefer timestamps
        required: true,
    },
    busArrivalTime: {
        type: String, // Or Date
        required: true,
    },
    busDepartureTime2: {
        type: String, // You can also use Date if you prefer timestamps
        required: true,
    },
    busArrivalTime2: {
        type: String, // Or Date
        required: true,
    },
    busIpAddress: {
        type: String,
        required: true,
    },
    busStatus: {
        type: String,
        enum: ["On Time", "Late", "In Jame", "Maintenance"],
        default: "On Time",
    },
}, { timestamps: true });
// create a collection for bus information and driver information
exports.Bus = (0, mongoose_1.model)("buses", busSchema);
