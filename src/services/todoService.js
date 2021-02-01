import axios from "axios";
import config from "../utils/config";
import sessionUtil from "../utils/session";

const SERVICE_BASE_URL = "/todos";

const url = config.BASE_URL + SERVICE_BASE_URL;

const getObjectToSendToApiWithUserId = (incompleteObject) => {
  // console.log("whatttt", sessionUtil.usernameLoggedIn);
  // console.log("senselessss", sessionUtil.URL_CONFIG);
  const completeObject = {
    ...incompleteObject,
    userId: sessionUtil.GET_LOGGED_IN_USER(),
  };
  return completeObject;
};

const getAllTodos = async () => {
  const response = await axios.get(url, sessionUtil.GET_URL_CONFIG());
  return response.data;
};

const createTodo = async (newTodo) => {
  // const object = { content };
  console.log("ngahooooo", sessionUtil.GET_URL_CONFIG());
  const objectToSend = await getObjectToSendToApiWithUserId(newTodo);
  const response = await axios.post(
    url,
    objectToSend,
    sessionUtil.GET_URL_CONFIG()
  );

  return response.data;
};

const updateTodo = async (id, newObject) => {
  const objectToSend = getObjectToSendToApiWithUserId(newObject);
  console.log("id holdssss", id);
  const response = await axios.put(
    `${url}/${id}`,
    objectToSend,
    sessionUtil.GET_URL_CONFIG()
  );
  return response.data[0];
};

const deleteTodo = async (id) => {
  await axios.delete(`${url}/${id}`, sessionUtil.GET_URL_CONFIG());
};

const todoService = {
  getAllTodos,
  createTodo,
  updateTodo,
  deleteTodo,
};

export default todoService;
