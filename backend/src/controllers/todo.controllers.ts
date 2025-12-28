import type { Response } from "express";
import { todoModels } from "../models/todo.models.ts";
import type { AuthRequest } from "../types/types.ts";

export const addTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { text } = req.body;

    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const userId = req.user.id;

    const newTodo = await todoModels.create({
      text,
      owner: userId,
    });

    return res
      .status(200)
      .json({ message: "todo create done.... 💖", todo: newTodo });
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const getTodo = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const owner = req.user.id;

    const Todo = await todoModels.find({ owner });

    return res.status(200).json(Todo);
  } catch (error) {
    return res.status(500).json(error);
  }
};

export const deleteTodo = async (req: AuthRequest, res: Response) => {
  try {
    const { todoId } = req.params;

    if (!todoId) {
      return res.status(500).json({ message: "todo id not found" });
    }

    await todoModels.findByIdAndDelete(todoId);

    return res.status(200).json({ message: "todo list deleted 😁" });
  } catch (error) {
    return res.status(500).json({ message: error });
  }
};

export const toggleTodoCompletion = async (req: AuthRequest, res: Response) => {
  try {
    const { todoId } = req.params;

    const todo = await todoModels.findById(todoId);
    if (!todo) {
      return res
        .status(404)
        .json({ success: false, message: "Todo not found" });
    }

    todo.completed = !todo.completed;
    await todo.save();

    res.status(200).json({ success: true, todo });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
