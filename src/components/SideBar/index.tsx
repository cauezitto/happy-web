import React from 'react'
import mapMarkerImg from '../../assets/logoIcon.svg'
import {FiArrowLeft} from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom';
import {FiPower} from 'react-icons/fi'
import LocationPinImg from '../../assets/mapPin.svg'
import AlertImg from '../../assets/alert.svg'
import './style.css'
import auth from '../../utils/auth';

interface SideBarType{
  dashboard?: boolean,
  isAdmin?: boolean
}

const SideBar = ({dashboard = false, isAdmin = false}:SideBarType) => {
    const history = useHistory();

    const handleLogOut = () =>{
      auth.eraseToken()
      history.push('/login')
    }

    const goToApp = () =>{
      history.push('/app')
    }

    return (
      <aside id = "side-bar" >
        <img src={mapMarkerImg} alt="Happy" onClick = {goToApp} />

        {
          auth.isAuthenticated() && (
            <div className="dashboard-controls">
              <Link to = '/orphanages' className="dashboard-option">
                  <img src= {LocationPinImg} alt="meus orfanatos" />
              </Link>

              {
                auth.isAdmin() && (
                  <Link to = '/pendencies' className="dashboard-option dashboard-option2">
                      <img src= {AlertImg} alt="meus orfanatos" />
                  </Link>
                )
              }
            
            </div>
          )
        }

        <footer>
          {
            auth.isAuthenticated() && (
              <button onClick = {handleLogOut} type = 'button'>
                <FiPower size={24} color="#FFF" />
              </button>
            )
          }
              
              <button type="button" onClick={history.goBack}>
                <FiArrowLeft size={24} color="#FFF" />
              </button>
            
          
        </footer>
      </aside>
    )
}

export default SideBar
