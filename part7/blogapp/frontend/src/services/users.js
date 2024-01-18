import axios from "axios";
const baseUrl = "/api/users";

export const getUsers = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

export const getUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}`);
  return response.data;
};
