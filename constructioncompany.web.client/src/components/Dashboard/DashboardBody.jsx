import { Component } from "react";
import {Route, Switch} from 'react-router-dom'
import ConstructionSiteSelectorLayout from './ConstructionSites/ConstructionSiteSelectorLayout';
import ConstructionSiteViewForm from "./ConstructionSites/ConstructionSiteViewForm";
import UsersLayout from "./Users/UsersLayout";
import AddEditUserForm from "./Users/AddEditUserForm";

class DashboardBody extends Component{
    render(){
        return (
        <Switch>
            <Route path="/Dashboard/Radnici/:id" render={(props)=><AddEditUserForm {...props}/>} />
            <Route path="/Dashboard/Radnici" render={(props)=><UsersLayout {...props}/>}/>
            <Route path="/Dashboard/Gradilista/:id" render={(props)=><ConstructionSiteViewForm {...props}/>} />
            <Route path="/Dashboard/Gradilista" render={(props)=><ConstructionSiteSelectorLayout {...props}/>} />
        </Switch>);
    }
}

export default DashboardBody;