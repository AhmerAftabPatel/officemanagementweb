import axios from "axios";
import { constants } from "../constants";

export const fetchAttendance = () =>
  axios.get(`${constants}/api/v1/attendance`);
