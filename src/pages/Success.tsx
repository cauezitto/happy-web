import React from 'react';
import { useHistory } from 'react-router-dom';
import successImg from '../assets/success.svg'
import '../styles/pages/success.css'

// import { Container } from './styles';

const Success: React.FC = () => {
  const history = useHistory()

  const goToApp = () =>{
      history.push('/app')
  }
  return (
      <div id="success-page">
          <div className="wrapper">
            <div className="message-container">
                <h1 className="title">
                    Ebaaa!
                </h1>

                <p className="success-message">
                    O cadastro deu certo e foi enviado <br/>
                    ao administrador para ser aprovado. <br/>
                    Agora é só esperar :)
                </p>

                <button type = 'button' onClick = {goToApp}>
                    Voltar para o mapa
                </button>
            </div>

            <img src= {successImg} alt=""/>
          </div>
      </div>
  )
}

export default Success;