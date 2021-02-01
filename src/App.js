import React, { useState, useEffect } from "react";

import Todo from "./components/Todo";
import LoginField from "./components/LoginField";
import SignUpField from "./components/SignUpField";
import TodoForm from "./components/TodoForm";
import todoService from "./services/todoService";
import loginService from "./services/loginService";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);

  const [loginModalShow, setLoginModalShow] = useState(false);
  const [signUpModalShow, setSignUpModalShow] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  useEffect(() => {
    todoService.getAllTodos().then((initialTodos) => {
      setTodos(initialTodos);
    });

    const loggedUserJSON = window.localStorage.getItem("loggedInUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  const addTodo = async (todoObject) => {
    try {
      const returnedTodo = await todoService.createTodo(todoObject);
      setTodos(todos.concat(returnedTodo));
    } catch (exception) {
      setErrorMessage("Incorrect credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const editTodo = async (id, todoObject) => {
    try {
      const returnedTodo = await todoService.updateTodo(id, todoObject);

      setTodos(todos.map((todo) => (todo.id !== id ? todo : returnedTodo)));
    } catch (exception) {
      console.log("exception====", exception);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await todoService.deleteTodo(id);
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (exception) {
      console.log("exception====", exception);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoadingSend(true);
    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem("loggedInUser", JSON.stringify(user));

      setUser(user);
      setUsername("");
      setPassword("");
      setLoginModalShow(false);
      todoService.getAllTodos().then((initialTodos) => {
        setTodos(initialTodos);
      });
    } catch (exception) {
      console.log("exception=======", exception);
      setErrorMessage("Incorrect credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
    setLoadingSend(false);
  };

  const logOut = () => {
    try {
      window.localStorage.removeItem("loggedInUser");
      setUser(null);
      todoService.getAllTodos().then((initialTodos) => {
        setTodos(initialTodos);
      });
    } catch (exception) {
      console.log(exception);
    }
  };

  const handleCreateAccount = async (event) => {
    event.preventDefault();

    if (password !== passwordConfirm) {
      setErrorMessage("Passwords do not match");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } else {
      setLoadingSend(true);
      try {
        const user = await loginService.createAccount({
          username,
          password,
          name,
        });

        const displayName = username || user?.username;

        setSuccessMessage(`Account ${displayName} created successfully`);
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);

        setUsername("");
        setPassword("");
        setPasswordConfirm("");
        setName("");
      } catch (exception) {
        console.log("exception=======", exception);
        setErrorMessage("Account already exists");
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
      setLoadingSend(false);
    }
  };

  return (
    <div className="my-container">
      <div className="title">
        <h1>Todos</h1>
      </div>

      <div className="my-widget">
        <div className="my-widget-header">
          <div>
            <h4>All todos</h4>
          </div>

          {user === null ? (
            <div>
              <button
                className="my-button"
                onClick={() => setLoginModalShow(true)}
              >
                Login
              </button>
              <span
                className="my-signup-button"
                onClick={() => setSignUpModalShow(true)}
              >
                Sign up
              </span>
            </div>
          ) : (
            <div>
              <span>
                Logged in: {user.name} ({user.username})
              </span>
              <span className="my-signup-button" onClick={() => logOut()}>
                Log out
              </span>
            </div>
          )}
        </div>

        <LoginField
          username={username}
          password={password}
          errorMessage={errorMessage}
          loadingSend={loadingSend}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleSubmit={handleLogin}
          show={loginModalShow}
          onHide={() => setLoginModalShow(false)}
        />

        <SignUpField
          username={username}
          password={password}
          errorMessage={errorMessage}
          successMessage={successMessage}
          passwordConfirm={passwordConfirm}
          name={name}
          loadingSend={loadingSend}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handlePasswordConfirmChange={({ target }) =>
            setPasswordConfirm(target.value)
          }
          handleNameChange={({ target }) => setName(target.value)}
          handleSubmit={handleCreateAccount}
          show={signUpModalShow}
          onHide={() => setSignUpModalShow(false)}
        />

        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            user={user}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
          />
        ))}

        {user && (
          <div>
            <TodoForm createTodo={addTodo} />
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
