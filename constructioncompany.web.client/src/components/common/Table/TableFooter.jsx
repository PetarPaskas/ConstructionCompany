import {Component} from "react";
import Pagination from "../Pagination";

class TableFooter extends Component{

    render(){
        return (<tfoot>
            <tr className="pagination-row">
                <td className="pagination-data">
                    {<Pagination options={this.props.options} onPaginate={this.props.onPaginate}/>}
                </td>
            </tr>
        </tfoot>);
    }
}

export default TableFooter;