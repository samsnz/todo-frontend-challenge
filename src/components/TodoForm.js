import React, { useState } from "react";

const TodoForm = ({
  content = null,
  isPrivate = false,
  todoId = null,
  createTodo,
  editTodo,
  isToEdit = false,
  setIsToEdit,
}) => {
  const [newTodo, setNewTodo] = useState({
    content: content ? content : "",
    isPrivate: false,
  });

  const handleChange = (event) => {
    const value =
      event.target.type === "checkbox"
        ? event.target.checked
        : event.target.value;
    setNewTodo({
      ...newTodo,
      [event.target.name]: value,
    });
  };

  const addTodo = (event) => {
    event.preventDefault();
    createTodo(newTodo);

    setNewTodo({
      content: "",
      isPrivate: false,
    });
  };

  const changeTodo = (event) => {
    event.preventDefault();
    console.log("todoIdd edittttt", todoId);
    console.log(" edittttt", newTodo);
    editTodo(todoId, newTodo);
    setIsToEdit(false);
  };

  // return (
  //   <div className="formDiv">
  //     <h2>Create a new todo</h2>

  //     <form onSubmit={addTodo}>
  //       <input value={newTodo.content} name="content" onChange={handleChange} />
  //       <input
  //         value={newTodo.isPrivate}
  //         type="checkbox"
  //         name="isPrivate"
  //         onChange={handleChange}
  //       />
  //       <button type="submit">Save</button>
  //     </form>
  //   </div>
  // );
  return (
    <div>
      <form className="add-todo" onSubmit={todoId ? changeTodo : addTodo}>
        <input
          value={newTodo.content}
          name="content"
          onChange={handleChange}
          className="add-todo-input"
          type="text"
        />
        <span className="private-todo">Private</span>
        <input
          value={newTodo.isPrivate}
          name="isPrivate"
          onChange={handleChange}
          className="add-todo-input-checkbox"
          type="checkbox"
        />
        <button className="my-button" type="submit">
          {isToEdit ? "Save" : "Add todo"}
        </button>
        {isToEdit && (
          <span onClick={() => setIsToEdit(false)} className="my-cancel">
            Cancel
          </span>
        )}
      </form>
    </div>
  );
};

export default TodoForm;
