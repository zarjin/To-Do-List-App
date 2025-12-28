import { createContext, useState, useEffect, type ReactNode } from "react";
import type { TodoContextType, Todo, TodoInputType } from "../types/Types";
import axios from "axios";

export const TodoContext = createContext<TodoContextType | undefined>(
  undefined
);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const api = axios.create({
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
  });

  const [todoData, setTodoData] = useState<Todo[]>([]);

  // Fetch all todos
  const getTodo: TodoContextType["getTodo"] = async () => {
    try {
      const { data } = await api.get("/todo/all-list");
      setTodoData(data);
    } catch (err) {
      console.error("Failed to fetch todos", err);
    }
  };

  // Add a new todo
  const addTodo: TodoContextType["addTodo"] = async (todo: TodoInputType) => {
    try {
      const { data } = await api.post("/todo/add-todo", todo);
      setTodoData((prev) => [...prev, data.todo]);
    } catch (err) {
      console.error("Failed to add todo", err);
    }
  };

  // Delete a todo
  const deleteTodo: TodoContextType["deleteTodo"] = async (todoId: string) => {
    try {
      await api.delete(`/todo/delete/${todoId}`);
      setTodoData((prev) => prev.filter((t) => t._id !== todoId));
    } catch (err) {
      console.error("Failed to delete todo", err);
    }
  };

  // Toggle completion
  const toggleTodoCompletion: TodoContextType["toggleTodoCompletion"] = async (
    todoId: string
  ) => {
    try {
      const { data } = await api.patch(`/${todoId}/toggle`);
      setTodoData((prev) =>
        prev.map((t) => (t._id === todoId ? data.todo : t))
      );
    } catch (err) {
      console.error("Failed to toggle todo completion", err);
    }
  };

  useEffect(() => {
    getTodo();
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todoData,
        addTodo,
        deleteTodo,
        getTodo,
        toggleTodoCompletion,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
