import { Component } from "react";
import {Route, Switch} from 'react-router-dom'
import ConstructionSiteSelectorLayout from './ConstructionSites/ConstructionSiteSelectorLayout';
import ConstructionSiteForm from "./ConstructionSites/ConstructionSiteForm";
import UsersLayout from "./Users/UsersLayout";

class DashboardBody extends Component{
    render(){
        return (
        <Switch>
            <Route path="/Dashboard/Radnici" component={UsersLayout}/>
            <Route path="/Dashboard/Gradilista/:id" component={ConstructionSiteForm}/>
            <Route path="/Dashboard/Gradilista" component={ConstructionSiteSelectorLayout}/>
        </Switch>);
    }
}

export default DashboardBody;