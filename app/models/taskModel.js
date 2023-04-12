const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define schema
const taskSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    priority: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Inprogress", "Completed", "Cancelled"],
      default: "Inprogress",
    },
  },
  {
    timestamps: true,
  }
);

// Create model
const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
