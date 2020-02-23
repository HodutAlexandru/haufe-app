import React from "react";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import {userService} from "../../../services/user.service";
import {store} from "../../../util/store";
import {userActions} from "../../../actions/user/user.actions";
import {history} from "../../../util/util";
import {alertActions} from "../../../actions/alert/alert.actions";
import {internalUserActions} from "../../../actions/internalUser/internal.user.actions";

class CreateUser extends React.Component {
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
        const { user } = this.state
        this.setState({
            user: {
                ...user,
                [param]: value
            }
        });
    }

    handleSubmit(event) {
        event.preventDefault();

        this.setState({ submitted: true });
        const { user } = this.state;
        const { isRegisterComponent } = this.props;
        if (user.email && user.username && user.password) {
            if(isRegisterComponent) {
                userService.register(user).then(() => {
                    store.dispatch(userActions.registerSuccess(user));
                    history.push('/login');
                    store.dispatch(alertActions.success('Registration successful'));
                }).catch(err => {
                    store.dispatch(userActions.registerFailure(err.toString()));
                    store.dispatch(alertActions.error(err.toString()));
                });
            } else {
                userService.createExternalUser(user).then(() => {
                    store.dispatch(internalUserActions.createExternalUserSuccess(user));
                    store.dispatch(alertActions.success('Creation successful'));
                }).catch(err => {
                    store.dispatch(internalUserActions.createExternalUserFailure(err));
                    store.dispatch(alertActions.error(err.toString()));
                })
            }
        }
    }

    render() {
        const { user, submitted } = this.state;
        const { isRegisterComponent } = this.props;
        const roleOptions = [{
            label: 'External',
            value: 'external'
        }, {
            label: 'Internal',
            value: 'internal'
        }];
        return(
            <form name="create" onSubmit={this.handleSubmit.bind(this)} noValidate autoComplete="off">
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
                {
                    isRegisterComponent ?
                        <div>
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
                        </div>
                    :
                        <div>
                            <section>
                                <Button type="submit" variant="contained" color="primary" className="button">Create</Button>
                            </section>
                        </div>

                }
            </form>
        );
    }
}

export default CreateUser;