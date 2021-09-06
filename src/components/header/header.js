import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { firebaseApp } from "../../api/firebase";
import stylesPage from "../../pages/page.module.css";
import { ThemeContext } from "../theme-context";
import stylesHeader from "./header.module.css";

//функция выхода - по нажатию на кнопку с этой функции у нас идёт запрос на выход
// const signOut  async () => {
//
//   try{
//     setPending(true)
//     const response = await firebaseApp.a1uth().signOut()
//     const result = await response.json()
//     setEmail(result)
//   } catch (e) {
//     setError(e)
//   } finally {
//     setPending(false)
//   }
//   // firebaseApp.a1uth().signOut()
// }

//Consumer - render props который возвращает нам реакт-элемент. Вернем заголовок
//Consumer первым аргументом принимает то value, которое мы передали в ThemeContext.Provider. value - это текущая тема и ее имя
//передади объект темы theme вместо value
export function Header({ session }) {
  const [email, setEmail] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(null);

  // //функция выхода из профиля = запрос
  const signOut = async () => {
    try {
      setPending(true);//начало загрузки
      await firebaseApp.auth().signOut(); //пока await не выполнится, дальше не идет
      // await setEmail(""); //очистка состояния
      setPending(false);//окончание загрузки
      console.log("ЗАГРУЗКА")
    } catch (e) {
      setError(e.message);//сообщение ошибки
      console.log(error);
    }
  };

  useEffect(() => {
    if (session) {
      //если сессия есть
      setEmail(session?.email); //состояние email = свойство email в сессии
      console.log(email);
    }
  }, [email, session]);

  const { theme, changeTheme } = useContext(ThemeContext);
  const user = useSelector((state) => state.profile.user);


  if (error) {
    return <h1>ooooppss...</h1>;
  }

  return (
    <>
      {/*<ThemeContext.Consumer>*/}
      {/*  {({ theme, changeTheme }) => {*/}
      {/*return (*/}
      <div className={stylesHeader.header} style={{ backgroundColor: theme.theme.color }}>
        <div className={stylesHeader.btn}>
          <button
            className="btn btn-secondary dropdown-toggle"
            href="#"
            role="button"
            id="dropdownMenuLink"
            data-toggle="dropdown"
            aria-expanded="false"
          >
            Цвет темы
          </button>

          <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
            <li>
              <a onClick={() => changeTheme("мятная")} className="dropdown-item" href="#">
                Мятный
              </a>
            </li>
            <li>
              <a onClick={() => changeTheme("синяя")} className="dropdown-item" href="#">
                Синий
              </a>
            </li>
            <li>
              <a onClick={() => changeTheme("черная")} className="dropdown-item" href="#">
                Черный
              </a>
            </li>
          </ul>
        </div>{" "}
        <Link to="/gists" style={{ textDecoration: "none", margin: "auto 8px" }}>
          <button className={stylesHeader.btnToCab}>Gists</button>
        </Link>
        <Link to="/anime" style={{ textDecoration: "none", margin: "auto 8px" }}>
          <button className={stylesHeader.btnToCab}>Gists Anime</button>
        </Link>
        <Link to="/chat" style={{ textDecoration: "none", margin: "auto 8px" }}>
          <button className={stylesHeader.btnToCab}>Chat</button>
        </Link>
        <Link to="/login" style={{ textDecoration: "none", margin: "auto 8px" }}>
          <button className={stylesHeader.btnToCab}>Логин</button>
        </Link>
        <Link to="/sign-up" style={{ textDecoration: "none", margin: "auto 8px" }}>
          <button className={stylesHeader.btnToCab}>Регистрация</button>
        </Link>
        {/*<p className={stylesHeader.headerTitle}>CHAT</p>*/}
        <span className={stylesHeader.userName}>
          <p className={stylesHeader.user}>Пользователь:</p> {user.firstName} {user.soName}
        </span>
        <Link to="/profile" style={{ textDecoration: "none", margin: "auto 8px" }}>
          <button className={stylesHeader.btnToCab}>Войти в личный кабинет</button>
        </Link>
        {/*если есть поле email в сессии, то вывести блок имейла*/}
        {session?.email &&
          (
              pending ? (
                  <a>
                    <button style={{ textDecoration: "none", margin: "auto 8px", backgroundColor:"red", color:"white"}} className={stylesHeader.btnToCab} onClick={signOut}>
                      {" "}
                      Выход ({session.email})
                    </button>
                  </a>
          ) : (
            <a style={{ textDecoration: "none", margin: "auto 8px" }}>
              <button className={stylesHeader.btnToCab} onClick={signOut}>
                {" "}
                Выход ({session.email})
              </button>
            </a>
          )
          )}
      </div>
      {/*);*/}
      {/*}}*/}
      {/*</ThemeContext.Consumer>*/}
      {/*<p className={stylesHeader.headerTitle}>CHAT</p>*/}
    </>
  );
}
