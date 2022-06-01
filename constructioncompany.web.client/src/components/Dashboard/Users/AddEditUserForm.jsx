import Form from "../../common/Form";
import {generateSchemaForAddEditUserForm} from "../../common/utils";

class AddEditUserForm extends Form{
    constructor(props){
        super(props);
        if(props.match.params.id){
            console.log("AddEditUserForm id =>",props.match.params.id);
        }
    }

    schema=generateSchemaForAddEditUserForm();

    state={
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
            constructionSitesId:[],
            profesijeOptions:[
                {id:"1",name:"Maler",value:"maler", isSelected:false},
                {id:"2",name:"Moler",value:"moler", isSelected:false},
                {id:"3",name:"Svaler",value:"jebach",isSelected:false},
                {id:"4",name:"Elektricar",value:"isto_jebach",isSelected:false}
            ],
            valutaOptions:[
                {id:"1",name:"EUR",value:"eur", isSelected:false},
                {id:"2",name:"RSD",value:"rsd", isSelected:false}
            ],
            gradilisteOptions:[
                {id:"1",name:"Gradiliste 1",value:"g_1", isSelected:false},
                {id:"2",name:"Gradiliste 2",value:"g_2", isSelected:false}
            ]
        },
        errors:{
        },
    }

    onDropdownClick=(data, selection)=>{
        // console.log(e.target);
        // console.log(`Data => `, data);

        switch(selection){
            case "valutaOptions":
            case "profesijeOptions":
                this.submitNewOptionsSelection(data,selection);
                break;
            case "gradilisteOptions":
                this.submitNewOptionsSelection(data,selection,true);
                break;
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
                {this.renderDropdown(data.valutaOptions, "valutu", dropdownOptions, "valutaOptions")}
                {this.renderDropdown(data.profesijeOptions, "profesiju", dropdownOptions, "profesijeOptions")}

            </div>
            <div className="row">
            {this.renderDropdown(data.gradilisteOptions, "gradiliste", dropdownOptions, "gradilisteOptions", true)}

            {/* containerClassNameAppender, name, value, labelPlaceholder, errorMessage */}
                {this.renderDate("col","employmentStartDate", data.employmentStartDate, "Radi od","")}
                {this.renderDate("col","employmentEndDate", data.employmentEndDate, "Radi do","")}
            </div>
            <div className="row flex-row-reverse">
                {this.renderSubmitButton()}
                {this.renderDeleteButton()}
            </div>
        </form>
    }

}

export default AddEditUserForm;