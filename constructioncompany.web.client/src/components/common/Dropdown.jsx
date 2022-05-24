import { Component } from "react";

class Dropdown extends Component{

    constructor(props){
        super(props);

        if(props && props.length > 0){
            this.defaultSelectedOption = props.options.find(el=>el.isSelected);
        }
        else{
            this.defaultSelectedOption = false;
        }

    }

    state={
        shouldRenderOptions:false
    }

    renderOptions(){
        const {options} = this.props
        if(options && options.length>0)
        {
            return options.map((option,index)=>(
            <li key={`Option_${index}`} 
                className="dropdown__item"
                data-option-id={option.id} 
                data-option-value={option.value} 
                onClick={(e)=>{
                    this.setState({shouldRenderOptions:false})
                    this.props.handleDropdownClick(e);
                }}
            >
                {option.name}
            </li>));
        }
        else return null;
    }

    renderDropdown(){
        const elementId = this.props.id ?? `Dropdown_${Math.floor(Math.random()*1000)}`;
        return (    
        <div className="dropdown">
            <label className="dropdown__label" htmlFor={elementId}>{this.defaultSelectedOption ?  `${this.defaultSelectedOption.name}` : this.props.name ? `Izaberi ${this.props.name}` : "Izaberi"}</label>
            <input type="checkbox" onChange={()=>{this.setState({shouldRenderOptions:!this.state.shouldRenderOptions})}} checked={this.state.shouldRenderOptions} className="dropdown__open" id={elementId} name={elementId}/>
            <ul className="dropdown__menu">
            {this.state.shouldRenderOptions && this.renderOptions()}
            </ul>
    </div>);
    }

    render(){
        return this.renderDropdown();
    }
}

export default Dropdown;