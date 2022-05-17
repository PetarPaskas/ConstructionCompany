
    function Pagination({options, onPaginate}){
        const {pagination} = options;
        let pages = [];
        for(let i = 1; i<=pagination.pageCount;i++){
            pages.push(
                <li 
                key={`page-item__${i}`} 
                className="page-item"
                onClick={()=>{onPaginate(i)}}
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
                onClick={()=>{onPaginate(previous)}}
                >
                    <button className="page-link">Prethodna</button>
                </li>
                {pages}
                <li className="page-item"
                onClick={()=>{onPaginate(next)}}
                >
                    <button className="page-link">Sledeća</button>
                </li>
            </ul>
        );
    }

    export default Pagination;