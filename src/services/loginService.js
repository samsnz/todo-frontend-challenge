import axios from "axios";
import config from "../utils/config";

const SERVICE_BASE_URL = "/login";

const url = config.BASE_URL + SERVICE_BASE_URL;

const login = async (credentials) => {
  const response = await axios.post(url, credentials);
  return response.data;
};

const loginService = {
  login,
};

export default loginService;
