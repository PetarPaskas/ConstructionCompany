import React from 'react';
import {formatDateFunction} from "../../common/utils";

function CustomRadniciTableBody({item, index, itemOrder})
{
    return (
         <tr key={`table-body__${index}`}>
            <td>{itemOrder}</td>
            <td>{item.ime ?? ""}</td>
            <td>{item.prezime ?? ""}</td>
            <td>{item.profesija ?? ""}</td>
            <td>{formatDateFunction(item.radiOd) ?? ""}</td>
            <td>{item.satnica ? `${item.satnica}din/hr` : ""}</td>
            <td>{item.trenutno ?? ""}</td>
        </tr>);
}

export default CustomRadniciTableBody;