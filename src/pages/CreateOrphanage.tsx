import React, { ChangeEvent, FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import {FiPlus} from 'react-icons/fi'

import '../styles/pages/create-orphanage.css';
import SideBar from "../components/SideBar";

import {LeafletMouseEvent} from 'leaflet'
import mapIcon from '../utils/markerIcon'
import Orphanage from "./Orphanage";
import api from "../services/api";
import { useHistory } from "react-router-dom";

export default function CreateOrphanage() {

  const history = useHistory()

  const [name, setName] = useState('')
  const [about, setAbout] = useState('')
  const [instructions, setInstructions] = useState('')
  const [open_on_weekends, setOpen_on_weekends] = useState(true)
  const [opening_hours, setOpening_hours] = useState('')
  const [images, setImages] = useState<File[]>([])
  const [previewImages, setPreviewImages] = useState<string[]>([])

  const [position, setPosition] = useState({
    latitude: 0,
    longitude: 0
  })

  const handleMapCLick = (event: LeafletMouseEvent) =>{
    const {lat, lng} = event.latlng

    setPosition({
      latitude: lat,
      longitude: lng
    })
  }

  const handleSelectImages = (event: ChangeEvent<HTMLInputElement>) =>{
    console.log(event.target.files)
    if(!event.target.files){
      return
    }
    const selectedImages = Array.from(event.target.files)
    setImages(selectedImages)

    const selectedImagesPreview = selectedImages.map(image =>{
      return URL.createObjectURL(image)
    })

    setPreviewImages(selectedImagesPreview)
  }

  const handleSubmit = async (e: FormEvent) =>{
    e.preventDefault()

    const data = new FormData()

    data.append('name', name)
    data.append('about', about)
    data.append('instructions', instructions)
    data.append('open_on_weekends', String(open_on_weekends))
    data.append('opening_hours', opening_hours)
    data.append('latitude', String(position.latitude))
    data.append('longitude', String(position.longitude))
    images.forEach(image =>{
      data.append('images', image)
    })

    await api.post('/orphanages', data)

    alert('cadastro realizado com sucesso')

    history.push('/app')
  }

  return (
    <div id="page-create-orphanage">
      <SideBar/>

      <main>
        <form className="create-orphanage-form" onSubmit = {handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-23.5897553,-46.5138895]} 
              style={{ width: '100%', height: 280 }}
              zoom={12}
              onclick = {handleMapCLick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              {
                position.latitude !== 0 &&

                <Marker interactive={false} icon={mapIcon} position={[position.latitude, position.longitude]} />
              }
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input 
                id="name"
                value = {name}
                onChange = {e => setName(e.target.value)}
                 />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea 
                id="name" 
                maxLength={300}
                value = {about}
                onChange = {e => setAbout(e.target.value)}
                 />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="uploaded-image">

              </div>
              <div className="images-container">

              {
                previewImages.map(image =>(
                  <img key = {image} src={image} alt={Orphanage.name}/>
                ))
              }

              <label htmlFor = 'image[]' className="new-image">
                <FiPlus size={24} color="#15b6d6" />
              </label>
              <input multiple onChange = {handleSelectImages} type="file" name="" id="image[]"/>
              </div>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea 
                id="instructions"
                value = {instructions}
                onChange = {e => setInstructions(e.target.value)}
                 />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de Funcionamento</label>
              <input 
                id="opening_hours"
                value = {opening_hours}
                onChange = {e => setOpening_hours(e.target.value)}
                 />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button 
                  type="button" 
                  className= {open_on_weekends? 'active' : ''}
                  onClick = {()=>{setOpen_on_weekends(true)}}
                  >Sim</button>
                <button 
                  type="button" 
                  className = {open_on_weekends? '': 'active'}
                  onClick = {()=>{setOpen_on_weekends(false)}}
                   >Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
