const Task = require("../models/taskModel");
let deletedTasks = 0;
const httpCreateTask = async (req, res) => {
  try {
    const newTask = {
      user: req.headers.userId,
      name: req.body.name,
      priority: req.body.priority,
    };

    const task = await Task.create(newTask);
    return res.status(201).send({
      data: task,
      success: true,
      msg: `task created successfully in the database`,
      err: {},
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: `there was an error occured while creating a task`,
    });
  }
};
const httpListTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    return res.status(200).send({
      data: tasks,
      success: true,
      msg: `successfully fetched all the tasks from the database`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: `there was an error occured while fetching all tasks`,
    });
  }
};

const httpReportTasks = async (req, res) => {
  try {
    let completedTasks = 0;
    let cancelledTasks = 0;
    let pendingTasks = 0;
    const tasks = await Task.find();
    for (let task of tasks) {
      if (task.status === "Inprogress") pendingTasks++;
      if (task.status === "Completed") completedTasks++;
      if (task.status === "Cancelled") cancelledTasks++;
    }

    status = {
      completedTasks: completedTasks,
      cancelledTasks: cancelledTasks,
      pendingTasks: pendingTasks,
      deletedTasks: deletedTasks,
      tasks: tasks,
    };
    res.status(200).send({
      data: status,
      success: true,
      msg: `successfully fetched the report of tasks`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: `there was an error occured while creating a report of tasks`,
    });
  }
};
const httpUpdateTask = async (req, res) => {
  try {
    const is_completed = req.query.isCompleted === "true" ? true : false;
    const is_cancelled = req.query.isCancelled === "true" ? true : false;
    console.log(req.query);
    const taskId = req.params.taskId;
    let task;
    if (is_completed) {
      task = await Task.findByIdAndUpdate(
        taskId,
        {
          status: "Completed",
        },
        {
          new: true,
        }
      );
    }
    if (is_cancelled) {
      task = await Task.findByIdAndUpdate(
        taskId,
        {
          status: "Cancelled",
        },
        {
          new: true,
        }
      );
    }
    return res.status(200).send({
      data: task,
      success: true,
      msg: `task updated successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: `there was an error occured while updating a task`,
    });
  }
};

const httpDeleteTask = async (req, res) => {
  try {
    const taskId = req.params.taskId;
    const task = await Task.findByIdAndDelete(taskId, { new: true });
    deletedTasks++;
    res.status(200).send({
      data: task,
      success: true,
      msg: `task deleted successfully`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      msg: `there was an error occured while updating a task`,
    });
  }
};
module.exports = {
  httpCreateTask,
  httpUpdateTask,
  httpDeleteTask,
  httpListTasks,
  httpReportTasks,
};
