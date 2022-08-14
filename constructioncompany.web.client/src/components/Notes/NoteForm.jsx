import Form from "../common/Form";
import {generateSchemaForNoteForm} from "../common/utils";
import noteClient from "../http/notesClient";

/*
{
    noteId:,
    dateCreated:,
    description:,
    user:{userId:,name:},
    constructionSite:{constructionSiteId:, name}
}
*/

let location = "http://localhost:3000/Notes";

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
            constructionSiteId:"",
            title:""
        }
    }

    schema = generateSchemaForNoteForm()

    loadConstructionSiteOptions=(newData, options)=>{

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
        let options = this.props.dropdownOptions.map(el=>({...el}));

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
            this.setState({noteId:isShowing.noteId, data:newData});
        }
        else{
            this.setState({data:newData});
        }

        this.loadConstructionSiteOptions(newData, options);
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

    handleFormSubmit= async (e)=>{
        e.preventDefault();
        const {data} = this.state;
        const {noteId} = this.state;

        const cs = data.constructionSiteOptions.find(cs => cs.isSelected);
        let {errors} = this.state;
        if(!cs && (data.constructionSiteId === "" || parseInt(data.constructionSiteId) === 0)){
            this.setState({errors:{...errors, constructionSiteId:"Odaberi gradiliste"}});
            return;
        }else{
            delete errors.constructionSiteId;
            this.setState({errors});
        }

        if(Object.keys(errors).length > 0)
        {
            if((function (){
                let shouldError = false;
                for(let key in errors)
                {
                    if(errors[key] !== ""){
                        shouldError = true;
                        break;
                    }
                }
                return shouldError;
            })()){
                alert("Nije moguće obraditi zahtev, razreši greške.");
                return;
            }

        }

        const newData = {
            dateCreated:new Date(),
            description:data.description,
            title:data.title,
            constructionSiteId: parseInt(cs?.id ?? data.constructionSiteId)
        };

        try{
            if(noteId === "New"){
               await noteClient.createNote(newData);
            }
            else{
               await noteClient.updateNote(noteId, newData)
            }

            window.location.href= location;
        }catch(err){
            console.log(err)
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
        const {errors} = this.state;
        return(
        <form className="container" onSubmit={this.handleFormSubmit}>
            {/* renderInputField(containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type = "text", disabled) 
                renderDate(containerClassNameAppender, name, value, labelPlaceholder, errorMessage)
                renderDropdown(options, name, stylingOptions, selection, multiSelect = false)
                renderTextArea(containerClassName, label, name, value, id, errorMessage)
                */}
            <div className="row">
                {this.renderInputField("form-group col","title", data.title,"Unesi naslov*", errors.title)}
                {this.renderDropdown(data.constructionSiteOptions,"gradiliste*",dropdownOptions,"constructionSiteOptions")}
            </div>
            <div className="row">
                {this.renderTextArea("form-group col","Unesi opis*", "description", data.description,"noteform-description",errors.description)}
            </div>
            <div className="row" style={{flexDirection:"row-reverse"}}>
                <input type="submit" value="Sačuvaj" style={{marginRight:"1.5rem"}} className="btn form-input__button form-input__button--green"/>
            </div>
        </form>)
    }
}

export default NoteForm;