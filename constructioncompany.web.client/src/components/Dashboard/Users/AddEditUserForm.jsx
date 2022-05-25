import Form from "../../common/Form";
import {generateSchemaForAddEditUserForm} from "../../common/utils";

class AddEditUserForm extends Form{
    constructor(props){
        super(props);
        if(props.match.params.id){
            console.log("AddEditUserForm id =>",props.match.params.id);
        }
    }

    schema= generateSchemaForAddEditUserForm();

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
                {id:"2",name:"Gradiliste 1",value:"g_2", isSelected:false}
            ]
        },
        errors:{
        },

    }

    onDropdownClick=(e,data)=>{
        console.log(e.target);
        console.log(`Data => `, data)
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
                {this.renderDropdown(data.valutaOptions, "valutu", dropdownOptions)}
                {this.renderDropdown(data.profesijeOptions, "profesiju", dropdownOptions)}

            </div>
            <div className="row">
            {this.renderDropdown(data.gradilisteOptions, "gradiliste", dropdownOptions)}

            {/* containerClassNameAppender, name, value, labelPlaceholder, errorMessage */}
                {this.renderDate("col","employmentStartdate", data.employmentStartDate, "Radi od","")}
                {this.renderDate("col","employmentEndDate", data.employmentEndDate, "Radi do","")}
            </div>
            <div className="row flex-row-reverse">
                <div className="row-element col-2">
                    <input type="submit" className="btn form-input__button form-input__button--green" value="Pošalji"/>
                </div>
                <div className="row-element col-2">
                    <input type="reset" className="btn form-input__button form-input__button--yellow" value="Resetuj"/>
                </div>
            </div>
        </form>
    }
}

export default AddEditUserForm;