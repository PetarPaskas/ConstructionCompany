import React, {Component} from 'react';
import {Switch, Route} from 'react-router-dom';
import Form from '../common/Form';

class ConstructionCompanyRoutes extends Component{
    render(){
        return(
            <Switch>
                <Route path="/Dashboard" component={Form}/>
                <Route path="/" exact component={Form}/>
            </Switch>
        );
    }
}

export default ConstructionCompanyRoutes;