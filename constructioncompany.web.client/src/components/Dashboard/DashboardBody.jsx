import { Component } from "react";
import {Route, Switch} from 'react-router-dom'
import ConstructionSiteSelectorLayout from './ConstructionSites/ConstructionSiteSelectorLayout';
import ConstructionSiteForm from "./ConstructionSites/ConstructionSiteForm";
import UsersLayout from "./Users/UsersLayout";

class DashboardBody extends Component{
    render(){
        return (
        <Switch>
            <Route path="/Dashboard/Radnici" render={(props)=><UsersLayout {...props}/>}/>
            <Route path="/Dashboard/Gradilista/:id" render={(props)=><ConstructionSiteForm {...props}/>}/>
            <Route path="/Dashboard/Gradilista" render={(props)=><ConstructionSiteSelectorLayout {...props}/>}/>
        </Switch>);
    }
}

export default DashboardBody;