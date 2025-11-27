import { BASE_URL } from "./config";
import axios from "axios";

export const userLogin = async (userObj) => {
  try {
    const response = await axios.post(`${BASE_URL}/user/login`, userObj);

    return response.data;
  } catch (error) {
    console.log("error", error);
  }
};
