import z from "zod";

const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;

const classScheduleSchema = z.object({
  id: z.string(),
  day: z.enum([
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ]),
  startTime: z.string().regex(timeRegex, "Invalid time format (HH:MM)"),
  endTime: z.string().regex(timeRegex, "Invalid time format (HH:MM)"),
});

const surveyZodSchema = z.object({
  userId: z.string(),
  userName: z.string(),
  userRole: z.enum(["Student", "Teacher"]).default("Student"),
  userDepartment: z.string().default(""),
  userSemester: z.string(),
  classSchedules: z.array(classScheduleSchema).optional().default([]),
  destination: z.string(),
  acBus: z.string(),
  payment: z.boolean().default(false),
});

export type SurveyZodSchema = z.infer<typeof surveyZodSchema>;
