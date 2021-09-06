import {
  editMessage,
  getMessagesSuccess,
  messagesReducer,
  sendMessageSuccess,
} from "../../messages";

//здесь нам надо описать все-все исходы messageReducer: отправка, удаление, редактирование,
// получение и дефолтный кейс
describe("message reducer", () => {
  //отправка сообщения: первым аргументом в редюссер передаем начальное состояние (в начале сообщений нет)
  //вторым аргументом передаем экшен sendMessageSuccess, где мы должны передать message и roomId
  it("send message", () => {
    const state = messagesReducer(
      { messages: {} },
      sendMessageSuccess({ author: "Bot", message: "Test" }, "room1"),
    );

    //проверяем, что длина массива state.messages.room1 = 1
    expect(state.messages.room1.length).toBe(1);

    //проверяем, что автор первого сообщения комнаты 1 = Bot
    expect(state.messages.room1[0].author).toBe("Bot");

    //проверяем, что у первого сообщения комнаты есть свойство "message" и значение этого свойства - "Test"
    expect(state.messages.room1[0]).toHaveProperty("message", "Test");
  });

  //получение сообщений
  it("get message", () => {
    const state = messagesReducer({}, getMessagesSuccess({ room1: [1, 2, 3, 4] }));
    //проверяем, что массив который вернется равен массиву с одним элементом room1
    expect(Object.keys(state.messages)).toEqual(["room1"]);
    //проверяем, что массив сообщений комнаты room1 = [1,2,3,4]
    expect(state.messages.room1).toEqual([1, 2, 3, 4]);
  });

  //редактирование сообщений
  it("edit message", () => {
    const state = messagesReducer(
      {
        messages: {
          room1: [
            { id: 1, author: "User", message: "Test" },
            { id: 2, author: "Bot", message: "Test2" },
          ],
        },
      },
      editMessage(1, "room1", "Hello!"),
    );
    //проверяем, что первое сообщение в комнате 1 теперь "Hello!"
    expect(state.messages.room1[0].message).toBe("Hello!");
    //проверяем, что второе сообщение в комнате 1 осталось неизменным
    expect(state.messages.room1[1].message).toBe("Test2");
  });

  //кейс по умолчанию
  it("default messages ", () => {
    const state = messagesReducer({ messages: 1 }, {});
    //проверяем, что состояние осталось неизменным
    expect(state.messages).toBe(1);
  });
});
