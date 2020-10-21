import React from 'react'

import {BrowserRouter, Switch, Route} from 'react-router-dom'
import Home from './pages/Home'
import MapApp from './pages/OrphanagesMap'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'

export default function Routes() {
    return (
        <BrowserRouter>
           <Switch>
                <Route path = '/' component = {Home} exact /> 
                <Route path = '/app' component = {MapApp} exact/>
                <Route path = '/orphanage/create' component = {CreateOrphanage} exact/>
                <Route path = '/orphanage/:id' component = {Orphanage} exact/> 
           </Switch>
        </BrowserRouter>
    )
}