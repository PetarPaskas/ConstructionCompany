import Form from "../common/Form";
import Calendar from "../common/Calendar";
import ConstructionSiteUsersEditTableCustomBody from "../Dashboard/ConstructionSites/ConstructionSiteUsersEditTableCustomBody"
import Table from "../common/Table/Table";
import {headersForConstructionSiteUsersEditTableCustomBody} from "../common/utils";
import usersClient from "../http/usersClient";
import miscClient from "../http/miscClient";
import GroupDescribeForm from "../common/GroupDescribeForm";

class ExportForm extends Form{
    state={
        date:new Date(),
        selectedDays:[],
        selectedWorkers:[],
        data:{
            users:[],
            constructionSiteOptions:[]
        },
        steps:{
            calendarSelectorStep:true,
            workerSelectorStep:false,
            workerDescribeStep:false
        }
    }

    async componentDidMount(){
        const usersOptions = (await usersClient.getAll()).data.map(el=>({...el,isSelected:false}));
        const {constructionSiteOptions} = (await miscClient.getAllOptions()).data;
        const data = {
            users:usersOptions,
            constructionSiteOptions
        };

        this.setState({data});
    }

    renderCalendarSelectorStep(){
        return <Calendar
            selectedDays={this.state.selectedDays}
            onCalendarClick={this.selectDay}
            />
    }

    renderWorkerSelectorStep(){
        const header = headersForConstructionSiteUsersEditTableCustomBody();
        header.push({id:"empty"});
        let data = {
            header:header,
            body:this.state.data.users
        };
        return <div className="users-table">
            <Table
            data={data}
            withRowIndex={false}
            customBodyComponent={ConstructionSiteUsersEditTableCustomBody}
            customBodyAction={this.chooseWorkerOnClick}
            />
            </div>
    }

    chooseWorkerOnClick=(userId)=>{
        let selectedWorkers = [...this.state.selectedWorkers];
        let users = this.state.data.users.map(el=>({...el}));

        if(selectedWorkers.some(el=>el===userId)){
            selectedWorkers = selectedWorkers.filter(el=>el !== userId);
            users.find(user=>user.userId === userId).isSelected = false;
        }
        else{
            selectedWorkers.push(userId);
            users.find(user=>user.userId === userId).isSelected = true;
        }

        this.setState({selectedWorkers:selectedWorkers, data:{users:users}});
    }

    chooseStep=(step)=>{
        const steps = {...this.state.steps};
        const keys = Object.keys(steps);

            for(let i = 0;i<keys.length;i++){
                if(steps[keys[i]]){
                    if(step === 'next'){
                        if((i+1) < keys.length){
                            steps[keys[i]] = false;
                            steps[keys[i+1]] = true;
                        }
                    }
                    if(step === 'previous'){
                        if((i-1) >= 0){
                            steps[keys[i]] = false;
                            steps[keys[i-1]] = true;
                        }

                    }
                    break;
                }
            }
        
            this.setState({steps:steps});
    }

    renderStepsChooser(){
        const {steps} = this.state;
        let currentStep;
        if(steps.calendarSelectorStep)
            currentStep = "[1/3] Izaberi datum";
        if(steps.workerSelectorStep)
            currentStep = "[2/3] Izaberi radnike";
        if(steps.workerDescribeStep)
            currentStep = "[3/3] Opisi radnike";

        return <div className="step-buttons">
                <div className="step-buttons--element">
                    <button className="step-button" onClick={(e)=>this.chooseStep('previous')}>&lt;</button>
                </div>
                <div className="step-buttons--element">
                    <span className="step-buttons--header-text">{currentStep}</span>
                </div>
                <div className="step-buttons--element">
                    <button className="step-button" onClick={(e)=>this.chooseStep('next')}>&gt;</button>
                </div>
            </div>
    }

    renderWorkerDescribeStep(){
        const {constructionSiteOptions, users} = this.state.data;
        const {selectedDays} = this.state;
        const items = users;
        const options = constructionSiteOptions;
        return <GroupDescribeForm
                items={items}
                displayField={["name","nickname","surname"]}
                selectedDays={selectedDays}
                options={options}
                />;
    }

    selectDay = (day)=>{
        let days = [...this.state.selectedDays];
        if(days.some(el=>el===day))
            days = days.filter(el=>el !== day);
        else
            days.push(day);

        this.setState({selectedDays:days});
    }

    decideRenderStep(){
        const {steps} = this.state;

        if(steps.calendarSelectorStep)
            return this.renderCalendarSelectorStep();
        
        if(steps.workerSelectorStep)
            return this.renderWorkerSelectorStep();

        if(steps.workerDescribeStep)
            return this.renderWorkerDescribeStep();
    }

    render(){
       return (
       <div className='export'>
        {this.renderStepsChooser()}
        {this.decideRenderStep()}
        </div>);
    }
}

export default ExportForm;