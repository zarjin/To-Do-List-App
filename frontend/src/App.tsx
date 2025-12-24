import { useState, type ChangeEvent } from "react";
import { IoIosCloseCircle } from "react-icons/io";
import { MdEditSquare } from "react-icons/md";

export default function App() {
  const [Text, setText] = useState<string>("");
  const [isComplete, setIsComplete] = useState<boolean>(false);

  const handleSubmit = () => {
    console.log(Text);
    setText("");
  };

  const completeTask = () => {
    setIsComplete(!isComplete);
  };

  return (
    <>
      <div className="mianContiner font-Roboto w-full h-screen flex items-center justify-center">
        <div className="todoBox w-96 h-fit bg-gray-100 shadow-2xs rounded-xl flex flex-col items-center justify-center space-y-6 p-6">
          <div className="logo  font-semibold text-2xl  text-blue-600">
            Todo Task
          </div>
          <div className="todoInput space-x-6 flex items-center">
            <input
              type="text"
              name="todo"
              placeholder="Add Your Task"
              className="focus:outline-none border-2 border-blue-600 rounded-md text-base px-1.5 w-full h-10 "
              value={Text}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setText(e.target.value)
              }
            />
            <button
              onClick={handleSubmit}
              className="h-10 rounded-md text-base font-medium w-32 bg-blue-600 text-white text-center cursor-pointer hover:bg-blue-400"
            >
              Add
            </button>
          </div>

          <div className="todoList">
            <ul>
              <li className="text-xl font-medium flex items-center space-x-2.5">
                {" "}
                <div className="Icon cursor-pointer">
                  <IoIosCloseCircle size={24} color="red" />
                </div>{" "}
                <div className="Icon cursor-pointer">
                  <MdEditSquare size={24} color="green" />
                </div>{" "}
                <div
                  id="text"
                  className={isComplete ? `line-through text-gray-400` : ``}
                >
                  Hello World
                </div>{" "}
                <div className="cheak">
                  <input onClick={completeTask} type="checkbox" />
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
