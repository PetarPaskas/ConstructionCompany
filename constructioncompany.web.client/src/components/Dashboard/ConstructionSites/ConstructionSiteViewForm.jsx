import Form from '../../common/Form';
import Table from "../../common/Table/Table";
import { createFakeDataForTableConstructionSite } from "../../common/utils";
import ConstructionSiteUsersTableCustomBody from "./ConstructionSiteUsersTableCustomBody";

//renderInputField(containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type = "text")
class ConstructionSiteViewForm extends Form
{
    constructor(props){
        super(props);
        if(props.match.params.id){
            console.log("ConstructionSiteViewForm id =>", props.match.params.id);
        }
    }

    state={
        shouldOpenForm:false,
        usersData:{
            header:[],
            body:[]
        },
        data:{
            name:"testData",
            address:"testData",
            cityName:"testData",
            dateStarted:"testData",
            expectedEndDate:"testData"
        },
        errors:{

        }
    }

    renderSideOptions(){
        const currentId = this.props.match.params.id;
        return (
        <div className="construction-site__side-options">
            <button onClick={()=>{this.openAddEditForm(currentId)}}className="btn btn-warning">Menjaj</button>
            <button onClick={()=>{this.handleDelete(currentId)}} className="btn btn-danger">Obriši</button>
            <button onClick={()=>{this.handleOpenNotes(currentId)}} className="btn btn-primary">Beleške</button>
        </div>);
    }
    openAddEditForm=(id)=>{
        const loaction = "/Dashboard/Gradilista/Edit/" + id;
        this.props.history.push(loaction)
        //this.setState({shouldOpenForm:true});
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
        const {data} = this.state;
        return (
        <div className="construction-site construction-site--view-form">
            <div className="construction-site__info container">
                <div className="row">
                        <h2 className="col">{data.name}</h2>
                    </div>
                <div className="row">
                    {this.renderInputField("form-group col", "address", data.address, "Adresa", "", "text", true)}
                    {this.renderInputField("form-group col", "cityName", data.cityName, "Grad", "", "text", true)}
                </div>
                <div className="row">
                {/*renderInputField(containerClassNameAppender, name, value, labelPlaceholder, errorMessage, type = "text", disabled) */}
                    {this.renderInputField("form-group col", "dateStarted", data.dateStarted, "Datum začetka", "", "text", true)}
                    {this.renderInputField("form-group col", "expectedEndDate", data.expectedEndDate, "Datum roka", "", "text", true)}
                </div>
            </div>
            {this.renderSideOptions()}
            <div className="construction-site__table users-table">
                <Table
                 data={this.state.usersData}
                 withRowIndex={false}
                 customBodyComponent={ConstructionSiteUsersTableCustomBody}
                />
            </div>
        </div>);
    }
}
export default ConstructionSiteViewForm;