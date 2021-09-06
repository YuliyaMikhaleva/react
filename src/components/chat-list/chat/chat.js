import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { deleteRoom, editNameRoom } from "../../../store/conversations";
import stylesChats from "../chatList.module.css";

export const Chat = ({ id, title, selected }) => {
  const messages = useSelector((state) => {
    return state.messages.messages[title] || [];
  });

  const dispatch = useDispatch();

  const lastMessage = messages[messages.length - 1];
  return (
    <Link className={stylesChats.listItemLink} to={`/chat/${title}`}>
      <ListItem button={true} selected={selected}>
        <button className={stylesChats.iconEdit} onClick={() => editNameRoom(id, title)}>
          <i className="fa fa-edit"></i>
        </button>
        <button className={stylesChats.iconDelete} onClick={() => dispatch(deleteRoom(id))}>
          <i className="fa fa-trash-alt"></i>
        </button>
        <ListItemText
          className={stylesChats.chatName}
          primary={title} //было chat.name
        />
        {lastMessage && (
          <ListItemText
            className={stylesChats.listItem}
            primary={`${lastMessage.author}:${lastMessage.message}`} //и выводим последнее сообщение в верстку
          />
        )}
      </ListItem>
    </Link>
  );
};
