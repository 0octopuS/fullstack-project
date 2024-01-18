import axios from "axios";
import storageService from "../services/storage";
const baseUrl = "/api/blogs";

const headers = {
  Authorization: storageService.loadUser()
    ? `Bearer ${storageService.loadUser().token}`
    : null,
};

const getAll = async () => {
  const request = await axios.get(baseUrl);
  return request.data;
};

export const getBlog = async (blogId) => {
  const response = await axios.get(`${baseUrl}/${blogId}`);
  return response.data;
};

const create = async (object) => {
  const request = await axios.post(baseUrl, object, { headers });
  return request.data;
};

const update = async (object) => {
  const request = await axios.put(`${baseUrl}/${object.id}`, object, {
    headers,
  });
  return request.data;
};

const remove = async (id) => {
  await axios.delete(`${baseUrl}/${id}`, { headers });
};

const makeComment = async (id, comment) => {
  try {
    await axios.post(`${baseUrl}/${id}/comments`, { comment });
  } catch (error) {
    console.error(error);
  }
};

export default { getAll, getBlog, create, update, remove, makeComment };
