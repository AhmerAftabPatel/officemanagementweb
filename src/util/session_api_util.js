import axios from "axios";
import { constants } from "../constants";

// We can use axios to set a default header
export const setAuthToken = (token) => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

// const url = `${constants}/api/users`;
// const urllog = `${constants}/api/users/login`;
// const urlreg = `${constants}/api/users/register`;
// console.log("login url " + urllog);

// Register User
export const registerUser = (userData) =>
  axios.post(`${constants}/api/v1/users/register`, userData);

// Login - Get User Token
export const loginUser = (userData) =>
  axios.post(`${constants}/api/v1/users/login`, userData);
