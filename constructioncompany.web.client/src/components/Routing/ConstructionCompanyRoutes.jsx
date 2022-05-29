import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import DashboardForm from '../Dashboard/DasboardForm';
import NotesForm from "../Notes/NotesForm";

class ConstructionCompanyRoutes extends Component{
    render(){
        return(
            <Switch>
                <Route path="/Notes" render={(props)=><NotesForm {...props} />}/>
                <Route path="/Dashboard" render={(props)=><DashboardForm {...props} />}/>
                <Route path="/" exact render={(props)=><DashboardForm {...props} />}/>
            </Switch>
        );
    }
}

export default ConstructionCompanyRoutes;