import  React from "react";
import Form from "../common/Form";
import clientsClient from "../http/clientsClient"
import Modal from "../common/Modal"
import {generateSchemaForTempClientForm} from "../common/utils";

//This is just a temporary form
//temporaryDataProps => clients
//onAddNewClient => handle adding a new client
//shouldReturnAsOption / defaulting to false
class ClientForm extends Form{
    state={
        data:{
            clientName:"",
            clientAddress:"",
            returnAsOption: false
        },
        errors:{},
        items:[]
    }

    schema=generateSchemaForTempClientForm();

    handleAddNewClient=(newClient)=>{
        if(this.props.onAddNewClient){
            this.props.onAddNewClient(newClient);
        }
    }

    componentDidMount(){
        const {temporaryDataProps,shouldReturnAsOption} = this.props;
        const newState = {
            items:temporaryDataProps
        }

        if(shouldReturnAsOption !== undefined)
        newState.shouldReturnAsOption = shouldReturnAsOption;

        this.setState({...this.state, ...newState});
    }

    submit=async ()=>{
        const {
            clientName,
            clientAddress,
            returnAsOption
        } = this.state.data;

        const newClient = {
            clientName,
            clientAddress,
            returnAsOption
        };

        try{
            let {data:responseClient} = await clientsClient.submitNewClient(newClient);

            this.handleAddNewClient(responseClient);
        }
        catch(ex){
            alert("Greška pri slanju novog klijenta");
            console.log("Add new client error/exception =>",ex);
        }
    }

    renderSubmitButton(){
        return <button
        className="client-form--submit"
        onClick={this.submit}>
            Prihvati
        </button>
    }

    renderContent(){
        const {clientName, clientAddress} = this.state.data;
        const {clientName:clientNameError, clientAddress:clientAddressError} = this.state.errors;
        //containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type = "text", disabled = false
        return <div className="client-form--temp">
            <h2 className="client-form--title">Dodaj novog klijenta</h2>
            {this.renderInputField(null, "clientName", clientName, "*Unesi ime klijenta", clientNameError ?? "")}
            {this.renderInputField(null, "clientAddress", clientAddress, "*Unesi adresu klijenta", clientAddressError ?? "")}
            {this.renderSubmitButton()}
        </div>;
    }

    render(){
        return this.renderContent();
    }
}

export default ClientForm;

export function ModalClientForm(props){
    return <Modal 
            isOpen={props.isOpen}
            handleClose={props.handleClose}>
        <ClientForm {...props}/>
    </Modal>;
}