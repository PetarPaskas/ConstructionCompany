import React from 'react';
import Form from '../../common/Form';
import Table from "../../common/Table/Table";
import constructionSiteClient from "../../http/constructionSitesClient";
import miscClient from "../../http/miscClient";
import usersClient from "../../http/usersClient";
import {asDateOnly, dateToString, headersForConstructionSiteUsersEditTableCustomBody, generateSchemaConstructionSite} from "../../common/utils";
import ConstructionSiteUsersTableCustomBody from "./ConstructionSiteUsersTableCustomBody";
import ConstructionSiteUsersEditTableCustomBody from "./ConstructionSiteUsersEditTableCustomBody";

//renderInputField(containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type = "text")
class ConstructionSiteAddEditViewForm extends Form
{

    decideView=()=>{
        return (this.props.match.path === "/Dashboard/Gradilista/Edit/:id" ? 
                true : 
                (this.props.match.params.id === 'New' ? true : false));
    }

    schema = generateSchemaConstructionSite();

    state={
        currentId:this.props.match.params.id,
        isEditView: this.decideView(),
        data:{
        // address: "Marka Oraskovica 22"
        // city: {cityId: 2, cityName: 'Novi Sad', municipalityName: 'Novi Sad'}
        // client: {clientId: 'ClientNumberOne', name: 'Test Client'}
        // constructionSiteId: 1
        // dateFinished: "2032-06-06T18:39:48.755"
        // dateStarted: "2022-06-06T18:39:48.755"
        // isFinished: true
            displayName:"",
            address:"",
            dateStarted:"",
            expectedEndDate:"",
            cityId:0,
            cityName:"",
            citiesOptions:[
                {id:"1",name:'Beograd',value:'b-g', isSelected:false},
                {id:"2",name:"Slankamen",value:'skmn', isSelected:false}
            ],
            workerList:[

            ],
            checkedUsersBuffer:[

            ]
        },
        errors:{
        },
    }

    handleSubmit=()=>{
        console.log("Submitting form");
    }

    renderSideOptions(){
        const currentId = this.props.match.params.id;
        const {isEditView} = this.state;
        if(this.state.currentId !== "New"){
            return (
                <div className="construction-site__side-options">
                    <button onClick={()=>{this.openAddEditForm(currentId)}}className="btn btn-warning">{isEditView ? "Odustani" : "Menjaj"}</button>
                    {!isEditView && <button onClick={()=>{this.handleDelete(currentId)}} className="btn btn-danger">Obriši</button>}
                    {isEditView && <button onClick={this.handleSubmit} className="btn btn-success">Sačuvaj</button>}
                    <button onClick={()=>{this.handleOpenNotes(currentId)}} className="btn btn-primary">Beleške</button>
                </div>);
        }else{
            return (
                <div className="construction-site__side-options">
                    <button onClick={this.handleSubmit} className="btn btn-success">Sačuvaj</button>
                </div>)
        }


    }

    openAddEditForm=(id)=>{
        console.log(this.state.data);
        if(this.state.data.checkedUsersBuffer.length > 0){
            const {workerList} = this.state.data;
            const {checkedUsersBuffer} = this.state.data;
            checkedUsersBuffer.forEach(idKey=>{
                let user = workerList.find(user=>user.userId === idKey);
                user.isSelected = !user.isSelected;
            });
            const {isEditView} = this.state;
            this.setState({data:{...this.state.data,workerList,checkedUsersBuffer:[]}, isEditView:!isEditView});
        }else{
            const {isEditView} = this.state;
            this.setState({isEditView:!isEditView});
        }
    }

    closeAddEditForm=(id)=>{
        console.log("Closing form for "+id);
        this.setState({shouldOpenForm:false});
    }

    handleDelete=(id)=>{
        console.log("Deleting gradiliste "+ id);
    }

    handleOpenNotes=(id)=>{
        const constructionSiteName = this.state.data.displayName;

        this.props.history.push("/Notes?ConstructionSiteFilter=" + constructionSiteName.trim().replace(" ","+"))
    }

