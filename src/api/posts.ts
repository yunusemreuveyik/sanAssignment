import axios from "axios";
import { BASE_URL } from "../models/consts";

export const fetchPosts = async () => {
  const { data } = await axios.get(`${BASE_URL}/posts`);
  return data;
};

export const createPost = async (newPost: { title: string; body: string }) => {
  const { data } = await axios.post(`${BASE_URL}/posts`, newPost);
  return data;
};

export const deletePostById = async (id: string) => {
  const res = await axios.delete(`${BASE_URL}/posts/${id}`);
  return res.data;
};

export const fetchPostById = async (id: string) => {
  const { data } = await axios.get(`${BASE_URL}/posts/${id}`);
  return data;
};

export const updatePostById = async (
  id: string,
  updated: { title: string; body: string }
) => {
  const { data } = await axios.put(`${BASE_URL}/posts/${id}`, updated);
  return data;
};

export const fetchCommentsByPostId = async (postId: string) => {
  const { data } = await axios.get(`${BASE_URL}/posts/${postId}/comments`);
  return data;
};
