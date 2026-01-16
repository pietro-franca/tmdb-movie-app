import { tmdbApi } from "./axios";
import { getCache, setCache } from "../utils/cache";

export const searchMovies = async (query: string, page = 1) => {
  const cacheKey = `search:${query}:${page}`;

  const cached = getCache<any>(cacheKey);
  if (cached) return cached;

  const response = await tmdbApi.get("/search/movie", {
    params: { query, page },
  });

  setCache(cacheKey, response);
  return response;
};

export const getMovieDetails = async (id: number) => {
  const cacheKey = `movie:${id}`;

  const cached = getCache<any>(cacheKey);
  if (cached) return cached;

  const response = await tmdbApi.get(`/movie/${id}`);

  setCache(cacheKey, response);
  return response;
};

export const getMovieCredits = async (id: number) => {
  const cacheKey = `credits:${id}`;

  const cached = getCache<any>(cacheKey);
  if (cached) return cached;

  const response = await tmdbApi.get(`/movie/${id}/credits`);

  setCache(cacheKey, response);
  return response;
};

export const discoverMovies = async (params: any) => {
  const cacheKey = `discover:${JSON.stringify(params)}`;

  const cached = getCache<any>(cacheKey);
  if (cached) return cached;

  const response = await tmdbApi.get("/discover/movie", { params });

  setCache(cacheKey, response);
  return response;
};

export const getGenres = async () => {
  const cacheKey = "genres";

  const cached = getCache<any>(cacheKey);
  if (cached) return cached;

  const response = await tmdbApi.get("/genre/movie/list");

  setCache(cacheKey, response);
  return response;
};
