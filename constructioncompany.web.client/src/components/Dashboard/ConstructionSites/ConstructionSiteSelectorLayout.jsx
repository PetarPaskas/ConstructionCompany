import React, {Component} from "react";
import {createFakeDataForConstructionSite, pageData, getFilter} from "../../common/utils";
import ConstructionSiteTab from "../../common/ConstructionSiteTab";
import Pagination from "../../common/Pagination";
import ConstructionSiteFilters from "./ConstructionSiteFilters";

class ConstructionSiteSelectorLayout extends Component{
    state={
        data:[],
        pagination:{
            itemsPerPage: 4,
            currentPage:1,
            pageCount:0
        },
        filters:{
            CityFilter: {
                type:"text",
                id:"CityFilter",
                name:"CityFilter",
                title:"Odaberi grad",
                for:"CityName",
                value:""
            },
            ClientFilter: {
                type:"text",
                id:"ClientFilter",
                name:"ClientFilter",
                title:"Odaberi Klijenta",
                for:"Client.Name",
                value:""
            } 
        }
    }

    componentDidMount(){
        let data = createFakeDataForConstructionSite();
        this.setState({data});
    }

    filterData=()=>{
        return this.state.data.filter(dataItem => {
            let result = true;
                if(this.state.filters.CityFilter.value.length > 0 ||
                    this.state.filters.ClientFilter.value.length > 0){
                    result = dataItem.CityName.toLowerCase().includes(this.state.filters.CityFilter.value.trim().toLowerCase()) &&
                            dataItem.Client.Name.toLowerCase().includes(this.state.filters.ClientFilter.value.trim().toLowerCase());
                }
                return result;
            });
    }

    renderConstructionSiteTabs(){
        let filteredData = this.filterData();
        if(filteredData.length > 0)
        {
            
            let returnData = pageData(filteredData,this.state.pagination).map((item,index)=>{
                return <ConstructionSiteTab history={this.props.history} key={`ConstructionSiteTab__${index}`} data={item}/>
            });

            if(returnData.length % 2 !== 0){
                returnData.push(<div key={`Empty__${Math.random()*1000}`} className="construction-site__item" style={{visibility:'hidden'}}></div>);
            }

            return returnData;
        }
    }

    handlePaginate=(newPage)=>{
        if(newPage !== this.state.pagination.currentPage){
            let {pagination} = this.state;
            pagination.currentPage = newPage;

            this.setState({pagination});
        }
    }

    renderConstructionLayoutPagination(){
        let filteredData = this.filterData();
        if(filteredData.length <= this.state.pagination.itemsPerPage)
        {
            return null;
        }
        let options = {
            pagination:{
                currentPage:this.state.pagination.currentPage,
                pageCount:(Math.ceil(filteredData.length/this.state.pagination.itemsPerPage))
            }
        };
        return (<Pagination options={options} onPaginate={this.handlePaginate}/>);
    }

    handleFilter=(e)=>{
        const filterName = e.target.id;
        const {filters} = this.state;

        let newValue = {...filters[filterName], value:e.target.value};
        filters[filterName] = newValue;

        this.setState({filters});
    }

    renderFiltersLayout(){
        let filters = [];
        const {filters:stateFilters} = this.state;
        for(let filterObj in stateFilters){
            filters.push(
                <ConstructionSiteFilters 
                    key={`Filter__${filterObj}`}
                    filter={stateFilters[filterObj]}
                    onFilter={this.handleFilter}
                     />
            );
        }
        return filters;
        
    }

    renderInitialLayout(){
        return(
        <div className="construction-site__layout">
            <div className="construction-site__filters">
                {this.renderFiltersLayout()}
            </div>
            <div className="construction-site__content">
                {this.renderConstructionSiteTabs()}
                {this.renderConstructionLayoutPagination()}
            </div>
        </div>);
    }

    render(){
        return this.renderInitialLayout();
    }
}

export default ConstructionSiteSelectorLayout;