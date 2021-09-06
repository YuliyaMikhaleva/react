// import { gistsAnimeStart, gistsAnimeSuccess, gistsAnimeError } from "./actions";
//
// //thunk возвращает функцию, которую надо вызвать
// //thunk первым арументом принимает всё то же самое, что принимает action, обычная нагрузка,
// // а вторым аргументом он принимает всё то, что мы передали в него, это dispatch и getState
//
// //page=1 по умолчанию
// //api - это то, что мы передали третьим параметром - очень удобно для тестирования
// export const getGists = (page = 1) => {
//   return async (dispatch, _, api) => {
//     try {
//       dispatch(gistsAnimeStart()); //ВЫЗОВ СТАРТА ЗАПРОСА
//       //чтобы получить промис, нам нужно поставить ключевое слово await
//       const { data } = await api.getGitsAnimeApi(page);
//       dispatch(gistsAnimeSuccess(data)); //ВЫЗОВ ФИНИША ЗАПРОСА
//       console.log("data1", data); //
//     } catch (e) {
//       dispatch(gistsAnimeError(e)); //ВЫЗОВ ОШИБКИ, ЕСЛИ ОНА ЕСТЬ
//       console.log(e);
//     }
//   };
// };
//Здесь мы будем получать данные через  ASYNC AWAIT
import { gistsAnimeStart, gistsAnimeSuccess, gistsAnimeError } from "./actions";

//thunk возвращает функцию, которую надо вызвать
//thunk первым арументом принимает всё то же самое, что принимает action, обычная нагрузка,
// а вторым аргументом он принимает всё то, что мы передали в него, это dispatch и getState
const API_URL_PUBLIC = (page) =>
  `https://animechan.vercel.app/api/quotes/anime?title=naruto&page=${page}`;

//page=1 по умолчанию
export const getGists =
  (page = 1) =>
  async (dispatch) => {
    try {
      dispatch(gistsAnimeStart()); //ВЫЗОВ СТАРТА ЗАПРОСА
      const response = await fetch(API_URL_PUBLIC(page)); //получаем данные с сервера. Пока данные не загрузятся, дальше не идет
      const result = await response.json(); //декодируем наш ответ в формате json. Пока не выполнится, дальше не идет.
      dispatch(gistsAnimeSuccess(result)); //ВЫЗОВ ФИНИША ЗАПРОСА
    } catch (e) {
      dispatch(gistsAnimeError(e)); //ВЫЗОВ ОШИБКИ, ЕСЛИ ОНА ЕСТЬ
      console.log(e);
    }
  };
