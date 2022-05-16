import React, {Component} from "react";

class TableHeader extends Component{

    renderHeaderData=()=>{
        if(this.props.data){
            return this.props.data.map((item,index)=>{
                return (<th key={item.id} onClick={()=>this.props.onOrderBy(item.id)}>{item.name}</th>);
            });
        }
    }

    render(){
        return (
        <thead>
            <tr>
                <th></th>
                {this.renderHeaderData()}
            </tr>
        </thead>);
    }
}

export default TableHeader;