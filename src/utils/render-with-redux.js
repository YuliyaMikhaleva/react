//Это шаблон рендеринга (обёртка)
import { render } from "@testing-library/react";
import Provider from "react-redux/lib/components/Provider";
import React from "react";
import { BrowserRouter } from "react-router-dom";
import { createStore } from "redux";
import { reducer } from "../store";

//этот шаблон на вход принимает компонент и начальное состояние стора.
export const renderWithRedux = (component, { initialState }) => {
  const store = createStore(reducer, initialState);
  return {
    store,
    ...render(
      <Provider store={store}>
        <BrowserRouter>{component}</BrowserRouter>
      </Provider>,
    ),
  };
};
