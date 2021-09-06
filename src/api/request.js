import axios from "axios";
import { withLogger } from "./logger";
//Все запросы будут идти не через fetch , а через этот класс
//у axios есть метод create - он принимает базовый URL
class Request {
  constructor(token) {
    this.request = withLogger(
      axios.create({
        baseURL: "https://api.github.com", //базовый URL - отправная точка наших запросов
      }),
    );
    this.token = token; //это ключ, по которому бекенд определяет, какой юзер сделал запрос
  }
  //повторяющуюся логику мы вынесли в отдельную функцию
  requestWithToken = () => {
    return {
      headers: { "x-token": this.token },
    };
  };

  //объявим метод get который принимает нашу URL и какие-то параметры: например withAuth - это boolean
  get = (url, withAuth) => {
    let config = {}; //создадим какой-то конфиг
    if (withAuth) {
      //если withAuth true , то наш запрос будет с токеном: в конфиг добавим заголовки - все заголовки на бэк мы передаем в этом месте.
      config = { ...config, ...this.requestWithToken() }; //вместо того, чтобы в каждом thunk писать такой конфиг, мы его пишем 1 раз в классе Request
    }
    return this.request.get(url, config);
  };

  //объявим метод зщые который принимает нашу URL, какие-то параметры, и withAuth - это boolean
  post = (url, params, withAuth) => {
    let config = {}; //создадим какой-то конфиг
    if (withAuth) {
      //если withAuth true , то наш запрос будет с токеном: в конфиг добавим заголовки - все заголовки на бэк мы передаем в этом месте.
      config = { ...config, ...this.requestWithToken() }; //вместо того, чтобы в каждом thunk писать такой конфиг, мы его пишем 1 раз в классе Request
    }
    return this.request.post(url, params, config);
  };
}

export const request = new Request("test token"); //наружу мы вернем request с токеном "test token"
//Именно этот request мы будем использовать вместо нашего fetch в store/gists/thunks.js
