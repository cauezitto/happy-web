import React, { useEffect, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo} from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import SideBar from '../components/SideBar/index'
import happyMapIcon from '../utils/markerIcon'

import {useParams} from 'react-router-dom'

import '../styles/pages/orphanage.css';
import api from "../services/api";

interface Orphanage {
  name: string,
  about: string,
  description: string,
  latitude: number,
  longitude: number,
  instructions: string,
  open_on_weekends: boolean,
  opening_hours: string,
  images: Array<{
    url: string,
    id: number
  }>
}

interface OrphanageParams {
  id: string
}

export default function Orphanage() {

  const [orphanage, setOrphanage] = useState<Orphanage>()
  const params = useParams<OrphanageParams>()
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  
  const loadOrphanages = async() => {
    const response = await api.get(`/orphanages/${params.id}`)


    setOrphanage(response.data)
  }

  useEffect(()=>{
    loadOrphanages()
  },[params.id])

  if(!orphanage){
    return(
      <p>
        Carregando ....
      </p>
    )
  }

  return (
    <div id="page-orphanage">
      <SideBar/>
      <main>
        <div className="orphanage-details">
          <img src= {orphanage.images[activeImageIndex].url} alt= {orphanage.name} />

          <div className="images">
            {
              orphanage.images.map((image, index) => (
                <button 
                  className = {activeImageIndex === index? 'active' : '' } 
                  type="button" 
                  key = {image.id}
                  onClick = {()=>{
                    setActiveImageIndex(index)
                  }}
                   >
              <img src={image.url} alt={orphanage.name} />
            </button>
              ))
            }
          </div>
          
          <div className="orphanage-details-content">
            <h1> {orphanage.name} </h1>
            <p> {orphanage.description} </p>

            <div className="map-container">
              <Map 
                center={[-27.2092052,-49.6401092]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[-27.2092052,-49.6401092]} />
              </Map>

              <footer>
                <a target = '_blank' rel = "noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2> {orphanage.about} </h2>
            <p> {orphanage.instructions} </p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                {
                  orphanage.opening_hours
                }
              </div>
              {
                orphanage.open_on_weekends?(
                <div className="open-on-weekends">
                    <FiInfo size={32} color="#39CC83" />
                    Atendemos <br />
                    fim de semana
                  </div>)
                  :(
                  <div className="open-on-weekends dont-open">
                    <FiInfo size={32} color="#FF669D" />
                    Não atendemos <br />
                    fim de semana
                  </div>)
              }
              </div>

            {
              /*
                <button type="button" className="contact-button">
                  <FaWhatsapp size={20} color="#FFF" />
                  Entrar em contato
                </button>
              */ 

            }
          </div>
        </div>
      </main>
    </div>
  );
}