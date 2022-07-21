import Form from "./Form";
import {modifyExistingForGroupDescribeForm, getDisplayFieldForItem, generateFinalDataItemForGroupDescribeForm, validateGroupDescribeFormData} from "../common/utils";
import React from "react";

/*
props:{
    items => Item group
    valueField => Id/Code etc...
    displayField => Name/DisplayName etc...
    options => 
}

//if(Array.isArray(displayField) === 'array') => ['name', 'surname', 'nickname']

state:{
    data => Za sada samo za radnike;
     moze custom body na osnovu describe props objekta {name: "Sati radio", type: "number"} i switch/case:number renderNumberField(...)
}
*/
class GroupDescribeForm extends Form
{

    state={
        data:{
            options:this.props.options,
            selectedDays:this.props.selectedDays,
            currentItem:"",
            currentDay:""
            },
        errors:{},
        itemId:this.props.valueField,
        dataInstances:1,
        formData:this.setDefault(),
        finalData:[]
    }

    setDefault(){
        return {0:{hoursDone:"", constructionSiteId:""}};
    }

    //{hoursDone, constructionSiteId}

    appendDataInstance=(e)=>{
        const {formData:newData,dataInstances} = this.state;
        const newDataInstances = dataInstances + 1;
        newData[newDataInstances-1] = {hoursDone:"",constructionSiteId:""};
        this.setState({formData:newData,dataInstances:newDataInstances});
    }

    removeDataInstance=(i)=>{
        const {formData:newData} = this.state;
        delete newData[i];
        this.setState({formData:newData});
    }

    getItem = (status)=>{
        const {currentItem, currentDay} = this.state.data;
        const {finalData} = this.state;
        const {items, valueField} = this.props;

        if(status === "next"){
            //Check if the data is valid for generating
            const isValid = validateGroupDescribeFormData(null);
            //Generate final data item
            const finalItem = generateFinalDataItemForGroupDescribeForm(null);
            //If worker exists in finalData; modify
            modifyExistingForGroupDescribeForm.call(finalData,finalItem);
            //If worker doesn't exist in finalData; append
            finalData.push(finalItem);
            //Set next worker/day for populating info
            let newItem, newDay;
            //Reset formData
            //this.setState({});
        }

        if(status === "previous"){
            //Set previous worker/day for populating info

            //Find the previous day/worker

            //Load previous state data
        }
    }

    renderHeader(){
        const item = this.props.items[8];
        const name = getDisplayFieldForItem.call(item,this.props.displayField);
        return <h2 className="describe-form-header">{name}</h2>
    }

    renderDataInstances(){
        const dropdownOptions = {
            wrapperStyle: {
                alignSelf:"end",
                marginTop:"1.7rem"
            },
            wrapperClassName: "form-group col"
        };

        const {dataInstances} = this.state;
        const {formData:stateData} = this.state;
        const data = [];
        const stateDataKeys = Object.keys(stateData);

        for(let i in stateData){
            const optionsForDataInstance = this.state.data.options.map(el=>{
                if(el.id === stateData[i].constructionSiteId)
                    return {...el, isSelected:true, dataInstance: i};
                return {...el, dataInstance:i};
            });
            let isFirstKey = stateDataKeys[0] === i;
            data.push(
            <div className="row" key={`Data-instance__${i}`}>
                {this.renderInputField("col", `${i}-hoursDone`, stateData[i]["hoursDone"], "Unesi odradjene sate", "", "number")}
                {this.renderDropdown(optionsForDataInstance, "gradiliste*", dropdownOptions, "options")}
                <div className="col-1" style={{alignSelf:"center"}}>
                    {!isFirstKey && <button className="btn btn-danger" onClick={()=>this.removeDataInstance(i)}>&#215;</button>}
                </div>
            </div>);
        }

        return data;
    }

    renderNavigation(){
        const dateInfo = <div 
        className="btn--top date-info">
            17. 07. 2022.
            </div>;

        const leftNav = <div 
        className="btn--left choose-item-btn" 
        onClick={()=>{this.getItem("previous")}}>
            &lt;
        </div>;

        const rightNav = <div 
        className="btn--right choose-item-btn" 
        onClick={()=>{this.getItem("next")}}>
            &gt;
        </div>;
        
        return <React.Fragment>
            {dateInfo}
            {leftNav}
            {rightNav}
            </React.Fragment>;
    }

    renderDefaultBody(){
        return (<div className="container">
            {this.renderHeader()}
            {this.renderDataInstances()}
            <div className="row" style={{justifyContent:"center",marginTop:"1rem"}}>
                <button className="btn btn-success" onClick={this.appendDataInstance}>+</button>
            </div>
        </div>)
    }
    
    render(){
        return (<div className="group-describe-form">
            {this.renderNavigation()}
            {this.renderDefaultBody()}
        </div>)
    }



// -Override-

    handleChange=({target})=>{
        const [propertyName, identifier] = target.name.split("-");
        const {formData:newData} = this.state;

        if(!isNaN(parseInt(target.value))){
            newData[propertyName][identifier] = parseInt(target.value);
        }

        if(target.value === ""){
            newData[propertyName][identifier] = target.value;
        }

        this.setState({paramData:newData});

    }

    onDropdownClick(data,selection){
        switch(selection){
            case "options":
                this.submitNewOptionsSelectionWithDataInstance(data,selection);
                break;
            default:
                console.error("No onDropdownClick selection implementation");
                break;
        }
    }
}

export default GroupDescribeForm;
