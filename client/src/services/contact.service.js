import { api } from "../config/api.js";

export const sendMessage = async (formData) => {
  try {
    const res = await api.post(`/contact`, formData);
    return res.data;
  } catch (error) {
    console.log(error?.response?.data?.error || "Something went wrong");
    throw error;
  }
};
