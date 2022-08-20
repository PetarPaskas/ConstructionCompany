import React, { Component } from "react";
import NoteItem from "./NoteItem";
import {pageData, createFakeDataForNotes} from "../common/utils";
import Pagination from "../common/Pagination";
import NoteFilter from "./NoteFilter";  
import Modal from "../common/Modal";
import NoteForm from "./NoteForm";
import noteClient from "../http/notesClient";
import miscClient from "../http/miscClient";
/*
{
    noteId:,
    dateCreated:,
    description:,
    user:{userId:,name:},
    constructionSite:{constructionSiteId:, name}
}
*/


//Expected query strings 

/*
?ConstructionSiteFilter=testData+asf+aaa
*/

let location = "http://localhost:3000/Notes";

class NotesSelectionLayout extends Component{

    state={
        modalInfo:{
            shouldOpenModal:false,
            currentlyShowingItemId:0,
        },
        isAddNewNoteModal:false,
        data:[

        ],

        pagination:{
            itemsPerPage: 3,
            currentPage: 1
        },

        constructionSiteOptions: [],

        filters:{
            // RadnikFilter: {
            //     type:"text",
            //     id:"RadnikFilter",
            //     name:"RadnikFilter",
            //     title:"Unesi ime radnika",
            //     for:"user.name",
            //     value:""
            // },
            ConstructionSiteFilter: {
                type:"text",
                id:"ConstructionSiteFilter",
                name:"ConstructionSiteFilter",
                title:"Unesi ime gradilišta",
                for:"constructionSite.constructionSiteId", //Probably property of the object we're targeting
                value:""
            },
            NoteTitleFilter: {
                type:"text",
                id:"NoteTitleFilter",
                name:"NoteTitleFilter",
                title:"Unesi naslov beležnice",
                for:"title", //Probably property of the object we're targeting
                value:""
            }
        }
    }

    readQueryString(){
        let queryString = this.props.location.search;
        if(queryString){
            try{
                let queryValues = queryString.slice(1).split("&");
                let obj = {};
                for(let variable of queryValues){
                    let val = variable.split("=");
                    let propertyName = val[0];
                    let propertyValue = val[1].replaceAll("+"," ");
        
                    obj[propertyName] = propertyValue;
                }
        
                return obj;
            }catch(exception){
                console.error("Error while parsing query string [Notes] => ", exception);
            }

        }

    }

    async componentDidMount(){
        const {data} = await noteClient.getAll();
        const {constructionSiteOptions} = ((await miscClient.getAllOptions()).data);

       const queryStringData = this.readQueryString();
       if(queryStringData){
        const {filters} = this.state;

       for(let prop in queryStringData){
           filters[prop].value = queryStringData[prop];
       }
       this.setState({data, filters, constructionSiteOptions});
       }else{
        this.setState({data, constructionSiteOptions});
       }
    }

    handlePaginate=(newPage)=>{
        if(newPage !== this.state.pagination.currentPage){
            let {pagination} = this.state;
            pagination.currentPage = newPage;

            this.setState({pagination});
        }
    }

    handleFilter=(e)=>{
        const filterName = e.target.name;

        let {filters} = this.state;
        let newValue = {...filters[filterName],value:e.target.value};

        filters[filterName] = newValue;

        this.setState({filters});
        this.handlePaginate(1);
    }

    filterData=()=>{
                return this.state.data.filter(dataItem => {
            let result = true;
                if(this.state.filters.ConstructionSiteFilter.value.length > 0 || 
                    this.state.filters.NoteTitleFilter.value.length > 0){
                    result = dataItem.constructionSite.constructionSiteName.toLowerCase().includes(this.state.filters.ConstructionSiteFilter.value.trim().toLowerCase()) 
                            && dataItem.title.toLowerCase().includes(this.state.filters.NoteTitleFilter.value.trim().toLocaleLowerCase());
                }
                return result;
            });
    }

    onAddNote=()=>{

        const {modalInfo} = this.state;
        modalInfo.shouldOpenModal = true;

        this.setState({modalInfo,isAddNewNoteModal:true});
    }

    appendAddButton(filtersArray){
        filtersArray.push(
            <div 
            className="filter-item"
            key={`NoteFilterItem__Add`}
             >
                <button className="btn btn-success" onClick={this.onAddNote}>
                    Dodaj beležnicu
                </button>
            </div>
        );
    }

    renderFilters(){
        let filters = [];
        let index = 0;
        this.appendAddButton(filters);
        const {filters:stateFilters} = this.state;
        for(let filterObj in stateFilters){
            filters.push(
                <div 
                className="filter-item"
                key={`NoteFilterItem__${index}`}
                 >
                <NoteFilter 
                    filter={stateFilters[filterObj]}
                    onFilter={this.handleFilter}
                     />
                </div>
            );
            index++;
        }
        return filters;
    }

    handleItemClick=(id,{target:domElement})=>{
        this.handleCloseModal(domElement, true, id);
    }

    renderItems(){
        if(this.state.data.length === 0){
            return <p>Trenutno nema beležnica, dodaj nove</p>
        }
        let items = this.filterData();
        const data = [];

         let options = {
            pagination:{
                currentPage:this.state.pagination.currentPage,
                itemsPerPage:this.state.pagination.itemsPerPage,
                pageCount:(Math.ceil(items.length/this.state.pagination.itemsPerPage))}
            };

        if(options.pagination.pageCount > 1)
        data.push(<Pagination key="NoteItem__Pagination" options={options} onPaginate={this.handlePaginate}/>)

        items = pageData(items,options.pagination);

        for(let i = 0; i<items.length;i++){
            let item = items[i];
            data.push(
            <NoteItem
            key={`NoteItem__${(i+1)}`}
            noteItem={item}
            index={i}
            onDelete={this.handleDeleteNoteItem}
            onItemClick={this.handleItemClick}
            />);
        }

        return data;
    }

    handleDeleteNoteItem= async (id)=>{
        try{
            await noteClient.deleteNote(parseInt(id));
            window.location.reload()
        }
        catch(err){
            alert("Greska pri brisanju beleznice");
            console.log(err);
        }
    }

    handleCloseModal=(ev, shouldOpenModal = false, newId = 0)=>{
        let {modalInfo} = this.state;
        modalInfo.shouldOpenModal = shouldOpenModal;
        modalInfo.currentlyShowingItemId = newId;
        const isAddNewNoteModal = false;
        this.setState({modalInfo, isAddNewNoteModal});
    }

    renderModal=()=>{
        const {modalInfo} = this.state;
        // const item = this.state.data.find(el=>el.noteId === modalInfo.currentlyShowingItemId);
        let data = modalInfo.isAddNewNoteModal ? [] : this.state.data;
        let dropdownOptions = !modalInfo.isAddNewNoteModal ? this.state.constructionSiteOptions 
                              : this.state.constructionSiteOptions.map(el=>({...el, isSelected: false}));
        return (
        <Modal 
        handleClose={this.handleCloseModal}
        isOpen={modalInfo.shouldOpenModal}>
            <NoteForm 
            data={data}
            displayId={modalInfo.currentlyShowingItemId}
            dropdownOptions={dropdownOptions}
            />
        </Modal>);
    }

    render(){
        return(
        <div className="notes-wrapper">
            <div className="notes-filters-list">
                {this.renderFilters()}
            </div>
            <div className="notes-list"> 
                {this.renderItems()}
            </div>
            {this.state.modalInfo.shouldOpenModal && this.renderModal()}
        </div>
        );
    }
}

export default NotesSelectionLayout;