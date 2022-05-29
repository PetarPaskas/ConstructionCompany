import React, { Component } from "react";
import NoteItem from "./NoteItem";
import {pageData} from "../common/utils";
import NoteFilter from "./NoteFilter";  

class NotesForm extends Component{

    state={
        data:[

        ],
        pagination:{
            itemsPerPage: 5,
            currentPage: 1
        },
        filters:{
            RadnikFilter: {
                type:"text",
                id:"RadnikFilter",
                name:"RadnikFilter",
                title:"Unesi ime radnika",
                for:"CityName",
                value:""
            },
            ConstructionSiteFilter: {
                type:"text",
                id:"ConstructionSiteFilter",
                name:"ConstructionSiteFilter",
                title:"Unesi ime gradilišta",
                for:"Client.Name", //Probably property of the object we're targeting
                value:""
            } 
        }
    }

    componentDidMount(){

    }

    renderFilters(){
        let filters = [];
        const {filters:stateFilters} = this.state;
        for(let filterObj in stateFilters){
            filters.push(
                <div className="filter-item">
                <NoteFilter 
                    key={`Filter__${filterObj}`}
                    filter={stateFilters[filterObj]}
                    onFilter={this.handleFilter}
                     />
                </div>

            );
        }
        return filters;
    }

    renderItems(){
        return <NoteItem/>
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
        </div>
        );
    }
}

export default NotesForm;