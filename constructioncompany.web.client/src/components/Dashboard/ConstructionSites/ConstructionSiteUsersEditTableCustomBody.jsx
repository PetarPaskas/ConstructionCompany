
function ConstructionSiteUsersEditTableCustomBody({item, index, itemOrder, onCustomChange}){
    return(<tr key={`table-body__${index}`}>
    <td>{itemOrder}</td>
    <td>{item.name ?? ""}</td>
    <td>{item.surname ?? ""}</td>
    <td>{item.profession.professionName ?? ""}</td>
    <td>{item.hourlyRate} {item.currency.currencyName}</td>
    <td>
        <input type="checkbox" onChange={()=>{onCustomChange(item.userId);}} checked={item.isSelected} name={item.displayName}/>
    </td>
    </tr>
    );
}

export default ConstructionSiteUsersEditTableCustomBody;
