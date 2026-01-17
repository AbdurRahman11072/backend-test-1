import { Server } from "http";
import { connectDB } from "./app/db";
import app from "./app";
import { config } from "./app/config";

// the function catch error related to some variable that is used in the function but the variable is not declared
process.on("uncaughtException", (error) => {
  console.log(`uncaughtException found. \nError: ${error}`);
  process.exit(1);
});

let server: Server;
// try to connect to the database if failed send a response
connectDB()
  .then(() => {
    server = app.listen(config.PORT, () => {
      console.log(`server is running on port: ${config.PORT}`);
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
