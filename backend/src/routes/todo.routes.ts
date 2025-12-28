import { Authenticated } from "../middlewares/authenticated.middlewares.ts";
import {
  addTodo,
  getTodo,
  deleteTodo,
  toggleTodoCompletion,
} from "../controllers/todo.controllers.ts";
import express from "express";

const todoRoutes = express.Router();

todoRoutes.post("/add-todo", Authenticated, addTodo);
todoRoutes.get("/all-list", Authenticated, getTodo);
todoRoutes.delete("/delete/:todoId", Authenticated, deleteTodo);
todoRoutes.patch("/:todoId/toggle", Authenticated, toggleTodoCompletion);

export default todoRoutes;
