import mongoose from "mongoose";

const Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      default: false,
    },
    completedDate: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const TodoModel = mongoose.models.todo || mongoose.model("todo", Schema);

export default TodoModel;
