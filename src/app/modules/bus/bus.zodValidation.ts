import z from "zod";

export const busZodSchema = z.object({
  busId: z.string(),
  busName: z
    .string()
    .min(3, "Bus name should content at least 3 cheracter")
    .max(32, "Bus name should content at least 3 cheracter"),
  busImg: z.string(),
  busRoute: z.string(),
  busDestination: z.array(
    z.string().nonempty("At least one destination is needed")
  ),
  busDriverId: z.string(),
  busDepartureTime: z.string(),
  busDepartureTime2: z.string(),
  busArrivalTime: z.string(),
  busArrivalTime2: z.string(),
  busIpAddress: z.string(),
  busStatus: z
    .enum(["On Time", "Late", "In Jame", "Maintenance"])
    .default("On Time")
    .optional(),
  status: z.enum(["show", "hidden"]).default("show").optional(),
});

export type BusZodSchema = z.infer<typeof busZodSchema>;
