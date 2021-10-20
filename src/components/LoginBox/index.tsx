import styles from './styles.module.scss'
import {VscGithubInverted} from 'react-icons/vsc'
import { useEffect, useState } from 'react'
import { api } from '../../services/api'

type AuthResponse = {
  token:string;
  user: {
    id: string;
    avatar_url:string;
    name:string;
    login:string;
  }
}

export function LoginBox(){
  const signInUrl = `https://github.com/login/oauth/authorize?scope=user&client_id=1fa03b6722a45f5bbdf4`
  async function signIn(githubCode: string) {
    const response = await api.post<AuthResponse>('/authenticate', {
      code: githubCode
    })

    const {token,user} = response.data

    localStorage.setItem('@dowhile:token',token)

    console.log(user)
  }

  useEffect(() => {
    const url = window.location.href;
    const hasGithubCode = url.includes('?code=')


    if(hasGithubCode){
      const [urlWithouthCode,githubCode] = url.split('?code=')
      console.log(githubCode)

      window.history.pushState({},'',urlWithouthCode)

      signIn(githubCode)
    }
  },[])
  
  return (
    <div className={styles.loginBoxWrapper}>
      <strong>Entre e compartilhe sua mensagem</strong>
      <a href={signInUrl} className={styles.signInWithGithub}>
        <VscGithubInverted size={24}/>
        Entrar com Github
      </a>
    </div>
  )
}