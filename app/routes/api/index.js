const express = require("express");

const authRouter = require("./auth");
const taskRouter = require("./task");

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/task", taskRouter);
module.exports = apiRouter;
