import Form from "../../common/Form";
import {generateSchemaForAddEditUserForm, getSelectedOption} from "../../common/utils";

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

    updateSelection(selection){
        const {data} = this.state;
        let newId = 0;
        switch(selection){
            case "valutaOptions":
                  const valutaOption = getSelectedOption(data[selection]);
                  if(valutaOption){
                    if(data.currencyId !== valutaOption.id){
                        newId = valutaOption.id;
                    }
                  }
                  data.currencyId = newId;
                break;
            case "profesijeOptions":
                 const profesijeOption = getSelectedOption(data[selection]);
                 if(profesijeOption){
                    if(profesijeOption.id !== data.professionId){
                        newId = profesijeOption.id;
                    }
                 }
                 data.professionId = newId;
                break;
            case "gradilisteOptions":
                newId = [];
                const constructionSites = data[selection].filter(el=>el.isSelected);
                if(constructionSites.length > 0){
                    newId = constructionSites;
                }
                data.constructionSitesId = newId;
                break;
        }
        this.setState({data});
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
        }

        this.updateSelection(selection);

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