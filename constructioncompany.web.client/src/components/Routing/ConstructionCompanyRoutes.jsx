import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import DashboardForm from '../Dashboard/DasboardForm';
import NotesSelectionLayout from "../Notes/NotesSelectionLayout";
import ExportForm from '../Export/ExportForm';

class ConstructionCompanyRoutes extends Component{
    render(){
        return(
            <Switch>
                <Route path="/Notes" render={(props)=><NotesSelectionLayout {...props} />}/>
                <Route path="/Dashboard" render={(props)=><DashboardForm {...props} />}/>
                <Route path="/Export" render={(props)=><ExportForm {...props} />}/>
                <Route path="/" exact render={(props)=><DashboardForm {...props} />}/>
            </Switch>
        );
    }
}

export default ConstructionCompanyRoutes;