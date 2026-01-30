import { BASE_URL } from "./config";
import axios from "axios";
import { authHeader } from "./authHeader";

export const getAllUsers = async (filters = {}) => {
  try {
    const response = await axios.get(`${BASE_URL}/admin/users/all`, {
      ...authHeader(),
      params: filters,
    });

    return response.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};

export const updateUserRole = async (userId, role) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/update/role/${userId}`,
      { role },
      authHeader(),
    );

    return response.data;
  } catch (error) {
    console.error("Update role failed:", error);
    throw error;
  }
};

export const updateUserStatus = async (userId, status) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/admin/update/status/${userId}`,
      {
        status,
      },
      authHeader(),
    );

    return response.data;
  } catch (error) {
    console.log("Error: ", error);
    throw error;
  }
};
