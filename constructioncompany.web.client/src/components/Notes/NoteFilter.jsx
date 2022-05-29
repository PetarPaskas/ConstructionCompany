import { Component } from "react";
import InputText from "../common/InputText";

class NoteFilter extends Component{

    render(){
        const {filter} = this.props;
        return (
            <InputText
            customAction={this.props.onFilter}
            name={filter.name}
            title={filter.title}
            />);
    }
}

export default NoteFilter;