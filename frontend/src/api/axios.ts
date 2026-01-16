import axios from "axios";

export const backendApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

export const tmdbApi = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
  },
  params: {
    language: "pt-BR",
    include_adult: false
  },
});
