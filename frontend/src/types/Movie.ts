export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null; 
  release_date: string;
  overview: string;
  vote_average: number;
  genres: Genre[];    
}

export interface RatedMovie {
  id?: number;          
  tmdb_id: number;      
  title: string;
  poster_path: string | null;
  backdrop_path: string | null; 
  rating: number;       
  overview: string;    
}