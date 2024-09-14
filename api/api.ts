import axios from "axios";

const apiUrl = axios.create({
  baseURL: "https://vetti-app.onrender.com",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
  withCredentials: true,
});

const setAuthToken = (token: string | null) => {
  if (token) {
    apiUrl.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiUrl.defaults.headers.common["Authorization"];
  }
};

export { apiUrl, setAuthToken };
