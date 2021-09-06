import {
  conversationsReducer,
  deleteRoom,
  addRoomSuccess,
  editNameRoom,
  getConversationsSuccess,
  clearMessageValue,
  handleChangeMessageValueSuccess,
} from "../../conversations";

//здесь нам надо описать все-все исходы conversationsReducer: отправка, удаление, редактирование,
// получение и дефолтный кейс
describe("conversations reducer", () => {
  //отправка сообщения: первым аргументом в редюссер передаем начальное состояние (в начале сообщений нет)
  //вторым аргументом передаем экшен sendMessageSuccess, где мы должны передать message и roomId

  //Удаление комнат
  it("delete conversation", () => {
    //первым аргументом передадим начальное состояние: 2 комнаты, и в каждой пустой массив сообщений
    //вторым аргументом - функцию, которая делает удаление комнаты и сообщений внутри
    const state = conversationsReducer(
      {
        conversations: [
          { id: 1, title: "room1", value: "test value 1" },
          { id: 2, title: "room2", value: "test value 2" },
        ],
      },
      deleteRoom(1), //удаляем комнату с id=1
    );
    //проверяем, что в массиве conversations остается только комната с id=2
    expect(state.conversations).toEqual([{ id: 2, title: "room2", value: "test value 2" }]);
  });

  //добавление комнат
  it("add conversation", () => {
    const state = conversationsReducer(
      {
        conversations: [
          { id: 1, title: "room1", value: "test value1" },
          { id: 2, title: "room2", value: "test value2" },
        ],
      },
      addRoomSuccess(),
    );
    //так сымитировать не получится, потому что у id генерируется с помощью библиотеки nanoid
    // expect(state.conversations).toEqual([
    //   { id: 1, title: "room 1", value: "test value1" },
    //   { id: 2, title: "room 2", value: "test value2" },
    //   { id: nanoid(), title: "room 3", value: "test value3" },
    // ]);
    //проверяем, что у элемента с индексом 2 есть свойство title со значением room 3
    expect(state.conversations[2]).toHaveProperty("title", "room 3");
    //проверяем, что у элемента с индексом 2 есть свойство title со значением room 3
    expect(state.conversations[2]).toHaveProperty("value", "test value3");
  });

  //редактирование названия комнаты
  it("edit name conversation", () => {
    const state = conversationsReducer(
      {
        conversations: [
          { id: 1, title: "room1", value: "test value1" },
          { id: 2, title: "room2", value: "test value2" },
        ],
      },
      editNameRoom(1, "CHANGE NAME"),
    );
    //проверяем, что состояние комнат изменилось, и теперь это такой массив, с изменненным названием одной из комнат
    expect(state.conversations).toEqual([
      { id: 1, title: "CHANGE NAME", value: "test value1" },
      { id: 2, title: "room2", value: "test value2" },
    ]);
    //доп проверяем, что у первого элемента массива комнат есть свойство title со значением CHANGE NAME
    expect(state.conversations[0]).toHaveProperty("title", "CHANGE NAME");
    //проверяем, что у второго элемента свойство и значение не поменялось
    expect(state.conversations[1]).toHaveProperty("title", "room2");
  });

  //получение комнат
  it("get Conversations", () => {
    const state = conversationsReducer(
      {},
      getConversationsSuccess({
        conversations: [
          { id: 1, title: "room1", value: "test value1" },
          { id: 2, title: "room2", value: "test value2" },
        ],
      }),
    );
    //проверяем, что массив ключей, который вернется будет равен ["conversations"]
    expect(Object.keys(state.conversations)).toEqual(["conversations"]);
  });

  //очистка инпута
  it("clear message value", () => {
    const state = conversationsReducer(
      {
        conversations: [
          { id: 1, title: "room1", value: "test value1" },
          { id: 2, title: "room2", value: "test value2" },
        ],
      },
      clearMessageValue("room1"),
    );
    //проверяем, что у первого элемента массива есть свойство value со значением ""(пустая строка)
    expect(state.conversations[0]).toHaveProperty("value", "");
  });

  //изменение значения инпута
  it("handle change message value", () => {
    const state = conversationsReducer(
      {
        conversations: [
          { id: 1, title: "room1", value: "test value1" },
          { id: 2, title: "room2", value: "test value2" },
        ],
      },
      handleChangeMessageValueSuccess("bla bla bla", "room2"),
    );
    //проверяем, что у второй комнаты есть свойство value со значением "bla bla bla"
    expect(state.conversations[1]).toHaveProperty("value", "bla bla bla");
    //проверяем, что у первой комнаты значение инпута осталось прежним
    expect(state.conversations[0]).toHaveProperty("value", "test value1");
  });

  //значение по умолчанию
  it("default conversations", () => {
    const state = conversationsReducer(
      {
        conversations: [{ id: 1, title: "room1", value: "test value1" }],
      },
      [],
    );
    //проверяем, что массив комнат остался тем же
    expect(state.conversations).toEqual([{ id: 1, title: "room1", value: "test value1" }]);
  });
});
