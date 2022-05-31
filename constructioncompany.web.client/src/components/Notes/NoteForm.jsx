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


    constructor(props){
        super(props);
    }

    state = {
        noteId:"New",

        data:{
            dateCreated:"",
            description:"",
            title:"",
            constructionSiteId:"",
            userId:"",
            constructionSiteOptions:[],
            userOptions:[]
        },
        errors:{
            
        }
    }

    schema = generateSchemaForNoteForm()

    componentDidMount(){
        const {data} = this.props;
        const {displayId} = this.props;

        let isShowing = undefined;
        let {data:newData} = this.state;

        if(data){
            isShowing  = data.find(el=>el.noteId === displayId);
        }

        if(isShowing){
            
            console.log(isShowing);
            newData = {
                ...newData,
                dateCreated:isShowing.dateCreated,
                description:isShowing.description,
                title:isShowing.title,
                constructionSiteId: isShowing.constructionSite.constructionSiteId,
                userId:isShowing.user.userId
            };
        }

        //here load options
        //lalalal

        this.setState({data:newData});
    }

    handleFormSubmit(e){
        e.preventDefault();
        console.log("Submitting form");
    }

    render(){
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