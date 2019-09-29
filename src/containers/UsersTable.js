import React, {Component} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";

import {
    fetchAllUsers,
} from "../actions/usersActions";
import AddUserForm from "./AddUserForm";

class UsersTable extends Component {
    componentDidMount() {
        const {fetchAllUsers} = this.props;
        
        fetchAllUsers();
    }

    render () {
        const {users} = this.props;
        
        return (
            <div>
                <AddUserForm/>
                <table>
                    <tbody>
                    <tr>
                        <td>id</td>
                        <td>name</td>
                        <td>age</td>
                    </tr>
                    {
                        users.map(user =>
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                            </tr>
                        )
                    }
                    </tbody>
                </table>
            </div>
        );
    }
}

UsersTable.propTypes = {
    users: PropTypes.array,
    fetchAllUsers: PropTypes.func,
};

const mapStateToProps = (state) => ({
    users: state.usersReducer.users,
});

const mapDispatchToProps = {
    fetchAllUsers,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);