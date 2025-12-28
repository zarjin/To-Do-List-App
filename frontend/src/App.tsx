import { useState, useContext, type ChangeEvent } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";
import { AuthContext } from "./context/AuthContext";
import { TodoContext } from "./context/TodoContext";
import type { TodoInputType } from "./types/Types";

export default function App() {
  const auth = useContext(AuthContext);
  const todo = useContext(TodoContext);

  if (!auth) throw new Error("AuthContext must be used within AuthProvider");
  if (!todo) throw new Error("TodoContext must be used within TodoProvider");

  const { Logout } = auth;
  const { addTodo, todoData, toggleTodoCompletion, deleteTodo } = todo;

  const [text, setText] = useState<TodoInputType>({ text: "" });

  const handleSubmit = async () => {
    if (!text.text.trim()) return;
    await addTodo(text);
    setText({ text: "" });
  };

  return (
    <div className="mainContainer font-Roboto w-full h-screen flex items-center justify-center">
      <div className="todoBox w-96 h-fit bg-gray-100 shadow-2xs rounded-xl flex flex-col items-center space-y-6 p-6">
        <div className="logo font-semibold text-2xl text-blue-600">
          Todo Task
        </div>

        <button
          onClick={Logout}
          className="h-10 w-32 rounded-md bg-red-600 text-white hover:bg-red-400"
        >
          Logout
        </button>

        <div className="todoInput space-x-4 flex items-center w-full">
          <input
            type="text"
            placeholder="Add Your Task"
            className="focus:outline-none border-2 border-blue-600 rounded-md px-2 w-full h-10"
            value={text.text}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setText({ text: e.target.value })
            }
          />
          <button
            onClick={handleSubmit}
            className="h-10 w-24 rounded-md bg-blue-600 text-white hover:bg-blue-400"
          >
            Add
          </button>
        </div>

        <div className="todoList w-full">
          <ul className="space-y-3">
            {todoData.map((item) => (
              <li
                key={item._id}
                className="text-lg font-medium flex items-center justify-between"
              >
                <div className="flex items-center space-x-2">
                  <IoIosCloseCircle
                    size={22}
                    color="red"
                    className="cursor-pointer"
                    onClick={() => deleteTodo(item._id)}
                  />
                  <MdEditSquare
                    size={22}
                    color="green"
                    className="cursor-pointer"
                  />
                  <span
                    className={
                      item.completed ? "line-through text-gray-400" : ""
                    }
                  >
                    {item.text}
                  </span>
                </div>

                <input
                  type="checkbox"
                  checked={item.completed}
                  onChange={() => toggleTodoCompletion(item._id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
