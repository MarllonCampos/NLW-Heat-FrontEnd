import { useEffect, useState } from "react";
import io from 'socket.io-client'
import { api } from "../../services/api";
import styles from "./styles.module.scss";
import logoImg from "../../assets/logo.svg";

type Message = {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
};


const messagesQueu: Message[] = []

const socket = io('http://localhost:4000')

socket.on('new_message', (newMessage :Message) => {
  messagesQueu.push(newMessage)
})
export function MessageList() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    setInterval(() => {
      if (messagesQueu.length > 0) {
        setMessages(prevState => [messagesQueu[0], prevState[0],prevState[1]].filter(Boolean))
        console.log(messagesQueu)
        messagesQueu.shift()
        console.log(messagesQueu)
      }
    }, 3000)
  },[])

  useEffect(() => {
    api
      .get<Message[]>("messages/last3")
      .then((response) => setMessages(response.data));
  }, []);
  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt="DoWhile 2021" />

      <ul className={styles.messageList}>
        {messages &&
          messages.map((message) => (
            <li className={styles.message} key={message.id}>
              <p className={styles.messageContent}>
                {message.text}
              </p>
              <div className={styles.messageUser}>
                <div className={styles.userImage}>
                  <img
                    src={message.user.avatar_url}
                    alt={message.user.name}
                  />
                </div>
                <span>{message.user.name}</span>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
