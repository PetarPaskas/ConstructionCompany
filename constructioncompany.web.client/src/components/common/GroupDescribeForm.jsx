import Form from "./Form";
import {getDisplayFieldForItem} from "../common/utils";

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
        itemId:this.props.valueField,
        data:{
            options:this.props.options,
            },
        formData:{0:{hoursDone:"", constructionSiteId:""}},
        dataInstances:1,
        errors:{}
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
            data.push(<div className="row" key={`Data-instance__${i}`}>
                {this.renderInputField("col", `${i}-hoursDone`, stateData[i]["hoursDone"], "Unesi odradjene sate", "", "number")}
                {this.renderDropdown(optionsForDataInstance, "gradiliste*", dropdownOptions, "options")}
                <div className="col-1" style={{alignSelf:"center"}}>
                {!isFirstKey &&<button className="btn btn-danger" onClick={()=>this.removeDataInstance(i)}>&#215;</button>}
                </div>
            </div>)
        }

        return data;
    }

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

    renderHeader(){
        const item = this.props.items[0]
        const name = getDisplayFieldForItem.call(item,this.props.displayField);
        return <h2>{name}</h2>
    }

    renderDefaultBody(){
        return (<div className="container">
            {this.renderHeader()}
            {this.renderDataInstances()}
            <div className="row" style={{justifyContent:"center",marginTop:"1rem"}}>
                <button className="btn btn-success" onClick={this.appendDataInstance}>Dodaj</button>
            </div>
        </div>)
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

    submitNewOptionsSelectionWithDataInstance=(paramData, selection, keepOriginal, stringIdentifier)=>{
        const {formData:newData} = this.state;
        let canProceed = true;
        //If dropdown options is already selected by another dataInstance; shouldn't be able to write
        for(let prop in newData){
            console.log(prop);
            if(parseInt(prop) !== parseInt(paramData.dataInstance)){
                if(newData[prop].constructionSiteId !== "" && newData[prop].constructionSiteId === parseInt(paramData.id))
                canProceed = false;
            }
        }
        if(canProceed){
            let item = newData[parseInt(paramData.dataInstance)];
            if(item.constructionSiteId === parseInt(paramData.id)){
                item.constructionSiteId = "";
            }
            else{
                item.constructionSiteId = parseInt(paramData.id);
            }
            this.setState({formData:newData});
        }
        else{
            console.error("Option already selected by another data instance");
        }

    }

    render(){
        return (<div className="group-describe-form">
                {this.renderDefaultBody()}
        </div>)
    }
}

export default GroupDescribeForm;
