import axios from "axios";

// responsável pela conexão com o backend
export const backendApi = axios.create({
  baseURL: "http://localhost:5000/api",
  withCredentials: true
});

// responsável pela conexão com a API do TMDB
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
