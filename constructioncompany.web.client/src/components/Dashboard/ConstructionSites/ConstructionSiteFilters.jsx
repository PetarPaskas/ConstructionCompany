import { Component } from "react";
import InputText from "../../common/InputText";
    /*
        props = {
            id,
            name,
            title
            customAction
        }
    */

class ConstructionSiteFilters extends Component{
    renderFilter(){
        if(this.props.filter){
            let item = {...this.props.filter};
            switch (item.type){
                   case "text":
                       return(<InputText {...item} customAction={this.props.onFilter}/>);

                    case "dropdown":
                    return null;

                    default:
                        return null;
                };
        }
    }
    render(){
        return this.renderFilter();
    }
}

export default ConstructionSiteFilters;