    async componentDidMount(){
        // address: "Marka Oraskovica 22"
        // city: {cityId: 2, cityName: 'Novi Sad', municipalityName: 'Novi Sad'}
        // client: {clientId: 'ClientNumberOne', name: 'Test Client'}
        // constructionSiteId: 1
        // dateFinished: "2032-06-06T18:39:48.755"
        // dateStarted: "2022-06-06T18:39:48.755"
        // displayName: "Gradiliste 1"
        // isFinished: true
        const id = this.props.match.params.id;

        let finalData = {};
        console.log("Id", id);
        if(id && id !== "New"){
           const {data} = await constructionSiteClient.getSingleSite(id);
           finalData = data;
           finalData.cityId = data.city.cityId;
           finalData.cityName = data.city.cityName;
        }

        const {data:options} = await miscClient.getAllOptions();
        const {data:usersOptions} = await usersClient.getAll();

        finalData.citiesOptions = options.citiesOptions.map(city=>{
            if(city.id == finalData.cityId){
                return {...city, isSelected:true};
            }
            return city;
        });
        finalData.workerList = usersOptions.map(user=>{
            user.isSelected = false;

            if((id && id !== "New") && 
                user.constructionSite?.constructionSiteId && 
                user.constructionSite.constructionSiteId === parseInt(id)){
                    user.isSelected = true;
                }
            return user;
        });
        finalData.checkedUsersBuffer = [];
        this.setState({data:finalData});

    }

    renderInfoForm=()=>{
        const {data} = this.state;
        return ( <React.Fragment>
            <div className="row">
                <h2 className="col">{data.displayName}</h2>
            </div>
            <div className="row">
                {this.renderInputField("form-group col", "address", data.address, "Adresa", "", "text", !data.isEditView)}
                {this.renderInputField("form-group col", "cityName", data.cityName, "Grad", "", "text", !data.isEditView)}
            </div>
            <div className="row">
                {this.renderInputField("form-group col", "dateStarted", dateToString(data.dateStarted), "Datum začetka", "", "text", !data.isEditView)}
                {this.renderInputField("form-group col", "expectedEndDate", dateToString(data.expectedEndDate), "Datum roka", "", "text", !data.isEditView)}
            </div>
            </React.Fragment>);
    }

    renderInfoTable=()=>{
        if(this.state.data.workerList){
            const body = this.state.data.workerList.filter(worker=>worker.isSelected);
            const data = {
                header:headersForConstructionSiteUsersEditTableCustomBody(),
                body
            };
            return (            
                <Table
                data={data}
                withRowIndex={false}
                customBodyComponent={ConstructionSiteUsersTableCustomBody}
                />
            );
        }

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
                {this.renderInputField("form-group col", "displayName", data.displayName, "Naziv", errors.displayName , "text", data.isEditView)}
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
                {this.renderDate("form-group col", "dateStarted", asDateOnly(data.dateStarted), "Datum začetka", errors.dateStarted)}
                {this.renderDate("form-group col", "expectedEndDate", asDateOnly(data.expectedEndDate), "Datum roka", errors.expectedEndDate)}
            </div>
        </React.Fragment>);
    }

    renderEditTable=()=>{
        const header = headersForConstructionSiteUsersEditTableCustomBody();
        header.push({id:"empty"});
        const {workerList:body} = this.state.data;
        const data = {
            header,
            body
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
    let {workerList} = this.state.data;
    workerList = workerList.map(user=>{
        if(user.userId === id){
            return {...user,isSelected:!user.isSelected};
        }
    return user;});

    const {checkedUsersBuffer} = this.state.data;
    checkedUsersBuffer.push(id);

    this.setState({data:{...this.state.data,workerList,checkedUsersBuffer}});
    }

    onDropdownClick=(data, selection)=>{
        
        if(selection === "citiesOptions"){
            console.log("217 line ", data, selection);
            this.submitNewOptionsSelection(data,selection);
        }

        this.updateSelection(selection);
    }

    componentDidUpdate(){
        if(this.state.currentId !== "New"){
            if(this.props.match.params.id === 'New'){
                this.setState({currentId: "New", isEditView:true});
            }
        }
    }
    
    render(){
        return (
        <div className="construction-site construction-site--view-form">
            <div className="construction-site__info container">
                {this.state.isEditView ? this.renderEditForm() : this.renderInfoForm()}
            </div>
            {this.renderSideOptions()}
            <div className="construction-site__table users-table">
                {this.state.isEditView ? this.renderEditTable() : this.renderInfoTable()}
            </div>
        </div>);
    }
}
export default ConstructionSiteAddEditViewForm;