import Form from "./Form";
import {dateToString, formatSubmitItemsForWagesEndpoint, getDisplayFieldForItem, generateFinalDataItemForGroupDescribeForm, validateGroupDescribeFormData, equalDates} from "../common/utils";
import React from "react";
import wagesClient from "../http/wagesClient";

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
        let existingItem, item = null;
        let shouldUpdate = true;
        let dateIndex = selectedDays.findIndex(day=>equalDates(day,currentDay));

        let formData = this.setDefault();
        let dataInstances = 1;
        shouldRenderLeftNav = true;
        shouldRenderRightNav = true;

        if(status === "next"){
            this.setData(existingItem, finalData);
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
            this.setData(existingItem, finalData);
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

        if(item = finalData.find(el=>el.userId === currentItemId && equalDates(el.date,currentDay)))
        {
            const data = Object.keys(item.formData);
            dataInstances = data[data.length-1]+1;
            formData = item.formData;
        }
        
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
                dataInstances,
                formData,
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
    }

    setData=(existingItem, finalData)=>{
        //item.currentItemId -> userId
        //date.currentDay -> current day you're filling the data for
        const {currentDay} = this.state.date;
        const {currentItemId} = this.state.item;

        if(existingItem = finalData.find(d=>d.userId === currentItemId && equalDates(currentDay, d.date))){
            existingItem = generateFinalDataItemForGroupDescribeForm(this.state);
        }else{
        //if current user doesn't exist in final data
        //Generate final data item 
        //generateFinaldataItemForGroupDescribeForm() :{userId, date, formData}
        //Takav vid return data da bi se mogao lakse ucitati pri previous; unique(userId, date)
        const finalItem = generateFinalDataItemForGroupDescribeForm(this.state);
        //If worker doesn't exist in finalData; append
        finalData.push(finalItem);
        }
    }

    //This is what happens when you submit the data from GroupDescribeForm
    submit=async ()=>{
        //Append current formData into finalItem; make it up to date
        const {finalData} = this.state;
        let invalidUserInput = null //[{userId, date}]
        let submitItems = [];
        let existingItem = null

        this.setData(existingItem, finalData);

        if(finalData.length>0)
        {
            for(let item of finalData){
                //Validate if all user data is filled correctly
               const [isInvalid, submitItem] = validateGroupDescribeFormData(item);
               if(isInvalid){
                invalidUserInput = submitItem;
                submitItems = [];
                alert("Nije dobro popunjen korisnik, prebacivanje na datog korisnika...");
                console.log("Submit item => ",submitItem);
                break;
               }
               else{
                submitItems.push(submitItem);
               }
            }

        }else
        {
            //No user data filled; throw an error
            alert("Nema popunjenih podataka o korisniku, vise info u konzoli");
            console.log("Form Data => ", this.state.formData);
            console.log("Final Data => ", this.state.finalData);
            return;
        }

        if(invalidUserInput !== null){
            //(invalidUserInput) => {userId, date}
            //set state to invalid user input & show a message
           setToInvalidUser.call(this, invalidUserInput);
        }
        else
        {
            const {selectedDays} = this.state.date;
            //This means everything's fine; submit
            //alert("Submitting");
            const finalSubmitData = formatSubmitItemsForWagesEndpoint(selectedDays, submitItems);
            console.log("Final Data for submittion => ");
            console.log(finalSubmitData);

            this.setState({
                finalData
            });
            try{
                const response = await wagesClient.submitWages(finalSubmitData);
                console.log("Response =>", response);
                alert("Zahtev uspesno obrađen!");
                window.location = "/Export";
            }
            catch(ex){
                console.log("Response => ", ex.response);
                console.log("Response data =>", ex.response.data);
                const {data} = ex.response;
                let errorMessage = "Unos neuspešan."
                if(typeof(data) != 'string' && ex.response.status == 400){
                    errorMessage = `${errorMessage}\nRazlog: ${data.message}`;

                    const {userId, constructionSiteId, date} = data;
                    if(userId != undefined && 
                        constructionSiteId != undefined && 
                        date != undefined){
                        //find construction site
                        const constrSite = this.state.data.options.find(cs=>
                            cs.id === constructionSiteId);
                        if(constrSite != undefined)
                        {
                            errorMessage = `${errorMessage}\nGradilište: ${constrSite.value}`;
                        }
                        const dateTime = new Date(date);
                        setToInvalidUser.call(this,{
                            userId,
                            date:dateTime
                        });
                        alert(errorMessage);

                    }else{
                        alert(errorMessage);
                    }
                }
            }
        }

        function setToInvalidUser(invalidUserInput){
            const userIndex = finalData.findIndex(el=>el.userId === invalidUserInput.userId && equalDates(el.date,invalidUserInput.date));
            const userForSelection = finalData[userIndex];
            const formDataKeys = Object.keys(userForSelection.formData);
            const dataInstances = formDataKeys[formDataKeys.length-1]+1;
            let shouldRenderLeftNav = true;
            let shouldRenderRightNav = true;
            let colorTheme = describeFormColorThemes.colorPrimary;
            
            if(userIndex !== -1){
                if(userIndex === 0) shouldRenderLeftNav = false;
                if(userIndex >= (finalData.length-1)) shouldRenderRightNav = false;
            }
            if(this.state.ui.colorTheme === describeFormColorThemes.colorPrimary)
            colorTheme = describeFormColorThemes.colorSecondary;
            //alert("You are seeing the user with an invalid input");
            this.setState((prevState)=>({
                date:{
                    currentDay:userForSelection.date,
                    selectedDays:prevState.date.selectedDays
                },
                item:{
                    currentItemIndex:userIndex,
                    currentItemId:userForSelection.userId,
                    items:prevState.item.items
                },
                ui:{
                    shouldRenderLeftNav,
                    shouldRenderRightNav,
                    colorTheme:colorTheme
                },
                dataInstances,
                formData:userForSelection.formData,
                finalData
            }));
        }
    }   

    

    renderHeader(){
        const {item} = this.state;
        const name = getDisplayFieldForItem.call(item.items.find(u=>u.userId === item.currentItemId),this.props.displayField);
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
        return (<div className="container">
            {this.renderHeader()}
            {this.renderDataInstances()}
            <div className="row" style={{justifyContent:"center",marginTop:"1rem"}}>
                <button className="btn btn-success" onClick={this.appendDataInstance}>+</button>
            </div>
        </div>)
    }

    renderSubmitButton=()=>{
        if(Object.keys(this.state.errors).length > 0)
        return;

        const { shouldRenderRightNav } = this.state.ui;
        const submitButton = <div 
        className="btn btn-success bottom-center" 
        onClick={this.submit}>
            Prihvati
        </div>;

        return(<React.Fragment>
            {!shouldRenderRightNav && submitButton}
        </React.Fragment>);

    }
    
    render(){
        return (<div className="group-describe-form">
            {this.renderErrors() ||
            <React.Fragment>
             {this.renderNavigation()} 
             {this.renderDefaultBody()}
            </React.Fragment>}
            {this.renderSubmitButton()}
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