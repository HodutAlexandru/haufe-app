import React from "react";

import Button from "@material-ui/core/Button";

import {userService} from "../../services/user.service";
import {store} from "../../util/store";
import {userActions} from "../../actions/user/user.actions";
import {history} from "../../util/util";
import {alertActions} from "../../actions/alert/alert.actions";

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

    handleRegisterNavigation() {
        history.push('/register');
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { username, password } = this.state;
        if (username && password) {
            userService.login(username, password)
                .then(user => {
                    store.dispatch(userActions.loginSuccess(user));
                    history.push('/');
                }).catch(err => {
                    store.dispatch(userActions.loginFailure());
                    store.dispatch(alertActions.error(err.toString()));
                });
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
                        <Button type="submit" variant="contained" color="primary">Login</Button>
                        <Button type="submit" variant="contained" color="primary" onClick={this.handleRegisterNavigation}>Register</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;