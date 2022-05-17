import React, {Component} from 'react';

class GridContainer extends Component{
    renderClassName(){
        return "grid-container";
    }

    renderContent(){
        if(this.props.children)
        {
            return this.props.children;
        }
    }

    render(){
        return(
        <div className={this.renderClassName()}>
            {this.renderContent()}
        </div>);
    }
}

export default GridContainer;