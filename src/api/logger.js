import axios from "axios";

export const withLogger = (axios) => {
  axios.interceptors.request.use((request) => {
    console.log(`%c AXIOS [request] ${request.url}:`, "color: green; font-weight: bold", request);
    return request;
  });

  axios.interceptors.response.use(
    (config) => {
      console.log(
        `%c AXIOS [response-success] ${config.config.url}:`,
        "color: #b2dfee; font-weight: bold",
        config,
      );
      return config;
    },
    (error) => {
      console.log(`%c AXIOS [response-error]`, "color: red; font-weight: bold", error);
    },
  );

  return axios;
};
