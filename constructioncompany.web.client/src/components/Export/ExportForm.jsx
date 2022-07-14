import Form from "../common/Form";
import Calendar from "../common/Calendar";
import ConstructionSiteUsersEditTableCustomBody from "../Dashboard/ConstructionSites/ConstructionSiteUsersEditTableCustomBody"
import Table from "../common/Table/Table";
import {headersForConstructionSiteUsersEditTableCustomBody} from "../common/utils";
import usersClient from "../http/usersClient";

class ExportForm extends Form{
    state={
        date:new Date(),
        selectedDays:[],
        workerList:[],
        data:{
            users:[]
        },
        steps:{
            calendarSelectorStep:true,
            workerSelectorStep:false,
            workerDescripeStep:false
        }
    }

    async componentDidMount(){
        const usersOptions = (await usersClient.getAll()).data.map(el=>({...el,isSelected:false}));
        const data = {
            users:usersOptions
        };

        console.log(usersOptions);

        this.setState({data});
    }

    // renderCalendarForDate(){
    //     //Zelimo januar 2019
    //     const jan2019 = new Date(2019, this.datum["Jan"]+1, 0);
    //     console.log("Januar 2019",jan2019);
    //     let kalendar = [];
    //     let weeks = Math.ceil(jan2019.getDate()/7);

    //     for(let i = 1; i<=jan2019.getDate();i++){
    //         kalendar.push(
    //             (<div key={`$day__${i}`} className={`day ${i%7 === 0 ? "day-sunday" : ""}`}>
    //                 {i}
    //             </div>));
    //     }

    //     return kalendar;

    // }

    renderCalendarSelectorStep(){
        return <Calendar
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
        let workerList = [...this.state.workerList];
        let users = this.state.data.users.map(el=>({...el}));

        if(workerList.some(el=>el===userId)){
            workerList = workerList.filter(el=>el !== userId);
            users.find(user=>user.userId === userId).isSelected = false;
        }
        else{
            workerList.push(userId);
            users.find(user=>user.userId === userId).isSelected = true;
        }

        console.log(workerList);
        this.setState({workerList:workerList, data:{users:users}});
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
        
            console.log("New steps => ", steps);
            this.setState({steps:steps});
        
    }

    renderStepsChooser(){
        const {steps} = this.state;
        let currentStep;
        if(steps.calendarSelectorStep)
            currentStep = "[1/3] Izaberi datum";
        if(steps.workerSelectorStep)
            currentStep = "[2/3] Izaberi radnike";
        if(steps.workerDescripeStep)
            currentStep = "[3/3] Opisi radnike";

        return <div className="step-buttons">
                <div className="step-buttons--element">
                    {/* <p className="step-buttons--title">Prethodni korak</p> */}
                    <button className="step-button" onClick={(e)=>this.chooseStep('previous')}>&lt;</button>
                </div>
                <div className="step-buttons--element">
                    <span className="step-buttons--header-text">{currentStep}</span>
                </div>
                <div className="step-buttons--element">
                    {/* <p className="step-buttons--title">Sledeći korak</p> */}
                    <button className="step-button" onClick={(e)=>this.chooseStep('next')}>&gt;</button>
                </div>
            </div>
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
    }

    render(){
       return (
       <div className='export'>
        {this.renderStepsChooser()}
        {this.decideRenderStep()}
        </div>);
    }
}

//ConstructionSiteUsersEditTableCustomBody
//Table
export default ExportForm;