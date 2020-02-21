import React from "react";
import {Link} from "react-router-dom";
import {connect} from "react-redux";

import {userActions} from '../../actions/user/user.actions';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: '',
                submitted: false
            }
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            this.props.login(username, password);
        }
    }

    render() {
        const user = this.state;
        return (
            <div>
                <form name="login" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="username">Username:</label>
                        <input type="text" name="username" value={user.username} onChange={this.handleChange} />
                        {user.submitted && !user.username &&
                            <div className="help-block">Username is required</div>
                        }
                    </div>
                    <div>
                        <label htmlFor="password">Password:</label>
                        <input type="password" name="password" value={user.password} onChange={this.handleChange} />
                        {user.submitted && !user.password &&
                            <div className="help-block">Password is required</div>
                        }
                    </div>
                    <div>
                        <button type="submit">Login</button>
                        <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        );
    }
}



function mapState(state) {
    const { loggingIn } = state;
    return { loggingIn };
}

const actionCreators = {
    login: userActions.login
};

const login = connect(mapState, actionCreators)(Login);
export { login as Login };;