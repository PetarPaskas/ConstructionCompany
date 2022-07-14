import { Component } from "react";
import {getFullCurrentMonth, getDateMonthSrb} from "../common/utils";

class Calendar extends Component{

    state={
        currDate: this.props.date || getFullCurrentMonth()
    }

    renderCalendarDays=()=>{
        let {currDate} = this.state;
        let weeks = Math.ceil(currDate.getDate()/7);

        let kalendarDays = [];

        for(let i = 1; i<=currDate.getDate();i++){
            kalendarDays.push(
                (<div key={`$day__${i}`} 
                 onClick={(e)=>this.handleCalendarClick(e,{day:i})}
                className={`day ${i%7 === 0 ? "day-sunday" : ""}`}>
                    {i}
                </div>));
        }

        return kalendarDays;
    }

    handleCalendarClick=(e, data)=>{
        e.target.classList.toggle("day--selected");
        if(this.props.onCalendarClick)
        {
            this.props.onCalendarClick(data.day);
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

    render(){
        return <div className="calendar-wrapper">
            <div className="calendar-header">
                    <h2>{getDateMonthSrb(this.state.currDate)}</h2>
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