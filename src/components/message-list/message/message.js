import classNames from "classnames";
import React from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { editMessage } from "../../../store/messages";
import stylesMessages from "../messageList.module.css";

export function Message({ id, author, message, date }) {
  const dispatch = useDispatch();
  const { roomId } = useParams();

  const editMessageValue = (id, message) => {
    //id, message - id и текст настоящего сообщения, на которое мы нажмем
    const newValue = prompt("Редактировать сообщение:", message); //новое значение из модалки
    dispatch(editMessage(id, roomId, newValue)); //поменять сообщение на новое значение
  };

  return (
    <div>
      <div
        className={classNames(stylesMessages.blockMessage, {
          [stylesMessages.blockMessageBot]: author === "bot",
        })}
      >
        <p className={stylesMessages.iconEdit} onClick={() => editMessageValue(id, message)}>
          <i className="fa fa-edit"></i>
        </p>

        <p className={stylesMessages.textMessage}>
          <span className={stylesMessages.userName}>{author}</span>: {message}{" "}
        </p>
        <p className={stylesMessages.date}>{`${date}`}</p>
      </div>
    </div>
  );
}
