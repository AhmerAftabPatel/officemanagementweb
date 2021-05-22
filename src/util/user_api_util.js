import axios from "axios";
import { constants } from "../constants";

export const fetchAllUsers = () => axios.get(`${constants}/api/v1/users`);

export const fetchSingleUser = id =>
  axios.get(`${constants}/api/v1/users/${id}`);

export const fetchAttendance = () =>
  axios.get(`${constants}/api/present/attendance`);
export const read = async id => {
  try {
    let res = await axios.get(`${constants}/api/v1/users/${id}`);
    if (res) {
      return res;
    }
  } catch (error) {
    console.error(error.response);
    return error;
  }
};
