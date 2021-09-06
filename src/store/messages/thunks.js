// import { nanoid } from "nanoid";
// import { db } from "../../api/firebase";
import { clearMessageValue } from "../conversations";
import {
  getMessagesStart,
  getMessagesSuccess,
  getMessagesError,
  sendMessageStart,
  sendMessageSuccess,
  sendMessageError,
} from "./actions";
// import {sendMessagesApi} from "../../api/messages";

//thunk возвращает функцию, которую надо вызвать
//thunk первым арументом принимает всё то же самое, что принимает action, обычная нагрузка,
// а вторым аргументом он принимает всё то, что мы передали в него, это dispatch и getState -
// и третий аргумент exraArgument (Всё, чьл мы пеоежади методом withExtraArgument внутри createStore, опаадет к нам в thunk
export const sendMessageWithThunk =
  (message, roomId) =>
  async (dispatch, _, { sendMessagesApi }) => {
    try {
      dispatch(sendMessageStart()); //вызов старта запроса
      const res = await sendMessagesApi(roomId, message);
      // db.ref("messages").child(roomId).push({ id: nanoid(), author, message });
      console.log(res);
      dispatch(sendMessageSuccess(message, roomId)); //вызов окончания запроса
      dispatch(clearMessageValue(roomId)); // очистка инпута
    } catch (e) {
      dispatch(sendMessageError(e)); //вызов ошибки
      console.log("ОШИБКА", e.message);
    }
  };

// dispatch(sendMessage(message, roomId)); //вызывается функция отправки нашего сообщения

// if (message.author === "User") {
//   setTimeout(
//     () => dispatch(sendMessage({ author: "bot", message: "Hello from bot thunk" }, roomId)), //сообщение бота
//     1000,
//   );
// }

//getMessagesApi к нам приходит из стора третьим параметром из экстра-аргумента
export const getMessagesFB =
  () =>
  (dispatch, _, { getMessagesApi }) => {
    // db.ref("messages")
    //   .get()
    getMessagesApi()
      .then((snapshot) => {
        dispatch(getMessagesStart()); //вызов старта запроса
        const messages = {}; //изначально пустой объект
        snapshot.forEach((snap) => {
          console.log(snap);
          messages[snap.key] = Object.values(snap.val()); //в этот объект по ключу попадает снимок текущей базы данных
          //мы взяли по снэпшоту циклом прошли и запушили какждый элемент снэпшота к нам в массив
        });
        console.log("messages", messages);
        dispatch(getMessagesSuccess(messages)); //вызов окончания запроса
      })
      .catch((e) => {
        dispatch(getMessagesError(e)); //вызов ошибки
        console.log(e);
      });
  };
