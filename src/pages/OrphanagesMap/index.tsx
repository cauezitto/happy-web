import React, {useEffect, useState} from 'react';
import '../../styles/pages/orphanages-map.css'

import Icon from '../../assets/logoIcon.svg'
import {Link} from 'react-router-dom'
import {FiPlus, FiArrowRight} from 'react-icons/fi'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import mapIcon from '../../utils/markerIcon'
import api from '../../services/api'

interface Orphanage {
  id: number,
  name: string,
  about: string,
  latitude: number,
  longitude: number,
  intructions: string,
  open_on_weekends: boolean,
  opening_hours: string,
}

const OrphanagesMap: React.FC = () => {


  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  const loadOrphanages = async() => {
    const response = await api.get('/orphanages')

    setOrphanages(response.data)
  }

  useEffect(()=>{
    loadOrphanages()
    
  },[])

  return (
      <div id='page-map'>
        <aside>
          <header>
            <img src= {Icon} alt="Happy"/>

            <h2>Escolha um orfanato no mapa</h2>
            <p>
              Muitas crianças estão
              esperando a sua visita :)
            </p>
          </header>

          <footer>
            <strong> São Paulo </strong>
            <span> SP </span>
          </footer>
        </aside>

        <Map
          center =  {[-23.5897553,-46.5138895]}
          zoom = {13}
          style = {{
            width:  '100%',
            height: '100%'
          }}
         >
           {
             //<TileLayer url = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
            }

              <TileLayer url = {`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>

            {
              orphanages.map(orphanage => (
                <Marker
                key = {orphanage.id}
                position = {[orphanage.latitude, orphanage.longitude]}
                icon = {mapIcon}
                >

                  <Popup
                    closeButton = {false}
                    minWidth = {240}
                    maxWidth = {240}
                    className = 'map-popup'
                  >
                    {
                      orphanage.name
                    }

                    <Link to = {`/orphanage/${orphanage.id}`}>
                        <FiArrowRight size = {20} color = '#fff' />
                    </Link>

                  </Popup>

                </Marker>
              ))
            }
              
         </Map>

        <Link to = '/orphanage/create' className = 'create-orphanage' >
          <FiPlus size ={32} color = '#ffff'  />
        </Link>
      </div>
  )
}

export default OrphanagesMap;