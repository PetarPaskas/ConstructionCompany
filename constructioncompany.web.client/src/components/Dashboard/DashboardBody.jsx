import { Component } from "react";
import {Route, Switch} from 'react-router-dom'
import RadniciLayout from './Radnici/RadniciLayout';
import GradilisteLayout from './Gradilista/GradilisteLayout';

class DashboardBody extends Component{
    render(){
        return (
        <Switch>
            <Route path="/Dashboard/Radnici" component={RadniciLayout}/>
            <Route path="/Dashboard/Gradilista" component={GradilisteLayout}/>
        </Switch>);
    }
}

export default DashboardBody;