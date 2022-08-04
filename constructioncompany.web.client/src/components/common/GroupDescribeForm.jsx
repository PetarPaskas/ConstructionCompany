import Form from "./Form";
import {dateToString, getDisplayFieldForItem, generateFinalDataItemForGroupDescribeForm, validateGroupDescribeFormData, equalDates} from "../common/utils";
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

const describeFormColorThemes = {
    colorPrimary:'primary',
    colorSecondary:'secondary'
};

class GroupDescribeForm extends Form
{
    componentDidMount(){
        this.resolveDefaultSelection();
        this.resolveUiState();
    }

    //errors:{
    //dateError -> Errors related to dates
    //itemError -> Errors related to users
    //}
    state={
        data:{
            options:this.props.options || [],
            },
        errors:{

        },
        date:{
            selectedDays:this.props.selectedDays || [],
            currentDay:""
        },
        item:{
            currentItemId:this.props.valueField,
            items:this.props.items || [],
            currentItemIndex:0
        },
        ui:{
            shouldRenderLeftNav:false,
            shouldRenderRightNav:false,
            colorTheme:describeFormColorThemes.colorPrimary 
        },
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

    resolveUiState=()=>{
        let {shouldRenderLeftNav, shouldRenderRightNav} = this.state.ui;
        if(this.state.date.selectedDays.length > 1 || this.state.item.items.length > 1){
            shouldRenderRightNav = true;
        }

        this.setState({ui:{
            ...this.state.ui,
            shouldRenderLeftNav,
            shouldRenderRightNav
        }});
    }

    getItem = (status)=>{
        let {currentDay,selectedDays} = this.state.date;
        let {shouldRenderLeftNav, shouldRenderRightNav, colorTheme} = this.state.ui;
        const finalData = this.state.finalData.map(el=>({...el,formData:{...el.formData}}));
        let {currentItemId, currentItemIndex,items} = this.state.item;
        let existingItem = null;
        let shouldUpdate = true;
        let dateIndex = selectedDays.findIndex(day=>equalDates(day,currentDay));

        shouldRenderLeftNav = true;
        shouldRenderRightNav = true;

        if(status === "next"){
            setData(this);
            currentItemIndex += 1;
            if(currentItemIndex >= 0){
                if(currentItemIndex < items.length){
                    currentItemId = items[currentItemIndex].userId;
                }
                else{
                    if((dateIndex+1) < selectedDays.length){
                        currentDay = selectedDays[dateIndex+1];
                        dateIndex += 1;
                        currentItemIndex = 0;
                        currentItemId = items[currentItemIndex].userId;
                    }else{
                        currentItemIndex = currentItemIndex - 1;
                        shouldUpdate = false;
                        console.log("You are at the end of the line, no more users and dates");
                    }
                }
            }
        }

        if(status === "previous"){
            console.log("Previous");
            setData(this);
            currentItemIndex = currentItemIndex - 1;
            if(currentItemIndex < 0){
                currentItemIndex = items.length-1;
                dateIndex = dateIndex - 1;

                if(dateIndex < 0){
                    dateIndex = 0;
                    shouldUpdate = false;
                }else{
                    currentDay = selectedDays[dateIndex];
                }
            }
            currentItemId = items[currentItemIndex].userId;
        }

        if(currentItemIndex === 0 && dateIndex === 0){
            shouldRenderLeftNav = false;
        }
        if(currentItemIndex === (items.length-1) && dateIndex === (selectedDays.length-1))
        {
            shouldRenderRightNav = false;
        }

        if(colorTheme === describeFormColorThemes.colorPrimary)
            colorTheme = describeFormColorThemes.colorSecondary;
        else
            colorTheme = describeFormColorThemes.colorPrimary;
        
        if(shouldUpdate){
            this.setState({
                date:{
                    currentDay,
                    selectedDays
                },
                item:{
                    currentItemIndex,
                    currentItemId,
                    items:items
                },
                ui:{
                    shouldRenderLeftNav,
                    shouldRenderRightNav,
                    colorTheme
                },
                finalData
            });
        }else{
            this.setState({ 
                ui:{
                    shouldRenderLeftNav,
                    shouldRenderRightNav, 
                    colorTheme
                },
                finalData
            });
        }

        function setData(that){
            const isValid = validateGroupDescribeFormData(null);

            if(existingItem = finalData.find(d=>d.userId === currentItemId && equalDates(currentDay, d.date))){
                existingItem = generateFinalDataItemForGroupDescribeForm(that.state);
            }else{
            //if current user doesn't exist in final data
            //Generate final data item 
            //generateFinaldataItemForGroupDescribeForm() :{userId, date, formData}
            //Takav vid return data da bi se mogao lakse ucitati pri previous; unique(userId, date)
            const finalItem = generateFinalDataItemForGroupDescribeForm(that.state);
            //If worker doesn't exist in finalData; append
            finalData.push(finalItem);
            }
        }
    }

    //This is what happens when you submit the data from GroupDescribeForm
    submit(){
        //Validate if all user data is filled

        //convert {userId, date, formData} object
        //to {date, data:[{userId, wages:[{constructionSiteId, hoursDone}]}]}
    }   

    renderHeader(){
        const {item} = this.state;
        const name = getDisplayFieldForItem.call(item.items[item.currentItemIndex],this.props.displayField);
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

    renderErrors(){
        const {itemError, dateError} = this.state.errors;
        let returnData = [];
        if(dateError){
            returnData.push(<span key="dateError" className="error-text error-text--m">
            {dateError}
            </span>);
        }
        if(itemError){
            returnData.push(
                <React.Fragment key="itemError">
                    <br/>
                    <span className="error-text error-text--m">
                    {itemError}
                </span>
                </React.Fragment>
            );
        }
        if(returnData.length > 0){
            return (<div className="container">
                {returnData}
            </div>)
        } 
        return false;
    }

    renderNavigation(){
       const {shouldRenderLeftNav, shouldRenderRightNav} = this.state.ui;
       const {currentDay} = this.state.date;
       let dateInfo = <div className="btn--top date-info"></div>;

       if(currentDay !== ""){
        let currDayString = `${currentDay.getDate()} ${currentDay.getMonth()+1} ${currentDay.getFullYear()}`;
        currDayString = dateToString(currentDay);
        dateInfo = <div 
        className={`btn--top date-info date-info--${this.state.ui.colorTheme}`}>
            {currDayString}
            </div>;
       }

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
            {shouldRenderLeftNav && leftNav}
            {shouldRenderRightNav && rightNav}
            </React.Fragment>;
    }

    renderDefaultBody(){
        //also load data instances from finalData if there is any data for the current instance
        
        //set the dataInstances = data[data.length-1]+1
        //data = Object.keys(finalData.formData);
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
            {this.renderErrors() ||
            <React.Fragment>
             {this.renderNavigation()} 
             {this.renderDefaultBody()}
            </React.Fragment>}
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

        this.setState({formData:newData});
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

    resolveDefaultSelection(){
        let {currentDay,selectedDays} = this.state.date;
        let {items,currentItemId,currentItemIndex} = this.state.item;
        let {errors} = this.state;
        const dateError = "Izaberi datume za koje bi da popunjavaš informacije";
        const itemError = "Izaberi radnike za koje bi da popunjavaš informacije";
        if(selectedDays.length > 0){
            if(items.length > 0)
            {
                //setting default current day
                currentDay = selectedDays[0];
                //setting default user for populating
                currentItemIndex = 0;
                currentItemId = items[currentItemIndex].userId;

                this.setState({
                    date:{...this.state.date,currentDay},
                    item:{...this.state.item,currentItemId,currentItemIndex},
                    errors:{}
                });
            }else{
                this.setState({
                    errors:{
                     itemError
                    }
                });
            }
        }else{
            if(items.length > 0){
                this.setState({
                    errors:{
                     dateError
                    }
                });
            }
            else{
                this.setState({
                    errors:{
                     dateError,
                     itemError
                    }
                });
            }
        }
    }

}

export default GroupDescribeForm;
