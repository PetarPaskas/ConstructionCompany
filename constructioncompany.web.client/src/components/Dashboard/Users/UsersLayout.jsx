import React, {Component} from "react";
import Table from "../../common/Table/Table";
import CustomUsersTableBody from "./CustomUsersTableBody";
import {createHeadersDataForUsersTable} from "../../common/utils";
import usersClient from "../../http/usersClient";
import ConstructionSiteFilters from "../ConstructionSites/ConstructionSiteFilters";

class UsersLayout extends Component{
    state={
        data:{
            header:[],
            body:[]
        }
    }

    async componentDidMount(){
        const header = createHeadersDataForUsersTable();
        const data = {
            header
        };
        const body = (await usersClient.getAll()).data;
        data.body = body;
        this.setState({data});
    }

    render(){
        return (
            <div className="users-table">
                <Table
                    targetProperty={"fullName"}
                    data={this.state.data}
                    withRowIndex={false}
                    customBodyComponent={CustomUsersTableBody}
                />
            </div>
        );
    }
}

export default UsersLayout;