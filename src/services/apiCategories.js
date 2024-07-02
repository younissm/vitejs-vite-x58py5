import CookieServices from "./CookieServices";
import { axiosInstance } from "../api/axios.config.js";

export const getCategoriesList = async () => {
  try {
    const { data } = await axiosInstance.get(`/products/categories`);
    return data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};

export const createCategory = async ({ body }) => {
  try {
    const { data } = await axiosInstance.post(`/api/categories`, body, {
      headers: {
        Authorization: `Bearer ${CookieServices.get("jwt")}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/api/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${CookieServices.get("jwt")}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};
