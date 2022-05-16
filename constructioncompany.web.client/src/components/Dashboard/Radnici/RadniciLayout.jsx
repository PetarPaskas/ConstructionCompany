import React, {Component} from "react";
import Table from "../../common/Table/Table";
import {createFakeDataForTable} from "../../common/utils";

class RadniciLayout extends Component{
    state={
        data:{
            header:[],
            body:[]
        }
    }

    componentDidMount(){
        const data = createFakeDataForTable();
        this.setState({data});
    }

    render(){
        return (
            <div className="users-table">
                <Table
                    data={this.state.data}
                />
            </div>
        );
    }
}

export default RadniciLayout;