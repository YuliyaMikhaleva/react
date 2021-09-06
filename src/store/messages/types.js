//здесь описываются все типы

//отправка сообщений
export const SEND_MESSAGE_START = "@messages/send message start";
export const SEND_MESSAGE_SUCCESS = "@messages/send message success";
export const SEND_MESSAGE_ERROR = "@messages/send message error";

export const EDIT_MESSAGE = "@messages/edit message";

//получение сообщений
export const GET_MESSAGES_START = "@gists/start get messages from fb"; //старт запроса
export const GET_MESSAGES_SUCCESS = "@gists/success get messages from fb"; //финиш запроса
export const GET_MESSAGES_ERROR = "@gists/error get messages from fb"; //ошибка запроса