import React, {useState, useEffect}from 'react';
import HeaderDashboard from '../components/HeaderDashboard';
import SideBar from '../components/SideBar';
import '../styles/pages/pendencies.css'
import '../styles/pages/orphanagesItemsContainers.css'
import OrphanageItem from '../components/OrphanageItem';
import api from '../services/api'
import notFoundImg from '../assets/404.svg'

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

const Pendencies = () => {
  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  const loadData = async() =>{
    const response = await api.get('/orphanages?pendencies=true')

    setOrphanages(response.data)
    console.log(response.data)
  }

  useEffect(()=>{
    loadData()
  },[])

  return (
      <div id="pendencies">
          <SideBar 
            dashboard = {true}
            isAdmin = {true}
          />

          <main>
              <HeaderDashboard
                title = 'Cadastros pendentes'
                count = {orphanages.length}
              />
              {
                orphanages.length > 0?(
                  <div className="orphanages-container">
                      {
                        orphanages.map(orphanage =>(
                          <OrphanageItem 
                            approvePage = {true} 
                            orphanage = {orphanage}/>
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

export default Pendencies;