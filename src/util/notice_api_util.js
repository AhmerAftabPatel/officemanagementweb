import axios from "axios";
import { constants } from "../constants";

export const fetchNotice = () => axios.get(`${constants}/api/v1/notice`);
export const createNotice = (data,id) =>
  axios.post(`${constants}/api/v1/notice/${id}`, data);