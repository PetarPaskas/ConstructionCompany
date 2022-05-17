import { Component } from "react";

class Dropdown extends Component{


    renderDropdown(){
        const elementId = this.props.id ?? `Dropdown_${Math.floor(Math.random()*1000)}`;
        return (    
        <div className="dropdown">
            <label className="dropdown__label" htmlFor={elementId}>Izaberi grad</label>
            <input type="checkbox" className="dropdown__open" id={elementId} name={elementId}/>
            <ul className="dropdown-menu">
                <li className="dropdown-item">Beograd</li>
                <li className="dropdown-item">Slankamen</li>
                <li className="dropdown-item">Strazilovo</li>
            </ul>
    </div>);
    }

    render(){
        return this.renderDropdown();
    }
}

export default Dropdown;