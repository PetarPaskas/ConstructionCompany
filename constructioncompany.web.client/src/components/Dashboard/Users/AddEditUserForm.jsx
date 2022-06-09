import Form from "../../common/Form";
import {generateSchemaForAddEditUserForm, asDateOnly, processFinalDataForAddEditUserForm, getSelectedOption} from "../../common/utils";
import miscClient from "../../http/miscClient";
import userClient from "../../http/usersClient";
import  usersClient from "../../http/usersClient";

const reloadLocation = "http://localhost:3000/Dashboard/Radnici";

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
            hourlyRate:"",
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
    
    handleDeleteUser=async (id)=>{
        try{
            await userClient.disableUser(parseInt(id));
            window.location.href = reloadLocation;
        }
        catch(err){
            alert("Greska pri brisanju korisnika");
            console.error("Greska pri brisanju korisnika error => ",err);
        }
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

    handleSubmit=async (e)=>{

        const validateNeccessaryOption = ["name", "surname", "nickname", "phoneNumber", "employmentStartDate", "hourlyRate"];

        e.preventDefault();

        const {data} = this.state;
        const {currentId} = this.state;
        let {errors} = this.state;

        for(let index of validateNeccessaryOption){
            this.doValidation(index,this.state.data[index]);
        }

        let professionOption = getSelectedOption(data.professionOptions);
        let currencyOption = getSelectedOption(data.currencyOptions);
        let constructionSiteOption = getSelectedOption(data.constructionSiteOptions);

        if(!professionOption || data.professionId === 0)
        errors.professionId = "Odaberi profesiju";
        else 
        delete errors.professionId;

        if(!currencyOption || data.currencyId === 0)
        errors.currencyId = "Odaberi valutu";
        else 
        delete errors.currencyId;

        if(!constructionSiteOption || (typeof(data.constructionSitesId) !== 'object' || data.constructionSitesId === 0))
            errors.constructionSiteId = "Odaberi gradilište";
        else 
        delete errors.constructionSiteId;

        this.setState({errors:{...errors}});

        if(Object.keys(errors).length > 0){
            alert("Popuni sva polja adekvatnim unosom");
            return;
        }

        const newObj = {
            name:data.name,
            nickname:data.nickname,
            surname: data.surname,
            phoneNumber:data.phoneNumber,
            employmentStartDate:data.employmentStartDate,
            hourlyRate:parseFloat(data.hourlyRate),
            professionId:data.professionId,
            currencyId:data.currencyId,
            constructionSiteId:(data.constructionSitesId[0].id),
            employmentEndDate:(data.employmentEndDate === "" ? null : data.employmentEndDate)
        }

        try{
            if(currentId !== "New"){
                await userClient.createUser(newObj);
            }
            else{
                await userClient.updateUser(parseInt(currentId),newObj);
            }

            window.location.href = reloadLocation;
        }
        catch(err){
            alert("Greska pri radu sa korisnicima");
            console.error("Korisnici rad =>",err);
        }

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
                {this.renderInputField("form-group col", "name", data.name, "Unesi Ime*", "")}
                {this.renderInputField("form-group col", "surname", data.surname, "Unesi Prezime*", "")}
            </div>
            <div className="row">
                {this.renderInputField("form-group col", "nickname", data.nickname, "Unesi Nadimak", "")}
                {this.renderInputField("form-group col", "phoneNumber", data.phoneNumber, "Unesi broj telefona*", "")}
            </div>
            <div className="row">
                {this.renderInputField("form-group col", "hourlyRate", `${data.hourlyRate > 0 ? data.hourlyRate : ""}`, "Unesi Satnicu*", "","number")}
                {this.renderDropdown(data.currencyOptions, "valutu*", dropdownOptions, "currencyOptions")}
                {this.renderDropdown(data.professionOptions, "profesiju*", dropdownOptions, "professionOptions")}

            </div>
            <div className="row">
            {this.renderDropdown(data.constructionSiteOptions, "gradiliste*", dropdownOptions, "constructionSiteOptions")}

            {/* containerClassNameAppender, name, value, labelPlaceholder, errorMessage */}
                {this.renderDate("col","employmentStartDate", asDateOnly(data.employmentStartDate), "Radi od*","")}
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