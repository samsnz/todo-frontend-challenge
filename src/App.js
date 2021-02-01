import React, { useState, useEffect } from "react";

import Todo from "./components/Todo";
import Notification from "./components/Notification";
import LoginField from "./components/LoginField";
import SignUpField from "./components/SignUpField";
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
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");
  const [user, setUser] = useState(null);

  const [loginModalShow, setLoginModalShow] = useState(false);
  const [signUpModalShow, setSignUpModalShow] = useState(false);

  const [loadingSend, setLoadingSend] = useState(false);

  // const todoFormRef = React.createRef();

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
    // todoFormRef.current.toggleVisibility();

    try {
      const returnedTodo = await todoService.createTodo(todoObject);
      setTodos(todos.concat(returnedTodo));
    } catch (exception) {
      console.log("exception add====", exception);
      setErrorMessage("Incorrect credentials");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }

    // todoService.create(todoObject).then((returnedTodo) => {
    //   setTodos(todos.concat(returnedTodo));
    // });
  };

  const editTodo = async (id, todoObject) => {
    // todoFormRef.current.toggleVisibility();
    // const todo = todos.find((n) => n.id === id);
    // const changedTodo = todoObject;

    // console.log("iddddd", id);
    // console.log("changeddd", todoObject);
    try {
      // const returnedTodo = await todoService.updateTodo(id, changedTodo);
      const returnedTodo = await todoService.updateTodo(id, todoObject);
      console.log("Seeee", returnedTodo);
      setTodos(todos.map((todo) => (todo.id !== id ? todo : returnedTodo)));
    } catch (exception) {
      console.log("exception add====", exception);
    }

    // todoService.create(todoObject).then((returnedTodo) => {
    //   setTodos(todos.concat(returnedTodo));
    // });
  };

  const deleteTodo = async (id) => {
    // todoFormRef.current.toggleVisibility();
    // const todo = todos.find((n) => n.id === id);
    // const changedTodo = todoObject;

    // console.log("iddddd", id);
    // console.log("changeddd", todoObject);
    try {
      // const returnedTodo = await todoService.updateTodo(id, changedTodo);
      await todoService.deleteTodo(id);
      // console.log("Seeee", returnedTodo);
      // setTodos(todos.map((todo) => (todo.id !== id ? todo : returnedTodo)));
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (exception) {
      console.log("exception add====", exception);
    }

    // todoService.create(todoObject).then((returnedTodo) => {
    //   setTodos(todos.concat(returnedTodo));
    // });
  };

  // const togglePrivacyOf = async (id) => {
  //   const todo = todos.find((n) => n.id === id);
  //   const changedTodo = { ...todo, isPrivate: !todo.isPrivate };

  //   try {
  //     const returnedTodo = await todoService.updateTodo(id, changedTodo);
  //     setTodos(todos.map((todo) => (todo.id !== id ? todo : returnedTodo)));
  //   } catch (exception) {
  //     console.log("Update======", exception);
  //     setErrorMessage(`Todo '${todo.content}' was already removed from server`);
  //     setTimeout(() => {
  //       setErrorMessage(null);
  //     }, 5000);
  //   }

  //   // todoService
  //   //   .update(id, changedTodo)
  //   //   .then((returnedTodo) => {
  //   //     setTodos(todos.map((todo) => (todo.id !== id ? todo : returnedTodo)));
  //   //   })
  //   //   .catch(() => {
  //   //     setErrorMessage(
  //   //       `Todo '${todo.content}' was already removed from server`
  //   //     );
  //   //     setTimeout(() => {
  //   //       setErrorMessage(null);
  //   //     }, 5000);
  //   //   });
  // };

  const handleLogin = async (event) => {
    event.preventDefault();
    setLoadingSend(true);
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

        const displayName = username;

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

  // const loginField = () => (
  //   <Togglable buttonLabel="Login">
  //     <LoginField
  //       username={username}
  //       password={password}
  //       handleUsernameChange={({ target }) => setUsername(target.value)}
  //       handlePasswordChange={({ target }) => setPassword(target.value)}
  //       handleSubmit={handleLogin}
  //     />
  //   </Togglable>
  // );

  // const todoForm = () => (
  //   <Togglable buttonLabel="New todo" ref={todoFormRef}>
  //     <TodoForm createTodo={addTodo} />
  //   </Togglable>
  // );

  // const todosToShow = showAll ? todos : todos.filter((todo) => todo.isPrivate);

  return (
    <div className="my-container">
      <div className="title">
        <h1>Todos</h1>
      </div>
      {/* <Notification message={errorMessage} /> */}
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

        {/* <ul> */}
        {console.log("todosss", todos)}
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            todo={todo}
            user={user}
            editTodo={editTodo}
            deleteTodo={deleteTodo}
            // togglePrivacy={() => togglePrivacyOf(todo.id)}
          />
        ))}
        {/* </ul> */}

        {user && (
          <div>
            <TodoForm createTodo={addTodo} />
            {/* <form className="add-todo" onSubmit={handleAddTodo}>
              <input className="add-todo-input" type="text" name="content" />
              <span className="private-todo">Private</span>
              <input
                className="add-todo-input-checkbox"
                type="text"
                name="isPrivate"
                type="checkbox"
              />
              <button className="my-button">Add todo</button>
            </form> */}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
