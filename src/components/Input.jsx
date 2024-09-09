import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const Input = () => {
  const [todo, setTodo] = useState({ uid: "", task: "", complete: false });
  const [todos, setTodos] = useState([]);
  const [fTask, setFtask] = useState(0);
  const [uTask, setUtask] = useState(0);

  const addTodo = () => {
    console.log("correct1");

    if (todo.task) {
      const newTodo = { ...todo, uid: uuidv4() }; // Generate unique ID here
      updateState(todos);

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
    console.log(todos);
    updateState(todos);
  };
  const updateState = (updatedTodos) => {
    const finishedTasks = updatedTodos.filter((item) => item.complete).length;
    const unfinishedTasks = updatedTodos.length - finishedTasks;
    setFtask(finishedTasks);
    setUtask(unfinishedTasks);
    console.log(finishedTasks, unfinishedTasks);
  };

  return (
    <>
      <div className="input flex justify-center my-3">
        <input
          onChange={(e) => setTodo({ ...todo, task: e.target.value })}
          value={todo.task}
          className="border-[1px] border-indigo-500 focus:outline-none focus:ring-2 focus:ring-[#764ba2] transition-all duration-300 w-[50vw] p-1 rounded-lg ps-3"
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
      <div className="todos mt-4 w-[60vw] flex justify-center flex-col m-auto gap-3">
        <h1 className="text-left text-3xl text-[#3a3a3a] pt-6 pb-3 font-bold">
          <span>{uTask}</span> Task to do
        </h1>

        {todos.map((item) =>
          !item.complete ? (
            <>
              <div
                key={item.uid}
                className="card flex min-h-[80px] w-[vw] items-start justify-between rounded-lg border-[1px] bg-[#764ba21c] px-3 py-2 text-[#3d3d3d] font-medium"
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
                <div className="button flex gap-5">
                  <button>edit</button>
                  <button>delete</button>
                </div>
              </div>
            </>
          ) : (
            ""
          )
        )}
        <h1 className="text-left text-xl text-[#3a3a3a] pt-6 pb-3">
          Finished task
          <span> {fTask}</span>
        </h1>
        {todos.map((item) =>
          item.complete ? (
            <div
              key={item.uid}
              className="card flex min-h-[80px] w-[vw] items-start justify-between rounded-lg border-[1px] bg-[#764ba21c] px-3 py-2 text-[#3d3d3d] font-medium"
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
              <div className="button flex gap-5">
                <button>edit</button>
                <button>delete</button>
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
