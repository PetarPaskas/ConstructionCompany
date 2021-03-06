import React, {Component} from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import {orderByProperty} from "../utils";

class Table extends Component{
    //             data:{
    //                 header:[], //should have a name and an id
    //                 body:[]  //can have anything
    //             }
    //              customBodyComponent <-- component  <customBodyComponent item={item} index={i} itemOrder={displayIndex}/>
    //              withRowIndex <-- decides if rows should be numbered based on an index

    state = {
        headerOptions:{
            ordering:{
                id:null,
                direction:'asc' // 'asc'-'desc'
            }
        },
        bodyOptions:{

        },
        footerOptions:{
                
        },
        pagination:{
            itemsPerPage:4,
            currentPage:1,
        }
    }

    handlePaginate=(newPage)=>{
        if(newPage !== this.state.pagination.currentPage){
            let {pagination} = this.state;
            pagination.currentPage = newPage;

            this.setState({pagination});
        }
    }

    handleOrderBy=(headerId)=>{
        let {ordering} = this.state.headerOptions;
        if(ordering.id === headerId){
            ordering.direction = ordering.direction === 'asc' ? 'desc' : 'asc';
        }else{
            ordering.id = headerId;
            ordering.direction = 'asc';
        }

        const {pagination} = this.state;
        pagination.currentPage = 1;

        this.setState({headerOptions:{ordering},pagination});
    }

    orderData=()=>{
        let data = [];
        if(this.state.headerOptions.ordering.id){
            data = orderByProperty(
                this.props.data.body, //data
                this.props.data.header.find(h=>h.id === this.state.headerOptions.ordering.id).name, //order name
                this.state.headerOptions.ordering.direction); //direction
        }

        return data.length > 0 ? data : this.props.data.body;
    }

    renderHeader(){
        if(this.props.data.header && this.props.data.header.length>0){
            return (<TableHeader
                onOrderBy={this.handleOrderBy}
                data={this.props.data.header}
                options={this.state.headerOptions}
                />)
        }else{
            return null;
        }
    }

    handleCustomBodyAction=(data)=>{
        if(this.props.customBodyAction){
            this.props.customBodyAction(data);
        }
    }


    renderBody(){
        if(this.props.data.body && this.props.data.body.length>0){

           let data = this.orderData();
           const withRowIndex = this.props.withRowIndex !== undefined && this.props.withRowIndex !== null ? this.props.withRowIndex : true;

            return (<TableBody
                data={data}
                customBodyComponent={this.props.customBodyComponent}
                withRowIndex={withRowIndex}
                options={{...this.state.bodyOptions,pagination:{...this.state.pagination}}}
                onCustomChange={this.handleCustomBodyAction}
                />);
        }else{
            return null;
        }
    }

    renderFooter(){
        if(this.props.data.body.length >= this.state.pagination.itemsPerPage){
            const {pagination} = this.state;
            pagination.pageCount = Math.ceil(this.props.data.body.length / this.state.pagination.itemsPerPage);
            return (
                <TableFooter 
                onPaginate={this.handlePaginate}
                options={{...this.state.footerOptions,pagination}}
                />);
        }
        return null;
    }

    renderDataCounter(){
        if(this.props.data.body && this.props.data.body.length > 0){
            const length = this.props.data.body.length;
            return (<p className="table__data">Trenutno postoji {length} {length === 1 ? "podatak" : length > 1 && length <= 3 ? "podatka" : "podataka"}</p>);
        }
        else{
            return (<p className="table__data">Nema podataka koji se mogu prikazati</p>);
        }
        
    }

    render(){
        return (
        <div className="table__wrapper">
            {this.renderDataCounter()}
        <table className="table">
            {this.renderHeader()}
            {this.renderBody()}
            {this.renderFooter()}
        </table>
        </div>);

    }
}

export default Table;