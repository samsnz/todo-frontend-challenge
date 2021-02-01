import axios from "axios";
import config from "../utils/config";

const SERVICE_BASE_URL = "/login";
const ACCOUNT_BASE_URL = "/users";

const urlLogin = config.BASE_URL + SERVICE_BASE_URL;
const urlCreateAccount = config.BASE_URL + ACCOUNT_BASE_URL;

const login = async (credentials) => {
  const response = await axios.post(urlLogin, credentials);
  return response.data;
};

const createAccount = async (accountInfo) => {
  const response = await axios.post(urlCreateAccount, accountInfo);
  return response.data;
};

const loginService = {
  login,
  createAccount,
};

export default loginService;
