import { Component } from "react";
import {Route, Switch} from 'react-router-dom'
import ConstructionSiteLayout from './ConstructionSites/ConstructionSiteLayout';
import UsersLayout from "./Users/UsersLayout";

class DashboardBody extends Component{
    render(){
        return (
        <Switch>
            <Route path="/Dashboard/Radnici" component={UsersLayout}/>
            <Route path="/Dashboard/Gradilista" component={ConstructionSiteLayout}/>
        </Switch>);
    }
}

export default DashboardBody;