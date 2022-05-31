import { Component } from "react";
import { NavLink } from "react-router-dom";

class Navbar extends Component{

    render(){
        return(
        <nav className="navbar navbar-light bg-green">
            <ul className="navlist">
                <li>
                    <NavLink className="nav-btn" to="/Notes">Beležnice</NavLink>
                </li>
                <li>
                    <NavLink className="nav-btn" to="/Dashboard">Glavna</NavLink>
                </li>
                <li>
                <NavLink className="nav-btn" to="/Export">XLS Export</NavLink>
                </li>
            </ul>
        </nav>
        );
    }
}

export default Navbar;