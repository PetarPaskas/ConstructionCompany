import { Link } from 'react-router-dom';
 
function ConstructionSiteUsersTableCustomBody({item, index, itemOrder}){
    return(<tr key={`table-body__${index}`}>
    <td>{itemOrder}</td>
    <td><Link to={`/Dashboard/Radnici/${item.id}`}>{item.ime ?? ""}</Link></td>
    <td>{item.prezime ?? ""}</td>
    <td>{item.profesija ?? ""}</td>
    <td>{item.satnica}</td>
    </tr>
    );
}
export default ConstructionSiteUsersTableCustomBody;