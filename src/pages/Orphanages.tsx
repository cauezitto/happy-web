import React, {useEffect, useState} from 'react';
import SideBar from '../components/SideBar'
import HeaderDashboard from '../components/HeaderDashboard'
import '../styles/pages/orphanages.css'
import '../styles/pages/orphanagesItemsContainers.css'
import OrphanageItem from '../components/OrphanageItem'
import api from '../services/api';
import auth from '../utils/auth'
import notFoundImg from '../assets/404.svg'
import { useHistory } from 'react-router-dom';

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

const Orphanages: React.FC = () => {

  const history = useHistory()

  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  const loadData = async() =>{
    const response = await api.get('/me', {
      headers: {
        Authorization: `Bearer ${auth.getToken()}`
      }
    })

    setOrphanages(response.data)
    console.log(response.data)
  }

  useEffect(()=>{
    loadData()
  },[])

  return (
      <div id = 'orphanages' >
          <SideBar 
            dashboard = {true}
            isAdmin = {true}
             />
          <main>
              <HeaderDashboard
                title = 'Orfanatos cadastrados'
                count = {orphanages.length}
               />

              {
                orphanages.length > 0?(
                  <div className="orphanages-container">
                      {
                        orphanages.map(orphanage =>(
                          <OrphanageItem orphanage = {orphanage} onDelete = {loadData} />
                        ))
                      }
                  </div>
                ):(
                  <div id='not-found' >
                    <img src={notFoundImg} alt="Nenhum encontrado"/>

                    <h2>
                      Nenhum no momento
                    </h2>
                  </div>
                )

              }
          </main>
      </div>
  )
}

export default Orphanages;