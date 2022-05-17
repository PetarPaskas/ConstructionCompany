import React, {Component} from "react";
import {createFakeDataForConstructionSite, pageData} from "../../common/utils";
import ConstructionSiteTab from "../../common/ConstructionSiteTab";
import Pagination from "../../common/Pagination";

class ConstructionSiteLayout extends Component{
    state={
        data:[],
        pagination:{
            itemsPerPage: 4,
            currentPage:1,
            pageCount:0
        }
    }

    componentDidMount(){
        let data = createFakeDataForConstructionSite();
        this.setState({data});
    }

    renderConstructionSiteTabs(){
        if(this.state.data.length > 0)
        {
            
            let returnData = pageData(this.state.data,this.state.pagination).map((item,index)=>{
                return <ConstructionSiteTab key={`ConstructionSiteTab__${index}`} data={item}/>
            });

            if(returnData.length % 2 !== 0){
                returnData.push(<div className="construction-site__item" style={{visibility:'hidden'}}></div>);
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
        if(this.state.data.length <= this.state.pagination.itemsPerPage)
        {
            return null;
        }
        let options = {
            pagination:{
                currentPage:this.state.pagination.currentPage,
                pageCount:(Math.ceil(this.state.data.length/this.state.pagination.itemsPerPage))
            }
        };
        return (<Pagination options={options} onPaginate={this.handlePaginate}/>);
    }

    renderInitialLayout(){
        return(<div className="construction-site__layout">
        <div className="construction-site__filters">

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

export default ConstructionSiteLayout;