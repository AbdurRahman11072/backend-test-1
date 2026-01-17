"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.busZodSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.busZodSchema = zod_1.default.object({
    busId: zod_1.default.string(),
    busName: zod_1.default
        .string()
        .min(3, "Bus name should content at least 3 cheracter")
        .max(32, "Bus name should content at least 3 cheracter"),
    busImg: zod_1.default.string(),
    busRoute: zod_1.default.string(),
    busDestination: zod_1.default.array(zod_1.default.string().nonempty("At least one destination is needed")),
    busDriverId: zod_1.default.string(),
    busDepartureTime: zod_1.default.string(),
    busDepartureTime2: zod_1.default.string(),
    busArrivalTime: zod_1.default.string(),
    busArrivalTime2: zod_1.default.string(),
    busIpAddress: zod_1.default.string(),
    busStatus: zod_1.default
        .enum(["On Time", "Late", "In Jame", "Maintenance"])
        .default("On Time")
        .optional(),
    status: zod_1.default.enum(["show", "hidden"]).default("show").optional(),
});
