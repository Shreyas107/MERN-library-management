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
    console.error("Error fetching books:", error);
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
