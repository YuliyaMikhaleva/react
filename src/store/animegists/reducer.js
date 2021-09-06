import { GET_GISTS_ANIME_START, GET_GISTS_ANIME_SUCCESS, GET_GISTS_ANIME_ERROR } from "./types";

const initialState = {
  gists: [], //массив наших гистов, то есть данных с сервера
  gistsPending: false, //состояние загрузки
  gistsError: null, //состояние ошибки
};

export const gistsAnimeReducer = (state = initialState, action) => {
  //мы посмотрим что action у нас пришел с типом
  switch (action.type) {
    case GET_GISTS_ANIME_START:
      return {
        ...state,
        gistsPending: true,
      };
    case GET_GISTS_ANIME_SUCCESS:
      return {
        ...state,
        gistsPending: false,
        gists: action.payload,
      };
    case GET_GISTS_ANIME_ERROR:
      return {
        ...state,
        gistsError: action.payload,
        gistsPending: false,
      };
    default:
      //по умолчанию если у нас нет такого типа
      return state; //мы вернем state
  }
};
