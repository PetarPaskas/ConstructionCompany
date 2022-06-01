import Form from "../common/Form";
import {generateSchemaForNoteForm} from "../common/utils"

/*
{
    noteId:,
    dateCreated:,
    description:,
    user:{userId:,name:},
    constructionSite:{constructionSiteId:, name}
}
*/

class NoteForm extends Form{

    state = {
        noteId:"New",

        data:{
            dateCreated:"",
            description:"",
            title:"",
            constructionSiteId:"",
            constructionSiteOptions:[]
        },
        errors:{
            
        }
    }

    schema = generateSchemaForNoteForm()

    loadConstructionSiteOptions=(newData)=>{
        let options = [
            {id:"1",name:"Gradiliste 1",value:"g_1", isSelected:false},
            {id:"2",name:"Gradiliste 2",value:"g_2", isSelected:false}
        ];
        let updateData = {};

        if(newData){
            for(let i = 0;i<options.length;i++){
                if(options[i].id == newData.constructionSiteId)
                {
                    options[i].isSelected = true;
                    break;
                }
            }
             updateData = {...newData,constructionSiteOptions:options};
        }else{
             updateData = {...this.state.data,constructionSiteOptions:options};
        }

        this.setState({data:updateData});
    }

    componentDidMount(){
        const {data} = this.props;
        const {displayId} = this.props;

        let isShowing = undefined;
        let {data:newData} = this.state;

        if(data){
            isShowing  = data.find(el=>el.noteId === displayId);
        }

        if(isShowing){
            newData = {
                ...newData,
                dateCreated:isShowing.dateCreated,
                description:isShowing.description,
                title:isShowing.title,
                constructionSiteId: isShowing.constructionSite.constructionSiteId,
            };
        }
        this.setState({data:newData});

        //here load options
        this.loadConstructionSiteOptions(newData);

    }
    
    onDropdownClick=(data, selection)=>{

            // console.log(e.target);
            // console.log(`Data => `, data);

            switch(selection){
                case "constructionSiteOptions":
                    this.submitNewOptionsSelection(data,selection);
                    break;
                default:
                    console.error("No onDropdownClick selection implementation");
                    break;
            }
    
            this.updateSelection(selection);
    }

    handleFormSubmit(e){
        e.preventDefault();
        console.log("Submitting form");
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
        const {errors} = this.state;
        return(
        <form className="container" onSubmit={this.handleFormSubmit}>
            {/* renderInputField(containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type = "text", disabled) 
                renderDate(containerClassNameAppender, name, value, labelPlaceholder, errorMessage)
                renderDropdown(options, name, stylingOptions, selection, multiSelect = false)
                renderTextArea(containerClassName, label, name, value, id, errorMessage)
                */}
            <div className="row">
                {this.renderInputField("form-group col","title", data.title,"Unesi naslov", errors.title)}
                {this.renderDropdown(data.constructionSiteOptions,"gradiliste",dropdownOptions,"constructionSiteOptions")}
            </div>
            <div className="row">
                {this.renderTextArea("form-group col","Unesi opis", "description", data.description,"noteform-description",errors.description)}
            </div>
            <div className="row" style={{flexDirection:"row-reverse"}}>
                <input type="submit" value="Sačuvaj" style={{marginRight:"1.5rem"}} className="btn form-input__button form-input__button--green"/>
            </div>
        </form>)
    }
}

export default NoteForm;