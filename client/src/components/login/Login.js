import React from "react";

import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";

import {userService} from "../../services/user.service";
import {store} from "../../util/store";
import {userActions} from "../../actions/user/user.actions";
import {history} from "../../util/util";
import {alertActions} from "../../actions/alert/alert.actions";

import "./Login.css";

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: {
                username: '',
                password: '',
            },
            submitted: false
        }

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(value, param) {
        const { user } = this.state;
        this.setState({
            user: {
                ...user,
                [param]: value
            }
        });
    }

    handleRegisterNavigation() {
        history.push('/register');
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        if (user.username && user.password) {
            userService.login(user.username, user.password)
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
        const { user, submitted } = this.state;
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <form name="login" onSubmit={this.handleSubmit} noValidate autoComplete="off">
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
                            <Button type="submit" variant="contained" color="primary" className="button" onClick={this.handleSubmit}>Login</Button>
                        </section>
                        <br />
                        <section>
                            <Button type="submit" variant="contained" color="primary" className="button" onClick={this.handleRegisterNavigation}>Register</Button>
                        </section>
                    </form>
                </Grid>
            </Grid>
        );
    }
}

export default Login;