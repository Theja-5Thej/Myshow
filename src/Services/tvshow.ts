import axios from 'axios';
import type { TVShow } from '../types/tvshow';


const API_URL = 'https://tvshow-app.onrender.com/api/tvshows'; 
// const API_URL = 'http://localhost:5000/api/tvshows'; 
const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};
export const fetchShows = (limit = 8, offset = 0) => {
  return axios.get<TVShow[]>(`${API_URL}?limit=${limit}&offset=${offset}`, getAuthHeaders());
};


// ✅ Create a new show
export const createShow = (data: Omit<TVShow, 'id'>) => {
  return axios.post<TVShow>(API_URL, data, getAuthHeaders());
};

// ✅ Update an existing show
export const updateShow = (id: string, data: Partial<TVShow>) => {
  return axios.put<TVShow>(`${API_URL}/${id}`, data, getAuthHeaders());
};

// ✅ Delete a show
export const deleteShow = (id: string) => {
  return axios.delete(`${API_URL}/${id}`, getAuthHeaders());
};
