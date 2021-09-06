import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import { Chat } from "./chat";
import stylesPage from "./page.module.css";

export function Welcome() {
  return (
    <Switch>
      <Route path="/">
        <div className={stylesPage.pageWelcome}>
          <h1 className={stylesPage.welcomeText}>Привет! Добро пожаловать в чат!</h1>
          <Link to="/chat" style={{ textDecoration: "none" }}>
            <button className={stylesPage.welcomeBtn}>Войти в чат</button>
            <img
              className={stylesPage.img}
              src={process.env.PUBLIC_URL + "/logoDialog.png"}
              width="300"
            />
          </Link>
        </div>
      </Route>
      <Route exact={true} path="/chat">
        <Chat />
      </Route>
      <Route path="*">
        <h1>такого чата нет</h1>
      </Route>
    </Switch>
  );
}
