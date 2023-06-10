import axios from "axios";

const BASE_URL = "https://social-media-api-zahid.vercel.app/api/";
const user = JSON.parse(localStorage.getItem("currentUser"));
const TOKEN = user?.accessToken;

export const publicRequest = axios.create({
  baseURL: BASE_URL,
});

export const privateRequest = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: `Bearer ${TOKEN}`,
  },
});
