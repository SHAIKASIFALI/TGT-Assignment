const express = require("express");
const { isLoggedIn } = require("../../middlewares/authMiddlewares");
const {
  httpCreateTask,
  httpListTasks,
  httpUpdateTask,
  httpDeleteTask,
  httpReportTasks,
} = require("../../controllers/taskControllers");
const taskRouter = express.Router();

taskRouter.post("/", isLoggedIn, httpCreateTask);
taskRouter.get("/", isLoggedIn, httpListTasks);
taskRouter.get("/report", httpReportTasks);
taskRouter.patch("/:taskId", isLoggedIn, httpUpdateTask);
taskRouter.delete("/:taskId", isLoggedIn, httpDeleteTask);
module.exports = taskRouter;
