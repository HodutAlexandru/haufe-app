import React from "react";

import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";

import {userActions} from "../../actions/user/user.actions";
import {store} from "../../util/store";
import {history} from "../../util/util";
import {userService} from "../../services/user.service";
import {alertActions} from "../../actions/alert/alert.actions";

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: '',
                username: '',
                password: '',
                role: 'external'
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

    handleLoginNavigation() {
        history.push('/login');
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.email && user.username && user.password) {
            userService.register(user).then(() => {
                store.dispatch(userActions.registerSuccess(user));
                history.push('/login');
                store.dispatch(alertActions.success('Registration successful'));
            }).catch(err => {
                store.dispatch(userActions.registerFailure(err.toString()));
                store.dispatch(alertActions.error(err.toString()));
            });
        }
    }

    render() {
        const state = this.state;
        const roleOptions = [{
            label: 'External',
            value: 'external'
        }, {
            label: 'Internal',
            value: 'internal'
        }];
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
                    <TextField select label="Choose" value={state.user.role} onChange={this.handleChange} helperText="Please choose user type">
                        {roleOptions.map(role => (
                            <MenuItem key={role.value} value={role.value}>
                                {role.label}
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <div>
                    <Button type="submit" variant="contained" color="primary">Register</Button>
                    <Button variant="contained" color="primary" onClick={this.handleLoginNavigation}>Login</Button>
                </div>
            </form>
        );
    }
}

export default Register;