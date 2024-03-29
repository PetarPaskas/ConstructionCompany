import { Component } from "react";
import {getFullCurrentMonth, getDateMonthSrb, decideDayClassName, equalDates} from "../common/utils";

/*
    props => date[] selectedDays 
*/

class Calendar extends Component{

    state={
        currDate: this.props.date || getFullCurrentMonth()
    }

    changeCurrDate=(e)=>{
        const {currDate} = this.state;
        const newCurrDate = getFullCurrentMonth(new Date(e.target.value));

        if(!equalDates(newCurrDate,currDate)){
            
            this.setState({currDate:newCurrDate});
        }
    }

    renderCalendarDays=()=>{
        let {currDate} = this.state;
        let weeks = Math.ceil(currDate.getDate()/7);
        let today = new Date();
        let kalendarDays = [];

        for(let i = 1; i<=currDate.getDate();i++){
            let isToday = false;
            let isAlreadySelected = false;
            let date = new Date(currDate.getFullYear(), currDate.getMonth(),i);

            if(equalDates(date,today))
            {
                isToday = true;
            }
            if(this.props.selectedDays && this.props.selectedDays.some(sel=>equalDates(sel,date))){
                isAlreadySelected = true;
            }
            kalendarDays.push(
                (<div key={`$day__${i}`} 
                 onClick={(e)=>this.handleCalendarClick(e,{date:date, day:i, month:date.getMonth()+1, year:date.getFullYear()})}
                className={decideDayClassName(i, isToday, isAlreadySelected)}>
                    {i}
                </div>));
        }

        return kalendarDays;
    }

    handleCalendarClick=(e, data)=>{
       //e.target.classList.toggle("day--selected");
        if(this.props.onCalendarClick)
        {
            this.props.onCalendarClick(data);
        }
        else
        {
            console.error("Calendar.jsx:33 You haven't implemented onCalendarClick");
        }
    }

    renderDayNames(){
        const days = ["Pon","Uto","Sre","Čet","Pet","Sub","Ned"];
        const retData = [];
        days.forEach((day,index)=>{
            retData.push(
            <div 
            className="day-in-week"
            key={`${day}__${index}`}>
                <span>{day}</span>
            </div>);
        });

        return retData;
    }

    renderDateChooser(){
        const currMonthString = `${this.state.currDate.getFullYear()}-${(this.state.currDate.getMonth()+1) < 10 ? "0"+(this.state.currDate.getMonth()+1): (this.state.currDate.getMonth()+1)}`;
        const input = <input type="month" 
        id="calendar__month-chooser" 
        name="calendar__month-chooser"
        className="calendar__month-chooser"
        onChange={this.changeCurrDate}
        value={currMonthString}
        />;

        return (<label 
        className="calendar__month-chooser--label"
        htmlFor="calendar__month-chooser">
            {input}
        </label>
        );
    }

    render(){
        return <div className="calendar-wrapper">
            <div className="calendar-header">
                    <h2>{getDateMonthSrb(this.state.currDate)}</h2>
                    {this.renderDateChooser()}
            </div>
            <div className="calendar">
                {this.renderDayNames()}
                {this.renderCalendarDays()}
            </div>
            <div className="calendar-footer">
            </div>
        </div>;
    }
}
export default Calendar;