import React from 'react'
import mapMarkerImg from '../../assets/logoIcon.svg'
import {FiArrowLeft} from 'react-icons/fi'
import { useHistory } from 'react-router-dom';
import './style.css'

export default function SideBar() {
    const { goBack } = useHistory();

    return (
      <aside id = "side-bar" >
        <img src={mapMarkerImg} alt="Happy" />

        <footer>
          <button type="button" onClick={goBack}>
            <FiArrowLeft size={24} color="#FFF" />
          </button>
        </footer>
      </aside>
    )
}
