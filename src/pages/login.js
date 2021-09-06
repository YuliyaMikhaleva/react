//страница логина
import React from "react";
import { Link } from "react-router-dom";
import {firebaseApp} from "../api/firebase";
import { LoginForm, AuthTemplate } from "../components";
//оборачиваем в шаблон нашу форму логина,
// передаем link (ссылку на страницу регистрации) и children(саму форму)
import { Header } from "../components/header/header";

//функция входа по имейлу и паролю и вызываем ее в рендере
const onSubmit = (email,password) => {
    return firebaseApp.auth().signInWithEmailAndPassword(email,password)
}

export function Login() {
  return (
    <div>
      <AuthTemplate link={<Link to="sign-up">У вас нет аккаунта? Зарегистрируйтесь</Link>}>
        <LoginForm title="Авторизация" submitButton="Войти" onSubmit={onSubmit}/>
      </AuthTemplate>
    </div>
  )
}
