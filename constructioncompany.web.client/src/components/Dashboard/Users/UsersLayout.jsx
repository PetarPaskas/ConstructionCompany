import React, {Component} from "react";
import Table from "../../common/Table/Table";
import CustomUsersTableBody from "./CustomUsersTableBody";
import {createFakeDataForTable} from "../../common/utils";

class UsersLayout extends Component{
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
                    withRowIndex={false}
                    customBodyComponent={CustomUsersTableBody}
                />
            </div>
        );
    }
}

export default UsersLayout;