import CookieServices from "./CookieServices";
import { axiosInstance } from "../api/axios.config.js";
import axios from "axios";

export const getProductList = async () => {
  try {
    const { data } = await axiosInstance.get(`/products`);
    return data;
  } catch (error) {
    console.error("Error fetching product list:", error);
    throw error;
  }
};

export const getProduct = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/products/${id}`);
    return data;
  } catch (error) {
    console.error("Error fetching product :", error);
    throw error;
  }
};

export const getCategoryProduct = async (category) => {
  try {
    const { data } = await axiosInstance.get(`/products/category/${category}`);
    return data;
  } catch (error) {
    console.error("Error fetching product of the category :", error);
    throw error;
  }
};

export const createProduct = async (formData) => {
  try {
    // const { data } = await axiosInstance.post(`/products`, formData, {
    const { data } = await axios.post(
      `http://localhost:5000/products`,
      formData,
      {
        // headers: {
        //   Authorization: `Bearer ${CookieServices.get("jwt")}`,
        // },
        headers: { "Content-Type": "application/json" },
      }
    );
    return data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};

export const updateProduct = async ({ id, body }) => {
  try {
    const { data } = await axiosInstance.put(`/products/${id}`, body, {
      headers: {
        Authorization: `Bearer ${CookieServices.get("jwt")}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error updating product:", error);
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const { data } = await axiosInstance.delete(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${CookieServices.get("jwt")}`,
      },
    });
    return data;
  } catch (error) {
    console.error("Error deleting product:", error);
    throw error;
  }
};
