import React from "react";
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {userActions} from "../../actions/user/user.actions";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                username: '',
                password: ''
            },
            submitted: false
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const { name, value } = event.target;
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [name]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.email && user.username && user.password) {
            this.props.register(user);
        }
    }

    render() {
        const state = this.state;
        return (
            <form onSubmit={this.handleSubmit}>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="text" name="email" value={state.user.email} onChange={this.handleChange}/>
                    {state.submitted && !state.user.email &&
                        <div>Email is required</div>
                    }
                </div>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" name="username" value={state.user.username} onChange={this.handleChange}/>
                    {state.submitted && !state.user.username &&
                    <div>Username is required</div>
                    }
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" name="password" value={state.user.password} onChange={this.handleChange}/>
                    {state.submitted && !state.user.password &&
                    <div>Password is required</div>
                    }
                </div>
                <div>
                    <button type="submit">Register</button>
                    <Link to="/login">Login</Link>
                </div>
            </form>
        );
    }
}

function mapState(state) {
    return state.registration;
}

const actionCreators = {
    register: userActions.register
}

const register = connect(mapState, actionCreators)(Register);
export { register as Register };