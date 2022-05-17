import React,{Component} from 'react';

class ConstructionSiteTab extends Component{

    handleConstructionSiteEdit=()=>{
        if(this.props.data){
            let {data} = this.props;
            console.log(`Editing ${data.ConstructionSiteId}`);
        }
    }

    renderContent(){

        if(this.props.data){
            let {data} = this.props;
           
            return (
            <div className="construction-site__item tab-btn construction-site-tab tab-btn--with-content">
                <h3 className="construction-site-tab__title">{data.Name}</h3>
                <ul className="construction-site-tab__list">
                    <li className="construction-site-tab__item"><span>{data.Address}</span></li>
                    <li className="construction-site-tab__item"><span>{data.CityName}</span></li>
                    <li className="construction-site-tab__item"><span>{data.Client.Name}</span></li>
                </ul>
                <button 
                className="construction-site-tab__edit-btn"
                onClick={this.handleConstructionSiteEdit}
                >
                    <img src="/img/edit-wrench.png" alt="Edit"/>
                </button>
            </div>);
        }
    }

    render(){
        return(this.renderContent());
    }
}

export default ConstructionSiteTab;