import React, {Component} from "react";
import TableHeader from "./TableHeader";
import TableBody from "./TableBody";

class Table extends Component{
    //             data:{
    //                 header:[],
    //                 body:[]
    //             }
    state={
        headerOptions:{
            ordering:{
                id:null,
                direction:'asc' // 'asc'-'desc'
            }
        },
        bodyOptions:{

        }
    }

    handleOrderBy=(headerId)=>{
        console.log("Handling order by for header: "+ headerId);
        let {ordering} = this.state.headerOptions;
        if(ordering.id === headerId){
            ordering.direction = ordering.direction === 'asc' ? 'desc' : 'asc';
        }else{
            ordering.id = headerId;
            ordering.direction = 'asc';
        }
        console.log("new ordering", ordering);
        this.setState({headerOptions:{ordering}});
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
    renderBody(){
        if(this.props.data.body && this.props.data.body.length>0){
            return (<TableBody
                data={this.props.data.body}
                options={this.state.bodyOptions}
                />);
        }else{
            return null;
        }
    }

    render(){
        return (
        <table className="table">
            {this.renderHeader()}
            {this.renderBody()}
        </table>);
    }
}

export default Table;