import axios from "axios";
import { BASE_URL } from "../context/consts";

export const fetchComments = async () => {
  const { data } = await axios.get(`${BASE_URL}/comments`);
  return data;
};
