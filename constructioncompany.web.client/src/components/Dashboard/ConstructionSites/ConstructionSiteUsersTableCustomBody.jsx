
function ConstructionSiteUsersTableCustomBody({item, index, itemOrder}){
    return(<tr key={`table-body__${index}`}>
    <td>{itemOrder}</td>
    <td>{item.ime ?? ""}</td>
    <td>{item.prezime ?? ""}</td>
    <td>{item.profesija ?? ""}</td>
    <td>{item.satnica}</td>
</tr>);
}

export default ConstructionSiteUsersTableCustomBody;