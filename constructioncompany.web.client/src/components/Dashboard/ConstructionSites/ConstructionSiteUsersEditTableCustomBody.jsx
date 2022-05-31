
function ConstructionSiteUsersEditTableCustomBody({item, index, itemOrder, onCustomChange}){
    return(<tr key={`table-body__${index}`}>
    <td>{itemOrder}</td>
    <td>{item.ime ?? ""}</td>
    <td>{item.prezime ?? ""}</td>
    <td>{item.profesija ?? ""}</td>
    <td>{item.satnica}</td>
    <td>
        <input type="checkbox" onChange={()=>{onCustomChange(item.id);}} name={item.ime}/>
    </td>
    </tr>
    );
}

export default ConstructionSiteUsersEditTableCustomBody;
