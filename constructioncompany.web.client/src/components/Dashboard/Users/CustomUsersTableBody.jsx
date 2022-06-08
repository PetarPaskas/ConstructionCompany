import React from 'react';
import {formatDateFunction} from "../../common/utils";
import { Link } from 'react-router-dom';

function CustomUsersTableBody({item, index, itemOrder})
{
    return (
         <tr key={`table-body__${index}`}>
            <td>{itemOrder}</td>
            <td><Link to={`/Dashboard/Radnici/${item.userId}`}>{item.name ?? ""}</Link></td>
            <td>{item.surname ?? ""}</td>
            <td>{item.profession.professionName ?? ""}</td>
            <td>{formatDateFunction(item.employmentStartDate) ?? ""}</td>
            <td>{item.hourlyRate} {item.currency.currencyName}</td>
            <td>{item.constructionSite?.constructionSiteName ?? ""}</td>
        </tr>);
}

export default CustomUsersTableBody;