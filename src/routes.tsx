import React, {ComponentElement} from 'react'

import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'
import Home from './pages/Home'
import MapApp from './pages/OrphanagesMap'
import Orphanage from './pages/Orphanage'
import CreateOrphanage from './pages/CreateOrphanage'
import Login from './pages/Login'
import Orphanages from './pages/Orphanages'
import Pendencies from './pages/Pendencies'
import ApproveOrphanage from './pages/ApproveOrphanage'
import auth from './utils/auth'
import Success from './pages/Success'

interface PrivateRouteProps{
    component: React.FC,
}

const PrivateRoute = ({component, ...rest}: any) => {
    const routeComponent = (props: any) => (
        auth.isAuthenticated()
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};

const AdminRoute = ({component, ...rest}: any) => {
    const routeComponent = (props: any) => (
        auth.isAdmin()
            ? React.createElement(component, props)
            : <Redirect to={{pathname: '/login'}}/>
    );
    return <Route {...rest} render={routeComponent}/>;
};

export default function Routes() {
    return (
        <BrowserRouter>
           <Switch>
                <Route path = '/' component = {Home} exact /> 
                <Route path = '/app' component = {MapApp} exact/>
                <Route path = '/orphanage/create' component = {CreateOrphanage} exact/>
                <Route path = '/orphanage/:id' component = {Orphanage} exact/>
                <Route path = '/success' component = {Success} exact/>
                <Route path = '/login' component = {Login} exact/>
                <PrivateRoute path = '/orphanages' component = {Orphanages} exact/>
                <PrivateRoute path = '/orphanage/:id/edit' component = {Orphanage} exact/>
                <AdminRoute path = '/pendencies' component = {Pendencies} exact/>
                <AdminRoute path = '/orphanage/:id/approve' component = {ApproveOrphanage} exact/>
           </Switch>
        </BrowserRouter>
    )
}