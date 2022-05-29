import React from 'react';
import Form from '../../common/Form';
import Table from "../../common/Table/Table";
import { createFakeDataForTableConstructionSite } from "../../common/utils";
import ConstructionSiteUsersTableCustomBody from "./ConstructionSiteUsersTableCustomBody";
import ConstructionSiteUsersEditTableCustomBody from "./ConstructionSiteUsersEditTableCustomBody";

//renderInputField(containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type = "text")
class ConstructionSiteViewForm extends Form
{
    constructor(props){
        super(props);
        if(props.match.params.id){
            console.log("ConstructionSiteViewForm id =>", props.match.params.id);
        }
    }

    state={
        currentId:this.props.match.params.id,
        shouldOpenForm:false,
        isEditView:(this.props.match.params.id === 'New' ? true : false),
        usersData:{
            header:[],
            body:[]
        },
        data:{
            name:"testData",
            address:"testData",
            cityName:"testData",
            dateStarted:"testData",
            expectedEndDate:"testData",
            cityId:0,
            citiesOptions:[
                {id:"1",name:'Beograd',value:'b-g', isSelected:false},
                {id:"2",name:"Slankamen",value:'skmn', isSelected:false}
            ]
        },
        errors:{

        },
        
    }

    renderSideOptions(){
        const currentId = this.props.match.params.id;
        const {isEditView} = this.state;
        return (
        <div className="construction-site__side-options">
            <button onClick={()=>{this.openAddEditForm(currentId)}}className="btn btn-warning">{isEditView ? "Odustani" : "Menjaj"}</button>
            <button onClick={()=>{this.handleDelete(currentId)}} className="btn btn-danger">Obriši</button>
            <button onClick={()=>{this.handleOpenNotes(currentId)}} className="btn btn-primary">Beleške</button>
        </div>);
    }

    openAddEditForm=(id)=>{
        const {isEditView} = this.state;
        this.setState({isEditView:!isEditView});
    }

    closeAddEditForm=(id)=>{
        console.log("Closing form for "+id);
        this.setState({shouldOpenForm:false});
    }

    handleDelete=(id)=>{
        console.log("Deleting gradiliste "+ id);
    }

    handleOpenNotes=(id)=>{
        console.log("Opening notes for "+id);
    }

    componentDidMount(){
        const data = createFakeDataForTableConstructionSite();
        this.setState({usersData:data});
    }

    renderInfoForm=()=>{
        const {data} = this.state;
        return ( <React.Fragment>
            <div className="row">
                <h2 className="col">{data.name}</h2>
            </div>
            <div className="row">
                {this.renderInputField("form-group col", "address", data.address, "Adresa", "", "text", !data.isEditView)}
                {this.renderInputField("form-group col", "cityName", data.cityName, "Grad", "", "text", !data.isEditView)}
            </div>
            <div className="row">
                {this.renderInputField("form-group col", "dateStarted", data.dateStarted, "Datum začetka", "", "text", !data.isEditView)}
                {this.renderInputField("form-group col", "expectedEndDate", data.expectedEndDate, "Datum roka", "", "text", !data.isEditView)}
            </div>
            </React.Fragment>);
    }

    renderInfoTable=()=>{
        return (            
            <Table
            data={this.state.usersData}
            withRowIndex={false}
            customBodyComponent={ConstructionSiteUsersTableCustomBody}
            />
        );
    }

    renderEditForm=()=>{
        const {data} = this.state;
        const {errors} = this.state;
        const styling = {  
            wrapperStyle: {
                marginTop:"1.7rem",
            },
            wrapperClassNam:"form-group col"
        };
        return (<React.Fragment>
                <div className="row">
                {this.renderInputField("form-group col", "name", data.name, "Naziv", errors.name , "text", data.isEditView)}
                </div>
                <div className="row">
                {this.renderInputField("form-group col", "address", data.address, "Adresa", "", "text", data.isEditView)}
                {this.renderDropdown(this.state.data.citiesOptions,"grad",styling,"citiesOptions")}
            </div>
            <div className="row">
            {/*renderInputField(containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type = "text", disabled) 
                renderDate(containerClassNameAppender, name, value, labelPlaceholder, errorMessage)
                renderDropdown(options, name, stylingOptions, selection, multiSelect = false){
                */}
                {this.renderDate("form-group col", "dateStarted", data.dateStarted, "Datum začetka", errors.dateStarted)}
                {this.renderDate("form-group col", "expectedEndDate", data.expectedEndDate, "Datum roka", errors.expectedEndDate)}
            </div>
        </React.Fragment>);
    }

    renderEditTable=()=>{
         const {header} = this.state.usersData;
        let newHeader = header.map(element=>({...element}));
        newHeader.push({id:"empty"});

        const data = {
            header:newHeader,
            body:this.state.usersData.body
        };

        return (            
                <Table
                data={data}
                withRowIndex={false}
                customBodyComponent={ConstructionSiteUsersEditTableCustomBody}
                customBodyAction={this.chooseWorkerOnClick}
                />
            );
    }

    chooseWorkerOnClick=(id)=>{
        console.log("Selected worker => "+id);
    }

    onDropdownClick=(data, selection)=>{
        if(selection === "citiesOptions"){
            this.submitNewOptionsSelection(data,selection);
        }

        this.updateSelection(selection);
    }

    render(){
        return (
        <div className="construction-site construction-site--view-form">
            <div className="construction-site__info container">
                {this.state.isEditView ? this.renderEditForm() : this.renderInfoForm()}
            </div>
            {this.state.currentId !== "New" && this.renderSideOptions()}
            <div className="construction-site__table users-table">
                {this.state.isEditView ? this.renderEditTable() : this.renderInfoTable()}
            </div>
        </div>);
    }
}
export default ConstructionSiteViewForm;