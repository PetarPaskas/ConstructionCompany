import { Component } from "react";

class ConstructionSiteForm extends Component
{
    constructor(props){
        super(props);
        console.log(props);
        if(props.match.params.id){
            console.log(props.match.params.id);
        }
    }
    render(){
        return <div>AISHFHOIASHFOIAJSOFI</div>;
    }
}
export default ConstructionSiteForm;