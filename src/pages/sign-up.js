//страница регистрации
import React from "react";
import {Link} from "react-router-dom";
import {firebaseApp} from "../api/firebase";
import {AuthTemplate,LoginForm} from "../components";


//функция регистрации по имейлу и паролю и вызываем ее в рендере
const onSubmit = (email,password) => {
    console.log(email, password)
    return firebaseApp.auth().createUserWithEmailAndPassword(email,password)
}

export function SignUp() {
    return (
        <div>
            <AuthTemplate link={<Link to="login">У вас есть аккаунт? Войдите</Link>}>
                <LoginForm title="Регистрация" submitButton="Зарегистрироваться" onSubmit={onSubmit}/>
            </AuthTemplate>
        </div>
    );
}
