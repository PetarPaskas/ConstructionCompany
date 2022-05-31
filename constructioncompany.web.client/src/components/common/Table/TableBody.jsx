import React, {Component} from "react";

class TableBody extends Component{

    basicRender=(object)=>{
        let arr = [];
        for(let property in object){
            arr.push(
                <td key={property}>{object[property] ?? ""}</td>
            );
        }
        return arr;
    }

    renderBodyData = ()=>{
        if(this.props.data){
            let {data} = this.props;
            let {pagination} = this.props.options;
            let rows = [];
            let endIndex = pagination.currentPage * pagination.itemsPerPage;
            let startIndex = endIndex - pagination.itemsPerPage;

            for(let i = 0; i<data.length;i++){
                let displayIndex = i+1;

                if(i < endIndex && i >= startIndex){
                    let item = data[i];
                    if(!this.props.customBodyComponent){
                        rows.push(
                            <tr key={`table-body__${i}`}>
                            {this.props.withRowIndex && <td>{displayIndex}</td>}
                            {this.basicRender(item)}
                            </tr>
                        );
                    }else{
                        let CustomBodyComponent = this.props.customBodyComponent;
                        rows.push(<CustomBodyComponent onCustomChange={this.props.onCustomChange} key={`CustomBodyKey__${displayIndex}`} item={item} index={i} itemOrder={displayIndex} />);
                    }

                }
            }
            return rows;
        }
    }
    render(){
        return (<tbody>
            {this.renderBodyData()}
        </tbody>);
    }
}

export default TableBody;