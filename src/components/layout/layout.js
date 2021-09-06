//Layout создается, чтобы переиспользовать

import { Grid } from "@material-ui/core";
import React from "react";
import stylesChats from "../chat-list/chatList.module.css";
import stylesMessages from "../message-list/messageList.module.css";
import { ThemeContext } from "../theme-context";
import styles from "./layout.module.css";

export function Layout({ chats, children }) {
  return (
    <>
      <ThemeContext.Consumer>
        {({ theme }) => {
          return (
            <div>
              <Grid container={true} className={styles.app}>
                <Grid
                  item={true}
                  xs={2}
                  className={stylesChats.chatList}
                  style={{ backgroundColor: theme.theme.color }}
                >
                  {chats}
                </Grid>
                <Grid
                  item={true}
                  xs={10}
                  style={{ minWidth: "50px" }}
                  className={stylesMessages.messageList}
                >
                  {children}
                </Grid>
              </Grid>
            </div>
          );
        }}
      </ThemeContext.Consumer>
    </>
  );
}
