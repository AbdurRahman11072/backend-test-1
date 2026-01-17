import z from "zod";

const busBookingZodSchema = z.object({
  uId: z.string(),
  userEmail: z.string(),
  userName: z.string(),
  bookingSubject: z
    .string()
    .min(10, "Subject must content 10 character")
    .max(60, "Subject must have less then 60 character"),
  bookingDescription: z
    .string()
    .min(10, "Description must content 10 character")
    .max(200, "Description must have less then 200 character"),
  totalPassanger: z.string(),
  bookingTime: z.string(),
  bookingDate: z.string(),
  feedback: z
    .string()
    .min(10, "Feedback must content 10 character")
    .max(200, "Feedback must have less then 200 character")
    .optional(),
  status: z.enum(["Accepted", "Rejected", "Pending"]).default("Pending"),
});

export type BusBookingZodSchema = z.infer<typeof busBookingZodSchema>;
