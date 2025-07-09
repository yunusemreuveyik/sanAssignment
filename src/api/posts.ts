import axios from "axios";
import { BASE_URL } from "../context/consts";

export const fetchPosts = async () => {
  const { data } = await axios.get(`${BASE_URL}/posts`);
  return data;
};
