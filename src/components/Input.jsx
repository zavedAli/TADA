import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdOutlineEditCalendar } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { LuPartyPopper } from "react-icons/lu";

const Input = () => {
  const [todo, setTodo] = useState({ uid: "", task: "", complete: false });
  const [todos, setTodos] = useState([]);
  const [fTask, setFtask] = useState(0);
  const [uTask, setUtask] = useState(0);

  const addTodo = () => {
    console.log("correct1");

    if (todo.task) {
      setUtask(uTask + 1);
      const newTodo = { ...todo, uid: uuidv4() }; // Generate unique ID here

      setTodos([...todos, newTodo]); // Add the new todo to the list
      setTodo({ uid: "", task: "", complete: false });
      console.log("correct2");
    }
    console.log(todos);
  };
  const isComplete = (id) => {
    const targetItem = todos.find((item) => item.uid === id);
    targetItem.complete = !targetItem.complete;
    setTodos([...todos]);
    if (targetItem.complete === true) {
      setUtask(uTask - 1);
      setFtask(fTask + 1);
    } else {
      setUtask(uTask + 1);
      setFtask(fTask - 1);
    }

    console.log(todos);
    console.log(fTask);
  };

  return (
    <>
      <div className="input flex justify-center my-3 mx-3">
        <input
          onChange={(e) => setTodo({ ...todo, task: e.target.value })}
          value={todo.task}
          className="border-[1px] border-indigo-500 focus:outline-none focus:ring-2 focus:ring-[#764ba2] transition-all w-[85vw] duration-300 sm:w-[50vw] p-1 rounded-lg ps-3"
          type="text"
          name="todo"
          placeholder="Enter your todo"
        />
        <button
          onClick={addTodo}
          className="bg-[#764ba2] text-white rounded-lg px-3 ms-6"
        >
          Add
        </button>
      </div>
      <div className="bg-slate-300 h-[1px] w-[50vw] m-auto"></div>

      {/* Display Todos */}
      <div className="todos mt-4 w-[95vw] sm:w-[70vw] flex justify-center flex-col m-auto gap-3">
        <h1 className="text-left text-3xl text-[#3a3a3a] pt-6 pb-3 font-bold">
          <span>{uTask}</span> Task to do
        </h1>

        {todos.map((item) =>
          !item.complete ? (
            <>
              <div
                key={item.uid}
                className="card flex sm:flex-row flex-col gap-10 min-h-[80px] w-[vw] items-start justify-between rounded-lg border-[1px] bg-[#764ba21c] px-3 py-2 text-[#3d3d3d] font-medium"
              >
                <div className="con flex items-center gap-3">
                  <input
                    onChange={() => isComplete(item.uid)}
                    checked={item.complete}
                    id="checkbox"
                    type="checkbox"
                    className="form-checkbox w-3 h-3 text-indigo-600 "
                  />
                  <h1 className={item.complete ? "line-through" : ""}>
                    {item.task}
                  </h1>
                </div>
                <div className="buttons w-full flex justify-end">
                  <div className="button flex gap-5 text-right">
                    <button className="flex items-center gap-2 hover:text-[#181818]">
                      {" "}
                      <MdOutlineEditCalendar /> edit
                    </button>
                    <button className="flex items-center gap-2 hover:text-[#a24b4b]">
                      {" "}
                      <MdDelete />
                      delete
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            ""
          )
        )}
        <h1 className="text-left text-sm text-[#3a3a3a] pt-6 pb-3 flex items-center gap-4">
          <span>{fTask} </span>Finished task{" "}
          {fTask >= 1 ? <LuPartyPopper /> : ""}
        </h1>
        {todos.map((item) =>
          item.complete ? (
            <div
              key={item.uid}
              className="card flex sm:flex-row flex-col min-h-[80px] w-[vw] items-start justify-between rounded-lg border-[1px] bg-[#764ba21c] px-3 py-2 text-[#3d3d3d] font-medium"
            >
              <div className="con flex items-center gap-3">
                <input
                  onChange={() => isComplete(item.uid)}
                  checked={item.complete}
                  id="checkbox"
                  type="checkbox"
                  className="form-checkbox w-3 h-3 text-indigo-600 "
                />
                <h1 className={item.complete ? "line-through" : ""}>
                  {item.task}
                </h1>
              </div>
              <div className="buttons w-full flex justify-end">
                <div className="button flex gap-5 text-right">
                  <button className="flex items-center gap-2 hover:text-[#181818]">
                    {" "}
                    <MdOutlineEditCalendar /> edit
                  </button>
                  <button className="flex items-center gap-2 hover:text-[#a24b4b]">
                    {" "}
                    <MdDelete />
                    delete
                  </button>
                </div>
              </div>
            </div>
          ) : (
            ""
          )
        )}
      </div>
    </>
  );
};

export default Input;
