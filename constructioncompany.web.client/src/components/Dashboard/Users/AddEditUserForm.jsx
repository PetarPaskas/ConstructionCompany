import Form from "../../common/Form";

class AddEditUserForm extends Form{
    constructor(props){
        super(props);
        if(props.match.params.id){
            console.log("AddEditUserForm id =>",props.match.params.id);
        }
    }

    

    profesijeOptions = [
        {id:"1",name:"Maler",value:"maler", isSelected:false},
        {id:"2",name:"Moler",value:"moler", isSelected:false},
        {id:"3",name:"Svaler",value:"jebach",isSelected:false},
        {id:"4",name:"Elektricar",value:"isto_jebach",isSelected:false}
    ]

    valutaOptions=[
        {id:"1",name:"EUR",value:"eur", isSelected:false},
        {id:"2",name:"RSD",value:"rsd", isSelected:false}
    ]

    gradilisteOptions=[
        {id:"1",name:"Gradiliste 1",value:"g_1", isSelected:false},
        {id:"2",name:"Gradiliste 1",value:"g_2", isSelected:false}
    ]

    onDropdownClick=(e,data)=>{
        console.log(e.target);
        console.log(`Data => `, data)
    }

    render(){
        const dropdownOptions = {
            wrapperStyle: {
                alignSelf:"end",
                marginTop:"1.7rem"
            },
            wrapperClassName: "form-group col"
        };
        return<form className="container user-form">
            <div className="row">
                {this.renderInputField("form-group col", "proba", "asf", "Ime", "")}
                {this.renderInputField("form-group col", "probaa", "asf", "Prezime", "")}
                {this.renderInputField("form-group col", "probaaa", "asf", "Nadimak", "")}
            </div>
            <div className="row">
                {this.renderInputField("form-group col", "probabbb", "123", "Satnica", "","number")}
                {this.renderDropdown(this.valutaOptions, "valutu", dropdownOptions)}
                {this.renderDropdown(this.profesijeOptions, "profesiju", dropdownOptions)}

            </div>
            <div className="row">
            {this.renderDropdown(this.gradilisteOptions, "gradiliste", dropdownOptions)}

            {/* containerClassNameAppender, name, value, labelPlaceholder, errorMessage */}
                {this.renderDate("col","radiOd", "", "Radi od","")}
                {this.renderDate("col","radiDo", "", "Radi do","")}
            </div>
        </form>
    }
}

export default AddEditUserForm;