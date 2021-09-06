import {
  gistsStart,
  gistsSuccess,
  gistsError,
  searchGistsStart,
  searchGistsSuccess,
  searchGistsError,
} from "./actions";

//thunk возвращает функцию, которую надо вызвать
//thunk первым арументом принимает всё то же самое, что принимает action, обычная нагрузка,
// а вторым аргументом он принимает всё то, что мы передали в него, это dispatch и getState

//page=1 по умолчанию
//api - это то, что мы передали третьим параметром - очень удобно для тестирования
export const getGists = (page = 1) => {
  return async (dispatch, _, api) => {
    try {
      dispatch(gistsStart()); //ВЫЗОВ СТАРТА ЗАПРОСА
      //чтобы получить промис, нам нужно поставить ключевое слово await
      const { data } = await api.getGistsApi(page);
      dispatch(gistsSuccess(data)); //ВЫЗОВ ФИНИША ЗАПРОСА
      console.log("data1", data);
    } catch (e) {
      dispatch(gistsError(e)); //ВЫЗОВ ОШИБКИ, ЕСЛИ ОНА ЕСТЬ
      console.log(e);
    }
  };
};

export const searchGistsByUserName = (name, isCurrentQuery) => {
  return async (dispatch, _, api) => {
    try {
      dispatch(searchGistsStart()); //ВЫЗОВ СТАРТА ЗАПРОСА
      //чтобы получить промис, нам нужно поставить ключевое слово await
      const { data } = await api.searchGistsByUserNameApi(name);
      if (isCurrentQuery) {
        dispatch(searchGistsSuccess(data)); //ВЫЗОВ ФИНИША ЗАПРОСА
        console.log("data1", data);
      }
    } catch (e) {
      dispatch(searchGistsError(e)); //ВЫЗОВ ОШИБКИ, ЕСЛИ ОНА ЕСТЬ
      console.log(e);
    }
  };
};
