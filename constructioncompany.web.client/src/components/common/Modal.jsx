import { Component } from "react";

class Modal extends Component{
    
    render(){
        return (this.props.isOpen ? 
        (<div className="modal-window">
            <div className="modal-shadow" onClick={this.props.handleClose}></div>
            <div className="modal-item">
                {this.props.children}
            </div>
        </div>)
        : null);
    }
}

export default Modal;