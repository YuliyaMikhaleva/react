import { sendMessageSuccess } from "../messages";
import { SEND_MESSAGE_SUCCESS } from "../messages/types";

export const botSendMessage = (store) => (next) => (action) => {
  if (action.type === SEND_MESSAGE_SUCCESS && action.payload.message.author === "User") {
    setTimeout(() => {
      store.dispatch(
        sendMessageSuccess(
          {
            author: "bot",
            message: "Hello from bot middleware",
            date: new Date().toLocaleTimeString(),
          },
          action.payload.roomId,
        ),
      );
    }, 500);
  }
  return next(action);
};
