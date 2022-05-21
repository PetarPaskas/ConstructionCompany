import React, {Component} from 'react'
import FormInput from "./FormInput";

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
        if(!error){
            //if validation was a success
            if(!this.state.data[elementName]){
                console.error("Please provide a state data object for storing values.");
                return;
            }
            const {data:newData} = this.state;
            newData[elementName] = newValue;

            this.setState({data:newData});
        }else{
            //If validation didn't pass
            if(!this.state.errors){
                console.error("Please provide a state error object for storing errors.");
                return;
            }

            let {errors:newErrors} = this.state;

            if(error.length > 0){
                newErrors[elementName] = error;
            }else{
                delete newErrors[elementName];
            }

            this.setState({errors:newErrors});
        }
    }

    validate=(elementName, newValue)=>{
        let result = this.schema[elementName](newValue)
        if(!result || result.length === 0)
        {
            return false;
        }
        return result;
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
            errorMessage={errorMessage}
            onChange={this.handleChange}
        />);
    }

}

export default Form;