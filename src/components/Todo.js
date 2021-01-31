import React from "react";

const Todo = ({ todo, togglePrivacy, deleteTodo, editTodo }) => {
  const label = todo.isPrivate ? "make not private" : "make private";

  return (
    <li className="todo">
      <span>{todo.content}</span>
      <button onClick={togglePrivacy}>{label}</button>
      <button onClick={editTodo}>Edit</button>
      <button onClick={deleteTodo}>Delete</button>
    </li>
  );
};

export default Todo;
