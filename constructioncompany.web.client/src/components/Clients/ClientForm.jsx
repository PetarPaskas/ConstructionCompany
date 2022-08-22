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
            items:temporaryDataProps,
            data:{...this.state.data}
        };

        if(shouldReturnAsOption !== undefined)
        newState.data.returnAsOption = shouldReturnAsOption;

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

        if(Object.keys(this.state.errors).length === 0){
            for(let prop in newClient)
            {
                if(newClient[prop] === undefined || newClient[prop] === "")
                {
                    return;
                }
            }
        }

        try{
            let {data:responseClient} = await clientsClient.submitNewClient(newClient);
            this.handleAddNewClient(responseClient);

            //Only if the form is open as a modal
            if(this.props.handleClose)
                this.props.handleClose();

            alert("Novi klijent uspešno dodat");
        }
        catch(ex){
            console.log("Add new client error/exception =>",ex);
            alert("Greška pri slanju novog klijenta");
        }
    }

    renderSubmitButton(){
        return <button
        className="btn client-form--submit"
        onClick={this.submit}>
            Prihvati
        </button>
    }

    renderContent(){
        const {clientName, clientAddress} = this.state.data;
        const {clientName:clientNameError, clientAddress:clientAddressError} = this.state.errors;
        //containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type = "text", disabled = false
        return <div className="client-form client-form--temp container">
            <div className="row">
                <h2 className="client-form--title">Dodaj novog klijenta</h2>
            </div>
            <div className="row">
                {this.renderInputField("", "clientName", clientName, "*Unesi ime klijenta", clientNameError ?? "")}
            </div>
            <div className="row">
                {this.renderInputField("", "clientAddress", clientAddress, "*Unesi adresu klijenta", clientAddressError ?? "")}
            </div>
            <div className="row" style={{flexDirection:"row-reverse"}}>
                {this.renderSubmitButton()}
            </div>
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