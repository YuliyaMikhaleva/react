import { GET_GISTS_ANIME_START, GET_GISTS_ANIME_SUCCESS, GET_GISTS_ANIME_ERROR } from "./types";

export const gistsAnimeSuccess = (gists) => ({ type: GET_GISTS_ANIME_SUCCESS, payload: gists });
export const gistsAnimeStart = () => ({ type: GET_GISTS_ANIME_START });
export const gistsAnimeError = (error) => ({ type: GET_GISTS_ANIME_ERROR, payload: error });
