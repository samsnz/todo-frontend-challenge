// let token = null;
// let usernameLoggedIn = null;

// const setToken = (newToken) => {
//   token = `bearer ${newToken}`;
// };

// const getUsernameLoggedIn = (username) => {
//   usernameLoggedIn = username;
// };

const GET_URL_CONFIG = () => {
  const userJSON = window.localStorage.getItem("loggedInUser");
  const user = JSON.parse(userJSON);
  if (!user) {
    return null;
  }
  const config = {
    headers: {
      Authorization: `bearer ${user?.token}`,
    },
  };

  return config;
};

const GET_LOGGED_IN_USER = () => {
  const userJSON = window.localStorage.getItem("loggedInUser");
  const user = JSON.parse(userJSON);
  return user.username;
};

const sessionUtil = {
  GET_URL_CONFIG,
  GET_LOGGED_IN_USER,
  //   setToken,
  //   setUsernameLoggedIn,
  //   usernameLoggedIn,
};

export default sessionUtil;
