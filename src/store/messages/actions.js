import {SEND_MESSAGE_START,SEND_MESSAGE_SUCCESS,SEND_MESSAGE_ERROR, EDIT_MESSAGE, GET_MESSAGES_START, GET_MESSAGES_SUCCESS, GET_MESSAGES_ERROR} from "./types";

//action creator возвращает объект
export const sendMessageStart = () => ({
  type: SEND_MESSAGE_START
});
export const sendMessageSuccess = (message, roomId) => ({
  type: SEND_MESSAGE_SUCCESS,
  payload: { message, roomId },
  meta: { delay: 500 },
});
export const sendMessageError = (error) => ({
  type: SEND_MESSAGE_ERROR,
  payload: error
});

export const editMessage = (oldMessageId, roomId, newMessage) => ({
  type: EDIT_MESSAGE,
  payload: { oldMessageId, roomId, newMessage },
});

export const getMessagesStart = () => ({
  type: GET_MESSAGES_START,
});
export const getMessagesSuccess = (messages) => ({
  type: GET_MESSAGES_SUCCESS,
  payload: messages,
});
export const getMessagesError = (error) => ({
  type: GET_MESSAGES_ERROR,
  payload: error,
});
