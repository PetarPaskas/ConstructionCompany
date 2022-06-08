import {Component} from "react";

class FormDate extends Component{

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
            this.props.customAction(e);
        }
    }

    render(){
        const dateId = this.props.id ?? `Date__${Math.random()*1000}`;
        const labelText = this.props.labelPlaceholder ?? "Unesi datum";

        return (
        <div className={`form-input form-input__date-wrapper ${this.props.containerClassNameAppender ?? ""}`}>
            <label className="form-input__date-label" htmlFor={dateId}>{labelText}</label>
            <input 
                type="date" 
                id={dateId} 
                name={this.props.name}
                className="form-input__date-element"
                onChange={this.customAction}
                value={this.props.value}
            />
            <small 
                className="form-input__error form-input__date-error"
            >
            {this.props.errorMessage ?? ""}
        </small>
        </div>);
    }
}

function FormInput({onChange, containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type}){
    const idGen = `${Math.ceil(Math.random()*1000)}-${name}`;
    return(
    <div className={`form-input ${containerClassNameAppender ?? ""}`}>
        <input 
            type={`${type ?? "text"}`} 
            placeholder={labelPlaceholder} 
            onChange={onChange}
            className="form-input__input" 
            name={name} 
            id={idGen}
            value={value ?? ""}
            />
        <label 
            className="form-input__label" 
            htmlFor={idGen}>
                {labelPlaceholder}
        </label>
        <small 
            className="form-input__error"
            >
            {errorMessage ?? ""}
        </small>
    </div>);
}

export default FormDate;