import axios from 'axios';

const API_URL = 'https://tvshow-app.onrender.com/api/auth/'; 

// ✅ Login
export const loginUser = (credentials: { email: string; password: string }) => {
  return axios.post(`${API_URL}login`, credentials);
};

// ✅ Register
export const registerUser = (userData: {
  username: string;
  email: string;
  password: string;
}) => {
  return axios.post(`${API_URL}register`, userData);
};

// ✅ Optionally, verify token or get current user
export const fetchCurrentUser = (token: string) => {
  return axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
