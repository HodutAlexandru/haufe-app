import React from "react";

import TextField from "@material-ui/core/TextField";
import MenuItem from '@material-ui/core/MenuItem';
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import {userActions} from "../../actions/user/user.actions";
import {store} from "../../util/store";
import {history} from "../../util/util";
import {userService} from "../../services/user.service";
import {alertActions} from "../../actions/alert/alert.actions";

import "./Register.css"

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
    }

    handleChange(value, param) {
        const {user, submitted} = this.state
        this.setState({
            user: {
                ...user,
                [param]: value
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
        const { user, submitted } = this.state;
        const roleOptions = [{
            label: 'External',
            value: 'external'
        }, {
            label: 'Internal',
            value: 'internal'
        }];
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form name="register" onSubmit={this.handleSubmit.bind(this)} noValidate autoComplete="off">
                        <br />
                        <section>
                            <TextField
                                id="email"
                                type={"email"}
                                error={submitted && !user.email}
                                label="Email"
                                required={true}
                                value={user.email}
                                onChange={(e) => this.handleChange(e.target.value, 'email')}
                                helperText={submitted && !user.username ? "Email is required!" : ""}
                                placeholder={"Email"}
                                variant="outlined"
                            />
                        </section>
                        <br />
                        <section>
                            <TextField
                                id="username"
                                type={"text"}
                                error={submitted && !user.username}
                                label="Username"
                                required={true}
                                value={user.username}
                                onChange={(e) => this.handleChange(e.target.value, 'username')}
                                helperText={submitted && !user.username ? "Username is required!" : ""}
                                placeholder={"Username"}
                                variant="outlined"
                            />
                        </section>
                        <br />
                        <section>
                            <TextField
                                id="password"
                                type={"password"}
                                error={submitted && !user.password}
                                label="Password"
                                required={true}
                                value={user.password}
                                onChange={(e) => this.handleChange(e.target.value, 'password')}
                                helperText={submitted && !user.password ? "Password is required!" : ""}
                                placeholder={"Password"}
                                variant="outlined"
                            />
                        </section>
                        <br />
                        <section>
                            <TextField select id="role" label="Choose" value={user.role} onChange={(e) => this.handleChange(e.target.value, 'role')} helperText="Please choose user type">
                                {roleOptions.map(role => (
                                    <MenuItem key={role.value} value={role.value}>
                                        {role.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </section>
                        <br />
                        <section>
                            <Button type="submit" variant="contained" color="primary" className="button">Register</Button>
                        </section>
                        <br />
                        <section>
                            <Button variant="contained" color="primary" className="button" onClick={this.handleLoginNavigation}>Login</Button>
                        </section>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default Register;