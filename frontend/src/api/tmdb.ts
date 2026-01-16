import { tmdbApi } from "./axios";
import { getCache, setCache } from "../utils/cache";

// uso de cache local para otimizar a experiência do usuário:
// -> dados já buscados carregam sem loader
// -> reduz o número de requisições enviadas à API do TMDB 

// busca de filmes por texto
export const searchMovies = async (query: string, page = 1) => {
  
  // a chave inclui "query" e "page" para diferenciar buscas diferentes no cache
  const cacheKey = `search:${query}:${page}`;

  const cached = getCache<any>(cacheKey);
  if (cached) return cached;

  const response = await tmdbApi.get("/search/movie", {
    params: { query, page },
  });

  setCache(cacheKey, response);
  return response;
};

// guarda detalhes de um filme específico
export const getMovieDetails = async (id: number) => {
  const cacheKey = `movie:${id}`;

  const cached = getCache<any>(cacheKey);
  if (cached) return cached;

  const response = await tmdbApi.get(`/movie/${id}`);

  setCache(cacheKey, response);
  return response;
};

// guarda o elenco de um filme específico
export const getMovieCredits = async (id: number) => {
  const cacheKey = `credits:${id}`;

  const cached = getCache<any>(cacheKey);
  if (cached) return cached;

  const response = await tmdbApi.get(`/movie/${id}/credits`);

  setCache(cacheKey, response);
  return response;
};

// exploração de filmes a partir de filtros, lançamentos...
export const discoverMovies = async (params: any) => {
  const cacheKey = `discover:${JSON.stringify(params)}`;

  const cached = getCache<any>(cacheKey);
  if (cached) return cached;

  const response = await tmdbApi.get("/discover/movie", { params });

  setCache(cacheKey, response);
  return response;
};

// guarda uma lista de gêneros de filmes
export const getGenres = async () => {
  const cacheKey = "genres";

  const cached = getCache<any>(cacheKey);
  if (cached) return cached;

  const response = await tmdbApi.get("/genre/movie/list");

  setCache(cacheKey, response);
  return response;
};
