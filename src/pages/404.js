import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import stylesPage from "./page.module.css";

export function Error404() {
  return (
    <Switch>
      <Route path="*">
        <div>
          <img
            className={stylesPage.img}
            src={process.env.PUBLIC_URL + "/404.jpg"} //поиск картинки в реакте
            width="1024"
          />
          <Link to="/" style={{ textDecoration: "none" }}>
            <button className={stylesPage.welcomeBtn}>
              Вернуться на главную страницу
            </button>
          </Link>
        </div>
      </Route>
    </Switch>
  );
}
