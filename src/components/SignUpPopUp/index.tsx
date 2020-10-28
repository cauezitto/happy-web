import React, {useState, useEffect} from 'react';
import { FunctionDeclaration } from 'typescript';

import './style.css'

interface PopUpProps{
    show?: boolean,
    values: {
        username: string,
        email: string,
        password: string
    },
    changeValues: any,
    onSubmit: any
}

const SignUpPopUp = ({show = false, values, onSubmit, changeValues}:PopUpProps) => {
    const [userData, setUserData] = useState({
        username: '',
        email:'',
        password:''
    })

    useEffect(()=>{
        setUserData(values)
    },[values])

    const {username, email, password} = values
  return (
      <div id="sign-up-container" style = {{
          display: show? 'block': 'none'
      }} >
          <div className="sign-up-wrapper">
              <form >
                <h1>
                    Parece que você ainda não tem cadastro
                </h1>
                <div className = 'inputs-container' >
                <label>
                    Nome <br/>
                    <input 
                    type="name"
                    name = 'username'
                    value = {username}
                    onChange = {changeValues}
                    />
                </label>
                <label>
                    E-mail <br/>
                    <input 
                    type="email"
                    name = 'email'
                    value = {email}
                    onChange = {changeValues}
                    />
                </label>

                <label>
                    Senha <br/>
                    <input 
                    type="password"
                    name = 'password'
                    value = {password}
                    onChange = {changeValues}
                    />
                </label>
                </div>

                <button 
                    type="submit"
                    onSubmit = {onSubmit}>
                    Cadastrar
                </button>
              </form>
          </div>
      </div>
  )
}

export default SignUpPopUp;