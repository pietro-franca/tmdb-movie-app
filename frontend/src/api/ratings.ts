import { backendApi } from "./axios";

export type RatingPayload = {
  tmdb_id: number;
  title: string;
  poster_path: string | null;
  rating: number;
  overview: string;
};

export const getRatings = () =>
  backendApi.get("/ratings");

export const createRating = (data: RatingPayload) =>
  backendApi.post("/ratings", data);

export const updateRating = (tmdb_id: number, rating: number) =>
  backendApi.put(`/ratings/${tmdb_id}`, { rating });

export const deleteRating = (tmdb_id: number) =>
  backendApi.delete(`/ratings/${tmdb_id}`);
