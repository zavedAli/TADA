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
  const [isEditing, setIsEditing] = useState(false); // New state for editing mode
  const [editId, setEditId] = useState(null); // To track which item is being edited

  const addTodo = () => {
    if (!todo.task) return;

    if (isEditing) {
      // Update the existing todo
      const updatedTodos = todos.map((item) =>
        item.uid === editId ? { ...item, task: todo.task } : item
      );
      setTodos(updatedTodos);
      setIsEditing(false); // Exit editing mode
      setEditId(null); // Reset editId
    } else {
      // Add a new todo
      const newTodo = { ...todo, uid: uuidv4() };
      setTodos([...todos, newTodo]);
      setUtask(uTask + 1);
    }

    // Reset the input field
    setTodo({ uid: "", task: "", complete: false });
  };

  const isComplete = (id) => {
    const updatedTodos = todos.map((item) =>
      item.uid === id ? { ...item, complete: !item.complete } : item
    );
    setTodos(updatedTodos);

    const targetItem = todos.find((item) => item.uid === id);
    if (targetItem.complete === false) {
      setUtask(uTask - 1);
      setFtask(fTask + 1);
    } else {
      setUtask(uTask + 1);
      setFtask(fTask - 1);
    }
  };

  const deleteItem = (id, status) => {
    const updatedTodos = todos.filter((item) => item.uid !== id);
    setTodos(updatedTodos);

    if (status) {
      setFtask(fTask - 1);
    } else {
      setUtask(uTask - 1);
    }
  };

  const handleEdit = (id) => {
    const todoToEdit = todos.find((item) => item.uid === id);
    setTodo({ ...todoToEdit });
    setIsEditing(true); // Enable editing mode
    setEditId(id); // Set the id of the item being edited
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
          {isEditing ? "Update" : "Add"} {/* Change button label */}
        </button>
      </div>
      <div className="bg-slate-300 h-[1px] w-[50vw] m-auto"></div>

      {/* Display Todos */}
      <div className="todos mt-4 w-[90vw] sm:w-[60vw] flex justify-center flex-col m-auto gap-3 mb-10">
        <h1 className="text-left text-3xl text-[#3a3a3a] pt-6 pb-3 font-bold">
          <span>{uTask}</span> Task to do
        </h1>

        {todos.map((item) =>
          !item.complete ? (
            <div
              key={item.uid}
              className="card flex sm:flex-row flex-col gap-10 min-h-[80px] text-start items-start justify-between rounded-lg border-[1px] bg-[#764ba21c] px-3 py-2 text-[#3d3d3d] font-medium"
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
              <div className="buttons sm:w-1/4 w-1/2 flex justify-center">
                <div className="button flex gap-5 text-right">
                  <button
                    className="flex items-center gap-2 hover:text-[#181818]"
                    onClick={() => handleEdit(item.uid)} // Edit button
                  >
                    <MdOutlineEditCalendar /> edit
                  </button>
                  <button
                    className="flex items-center gap-2 hover:text-[#a24b4b]"
                    onClick={() => deleteItem(item.uid, item.complete)}
                  >
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

        <h1 className="text-left text-sm text-[#3a3a3a] pt-6 pb-3 flex items-center gap-4">
          <span>{fTask} </span>Finished task{" "}
          {fTask >= 1 ? <LuPartyPopper /> : ""}
        </h1>

        {todos.map((item) =>
          item.complete ? (
            <div
              key={item.uid}
              className="card flex sm:flex-row flex-col min-h-[80px] text-start items-start justify-between rounded-lg border-[1px] bg-[#764ba21c] px-3 py-2 text-[#3d3d3d] font-medium"
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
              <div className="buttons sm:w-1/4 w-1/2 flex justify-center">
                <div className="button flex gap-5 text-right">
                  <button
                    className="flex items-center gap-2 hover:text-[rgb(24,24,24)]"
                    onClick={() => handleEdit(item.uid)}
                  >
                    <MdOutlineEditCalendar /> edit
                  </button>
                  <button
                    className="flex items-center gap-2 hover:text-[#a24b4b]"
                    onClick={() => deleteItem(item.uid, item.complete)}
                  >
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
