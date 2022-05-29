import React, {Component} from "react";

class TableHeader extends Component{

    renderHeaderData=()=>{
        const headerOptions = this.props.options;
        const {ordering} = headerOptions;

        if(this.props.data){
            return this.props.data.map((item,index)=>{
                if(item.id === "empty")
                {
                    return <th key={`Empty_${index}`}></th>;
                }

                const isActive = ordering.id && ordering.id === item.id;
                const arrowStyle = {
                    transform:`rotate(${ordering.direction === 'asc' ? '-90deg':"90deg"})`,
                    visibility:'visible'
                };
                return (<th 
                    key={item.id} 
                    onClick={()=>this.props.onOrderBy(item.id)}
                    className={isActive ? "active":""}
                    >
                        <span className="header-text">{item.name}</span>
                        <span className="header-arrow" style={isActive ? arrowStyle : {}}>&#10095;</span>
                    </th>);
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