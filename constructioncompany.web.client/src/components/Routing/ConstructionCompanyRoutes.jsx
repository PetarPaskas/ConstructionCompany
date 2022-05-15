import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import DashboardForm from '../Dashboard/DasboardForm';

class ConstructionCompanyRoutes extends Component{
    render(){
        return(
            <Switch>
                <Route path="/Dashboard" component={DashboardForm}/>
                <Route path="/" exact component={DashboardForm}/>
            </Switch>
        );
    }
}

export default ConstructionCompanyRoutes;