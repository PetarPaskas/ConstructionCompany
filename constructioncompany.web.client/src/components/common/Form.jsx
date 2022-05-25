import React, {Component} from 'react'
import FormInput from "./FormInput";
import Dropdown from "./Dropdown";
import FormDate from "./FormDate";

class Form extends Component{

    // state = {
    //     data:{},
    //     errors:{}
    // }
    //
    //
    handleChange=({target})=>{
       const newValue = target.value;
        const elementName = target.name;
        if(!this.schema){
            console.error("Please provide a schema object for validation.");
            return;
        }

        let error = this.validate(elementName, newValue);
            //If validation didn't pass
        if(this.state.errors === undefined){
            console.error("Please provide a state error object for storing errors.");
            return;
        }
        console.log("Error =>",error);
        let {errors:newErrors} = this.state;
        if(!error){
            delete newErrors[elementName]
        }
        else{
            newErrors[elementName] = error;
        }

        //setting data
        const {data:newData} = this.state;
        newData[elementName] = newValue;

        this.setState({data:newData, errors:newErrors});
    }

    validate=(elementName, newValue)=>{
        return this.schema[elementName](newValue);
    }

    renderInputField(containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type = "text"){
        // utils.formatInputLabel('name') => `Unesi ${translations[`form_${name}`]}`
        return (
        <FormInput 
            containerClassNameAppender={containerClassNameAppender}
            type={type}
            name={name}
            value={value}
            labelPlaceholder={labelPlaceholder}
            errorMessage={this.state.errors[name] ?? ""}
            onChange={this.handleChange}
        />);
    }

    //IF USING DROPDOWNS, CREATE A CUSTOM onDropdownClick METHOD WHICH HANDLES THE CLICK
    handleDropdownClick=(e)=>{

        const data = {
            id:e.target.dataset.optionId,
            value: e.target.dataset.optionValue
        };

        this.onDropdownClick(e, data);
    }

    renderDropdown(options, name, stylingOptions){
        const {wrapperStyle, wrapperClassName} = stylingOptions;
        
        return(
        <div className={wrapperClassName ?? ""} style={wrapperStyle ?? {}}>
            <Dropdown
            options={options}
            name={name}
            handleDropdownClick={this.handleDropdownClick}
            />
        </div>);
    }

    renderDate(containerClassNameAppender, name, value, labelPlaceholder, errorMessage){
        return <FormDate
        containerClassNameAppender={containerClassNameAppender}
        name={name}
        value={value}
        labelPlaceholder={labelPlaceholder}
        errorMessage={errorMessage}
        customAction={this.handleChange}
        />;
    }

}

export default Form;