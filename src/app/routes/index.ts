import { Router } from "express";
import { userRoutes } from "../modules/user/user.route";
import { BusRoutes } from "../modules/bus/bus.routes";
import { MaintenanceRoutes } from "../modules/maintenanceTracking/maintenance.route";
import { NoticeRoutes } from "../modules/notice/notice.route";
import { SurveyRoutes } from "../modules/survey/survey.route";
import { BusBookingRoutes } from "../modules/busBooking/busBooking.route";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { ContectUsRoute } from "../modules/contectus/contectUs.route";
import { BkashRoutes } from "../modules/bkash/bkash.route";
import { PaymentRoutes } from "../modules/payment/payment.route";

const router = Router();

const modulerRouter = [
  {
    path: "/api/v1/auth",
    route: AuthRoutes,
  },
  {
    path: "/api/v1/user",
    route: userRoutes,
  },
  {
    path: "/api/v1/bus",
    route: BusRoutes,
  },
  {
    path: "/api/v1/maintenance",
    route: MaintenanceRoutes,
  },
  {
    path: "/api/v1/notice",
    route: NoticeRoutes,
  },
  {
    path: "/api/v1/survey",
    route: SurveyRoutes,
  },
  {
    path: "/api/v1/bus-booking",
    route: BusBookingRoutes,
  },
  {
    path: "/api/v1/contect-us",
    route: ContectUsRoute,
  },
  {
    path: "/api/v1/payment",
    route: PaymentRoutes,
  },
];

modulerRouter.forEach((route) => {
  router.use(route.path, route.route);
});

export const appRouter = router;
