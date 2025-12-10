import { authHeader } from "./authHeader";
import { BASE_URL } from "./config";
import axios from "axios";

export const getAllBooks = async (query = "") => {
  try {
    const response = await axios.get(`${BASE_URL}/book/all?${query}`);

    if (response.data.status !== "success") {
      console.error("API returned an error:", response.data.message);
      return [];
    }

    return response.data.books;
  } catch (error) {
    console.error("Error fetching books:", error);
    return [];
  }
};

export const addNewBook = async (bookData) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/book/add`,
      bookData,
      authHeader()
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching books:", error);
    throw error;
  }
};
