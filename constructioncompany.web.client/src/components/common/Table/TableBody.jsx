import React, {Component} from "react";

class TableBody extends Component{
    renderHeaderData = ()=>{
        if(this.props.data){
            return this.props.data.map((item,index)=>{
                return (<tr key={`table-body__${index}`}>
                    <td>{index+1}</td>
                    <td>{item.ime ?? ""}</td>
                    <td>{item.prezime ?? ""}</td>
                    <td>{item.profesija ?? ""}</td>
                    <td>{item.radiOd ?? ""}</td>
                    <td>{item.satnica ? `${item.satnica}din/hr` : ""}</td>
                    <td>{item.trenutno ?? ""}</td>
                </tr>);
            })
        }
    }
    render(){
        return (<tbody>
            {this.renderHeaderData()}
        </tbody>);
    }
}

export default TableBody;