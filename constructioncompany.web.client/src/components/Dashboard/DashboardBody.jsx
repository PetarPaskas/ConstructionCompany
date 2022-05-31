import { Component } from "react";
import {Route, Switch} from 'react-router-dom'
import ConstructionSiteSelectorLayout from './ConstructionSites/ConstructionSiteSelectorLayout';
import ConstructionSiteAddEditViewForm from "./ConstructionSites/ConstructionSiteAddEditViewForm";
import UsersLayout from "./Users/UsersLayout";
import AddEditUserForm from "./Users/AddEditUserForm";

class DashboardBody extends Component{
    render(){
        return (
        <Switch>
            <Route path="/Dashboard/Radnici/:id" render={(props)=><AddEditUserForm {...props}/>} />
            <Route path="/Dashboard/Radnici" render={(props)=><UsersLayout {...props}/>}/>
            <Route path="/Dashboard/Gradilista/Edit/:id" render={(props)=><ConstructionSiteAddEditViewForm {...props}/>} />
            <Route path="/Dashboard/Gradilista/:id" render={(props)=><ConstructionSiteAddEditViewForm {...props}/>} />
            <Route path="/Dashboard/Gradilista" render={(props)=><ConstructionSiteSelectorLayout {...props}/>} />
        </Switch>);
    }
}

export default DashboardBody;