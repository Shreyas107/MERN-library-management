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
