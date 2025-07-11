import axios from "axios";
import { BASE_URL } from "../models/consts";

export const fetchComments = async () => {
  const { data } = await axios.get(`${BASE_URL}/comments`);
  return data;
};
