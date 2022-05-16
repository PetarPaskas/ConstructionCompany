import {Component} from "react";

class TableFooter extends Component{

    renderListItems=()=>{
        const {pagination} = this.props.options;
        let pages = [];
        for(let i = 1; i<=pagination.pageCount;i++){
            pages.push(
                <li 
                key={`page-item__${i}`} 
                className="page-item"
                onClick={()=>{this.props.onPaginate(i)}}
                >
                    <button 
                    className={`page-link ${pagination.currentPage === i ? "active" : ""}`}
                    >
                        {i}
                    </button>
                </li>
            );
        }
        let next = pagination.currentPage+1 > pagination.pageCount ? pagination.currentPage : pagination.currentPage + 1;
        let previous = pagination.currentPage - 1 < 1 ? pagination.currentPage : pagination.currentPage - 1;
        return (
            <ul className="pagination">
                <li className="page-item"
                onClick={()=>{this.props.onPaginate(previous)}}
                >
                    <button className="page-link">Prethodna</button>
                </li>
                {pages}
                <li className="page-item"
                onClick={()=>{this.props.onPaginate(next)}}
                >
                    <button className="page-link">Sledeća</button>
                </li>
            </ul>
        );
    }

    render(){
        return (<tfoot>
            <tr className="pagination-row">
                <td className="pagination-data">
                    {this.renderListItems()}
                </td>

            </tr>
        </tfoot>);
    }
}

export default TableFooter;