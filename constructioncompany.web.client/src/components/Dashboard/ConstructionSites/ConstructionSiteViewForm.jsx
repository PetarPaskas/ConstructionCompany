import Form from '../../common/Form';
import Table from "../../common/Table/Table";
import { createFakeDataForTableConstructionSite } from "../../common/utils";
import ConstructionSiteUsersTableCustomBody from "./ConstructionSiteUsersTableCustomBody";

//renderInputField(containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type = "text")
class ConstructionSiteViewForm extends Form
{
    constructor(props){
        super(props);
        console.log(props);
        if(props.match.params.id){
            console.log(props.match.params.id);
        }
    }

    state={
        shouldOpenForm:false,
        usersData:{
            header:[],
            body:[]
        }
    }

    renderSideOptions(){
        const currentId = this.props.match.params.id;
        console.log("CurrentId => " + currentId);
        return (
        <div className="construction-site__side-options">
            <button onClick={()=>{this.openAddEditForm(currentId)}}className="btn btn-warning">Menjaj</button>
            <button onClick={()=>{this.handleDelete(currentId)}} className="btn btn-danger">Obriši</button>
            <button onClick={()=>{this.handleOpenNotes(currentId)}} className="btn btn-primary">Beleške</button>
        </div>);
    }
    openAddEditForm=(id)=>{
        console.log("Opening form for "+id);
        this.setState({shouldOpenForm:true});
    }

    closeAddEditForm=(id)=>{
        console.log("Closing form for "+id);
        this.setState({shouldOpenForm:false});
    }

    handleDelete=(id)=>{
        console.log("Deleting gradiliste "+ id);
    }

    handleOpenNotes=(id)=>{
        console.log("Opening notes for "+id);
    }

    componentDidMount(){
        const data = createFakeDataForTableConstructionSite();
        this.setState({usersData:data});
    }

    render(){
        return (
        <div className="construction-site construction-site--view-form">
            <div className="construction-site__info container">
                <div className="row">
                        <h2 className="col">Gradilište 2</h2>
                    </div>
                <div className="row">
                    {this.renderInputField("form-group col-6", "proba", "asf", "Unesi penis", "")}
                    {this.renderInputField("form-group col-6", "probaa", "asf", "Unesi penis", "")}
                </div>
                <div className="row">
                    {this.renderInputField("form-group col-6", "probaaa", "asf", "Unesi penis", "")}
                    {this.renderInputField("form-group col-6", "probaaaa", "asf", "Unesi penis", "")}
                </div>
            </div>
            {this.renderSideOptions()}
            <div className="construction-site__table users-table">
                <Table
                 data={this.state.usersData}
                 withRowIndex={false}
                 customTableBody={<ConstructionSiteUsersTableCustomBody/>}
                />
            </div>
        </div>);
    }
}
export default ConstructionSiteViewForm;