import React, {Component} from 'react'
import FormInput from "./FormInput";
import Dropdown from "./Dropdown";
import FormDate from "./FormDate";
import { getSelectedOption} from "./utils";

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
        console.log("Form.jsx:handleChange Error =>",error);
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

    renderInputField(containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type = "text", disabled = false){
        return (
        <FormInput 
            containerClassNameAppender={containerClassNameAppender}
            type={type}
            name={name}
            value={value}
            labelPlaceholder={labelPlaceholder}
            errorMessage={this.state.errors[name] ?? ""}
            onChange={this.handleChange}
            isDisabled={disabled}
        />);
    }

    //IF USING DROPDOWNS, CREATE A CUSTOM onDropdownClick METHOD WHICH HANDLES THE CLICK
    handleDropdownClick=(data, selection)=>{

        this.onDropdownClick(data, selection);
    }

    updateSelection=(selection)=>{
        const {data} = this.state;
        let newId = 0;
        switch(selection){
            case "currencyOptions":
                  const valutaOption = getSelectedOption(data[selection]);
                  if(valutaOption){
                    if(data.currencyId !== valutaOption.id){
                        newId = valutaOption.id;
                    }
                  }
                  data.currencyId = newId;
                break;
            case "professionOptions":
                 const profesijeOption = getSelectedOption(data[selection]);
                 if(profesijeOption){
                    if(profesijeOption.id !== data.professionId){
                        newId = profesijeOption.id;
                    }
                 }
                 data.professionId = newId;
                break;
            case "constructionSiteOptions":
            case "gradilisteOptions":
                newId = [];
                const constructionSites = data[selection].filter(el=>el.isSelected);
                if(constructionSites.length > 0){
                    newId = constructionSites;
                }
                data.constructionSitesId = newId;
                break;
            case "citiesOptions":
                const citiesOption = getSelectedOption(data[selection]);
                 if(citiesOption){
                    if(citiesOption.id !== data.cityId){
                        newId = citiesOption.id;
                        console.log("New cities option => ",citiesOption);
                    }
                 }
                 data.cityId = newId;
                break;
            default:
                console.error("Form.jsx line 111 => Implement updateSelection case option");
                break;
        }
        this.setState({data});
    }

    submitNewOptionsSelection=(paramData,selection, keepOriginal = false)=>{
        const {data:newData} = this.state;
        const options = newData[selection].map(el=>{
            if(parseInt(paramData.id) == el.id && paramData.value == el.value){
                return ({...el, isSelected:!el.isSelected});
            }
            else{
                return keepOriginal ? ({...el}) : ({...el, isSelected:false});
            }
        });
        
        newData[selection] = options;
        this.setState({data:newData});
    }

    handleResetSelection=(selection)=>{
       let resetData = [...this.state.data[selection]].map(el=>({...el,isSelected:false}));
    
       const {data} = this.state;
       data[selection]= resetData;

       this.setState({data});
    
    }

    renderDropdown(options, name, stylingOptions, selection, multiSelect = false){
        const {wrapperStyle, wrapperClassName} = stylingOptions;
        
        return(
        <div className={wrapperClassName ?? ""} style={wrapperStyle ?? {}}>
            <Dropdown
            options={options}
            name={name}
            selection={selection}
            multiSelect={multiSelect}
            handleDropdownClick={this.handleDropdownClick}
            onResetSelection={this.handleResetSelection}
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

    renderTextArea(containerClassName, label, name, value, id, errorMessage){
        return<div className={"form-input " + containerClassName}>
            <label className="form-input__label form-input__label--visible" htmlFor={id}>{label}</label>
            <textarea className="form-input__text-area" id={id} name={name} onChange={this.handleChange} placeholder={`Unesi tekst ovde...`} value={value ?? ""}></textarea>
            <small className="form-input__error">
            {errorMessage ?? ""}
            </small>
            </div>
    }

}

export default Form;