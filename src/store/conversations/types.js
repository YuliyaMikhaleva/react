//здесь описываются все типы
//@counter - это означает, что мы находимся в фиче counter
//чтобы когда мы будем дебаггеры смотреть, чтобы легче было ориентироваться

//изменение значения инпута
export const HANDLE_CHANGE_MESSAGE_VALUE_START = "@conversations/start handle change value";
export const HANDLE_CHANGE_MESSAGE_VALUE_SUCCESS = "@conversations/success handle change value";
export const HANDLE_CHANGE_MESSAGE_VALUE_ERROR = "@conversations/error handle change value";

//очистка значения инпута после отправки сообщения
export const CLEAR_MESSAGE_VALUE = "@conversations/clear message value";

//добавление новой комнаты
// export const ADD_ROOM = "@conversations/add room";

export const ADD_ROOM_START = "@conversations/start add room";
export const ADD_ROOM_SUCCESS = "@conversations/success add room";
export const ADD_ROOM_ERROR = "@conversations/error add room";



export const DELETE_ROOM = "@conversations/delete room"

export const EDIT_NAME_ROOM = "@conversations/edit name room";

//получение бесед с сервера
export const GET_CONVERSATIONS_START = "@gists/start get conversation from fb"; //старт запроса
export const GET_CONVERSATIONS_SUCCESS = "@gists/success get conversation from fb"; //финиш запроса
export const GET_CONVERSATIONS_ERROR = "@gists/error get conversation from fb"; //ошибка запроса