//Сюда мы будем импортировать нашу БД по сообщениям
import { nanoid } from "nanoid";
import { db } from "./firebase";
//получение сообщений
export const getMessagesApi = () => db.ref("messages").get();
//отправка сообщений
export const sendMessagesApi =
  () =>
  (roomId, { author, message }) =>
    db.ref("messages").child(roomId).push({ id: nanoid(), author, message });
