import React, {Component} from "react";
import {connect} from "react-redux";
import {postNewUser} from "../actions/usersActions";

class AddUserForm extends Component {
    constructor(props) {
        super(props);
        this.state =  {
            name: '',
            age: '',
        };

        this.handleUserInput = this.handleUserInput.bind(this);
        this.postUser = this.postUser.bind(this);
    }
    
    handleUserInput(e) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            [name]: value,
        })
    }
    
     postUser(e) {
        e.preventDefault();
        const {postNewUser} = this.props;

        const userInJSON = JSON.stringify({
            name: this.state.name,
            age: this.state.age,
        });

        postNewUser(userInJSON);
    }

    render() {
        return (
            <form onSubmit={this.postUser}>
                <h2>Add new user</h2>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" name="name" value={this.state.name} onChange={this.handleUserInput}/>
                </div>
                <div>
                    <label htmlFor="age">Age</label>
                    <input type="text" name="age" value={this.state.age} onChange={this.handleUserInput}/>
                </div>
                <button type="submit">Add</button>
            </form>
        );
    }
}

const mapDispatchToProps = {
    postNewUser,
};

export default connect(null, mapDispatchToProps)(AddUserForm);