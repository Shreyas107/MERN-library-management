import { authHeader } from "./authHeader";
import { BASE_URL } from "./config";
import axios from "axios";

export const issueBook = async ({ bookId, userId }) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/lib/issue-book`,
      { bookId, userId },
      authHeader(),
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const searchMembers = async (query) => {
  try {
    const response = await axios.get(`${BASE_URL}/lib/members/search`, {
      params: { q: query },
      ...authHeader(),
    });

    return response.data;
  } catch (error) {
    console.error("Error searching members:", error);
    throw error;
  }
};

export const getAllIssuedBooks = async () => {
  try {
    const res = await axios.get(
      `${BASE_URL}/lib/all-issued-books`,
      authHeader(),
    );
    return res.data;
  } catch (err) {
    console.error("Error fetching issued books:", err);
    throw err;
  }
};

export const returnBook = async ({ userId, bookId }) => {
  try {
    const response = await axios.put(
      `${BASE_URL}/lib/return-book`,
      { userId, bookId },
      authHeader(),
    );
    return response.data;
  } catch (error) {
    console.error("Error returning book:", error);
    throw error;
  }
};
