import React from 'react';
import Form from '../../common/Form';
import Table from "../../common/Table/Table";
import constructionSiteClient from "../../http/constructionSitesClient";
import miscClient from "../../http/miscClient";
import usersClient from "../../http/usersClient";
import {asDateOnly, dateToString, headersForConstructionSiteUsersEditTableCustomBody, generateSchemaConstructionSite} from "../../common/utils";
import ConstructionSiteUsersTableCustomBody from "./ConstructionSiteUsersTableCustomBody";
import ConstructionSiteUsersEditTableCustomBody from "./ConstructionSiteUsersEditTableCustomBody";

import {ModalClientForm} from '../../Clients/ClientForm';

const redirectLocation = "http://localhost:3000/Dashboard/Gradilista";

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
            isFinished:false,
            clientId:"",
            citiesOptions:[
            ],
            workerList:[

            ],
            checkedUsersBuffer:[
            ],
            clientOptions:[

            ]
        },
        errors:{
        },
        clientForm:{
            isOpenModal:false
        }
    }

    handleSubmit= async ()=>{
        //         {
        //   "constructionSiteId": 0,
        //   "name": "string",
        //   "address": "string",
        //   "isFinished": true,
        //   "dateStarted": "2022-06-09T17:17:35.492Z",
        //   "expectedEndDate": "2022-06-09T17:17:35.492Z",
        //   "cityId": 0,
        //   "clientId": "string",
        //   "users": [
        //     0
        //   ]
        // }

        const {currentId} = this.state;
        const {errors} = this.state;
        let shouldErrorCity = false;
        let shouldErrorClient = false;

        if(!this.state.data.citiesOptions.some(city=>city.isSelected)){
            shouldErrorCity = true;
        }
        if(!this.state.data.clientOptions.some(client=>client.isSelected)){
            shouldErrorClient = true;
        }

        shouldErrorCity && (errors.cityId = "Odaberi grad") || (delete errors.cityId);
        shouldErrorClient && (errors.clientId = "Odaberi klijenta") || (delete errors.clientId);

        this.setState({...errors});

        if(Object.keys(errors).length > 0){
            alert("Popuni sva polja ispravnim unosom");
            return;
        }

        const {data} = this.state;
        const newData = {
             name:data.displayName,
             address:data.address,
             isFinished:data.isFinished,
             dateStarted:data.dateStarted,
             expectedEndDate:data.expectedEndDate,
             cityId:data.cityId,
             clientId: data.clientId,
             users:[]
        }

        data.workerList.forEach(user=>{
            if(user.isSelected){
                newData.users.push(user.userId);
            }
        })

        try{
            let data;
            if(currentId === "New"){
               data = await constructionSiteClient.createSite(newData);
            }else{
               data = await constructionSiteClient.updateConstructionSite(currentId,newData)
            }
            console.log(data);
            window.location.href = redirectLocation;
        }
        catch(e){
            console.error(e);
        }

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
                    {this.tempOpenClientFormModalButton(false)}
                </div>);
        }else{
            return (
                <div className="construction-site__side-options">
                    <button onClick={this.handleSubmit} className="btn btn-success">Sačuvaj</button>
                    {this.tempOpenClientFormModalButton(true)}
                </div>)
        }
    }

    tempOpenClientFormModalButton=(isPrimaryColor)=>{
        const className = isPrimaryColor ? "btn btn-primary" : "btn btn-success";
        return <button
        className={className}
        onClick={this.handleOpenTempClientModal}
        >
            Dodaj klijenta
        </button>
    }

    handleOpenTempClientModal=()=>{
        const {clientForm} = this.state;

        clientForm.isOpenModal = !clientForm.isOpenModal;

        this.setState({clientForm});
    }

    renderTempClientFormModal(){
        //temporaryDataProps => clients
        //onAddNewClient => handle adding a new client
        //shouldReturnAsOption / defaulting to false
        const returnNewClientAsOption = true;

        return <ModalClientForm
        handleClose={this.handleOpenTempClientModal}
        isOpen={this.state.clientForm.isOpenModal}
        onAddNewClient={this.handleAddNewClient}
        shouldReturnAsOption={returnNewClientAsOption}
        />
    }

    handleAddNewClient=(data)=>{
        console.log("Newly added client", data);
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

    handleDelete= async (id)=>{
        try{
            await constructionSiteClient.deleteSite(parseInt(id));
            window.location.href = redirectLocation;
        }catch(err){
            console.error("handleDelete error => ",err);
            alert("Greska pri brisanju");
        }
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

        let finalData = {...this.state.data};

        if(id && id !== "New"){
           const {data} = await constructionSiteClient.getSingleSite(id);
           finalData = data;
           finalData.cityId = data.city.cityId;
           finalData.cityName = data.city.cityName;
           finalData.clientId = data.client.clientId;
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

        finalData.clientOptions = options.clientOptions.map(client=>{
            if(client.id == finalData.clientId){
                return {...client, isSelected:true};
            }
            return client;
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
                {this.renderInputField("form-group col", "displayName", data.displayName, "Naziv*", errors.displayName , "text", data.isEditView)}
                {this.renderDropdown(this.state.data.clientOptions,"klijenta*",styling,"clientOptions")}
                </div>
                <div className="row">
                {this.renderInputField("form-group col", "address", data.address, "Adresa*", "", "text", data.isEditView)}
                {this.renderDropdown(this.state.data.citiesOptions,"grad*",styling,"citiesOptions")}
            </div>
            <div className="row">
            {/*renderInputField(containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type = "text", disabled) 
                renderDate(containerClassNameAppender, name, value, labelPlaceholder, errorMessage)
                renderDropdown(options, name, stylingOptions, selection, multiSelect = false){
                */}
                {this.renderDate("form-group col", "dateStarted", asDateOnly(data.dateStarted), "Datum začetka*", errors.dateStarted)}
                {this.renderDate("form-group col", "expectedEndDate", asDateOnly(data.expectedEndDate), "Datum roka*", errors.expectedEndDate)}
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
        if(selection === "clientOptions"){
            this.submitNewOptionsSelection(data,selection, false, true);
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
            {this.renderTempClientFormModal()}
        </div>);
    }
}
export default ConstructionSiteAddEditViewForm;