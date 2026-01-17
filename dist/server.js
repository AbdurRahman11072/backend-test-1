"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./app/db");
const app_1 = __importDefault(require("./app"));
const config_1 = require("./app/config");
// the function catch error related to some variable that is used in the function but the variable is not declared
process.on("uncaughtException", (error) => {
    console.log(`uncaughtException found. \nError: ${error}`);
    process.exit(1);
});
let server;
// try to connect to the database if failed send a response
(0, db_1.connectDB)()
    .then(() => {
    server = app_1.default.listen(config_1.config.PORT, () => {
        console.log(`server is running on port: ${config_1.config.PORT}`);
    });
})
    .catch((error) => {
    console.log(`server failed to connect!!! \nError: ${error}`);
    process.exit(1);
});
// this function catch error that are not handle by the global error handler or unreconized error and need attention of a developer
process.on("unhandledRejection", (error) => {
    server.close(() => {
        console.log(`unhandledRejection found.\nError: ${error}`);
        process.exit(1);
    });
});
