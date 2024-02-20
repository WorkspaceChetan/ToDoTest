/* eslint-disable import/no-anonymous-default-export */
import type { NextApiRequest, NextApiResponse } from "next";
import TodoList from "../../../lib/models/TodoList";
import connectionDatabase from "../../../lib/dbConnect";

export default async (req: NextApiRequest, res: NextApiResponse) => {
  connectionDatabase();
  const { method } = req;
  switch (method) {
    case "GET":
      try {
        const todoList = await TodoList.find({}).sort({
          createdAt: "desc",
        });

        return res.status(200).json({
          success: true,
          listData: todoList,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
        });
      }
    case "POST":
      try {
        const { name, description } = req.body;

        const todoSave = await TodoList.create({
          name,
          description,
          completedDate: Date.now(),
        });
        return res.status(201).json({
          success: true,
          data: todoSave,
        });
      } catch (error) {
        return res.status(400).json({
          success: false,
          error,
        });
      }
    default:
      return res.status(405).json({ success: false });
  }
};
