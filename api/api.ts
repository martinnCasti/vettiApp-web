import axios from "axios";

// Auth0 token URL (modify with your Auth0 tenant info)
const authTokenUrl = "https://dev-k1n7shfb1jvuxkvz.us.auth0.com/oauth/token";

// Function to fetch token dynamically
const getToken = async () => {
  try {
    const response = await axios.post(authTokenUrl, {
      grant_type: "client_credentials",
      client_id: "Dgd31Xpn0ppSkXsDV3hWLGWlBoS96Mnr",
      client_secret:
        "cpKh3VKN_-trH6OCOUgWMYkQHBu9_C5ywqByFefrdCZjMGFfK8IdxB9gMW63tYS7",
      audience: "https://dev-k1n7shfb1jvuxkvz.us.auth0.com/api/v2/",
    });

    const token = response.data.access_token;
    console.log("Fetched Token:", token);
    return token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};

// Axios instance for API requests
const apiUrl = axios.create({
  baseURL: "https://vetti-app.onrender.com",
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

// Set Authorization header dynamically
const setAuthToken = (token: string | null) => {
  if (token) {
    apiUrl.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete apiUrl.defaults.headers.common["Authorization"];
  }
};

export { getToken, apiUrl, setAuthToken };
