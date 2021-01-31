import React, { useState, useEffect } from "react";
import Todo from "./components/Todo";
import Notification from "./components/Notification";
import LoginField from "./components/LoginField";
import TodoForm from "./components/TodoForm";
import Togglable from "./components/Togglable";
import todoService from "./services/todoService";
import loginService from "./services/loginService";
// import sessionUtil from "./utils/session";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);

  const todoFormRef = React.createRef();

  // useEffect(async () => {
  // todoService.getAll().then((initialTodos) => {
  //   setNotes(initialTodos);
  // });
  // }, []);

  useEffect(() => {
    todoService.getAllTodos().then((initialTodos) => {
      setTodos(initialTodos);
    });

    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      console.log("presenttttt", user);
      // sessionUtil.setToken(user.token);
      // sessionUtil.setUsernameLoggedIn(user.username);
      setUser(user);
    }
  }, []);

  const addTodo = async (todoObject) => {
    todoFormRef.current.toggleVisibility();

    try {
      const returnedTodo = await todoService.createTodo(todoObject);
      setTodos(todos.concat(returnedTodo));
    } catch (exception) {
      console.log("exception add====", exception);
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    // todoService.create(todoObject).then((returnedTodo) => {
    //   setTodos(todos.concat(returnedTodo));
    // });
  };

  const togglePrivacyOf = async (id) => {
    const todo = todos.find((n) => n.id === id);
    const changedTodo = { ...todo, isPrivate: !todo.isPrivate };

    try {
      const returnedTodo = await todoService.updateTodo(id, changedTodo);
      setTodos(todos.map((todo) => (todo.id !== id ? todo : returnedTodo)));
    } catch (exception) {
      console.log("Update======", exception);
      setErrorMessage(`Todo '${todo.content}' was already removed from server`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    // todoService
    //   .update(id, changedTodo)
    //   .then((returnedTodo) => {
    //     setTodos(todos.map((todo) => (todo.id !== id ? todo : returnedTodo)));
    //   })
    //   .catch(() => {
    //     setErrorMessage(
    //       `Todo '${todo.content}' was already removed from server`
    //     );
    //     setTimeout(() => {
    //       setErrorMessage(null);
    //     }, 5000);
    //   });
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      // sessionUtil.setToken(user.token);
      // sessionUtil.setUsernameLoggedIn(user.username);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("exception=======", exception);
      setErrorMessage("wrong credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.createAccount({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      const displayName = username;

      setSuccessMessage(`Account ${displayName} created successfully`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);

      setUsername("");
      setPassword("");
    } catch (exception) {
      console.log("exception=======", exception);
      setErrorMessage("An error occured, please try again");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const loginField = () => (
    <Togglable buttonLabel="Login">
      <LoginField
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleNameChange={({ target }) => setName(target.value)}
        handleSubmitLogin={handleLogin}
        handleSubmitCreateAccount={handleCreateAccount}
      />
    </Togglable>
  );

  const todoForm = () => (
    <Togglable buttonLabel="New todo" ref={todoFormRef}>
      <TodoForm createTodo={addTodo} />
    </Togglable>
  );

  const todosToShow = showAll ? todos : todos.filter((todo) => todo.isPrivate);

  return (
    <div class="my-container">
      <div class="title">
        <h1>Todos</h1>
      </div>
      <Notification message={errorMessage} />
      <div class="my-widget">
        <div class="my-widget-header">
          {user === null ? (
            loginField()
          ) : (
            <div>
              <p>{user.name} logged in</p>
              {/* {todoForm()} */}
            </div>
          )}
        </div>

        <div>
          <button onClick={() => setShowAll(!showAll)}>
            Show {showAll ? "my todos" : "all todos"}
          </button>
        </div>
        <ul>
          {todosToShow.map((todo, i) => (
            <Todo
              key={todo.id}
              todo={todo}
              togglePrivacy={() => togglePrivacyOf(todo.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
