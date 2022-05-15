import logo from './logo.svg';
import React, {Component} from 'react';
import ConstructionCompanyRoutes from './components/Routing/ConstructionCompanyRoutes'
import Navbar from './components/common/Navbar';

class App extends Component{
  render(){
    return (
      <React.Fragment>
        <Navbar/>
        <ConstructionCompanyRoutes />
      </React.Fragment>
    );

  }
}

export default App;