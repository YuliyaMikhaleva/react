import React from "react";
import { Route, Redirect } from "react-router-dom";

//ПРИВАТНЫЙ РОУТ доступен только вошедшим зарегистрированным пользователям
export function PrivateRoute({ isAut, ...rest }) {
  //если мы зареганы, то вернем компонент Route и передадим остатки пропсов сюда иначе выкидываем в чат
  return isAut ? <Route {...rest} /> : <Redirect to="/login" />;
}

//ПУБЛИЧНЫЙ РОУТ доступен всем
export function PublicRoute({ isAut, ...rest }) {
    //если мы НЕ зареганы, то вернем компонент Route и передадим остатки пропсов сюда иначе выкидываем в страницу входа
    return !isAut ? <Route {...rest} /> : <Redirect to="/chat" />;
}
