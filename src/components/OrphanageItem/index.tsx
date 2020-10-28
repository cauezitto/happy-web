import React from 'react';

import {Link, useHistory} from 'react-router-dom'
import {Map, TileLayer, Marker, Popup} from 'react-leaflet'
import mapIcon from '../../utils/markerIcon'
import Edit from '../../assets/edit.svg'
import Trash from '../../assets/trash.svg'
import arrowRight from '../../assets/arrowRight.svg'
import './style.css'
import api from '../../services/api'
import auth from '../../utils/auth'

interface OrphanageItemProps{
    approvePage?: boolean,
    onDelete?: Function
    orphanage: {
      id: number,
      name: string,
      about: string,
      latitude: number,
      longitude: number,
      intructions: string,
      open_on_weekends: boolean,
      opening_hours: string,
      approved?: boolean
    }
}

const OrphanageItem = ({approvePage, onDelete, orphanage}:OrphanageItemProps) => {
  const history = useHistory()

  const handleDeleteOrphanage = async(orphanageId: number) =>{
    await api.delete(`/orphanages/${orphanageId}`, {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    })
      .then(()=>{
        alert('deletado com sucesso')
        if(onDelete){
          onDelete()
        }
      })
      .catch(err =>{
        const status = err.response.status

        switch (status) {
          case 401:
            alert('acesso não altorizado')
            auth.eraseToken()
            history.push('/login')
            break;
        
          default:
            alert('ops, algo deu errado, por favor tente mais tarde')
            history.goBack()
            break;
        }
      })
  }  

  const goToApprove = (orphanageId: number) =>{
    history.push(`/orphanage/${orphanageId}/approve`)
  }

  const goToEdit = (orphanageId: number) =>{
    history.push(`/orphanage/${orphanageId}/edit`)
  }

  return (
      <div id="orphanage-item" style = {{
        border: orphanage.approved? 
                '1px hidden' : 
                approvePage? 
                '1px hidden' : 
                '1px solid red',
        borderRadius: 20
      }}>

        <Map
          center =  {[orphanage.latitude,orphanage.longitude]}
          zoom = {13}
          style = {{
            width:  '100%',
            height: '200px',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
          }}
         >
           {
             //<TileLayer url = 'https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'/>
            }

              <TileLayer url = {`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>

           
                <Marker
                
                position = {[orphanage.latitude, orphanage.longitude]}
                icon = {mapIcon}
                >

                </Marker>
              
         </Map>

          <footer>
            <strong>
                {orphanage.name}
            </strong>

            <div className = 'options' >
                {
                    approvePage?(
                        <div  className="option" onClick = {()=>goToApprove(orphanage.id)}>
                            <img src= {arrowRight} alt="verificar"/>
                        </div>
                    ):(
                        <>
                            <div className="option" onClick = {()=>{goToEdit(orphanage.id)}} >
                                <img src= {Edit} alt="editar"/>
                            </div>
                            
                            <div className="option" onClick = {()=>{handleDeleteOrphanage(orphanage.id)}} >
                                <img src= {Trash} alt="deletar"/>
                            </div>
                        </>
                    )
                }
            </div>
          </footer>
      </div>
  )
}

export default OrphanageItem;