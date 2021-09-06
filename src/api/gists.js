import { request } from "./request";

export const getGistsApi = (page) => request.get(`/gists/public?page=${page}`); //аксиос по-другому возвращает данные, нежели fetch - для аксиоса не нужно выполнять response.json

export const searchGistsByUserNameApi = (user) => request.get(`/users/${user}/gists`);
