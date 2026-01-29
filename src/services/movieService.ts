import axios from 'axios';
import type { AxiosResponse } from 'axios';
import type { Movie } from '../types/movie';

interface FetchMoviesParams {
  page?: number;
  query: string;
}

interface MoviesResponse {
  results: Movie[];
}

export const fetchMovies = async (
  params: FetchMoviesParams,
  token: string
): Promise<Movie[]> => {
  const response: AxiosResponse<MoviesResponse> = await axios.get(
    'https://api.themoviedb.org/3/search/movie',
    {
      params: {
        query: params.query,
        page: params.page || 1,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data.results;
};
