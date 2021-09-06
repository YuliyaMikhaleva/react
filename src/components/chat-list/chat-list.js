//здесь будут все наши комнаты в которых мы общаемся
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { addConversationsFB, editNameRoom, deleteRoom } from "../../store/conversations";
import { Chat } from "./chat";
import stylesChats from "./chatList.module.css";

const useStyles = makeStyles(() => ({
  root: {
    width: "100%",
    maxWidth: 360,
  },
}));

function renderRow(props) {
  const { index, style } = props;
  return (
    <ListItem button={true} style={style} key={index}>
      <ListItemText className={stylesChats.listItem} primary={`Чат ${index + 1}`} />
    </ListItem>
  );
}

renderRow.propTypes = {
  index: PropTypes.number.isRequired,
  style: PropTypes.object.isRequired,
};

//к нам приходят сonversations
//пока уберем из пропсов {allMessages, addRoom}
export const ChatList = () => {
  const { conversations, conversationsPending, conversationsError } = useSelector(
    (state) => state.conversations,
  );
  console.log("PENDING", conversationsPending);
  console.log("CONVERSATIONS", conversations);
  const dispatch = useDispatch();
  const classes = useStyles();
  const { roomId } = useParams();
  // const { conversations} = useSelector((state) => state.conversations); //Мы вытаскиваем комнаты из store
  const messages = useSelector((state) => state.messages.messages);

  const editName = (id, title) => {
    const newName = prompt("Редактировать сообщение:", title); //новое значение из модалки
    dispatch(editNameRoom(id, newName)); //вызывается функция отправки нашего сообщения
  };

  if (conversationsPending) {
    console.log("ЗАГРУЗКА");
    // return (
    //   <div className={stylesChats.spinner}>
    //     <div className="spinner-border" role="status"></div>
    //   </div>
    // );
  }
  if (conversationsError) {
    console.log("ОШИБКА");
  }
  return (
    <div className={classes.root}>
      <List component="nav" aria-label="secondary mailbox folder">
        {conversations.map((chat, index) => {
          //на каждой итерации комнат берем и получаем всю историю ее сообщений

          const currentMessages = messages[chat.title] || []; //получаем сообщение по названию комнаты; если комнаты нет, то пустой массив
          const lastMessage = currentMessages[currentMessages?.length - 1]; //получаем последнее сообщение
          // console.log(lastMessage);

          return (
            <Chat key={index} id={chat.id} title={chat.title} selected={roomId === chat.title} />
            // <Link className={stylesChats.listItemLink} key={index} to={`/chat/${chat.title}`}>
            //   <ListItem key={index} button={true} selected={roomId === chat.title}>
            //     <button
            //       className={stylesChats.iconEdit}
            //       onClick={() => editName(chat.id, chat.title)}
            //     >
            //       <i className="fa fa-edit"></i>
            //     </button>
            //     <button
            //       className={stylesChats.iconDelete}
            //       onClick={() => dispatch(deleteRoom(chat.id))}
            //     >
            //       <i className="fa fa-trash-alt"></i>
            //     </button>
            //     <ListItemText
            //       id="nameChat"
            //       className={stylesChats.chatName}
            //       primary={chat.title} //было chat.name
            //     />
            //
            //     {lastMessage && (
            //       <ListItemText
            //         className={stylesChats.listItem}
            //         primary={`${lastMessage.author}:${lastMessage.message}`} //и выводим последнее сообщение в верстку
            //       />
            //     )}
            //   </ListItem>
            // </Link>
          );
        })}
      </List>
      {conversationsPending && (
        <div className={stylesChats.spinner}>
          <div className="spinner-border" role="status"></div>
        </div>
      )}
      <button
        className={stylesChats.btn}
        onClick={() => {
          dispatch(addConversationsFB());
        }}
      >
        Добавить беседу
      </button>
    </div>
  );
};
