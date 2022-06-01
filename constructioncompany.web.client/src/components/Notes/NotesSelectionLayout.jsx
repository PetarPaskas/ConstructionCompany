import React, { Component } from "react";
import NoteItem from "./NoteItem";
import {pageData, createFakeDataForNotes} from "../common/utils";
import Pagination from "../common/Pagination";
import NoteFilter from "./NoteFilter";  
import Modal from "../common/Modal";
import NoteForm from "./NoteForm";

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

    componentDidMount(){
        const data = createFakeDataForNotes();
       const queryStringData = this.readQueryString();
       if(queryStringData){
        const {filters} = this.state;

       for(let prop in queryStringData){
           filters[prop].value = queryStringData[prop];
       }
       this.setState({data,filters});
       }else{
        this.setState({data});
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
    }

    filterData=()=>{
        //For if you want to include radnik filter
        // return this.state.data.filter(dataItem => {
        //     let result = true;
        //         if(this.state.filters.RadnikFilter.value.length > 0 ||
        //             this.state.filters.ConstructionSiteFilter.value.length > 0){
        //             result = dataItem.user.name.toLowerCase().includes(this.state.filters.RadnikFilter.value.trim().toLowerCase()) &&
        //                     dataItem.constructionSite.name.toLowerCase().includes(this.state.filters.ConstructionSiteFilter.value.trim().toLowerCase());
        //         }
        //         return result;
        //     });
                return this.state.data.filter(dataItem => {
            let result = true;
                if(this.state.filters.ConstructionSiteFilter.value.length > 0){
                    result = dataItem.constructionSite.name.toLowerCase().includes(this.state.filters.ConstructionSiteFilter.value.trim().toLowerCase());
                }
                return result;
            });
    }

    onAddNote=()=>{
        // modalInfo:{
        //     shouldOpenModal:false,
        //     currentlyShowingItemId:0,
        //     isAddNewNoteModal:false
        // }

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

    handleDeleteNoteItem=(id)=>{
        console.log("Deleting note item "+id);
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
        return (
        <Modal 
        handleClose={this.handleCloseModal}
        isOpen={modalInfo.shouldOpenModal}>
            <NoteForm 
            data={data}
            displayId={modalInfo.currentlyShowingItemId}/>
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