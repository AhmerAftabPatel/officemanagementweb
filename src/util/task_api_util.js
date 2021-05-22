import axios from "axios";
import { constants } from "../constants";

export const setAuthToken = token => {
  if (token) {
    // Apply to every request
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    // Delete auth header
    delete axios.defaults.headers.common["Authorization"];
  }
};

export const fetchTasks = () => axios.get(`${constants}/api/v1/tasks`);

export const getUsers = () => axios.get(`${constants}/api/v1/users/getusers`);
export const singleTask = async id => {
  return await axios
    .get(`${constants}/api/v1/tasks/${id}`)
    .then(res => res.data)
    .catch(err => err);
};
export const fetchTask = id => axios.get(`${constants}/api/v1/tasks/${id}`);

export const createTask = data => axios.post(`${constants}/api/v1/tasks`, data);

export const updateTask = data =>
  axios.patch(`${constants}/api/v1/tasks/${data._id}`, data);
export const fetchTaskByUserId = id => axios.get(`${constants}/api/v1/user/tasks/${id}`);
export const confirmTask = async (id, data) =>
  await axios.patch(`${constants}/api/v1/tasks/confirm/${id}`, data);
export const deleteTask = id => axios.delete(`${constants}/api/v1/tasks/${id}`);

export const comment = (userId, taskId, comment) => {
  return fetch(`${constants}/api/v1/tasks/comment`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId, taskId, comment })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
export const uncomment = (userId, taskId, comment) => {
  return fetch(`${constants}/api/v1/tasks/uncomment`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ userId, taskId, comment })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
