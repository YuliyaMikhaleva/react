//Сюда мы будем импортировать нашу БД по комнатам
import { nanoid } from "nanoid";
import { db } from "./firebase";

//получение наших комнат
export const getConversationsApi = () => db.ref("conversations").get();

//изменение текста сообщения в инпуте (для перехода между мобильной и десктопной версии, например)
export const handleChangeMessageApi = (messageValue, roomId) =>
  db.ref("conversations").child(roomId).update({ title: roomId, value: messageValue });

//добавление диалогов
export const addConversationApi = () =>
  db
    .ref("conversations")
    .child(`room ${nanoid()}`)
    .set({
      id: nanoid(),
      title: `room ${nanoid()}`,
      value: `test value${nanoid()}`,
    });
