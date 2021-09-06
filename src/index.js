import { createTheme } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux"; //импортируем провайдер

import { BrowserRouter, Switch, Route } from "react-router-dom";
// import { App } from "./App";
import { PersistGate } from "redux-persist/integration/react";
import { firebaseApp } from "./api/firebase";
import { PrivateRoute, PublicRoute } from "./components";
import { Header } from "./components/header/header";
import { DefaultThemeProvider } from "./components/theme-context";
import { Chat, Welcome, Error404, Gist, Anime, SignUp, Login } from "./pages";
import Profile from "./pages/profile";
import { persistore, store } from "./store";

// создаем тему material
// const theme = createTheme({
//   синяя: {
//     color: "blue",
//   },
//   черная: {
//     color: "black",
//   },
// });

//наш вариант тем
const themes = {
  мятная: createTheme({
    color: "#b2dfee",
  }),
  синяя: createTheme({
    color: "#007cad",
  }),
  черная: createTheme({
    color: "black",
  }),
};

// //Создаем комнату1 и комнату2
// const addConversation = () => {
//   //обращаемся к необходимой коллекции, далее к ребенку коллекции и устанавливаем ей название room1, value ""
//   db.ref("conversations").child("room2").set({ title: "room2", value: "test2" });
// };
//
// //Создаем сообщения
// const createMessage = (roomId) => {
//   //обращаемся к необходимой коллекции, далее к ребенку коллекции и устанавливаем ей название room1, value ""
//   db.ref("messages").child("room2").push({ id: 1, author: "User", message: "some text2" });
// };

//вынесем в отдельную функцию:
// роуты можно писать так: component={() => <Chat />}
// или так: component={Chat}
const App = () => {
  const [session, setSession] = useState(null); //состояние наших сессий
  //когда изменится состояние нашего юзера, вызовется метод подписки
  useEffect(() => {
    firebaseApp.auth().onAuthStateChanged((user) => {
      if (user) {
        //если юзер есть
        setSession(user); //состояние изменится на user
      } else {
        //если юзера нет
        setSession(null); //вернуть null
      }
    });
  }, []);

  return (
    <Provider store={store}>
      <React.StrictMode>
        <PersistGate loading={null} persistor={persistore}>
          <BrowserRouter>
            <DefaultThemeProvider themes={themes} initialTheme={"мятная"}>
              {/*<button onClick={addConversation}>Добавить комнату</button>*/}
              {/*<button onClick={createMessage}>Добавить сообщение в комнату</button>*/}
              <Header session={session} />
              <Switch>
                <PrivateRoute exact={true} isAut={session} path="/chat" component={Chat} />
                <PrivateRoute exact={true} isAut={session} path="/chat/:roomId" component={Chat} />
                <Route exact={true} isAut={session} path="/" component={Welcome} />
                <PrivateRoute exact={true} isAut={session} path="/profile" component={Profile} />
                <PrivateRoute exact={true} isAut={session} path="/gists" component={Gist} />
                <PrivateRoute exact={true} isAut={session} path="/anime" component={Anime} />
                <PublicRoute exact={true} isAut={session} path="/login" component={Login} />
                <PublicRoute exact={true} isAut={session} path="/sign-up" component={SignUp} />
                <Route path="*" component={Error404} />
              </Switch>
            </DefaultThemeProvider>
          </BrowserRouter>
        </PersistGate>
      </React.StrictMode>
    </Provider>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
