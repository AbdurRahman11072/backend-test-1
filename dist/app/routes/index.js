"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appRouter = void 0;
const express_1 = require("express");
const user_route_1 = require("../modules/user/user.route");
const bus_routes_1 = require("../modules/bus/bus.routes");
const maintenance_route_1 = require("../modules/maintenanceTracking/maintenance.route");
const notice_route_1 = require("../modules/notice/notice.route");
const survey_route_1 = require("../modules/survey/survey.route");
const busBooking_route_1 = require("../modules/busBooking/busBooking.route");
const auth_routes_1 = require("../modules/auth/auth.routes");
const contectUs_route_1 = require("../modules/contectus/contectUs.route");
const payment_route_1 = require("../modules/payment/payment.route");
const router = (0, express_1.Router)();
const modulerRouter = [
    {
        path: "/api/v1/auth",
        route: auth_routes_1.AuthRoutes,
    },
    {
        path: "/api/v1/user",
        route: user_route_1.userRoutes,
    },
    {
        path: "/api/v1/bus",
        route: bus_routes_1.BusRoutes,
    },
    {
        path: "/api/v1/maintenance",
        route: maintenance_route_1.MaintenanceRoutes,
    },
    {
        path: "/api/v1/notice",
        route: notice_route_1.NoticeRoutes,
    },
    {
        path: "/api/v1/survey",
        route: survey_route_1.SurveyRoutes,
    },
    {
        path: "/api/v1/bus-booking",
        route: busBooking_route_1.BusBookingRoutes,
    },
    {
        path: "/api/v1/contect-us",
        route: contectUs_route_1.ContectUsRoute,
    },
    {
        path: "/api/v1/payment",
        route: payment_route_1.PaymentRoutes,
    },
];
modulerRouter.forEach((route) => {
    router.use(route.path, route.route);
});
exports.appRouter = router;
