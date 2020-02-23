import React from 'react';
import jwt_decode from "jwt-decode";
import {store} from "../../util/store";
import {userService} from "../../services/user.service";
import {internalUserActions} from "../../actions/internalUser/internal.user.actions";
import {
    Button,
    Paper,
    Table,
    TableBody,
    TableContainer,
    TableHead,
    TableCell,
    TableRow,
    withStyles,
    Box
} from "@material-ui/core";
import {userActions} from "../../actions/user/user.actions";
import { FaPlus, FaMinus } from "react-icons/fa"

import "./HomePage.css";
import CreateUser from "../shared/createUser/createUser";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCreateUser: false
        }

        this.showCreateUser = this.showCreateUser.bind(this);
        this.hideCreateUser = this.hideCreateUser.bind(this);
    }

    showCreateUser() {
        this.setState({
            showCreateUser: true
        });
    }

    hideCreateUser() {
        this.setState({
            showCreateUser: false
        });
    }

    loadExternalUsers() {
        userService.getExternalUsers()
            .then(users => {
                store.dispatch(internalUserActions.getExternalUsersSuccess(users));
            })
            .catch(error => {
                store.dispatch(internalUserActions.getExternalUsersFailure(error));
            });
    }

    handleLogout() {
        userService.logout();
        store.dispatch(userActions.logout());
    }

    render() {
        const {showCreateUser} = this.state;
        const StyledTableCell = withStyles(theme => ({
            head: {
                backgroundColor: theme.palette.common.black,
                color: theme.palette.common.white,
            },
            body: {
                fontSize: 14,
            },
        }))(TableCell);

        const StyledTableRow = withStyles(theme => ({
            root: {
                '&:nth-of-type(odd)': {
                    backgroundColor: theme.palette.background.default,
                },
            },
        }))(TableRow);

        const user = JSON.parse(localStorage.getItem('user'));
        const userData = jwt_decode(user.token);
        if(userData.role === 'internal') {
            this.loadExternalUsers();
            const internalUserStateLength = store.getState().internalUser.length;
            // const externalUsers = store.getState().internalUser[internalUserStateLength - 1].value;
            const externalUsers = [];
            return(
                <div>
                    <Box bgcolor="info.main">
                        <section id="header" className="header">
                            <section id="buttons" className="buttons">
                                <section id="logout" className="button">
                                    <Button variant="contained" color="secondary" onClick={this.handleLogout}>Logout</Button>
                                </section>
                            </section>
                            <section id="title" className="title">
                                <h2 className="title-text">HAUFE-APP</h2>
                            </section>
                        </section>
                    </Box>
                    <h3>Welcome to our app {userData.username}</h3>
                    <TableContainer component={Paper}>
                        <Table aria-label="customized label">
                            <TableHead>

                            </TableHead>
                            <TableBody>
                                {externalUsers.map(user => (
                                    <StyledTableRow key={user.email}>
                                        <StyledTableCell component="th" scope="row">
                                            {user.email}
                                        </StyledTableCell>
                                        <StyledTableCell align="right">{user.username}</StyledTableCell>
                                    </StyledTableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {
                        showCreateUser ?
                            <div className="create-user">
                                <FaMinus className="toggle-button" onClick={this.hideCreateUser} />
                                <CreateUser isRegisterComponent={false} />
                            </div>
                        :
                            <div className="create-user">
                                <FaPlus className="toggle-button" onClick={this.showCreateUser} />
                            </div>
                    }
                </div>
            );
        } else {
            return (<div>
                        <Box bgcolor="info.main">
                            <section id="header" className="header">
                                <section id="buttons" className="buttons">
                                    <section id="logout" className="button">
                                        <Button variant="contained" color="secondary" onClick={this.handleLogout}>Logout</Button>
                                    </section>
                                </section>
                                <section id="title" className="title">
                                    <h2 className="title-text">HAUFE-APP</h2>
                                </section>
                            </section>
                        </Box>
                        <h3>This is the home page component! Welcome {user.username}</h3>
                    </div>);
        }
    }
}

export default HomePage;