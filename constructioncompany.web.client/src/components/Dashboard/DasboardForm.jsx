import Form from '../common/Form';
import GridContainer from '../common/GridContainer';
import DashboardOptions from "./DashboardOptions";
import {createDashboardOption} from "../common/utils";
import DashboardBody from './DashboardBody';

class DashboardForm extends Form
{   

    state={
        menuPosition:"left",
        options:[
            {...createDashboardOption(1,"Radnici","/Dashboard/Radnici","/New")},
            {...createDashboardOption(2,"Gradilišta","/Dashboard/Gradilista","/New")}
        ]
    }

    handleUpdateSelectedOption=(id)=>{
        if(!this.state.options.find(opt=>opt.id === id).isSelected){
            const newOptions = this.state.options.map(option=>{
                if(option.id===id){
                    return {...option,isSelected:true}
                }
                return {...option,isSelected:false}
            });
            this.setState({options:newOptions});
        }
    }
    
    render(){
        return (
            <GridContainer
            positioning={this.state.menuPosition}
            >
                <div className='dashboard__menu'>
                    <DashboardOptions
                        options={this.state.options}
                        onUpdateSelectedOption={this.handleUpdateSelectedOption}
                    />
                </div>
                <div className='dashboard__content'>
                    <DashboardBody />
                </div>
            </GridContainer>
            );
    }
}

export default DashboardForm;