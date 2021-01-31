import React, { useState } from "react";

const TodoForm = ({ createTodo }) => {
  const [newTodo, setNewTodo] = useState({
    content: "",
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

  return (
    <div className="formDiv">
      <h2>Create a new todo</h2>

      <form onSubmit={addTodo}>
        <input value={newTodo.content} name="content" onChange={handleChange} />
        <input
          value={newTodo.isPrivate}
          type="checkbox"
          name="isPrivate"
          onChange={handleChange}
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default TodoForm;
