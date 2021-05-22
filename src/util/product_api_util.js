import { constants } from "../constants";
import axios from "axios";
export const createCategory = (userId, category) =>
  axios.post(`${constants}/api/v1/category/create/${userId}`, category);
export const getAllCategories = () =>
  axios.get(`${constants}/api/v1/categories`);

export const getCategory = id =>
  axios.get(`${constants}/api/v1/category/${id}`);

export const updateCategory = (categoryId, userId, category) =>
  axios.put(`${constants}/api/v1/category/${categoryId}/${userId}`, category);