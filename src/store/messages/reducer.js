import { nanoid } from "nanoid"; //библиотека, которая создает случайный айдишник
import {
  EDIT_MESSAGE,
  GET_MESSAGES_START,
  GET_MESSAGES_SUCCESS,
  GET_MESSAGES_ERROR,
  SEND_MESSAGE_START, SEND_MESSAGE_SUCCESS, SEND_MESSAGE_ERROR
} from "./types";

const initialState = {
  messages: {
    // room1: [
    //   {
    //     id: nanoid(),
    //     author: "bot",
    //     message: "Привет, я бот 1",
    //     date: new Date().toLocaleTimeString(),
    //   },
    // ],
    // room2: [
    //   {
    //     id: nanoid(),
    //     author: "bot",
    //     message: "Привет, я бот 2",
    //     date: new Date().toLocaleTimeString(),
    //   },
    // ],
  },
  messagesPending: false,
  messagesError: null
};

export const messagesReducer = (state = initialState, action) => {
  //мы посмотрим что action у нас пришел с типом
  switch (action.type) {
    case SEND_MESSAGE_START:
      return {
        ...state,
        messagesPending: true,
      };
    case SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        messagesPending: false,
        messages: {
          ...state.messages,
          [action.payload.roomId]:
          [
            ...(state.messages[action.payload.roomId] || []),
            { ...action.payload.message, date: new Date().toLocaleTimeString(), id: nanoid() },
          ] || [],
        },
      };
    case SEND_MESSAGE_ERROR:
      return {
        ...state,
        messagesPending: false,
        messagesError: action.payload
      };
    case EDIT_MESSAGE:
      return {
        ...state,
        messages: {
          ...state.messages,
          [action.payload.roomId]: [
            ...(state.messages[action.payload.roomId] || []).map((message) => {
              return message.id === action.payload.oldMessageId
                ? { ...message, message: action.payload.newMessage }
                : message;
            }),
          ],
        },
      };
    case GET_MESSAGES_START:
      return {
        ...state,
        messagesPending: true,
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messagesPending: false,
        messages: action.payload
      };
    case GET_MESSAGES_ERROR:
      return {
        ...state,
        messagesPending: false,
        messagesError: action.payload
      };
    default:
      //по умолчанию если у нас нет такого типа
      return state; //мы вернем state
  }
};
