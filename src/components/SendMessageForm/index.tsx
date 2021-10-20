import styles from './styles.module.scss'
import {VscSignOut,VscGithubInverted} from 'react-icons/vsc'
import { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

export function SendMessageForm(){
  const {user, signOut} = useContext(AuthContext)
  return (
    <div className={styles.sendMessageFormWrapper}>
      <button className={styles.signOutButton} onClick={signOut}>
        <VscSignOut size={32}/>
      </button>

      <header className={styles.userInformation}>
        <div className={styles.userImage}>
          <img src={user?.avatar_url} alt="" />
        </div>

        <strong className={styles.userName}>{user?.name}</strong>

        <span className={styles.userGithub}>
          <VscGithubInverted/>
          {user?.login}
        </span>
      </header>

      <form action="" className={styles.sendMessageForm}>
        <label htmlFor="message">Mensagem</label>
        <textarea 
          name="message"
          id="message"
          placeholder="Qual a sua expectativa para o evento"
        
        />

        <button type="submit">Enviar Mensagem</button>
      </form>
    </div>
  )
}