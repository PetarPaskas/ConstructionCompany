import React, { Component } from "react";
import { Link } from "react-router-dom";
import {createDashboardOption} from "../common/utils";

class DashboardOptions extends Component
{
    constructor(props){
        super(props);
        this.state = {
            currentOption: this.computeSelectedOption(props)
        };
    }

    computeSelectedOption(props){
        if(props.options){
            let selectedOption = props.options.find(opt=>opt.isSelected);
            if(!selectedOption){
                return ({...createDashboardOption(0,"Izaberi","",""),isSelected:true});
            }
            else
            {
                return ({...selectedOption});
            }
        }
    }

    componentDidUpdate(){
        const newOption = this.computeSelectedOption(this.props);
        if(newOption.id !== this.state.currentOption.id){
            this.setState({currentOption:newOption});
        }
    }
    
    renderCurrentMainOption(){
        const {currentOption:option} = this.state;
        let mainOption = (<React.Fragment>
                {option.popoutPath && 
                option.popoutPath.length > 0 &&
                    <Link to={option.popoutPath} className="popout-button">
                        <span style={{fontWeight:800}}>+</span> Dodaj
                    </Link>
                }
                <div style={{zIndex: 5}} className="hover-dropdown__main-option">
                    <button className="tab-btn tab-btn--main tab-btn--with-popout">
                        <span>{option.displayName}</span>
                    </button>
                <span className="collapsible"></span>
                </div>
        </React.Fragment>
        );
        return mainOption;
    }

    renderOption=(option, index)=>{
        const optionClassName = "tab-btn tab-btn--short";
        const optionStyle = {
            zIndex:4-index,
            transform: `translateY(-${6*(index+1)}%)`
        };
        return (
            <Link 
            key={option.id} 
                to={option.path}
                className={optionClassName}
                style={optionStyle} 
                onClick={()=>{this.props.onUpdateSelectedOption(option.id)}}
                >
                    {option.displayName}
                </Link>
        )
    }

    renderBody=()=>{
        const options = this.props.options.map(this.renderOption);
        return (
            <div className="hover-dropdown">
                {this.renderCurrentMainOption()}
                <div className="hover-dropdown__options-container">
                <div className="hover-dropdown__options-cointainer-mask"></div>
                {options}
                </div>
            </div>

        )
    }
    
    render(){
        return this.renderBody();
    }
}

export default DashboardOptions;