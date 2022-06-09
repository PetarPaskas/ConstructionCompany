import React,{Component} from 'react';

class ConstructionSiteTab extends Component{

    handleConstructionSiteEdit=()=>{
        if(this.props.data){
            let {data} = this.props;
            this.props.history.push(`/Dashboard/Gradilista/Edit/${data.constructionSiteId}`);
        }
    }

    handleConstructionSiteViewAll(id){
        console.log("Viewing construction site with an id of "+id);
        this.props.history.push("/Dashboard/Gradilista/"+id);
    }

    renderContent(){
        if(this.props.data){
            let {data} = this.props;
            return (
            <div style={{position:"relative"}}>
                <div onClick={()=>{this.handleConstructionSiteViewAll(data.constructionSiteId)}}className="construction-site__item tab-btn construction-site-tab tab-btn--with-content">
                    <h3 className="construction-site-tab__title">{data.displayName}</h3>
                    <ul className="construction-site-tab__list">
                        <li className="construction-site-tab__item"><span>{data.address}</span></li>
                        <li className="construction-site-tab__item"><span>{data.city.cityName}</span></li>
                        <li className="construction-site-tab__item"><span>{data.client.name !== "" ? data.client.name : "Nema klijenta"}</span></li>
                    </ul>
                </div>
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