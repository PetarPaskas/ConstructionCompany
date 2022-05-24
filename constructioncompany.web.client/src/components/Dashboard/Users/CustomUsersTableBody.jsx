import React from 'react';
import {formatDateFunction} from "../../common/utils";
import { Link } from 'react-router-dom';

function CustomUsersTableBody({item, index, itemOrder})
{
    return (
         <tr key={`table-body__${index}`}>
            <td>{itemOrder}</td>
            <td><Link to={`/Dashboard/Radnici/${item.id}`}>{item.ime ?? ""}</Link></td>
            <td>{item.prezime ?? ""}</td>
            <td>{item.profesija ?? ""}</td>
            <td>{formatDateFunction(item.radiOd) ?? ""}</td>
            <td>{item.satnica ? `${item.satnica}din/hr` : ""}</td>
            <td>{item.trenutno ?? ""}</td>
        </tr>);
}

export default CustomUsersTableBody;