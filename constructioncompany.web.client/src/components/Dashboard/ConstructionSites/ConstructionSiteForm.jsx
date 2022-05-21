import { Component } from "react";
import Form from '../../common/Form';

class ConstructionSiteForm extends Form
{
    constructor(props){
        super(props);
        console.log(props);
        if(props.match.params.id){
            console.log(props.match.params.id);
        }
    }
    render(){
        return (
        <div className="construction-site">
            {this.renderInputField("form-group", "proba", "", "Unesi penis", "")}
        </div>);
    }
}
export default ConstructionSiteForm;