import { Component } from "react";

class Dropdown extends Component{

    state={
        shouldRenderOptions:false,
        defaultSelectedOption:false,
        isMultiselect:this.props.multiSelect,
        selection: this.props.selection,
        //multiselectBuffer:[]
    }

    updateDefaultSelectedOption=()=>{
        const {options} = this.props;
        const {defaultSelectedOption:currOption} = this.state;
        let newOption = false;
        if(options && options.length > 0){
            newOption = options.find(el=>el.isSelected);
        }

        if(currOption !== newOption){
            let prevUpdated = false;
            if(typeof(currOption) === 'object' && typeof(newOption) === 'object'){
                if(currOption.id !== newOption.id){
                    prevUpdated = true;
                    this.setState({defaultSelectedOption:newOption});
                }
            }
            if(!prevUpdated){
                this.setState({defaultSelectedOption:newOption});
            }
        }
    }


    handleDropdownClick=(e, isFromMultiSelect = false)=>{

        !isFromMultiSelect && this.setState({shouldRenderOptions:false});

        const data = {
            id:e.target.dataset.optionId,
            value: e.target.dataset.optionValue
        };

        const {selection} = e.target.dataset;

        this.props.handleDropdownClick(data,selection);
    }

    componentDidMount(){
        this.updateDefaultSelectedOption();
    }
    componentDidUpdate(){
        this.updateDefaultSelectedOption();
    }

    handleMultiSelect=(e)=>{
        this.handleDropdownClick(e, true);
    }

    finishMultiSelect=(e)=>{
        if(e.target.dataset.type === "confirm_selection"){
        }

        if(e.target.dataset.type === "reset_selection"){
           this.props.onResetSelection(this.state.selection);
        }

       this.setState({shouldRenderOptions:false});
    }

    renderOptions(){
        const {options} = this.props
        if(options && options.length>0)
        {
            return options.map((option,index)=>(
            <li key={`Option_${index}`} 
                className={`dropdown__item ${option.isSelected ? "active" : ""}`}
                data-option-id={option.id} 
                data-option-value={option.value} 
                data-selection={this.state.selection}
                onClick={(e)=>{
                    if(this.state.isMultiselect){
                       this.handleMultiSelect(e);
                    }else{
                        this.handleDropdownClick(e);
                    }
                }}
            >
                {option.value}
            </li>));
        }
        else return null;
    }

    renderMultiSelectOptions(){
        return (<li key="Option__multiselect"
                className={`dropdown__item dropdown__item--multiselect`}
            >
               <span data-type="confirm_selection" onClick={this.finishMultiSelect}>&#10003;</span>
               <span data-type="reset_selection" onClick={this.finishMultiSelect}>&#10008;</span>
            </li>);
    }

    renderLabelText=()=>{
        return this.state.isMultiselect ? (this.props.name ? 
                    `Izaberi ${this.props.name}` : 
                    "Izaberi") :
        (this.state.defaultSelectedOption ?  
                    `${this.state.defaultSelectedOption.value}` : 
                    this.props.name ? 
                        `Izaberi ${this.props.name}` : 
                        "Izaberi");
    }

    renderDropdown(){
        const elementId = this.props.id ?? `Dropdown_${Math.floor(Math.random()*1000)}`;
        return (    
        <div className="dropdown">
            <label className="dropdown__label" htmlFor={elementId}>{this.renderLabelText()}</label>
            <input type="checkbox" onChange={()=>{this.setState({shouldRenderOptions:!this.state.shouldRenderOptions})}} checked={this.state.shouldRenderOptions} className="dropdown__open" id={elementId} name={elementId}/>
            <ul className="dropdown__menu">
            {this.state.shouldRenderOptions && this.renderOptions()}
            {this.state.isMultiselect && this.renderMultiSelectOptions()}
            </ul>
    </div>);
    }

    render(){
        return this.renderDropdown();
    }
}

export default Dropdown;