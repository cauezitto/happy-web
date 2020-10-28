import React, {useState, useEffect, FormEvent} from 'react';
import api from '../services/api'
import auth from '../utils/auth'
import '../styles/pages/Login.css'
import logo_img from '../assets/logoLogin.svg'
import {FiArrowLeft} from 'react-icons/fi'
import { useHistory, Link } from 'react-router-dom';

const Login = () => {
  const history = useHistory()

  const [password, setPassword] = useState()
  const [email, setEmail] = useState()
  const [isSessionStorage, setIsSessionStorage] = useState(true)

  const handleChangeEmail = (e: any) => {
        setEmail(e.target.value)
  }

  const handleChangePassword = (e: any) => {
    setPassword(e.target.value)
}

const handleSubmit = async (e: FormEvent) =>{
    e.preventDefault()

    const data = {
        email,
        password
    }

    await api.post('/auth', data)
    .then((res)=>{
        auth.storeToken(res.data.token, isSessionStorage)
        history.push('/orphanages')
    })
    .catch((err) =>{
        const status = err.response?.status

        switch (status) {
            case 404:
              alert('Email inválido')
              break

            case 401:
              alert('senha inválida')
              break;
            default:
              alert('Ops algo deu errado, por favor tente mais tarde')
          }
    })
  }

  return (
      <div id="login-page">
          <div className="logo-container">
                <img src={logo_img} alt="" className="logo"/>
          </div>

          <div className="form-container"> 
                <Link className="go-back" to = '/'>
                    <FiArrowLeft size = {24} color = '#15C3D6' />
                </Link>

                <form onSubmit = {handleSubmit} action = '/orphanages' className="login-form">
                    <h1 className="title">
                        Fazer Login
                    </h1>

                    <label className="email">
                        Email <br/>
                        <input
                            type = 'email'
                            value = {email}
                            onChange = {handleChangeEmail}
                        />
                    </label>

                    <label className="password">
                        Senha <br/>
                        <input
                            type = 'password'
                            value = {password}
                            onChange = {handleChangePassword}
                        />
                    </label>

                    <div className="remember">
                        <input id = 'remember' onClick = {()=>{setIsSessionStorage(!isSessionStorage)}} type='checkbox'/>
                            Lembrar-me
                    </div>

                    {/* <Link to = '/' className="forget">
                            Esqueci minha senha
                    </Link> */}

                    <button className="submit" type = 'submit' >
                        Entrar
                    </button>
                </form>
          </div>
      </div>
  )
}

export default Login;