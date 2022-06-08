import Form from "../../common/Form";
import {generateSchemaForAddEditUserForm, asDateOnly, processFinalDataForAddEditUserForm} from "../../common/utils";
import miscClient from "../../http/miscClient";
import  usersClient from "../../http/usersClient";

class AddEditUserForm extends Form{

    schema=generateSchemaForAddEditUserForm();

    state={
        currentId:this.props.match.params.id,
        data:{
            name:"",
            surname:"",
            nickname:"",
            phoneNumber:"",
            employmentStartDate:"",
            employmentEndDate:"",
            hourlyRate:0,
            professionId:0,
            currencyId:0,
            constructionSitesId:0,
            professionOptions:[],
            currencyOptions:[],
            constructionSiteOptions:[]
        },
        errors:{
        },
    }

    callApi = async ()=>{
        let finalData = {...this.state.data};
        let hasUser = false;
        if(this.state.currentId && this.state.currentId !== "New"){
            const id = parseInt(this.state.currentId);
            const user = (await usersClient.getSingleUser(id)).data;
            finalData = {...finalData, ...user};
            hasUser=true;
        }

        const options = (await miscClient.getAllOptions()).data;
        finalData.professionOptions = options.professionOptions;
        finalData.currencyOptions = options.currencyOptions;
        finalData.constructionSiteOptions = options.constructionSiteOptions;

        processFinalDataForAddEditUserForm(finalData, hasUser);

        this.setState({data:finalData});
    }

    async componentDidMount(){
        await this.callApi();
    }

    onDropdownClick=(data, selection)=>{
        // console.log(e.target);
        // console.log(`Data => `, data);

        switch(selection){
            case "currencyOptions":
            case "professionOptions":
            case "constructionSiteOptions":
                this.submitNewOptionsSelection(data,selection);
                break;
            // case "constructionSiteOptions":
            //     this.submitNewOptionsSelection(data,selection,true);
            //     break;
            default:
                console.error("No onDropdownClick selection implementation");
                break;
        }

        this.updateSelection(selection);

    }
    
    handleDeleteUser=(id)=>{
        console.log("Deleting user with an ID of " + id);
    }

    renderSubmitButton(){
        return (<div className="row-element col-2">
        <input type="submit" className="btn form-input__button form-input__button--green" value="Pošalji"/>
    </div>);
    }

    renderDeleteButton(){
        const id = this.props.match.params.id;
        if(id !== "New"){
            return (
                <div className="row-element col-2">
                <input type="button" onClick={()=>this.handleDeleteUser(id)}className="btn form-input__button form-input__button--red" value="Obriši"/>
                </div>);
        }
        else{
            return null;
        }

    }

    handleSubmit=(e)=>{
        e.preventDefault();
        console.log("Submiting the form");
    }

    render(){
        const dropdownOptions = {
            wrapperStyle: {
                alignSelf:"end",
                marginTop:"1.7rem"
            },
            wrapperClassName: "form-group col"
        };
        const {data} = this.state;
        return<form className="container user-form" onSubmit={this.handleSubmit}>
            <div className="row">
                {this.renderInputField("form-group col", "name", data.name, "Unesi Ime", "")}
                {this.renderInputField("form-group col", "surname", data.surname, "Unesi Prezime", "")}
                {this.renderInputField("form-group col", "nickname", data.nickname, "Unesi Nadimak", "")}
            </div>
            <div className="row">
                {this.renderInputField("form-group col", "hourlyRate", `${data.hourlyRate > 0 ? data.hourlyRate : ""}`, "Unesi Satnicu", "","number")}
                {this.renderDropdown(data.currencyOptions, "valutu", dropdownOptions, "currencyOptions")}
                {this.renderDropdown(data.professionOptions, "profesiju", dropdownOptions, "professionOptions")}

            </div>
            <div className="row">
            {this.renderDropdown(data.constructionSiteOptions, "gradiliste", dropdownOptions, "constructionSiteOptions")}

            {/* containerClassNameAppender, name, value, labelPlaceholder, errorMessage */}
                {this.renderDate("col","employmentStartDate", asDateOnly(data.employmentStartDate), "Radi od","")}
                {this.renderDate("col","employmentEndDate", asDateOnly(data.employmentEndDate), "Radi do","")}
            </div>
            <div className="row flex-row-reverse">
                {this.renderSubmitButton()}
                {this.renderDeleteButton()}
            </div>
        </form>
    }

}

export default AddEditUserForm;