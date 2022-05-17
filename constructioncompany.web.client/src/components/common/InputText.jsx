import { Component } from "react";

class InputText extends Component{
    /*
        props = {
            id,
            name,
            title
            customAction
        }
    */

    customAction=(e)=>{
        if(this.props.customAction){
            this.props.customAction(e)
        }
    }

    renderInputField(){
        let elementId = this.props.id ?? `InputText_${Math.ceil(Math.random()*1000)}`;
        return (    
        <div className="input-text">
        <label className="input-text__label" htmlFor={elementId}>{this.props.title ?? ""}</label>
        <input className="input-text__field" onChange={this.customAction} type="text" id={elementId} name={this.props.name ?? elementId}/>
    </div>);

    }

    render(){
        return this.renderInputField();
    }
}

export default InputText;