//мы не будем обращаться к реальному api, мы "замокаем" этот результат

import {
  getGists,
  gistsStart,
  gistsSuccess,
  gistsError,
  searchGistsByUserName,
  searchGistsStart,
  searchGistsSuccess,
  searchGistsError,
} from "../../gists"; //импортируем наш thunk и вызовем внутри теста
import { searchGistsByUserNameApi } from "../../../api/gists";
//Всё, что нам нужно, это протестировать, что вызвалась первая функция (gistsStart), вызвалось наше api,
// и вызвалась вторая функция (gistsSuccess). Мы должны это проверить.
describe("get gists thunk", () => {
  //get gists с данными
  it("get gists success", async () => {
    const PAGE = 2; //мы работаем со страницей, поэтому PAGE (в нашем реальном api мы передавали страницу)
    const dispatch = jest.fn(); //мы создаем mock-функцию с помощью jest
    const getGistsApi = jest.fn().mockResolvedValue({ data: "ok" }); //создаем еще одну mock-функцию
    //getGistsApi умеет возвращать resolveValue, может подменить полный вызов функции, и передадим туда data:"ok"
    const thunk = getGists(PAGE); //и передаем в getGists нашу страницу
    await thunk(dispatch, null, { getGistsApi }); //будем вызывать thunk(передаем в наш thunk моковый dispatch,
    // getState нам не нуженб и третьим аргументом ми передали наше подменное api) и будуем ждать ответ.
    //проверяем, что наш getGistsApi вызвался 1 раз
    expect(getGistsApi).toBeCalledTimes(1); //запрос в api был
    //проверяем, что наш моковый диспатч вызвался 2 раза:первый раз на старте, второй раз после успешного завершения.
    expect(dispatch).toBeCalledTimes(2);
    //проверяем, что мы вызывали наше моковое api с аргументом PAGE
    expect(getGistsApi).toBeCalledWith(PAGE);
    //проверяем, что первый раз dispatch вызвался с gistsStart
    expect(dispatch).toHaveBeenNthCalledWith(1, gistsStart());
    //проверяем, что второй раз dispatch вызвался с gistsSuccess
    expect(dispatch).toHaveBeenNthCalledWith(2, gistsSuccess("ok"));
  });

  //get gists с ошибкой
  it("get gists error", async () => {
    const PAGE = 2; //мы работаем со страницей, поэтому PAGE (в нашем реальном api мы передавали страницу)
    const dispatch = jest.fn(); //мы создаем mock-функцию с помощью jest
    const getGistsApi = jest.fn().mockRejectedValue({ error: "error" }); //создаем еще одну mock-функцию
    //getGistsApi умеет возвращать resolveValue, может подменить полный вызов функции, и передадим туда data:"ok"
    const thunk = getGists(PAGE); //и передаем в getGists нашу страницу
    await thunk(dispatch, null, { getGistsApi }); //будем вызывать thunk(передаем в наш thunk моковый dispatch,
    // getState нам не нуженб и третьим аргументом ми передали наше подменное api) и будуем ждать ответ.
    //проверяем, что наш getGistsApi вызвался 1 раз
    expect(getGistsApi).toBeCalledTimes(1); //запрос в api был
    //проверяем, что наш моковый диспатч вызвался 2 раза:первый раз на старте, второй раз после успешного завершения.
    expect(dispatch).toBeCalledTimes(2);
    //проверяем, что мы вызывали наше моковое api с аргументом PAGE
    expect(getGistsApi).toBeCalledWith(PAGE);
    //проверяем, что первый раз dispatch вызвался с gistsStart
    expect(dispatch).toHaveBeenNthCalledWith(1, gistsStart());
    //проверяем, что второй раз dispatch вызвался с gistsError
    expect(dispatch).toHaveBeenNthCalledWith(2, gistsError({ error: "error" }));
  });
});

describe("search gists think", () => {
  it("search gists search success ", async () => {
    const SEARCH = "test";
    const isCurrentQuery = true;
    const dispatch = jest.fn(); //мы создаем mock-функцию с помощью jest
    const searchGistsByUserNameApi = jest.fn().mockResolvedValue({ data: SEARCH }); //создаем еще одну mock-функцию
    const thunk = searchGistsByUserName(SEARCH, isCurrentQuery); //и передаем в функцию search наш поиск
    await thunk(dispatch, null, { searchGistsByUserNameApi }); //будем вызывать thunk(передаем в наш thunk моковый dispatch,
    expect(searchGistsByUserNameApi).toBeCalledTimes(1);
    expect(searchGistsByUserNameApi).toBeCalledWith(SEARCH);
    expect(dispatch).toBeCalledTimes(2);
    //проверяем, что первый раз dispatch вызвался с searchGistsStart()
    expect(dispatch).toHaveBeenNthCalledWith(1, searchGistsStart());
    //проверяем, что первый раз dispatch вызвался с searchGistsSuccess()
    expect(dispatch).toHaveBeenNthCalledWith(2, searchGistsSuccess(SEARCH));
  });

  it("search gists search error ", async () => {
    const SEARCH = "test";
    const isCurrentQuery = true;
    const dispatch = jest.fn(); //мы создаем mock-функцию с помощью jest
    const searchGistsByUserNameApi = jest.fn().mockRejectedValue({ error: "error" }); //создаем еще одну mock-функцию
    const thunk = searchGistsByUserName(SEARCH, isCurrentQuery); //и передаем в функцию search наш поиск
    await thunk(dispatch, null, { searchGistsByUserNameApi }); //будем вызывать thunk(передаем в наш thunk моковый dispatch,
    expect(searchGistsByUserNameApi).toBeCalledTimes(1);
    expect(searchGistsByUserNameApi).toBeCalledWith(SEARCH);
    expect(dispatch).toBeCalledTimes(2);
    //проверяем, что первый раз dispatch вызвался с searchGistsStart()
    expect(dispatch).toHaveBeenNthCalledWith(1, searchGistsStart());
    //проверяем, что первый раз dispatch вызвался с searchGistsError()
    expect(dispatch).toHaveBeenNthCalledWith(2, searchGistsError({ error: "error" }));
  });
});
