/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import TodoList from "../../../lib/models/TodoList";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const {
    query: { id },
    method,
  } = req;

  switch (method) {
    case "GET":
      try {
        const todoListDetails = await TodoList.findById(id);

        return res.status(200).json({
          success: true,
          data: todoListDetails,
        });
      } catch (error) {
        return res.status(404).json({
          success: false,
        });
      }
    case "PUT":
      try {
        const todoListUpdate = await TodoList.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });

        return res.status(200).json({
          success: true,
          data: todoListUpdate,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "PATCH":
      try {
        const todoList = await TodoList.findById(id);

        if (!todoList) {
          return res
            .status(404)
            .json({ success: false, message: "Todo list not found" });
        }

        const newIsCompletedValue = !todoList.isCompleted;

        const todoListUpdate = await TodoList.findByIdAndUpdate(
          id,
          {
            $set: {
              isCompleted: newIsCompletedValue,
              completedDate: Date.now(),
            },
          },
          { new: true, runValidators: true }
        );
        return res.status(200).json({
          success: true,
          data: todoListUpdate,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "DELETE":
      try {
        await TodoList.deleteOne({ _id: id });

        return res.status(200).json({
          success: true,
          data: { id },
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    default:
      return res.status(405).json({ success: false });
  }
};
