import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import Container from '@material-ui/core/Container';
import MaterialTable from 'material-table';
import {
    getAllUsers,
    postNewUser,
    deleteUser,
    updateUser,
} from "../actions/usersActions";

class UsersTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            columns: [
                { title: 'Name', field: 'name' },
                { title: 'Age', field: 'age' },
            ],
        }
    }
    componentDidMount() {
        const {getAllUsers} = this.props;
        
        getAllUsers();
    }

    render () {
        const {postNewUser, deleteUser, updateUser} = this.props;

        return (
            <Container maxWidth={ "sm" }>
                <MaterialTable
                    title="Editable Example"
                    columns={ this.state.columns }
                    data={ this.props.users }
                    editable={ {
                        onRowAdd: newUser => {
                            const newUserInJSON = JSON.stringify(newUser);
                            postNewUser(newUserInJSON);
                            return new Promise(resolve => resolve());
                        },
                        onRowUpdate: (newData, oldData) => {
                            const updatedUser = Object.assign({}, oldData, newData);
                            updateUser(updatedUser);
                            return new Promise(resolve => resolve());
                        },
                        onRowDelete: userToDelete => {
                            deleteUser(userToDelete);
                            return new Promise(resolve => resolve());
                        }
                    } }
                />
            </Container>
        );
    }
}

UsersTable.propTypes = {
    users: PropTypes.array,
    getAllUsers: PropTypes.func,
    postNewUser: PropTypes.func,
    deleteUser: PropTypes.func,
    updateUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
    users: state.usersReducer.users,
});

const mapDispatchToProps = {
    getAllUsers,
    postNewUser,
    deleteUser,
    updateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersTable);