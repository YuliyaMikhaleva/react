import { nanoid } from "nanoid";
import {
  // ADD_ROOM,
  CLEAR_MESSAGE_VALUE,
  DELETE_ROOM,
  EDIT_NAME_ROOM,
  GET_CONVERSATIONS_START,
  GET_CONVERSATIONS_SUCCESS,
  GET_CONVERSATIONS_ERROR,
  HANDLE_CHANGE_MESSAGE_VALUE_START,
  HANDLE_CHANGE_MESSAGE_VALUE_SUCCESS,
  HANDLE_CHANGE_MESSAGE_VALUE_ERROR,
  ADD_ROOM_START,
  ADD_ROOM_SUCCESS,
  ADD_ROOM_ERROR,
} from "./types";

// gists: [], //массив наших гистов, то есть данных с сервера
//     gistsPending: false, //состояние загрузки
//     gistsError: null, //состояние ошибки

const initialState = {
  conversations: [
    // { id: nanoid(), title: "room1", value: "test value 1" },
    // { id: nanoid(), title: "room2", value: "test value 2" },
  ],
  conversationsPending: false,
  conversationsError: null,
};

export const conversationsReducer = (state = initialState, action) => {
  //мы посмотрим что action у нас пришел с типом
  switch (action.type) {
    case HANDLE_CHANGE_MESSAGE_VALUE_START:
      return {
        ...state,
        conversationsPending: true,
      };
    case HANDLE_CHANGE_MESSAGE_VALUE_SUCCESS:
      return {
        ...state,
        conversationsPending: false,
        conversations: state.conversations.map((conversation) => {
          return conversation.title === action.payload.roomId
            ? { ...conversation, value: action.payload.value, id: nanoid() }
            : conversation;
        }),
      };
    case HANDLE_CHANGE_MESSAGE_VALUE_ERROR:
      return {
        ...state,
        conversationsPending: false,
        conversationsError: action.payload,
      };
    case CLEAR_MESSAGE_VALUE:
      return {
        ...state,
        conversations: state.conversations.map((conversation) => {
          return conversation.title === action.payload
            ? { ...conversation, value: "" }
            : conversation;
        }),
      };
    // case ADD_ROOM:
    //   return {
    //     ...state,
    //     conversations: [
    //       ...state.conversations,
    //       {
    //         id: nanoid(),
    //         title: `room ${state.conversations.length + 1}`,
    //         value: `test value${state.conversations.length + 1}`,
    //       },
    //     ],
    //   };

    case ADD_ROOM_START:
      return {
        ...state,
        conversationsPending: true,
      };
    case ADD_ROOM_SUCCESS:
      return {
        ...state,
        conversationsPending: false,
        conversations: [
          ...state.conversations,
          {
            id: nanoid(),
            title: `room ${state.conversations.length + 1}`,
            value: `test value${state.conversations.length + 1}`,
          },
        ],
      };
    case ADD_ROOM_ERROR:
      return {
        ...state,
        conversationsPending: false,
        conversationsError: action.payload,
      };
    case DELETE_ROOM:
      return {
        ...state,
        conversations: state.conversations.filter(
          (conversation) => conversation.id !== action.payload,
        ),
      };
    case EDIT_NAME_ROOM:
      return {
        ...state,
        conversations: [...state.conversations].map((conversation) => {
          return conversation.id === action.payload.oldTitleId
            ? { ...conversation, title: action.payload.newTitle }
            : conversation;
        }),
      };
    case GET_CONVERSATIONS_START:
      return {
        ...state,
        conversationsPending: true,
      };
    case GET_CONVERSATIONS_SUCCESS:
      return {
        ...state,
        conversationsPending: false,
        conversations: action.payload,
      };
    case GET_CONVERSATIONS_ERROR:
      return {
        ...state,
        conversationsPending: false,
        conversationsError: action.payload,
      };
    default:
      //по умолчанию если у нас нету такого типа
      return state; //мы вернем state
  }
};
