import debounce from "lodash.debounce";
import {
  getConversationsError,
  getConversationsStart,
  getConversationsSuccess,
  handleChangeMessageValueError,
  handleChangeMessageValueStart,
  handleChangeMessageValueSuccess,
  addRoomStart,
  addRoomSuccess,
  addRoomError,
} from "./actions";

//получение списка бесед из бекенда
export const getConversationsFB =
  () =>
  (dispatch, _, { getConversationsApi }) => {
    dispatch(getConversationsStart()); //вызов старта запроса
    // db.ref("conversations")
    //   .get()
    getConversationsApi()
      .then((snapshot) => {
        const conversations = []; //изначально массив пустой
        snapshot.forEach((snapshot) => {
          conversations.push(snapshot.val()); //в этот массив conversations попадает снимок текущей базы данных
          //мы взяли по снэпшоту циклом прошли и запушили какждый элемент снэпшота к нам в массив
        });
        dispatch(getConversationsSuccess(conversations)); //вызов окончания запроса
      })
      .catch((e) => {
        dispatch(getConversationsError(e)); //вызов ошибки
        console.log(e);
      });
  };
//функция вызова API (debounce позволяет отправлять запрос не на каждое нажатие)
const cb = debounce(async (handleChangeMessage) => {
  await handleChangeMessage(); //колбек
}, 5000);
// const cb = debounce(async ({ roomId, messageValue }) => {
//   await db.ref("conversations").child(roomId).update({ title: roomId, value: messageValue });
// }, 5000);
//изменение текста сообщения в инпуте (для перехода между мобильной и десктопной версии, например)
export const handleChangeMessageValueFB =
  (messageValue, roomId) =>
  async (dispatch, _, { handleChangeMessageApi }) => {
    try {
      dispatch(handleChangeMessageValueStart());
      await cb(() => handleChangeMessageApi(messageValue, roomId)); //вызываем колбек-функцию handleChangeMessageApi и только после этого всё остальное
      dispatch(handleChangeMessageValueSuccess(messageValue, roomId));
    } catch (e) {
      dispatch(handleChangeMessageValueError(e));
    }
  };

//добавление бесед
export const addConversationsFB =
  () =>
  async (dispatch, _, { addConversationApi }) => {
    try {
      dispatch(addRoomStart()); //вызов старта запроса
      const res = await addConversationApi();
      //   db
      // .ref("conversations")
      // .child(`room ${nanoid()}`)
      // .set({
      //   title: `room ${nanoid()}`,
      //   value: `test value${nanoid()}`,
      // });
      console.log(res);
      dispatch(addRoomSuccess());
    } catch (e) {
      dispatch(addRoomError(e));
      console.log(e);
    }
  };

// db.ref("conversations").child('room1').set({title:"room1", value:"test1"})
