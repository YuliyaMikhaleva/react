import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, useHistory } from "react-router-dom";
import { Layout, ChatList, MessageList } from "../components";
import { getConversationsFB } from "../store/conversations";
import {getMessagesFB} from "../store/messages";
import stylesPage from "./page.module.css";


export function Chat() {
  const { push } = useHistory();

  useEffect(() => {
    const listenExistChat = ({ code }) => {
      if (code === "Escape") {
        push("/chat");
      }
    };
    document.addEventListener("keydown", listenExistChat);
    return () => {
      document.removeEventListener("keydown", listenExistChat);
    };
  }, [push]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getConversationsFB());
    dispatch(getMessagesFB())
  }, [dispatch]);

  const { conversations, conversationsPending, conversationsError } = useSelector(
    (state) => state.conversations,
  );
  console.log(conversations);

  const { messages, messagesPending, messagesError } = useSelector(
      (state) => state.messages,
  );

  if (conversationsPending) {
    console.log("загрузка");
    // return (
    //   <div>
    //     <div className={stylesPage.spinner}>
    //       <div className="spinner-border" role="status"></div>
    //     </div>
    //   </div>
    // );
  }
  if (conversations) {
    console.log("загрузка завершена");

  }
  if (conversationsError) {
    return (
      <div>
        <h1>oooppss...</h1>
      </div>
    );
  }
  //комнаты динамические, поэтому  мы делаем такую запись. А массивом мы можем передать вот так.
  //то есть мы говорим нашему роуту, что ты должен отработать в том случае, если ты находишься на пути
  // "/chat/:roomId" или на пути "/chat"
  return (
    <Switch>
      <Route exact={true} path={["/chat/:roomId", "/chat"]}>

        <Layout chats={<ChatList title={conversationsPending} />}>
          <Route path="/chat/:roomId">
            <MessageList title1={messages} title2={messagesPending} title3={messagesError} />
          </Route>
          <Route exact={true} path="/chat">
            <h1 className={stylesPage.title}>Выберите диалог</h1>
            <img
              className={stylesPage.img}
              src={process.env.PUBLIC_URL + "/logoDialog.png"}
              width="50"
            />
          </Route>
        </Layout>
      </Route>
      <Route path="*">
        <h1>такого чата нет</h1>
      </Route>
    </Switch>
  );
}

//теперь по пути "/chat/:roomId" рендерится наш чат
//выходим из всех чатов на путь ="/chat" – у нас отрендерился компонент «Выберите сообщение»
