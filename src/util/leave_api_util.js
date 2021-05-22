import axios from "axios";
import { constants } from "../constants";

export const fetchleaves = () =>
  axios.get(`${constants}/api/v1/leave`);


export const fetchleavesById = (leaveId) =>
  axios.get(`${constants}/api/v1/leave/${leaveId}`);



export const updateleave = (leaveId, leave) =>
  axios.put(
    `${constants}/api/v1/leave/${leaveId}`,leave
    
  );
