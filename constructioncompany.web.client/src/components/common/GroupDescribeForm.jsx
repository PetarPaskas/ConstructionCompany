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
        data:{0:{hoursDone:""}},
        dataInstances:1,
        options:[],
        errors:{}
    }

    //{hoursDone, constructionSiteId}

    appendDataInstance=(e)=>{
        const {data:newData,dataInstances} = this.state;
        const newDataInstances = dataInstances + 1;
        newData[newDataInstances-1] = {hoursDone:""};
        this.setState({data:newData,dataInstances:newDataInstances});
    }

    removeDataInstance=(i)=>{
        const {data:newData,dataInstances} = this.state;
        delete newData[i];
        this.setState({data:newData});
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
        const {data:stateData} = this.state;
        const data = [];

        for(let i in stateData){
            let isFirstKey = Object.keys(stateData)[0] === i;
            data.push(<div className="row" key={`Data-instance__${i}`}>
                {this.renderInputField("col", "hoursDone", stateData[i]["hoursDone"], "Unesi odradjene sate", "", "number")}
                {this.renderDropdown(this.state.options, "gradiliste*", dropdownOptions, "options")}
                <div className="col-1" style={{alignSelf:"center"}}>
                {!isFirstKey &&<button className="btn btn-danger" onClick={()=>this.removeDataInstance(i)}>&#215;</button>}
                </div>
            </div>)
        }

        return data;
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
        console.log(data, "data");
        console.log(selection, "selection");
    }

    render(){
        return (<div className="group-describe-form">
                {this.renderDefaultBody()}
        </div>)
    }
}

export default GroupDescribeForm;
