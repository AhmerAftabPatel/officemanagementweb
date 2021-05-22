import axios from "axios";
import { constants } from "../constants";

export const fetchMom = () =>
  axios.get(`${constants}/api/mom`);