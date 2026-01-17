"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Maintenance = void 0;
const mongoose_1 = require("mongoose");
const maintenanceSchema = new mongoose_1.Schema({
    busId: {
        type: String,
        require: true,
    },
    busName: {
        type: String,
        require: true,
    },
    show: {
        type: Boolean,
        default: true,
    },
}, {
    timestamps: true,
});
exports.Maintenance = (0, mongoose_1.model)("maintenance", maintenanceSchema);
