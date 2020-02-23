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
import { FaPlus, FaMinus, FaSync } from "react-icons/fa"

import "./HomePage.css";
import CreateUser from "../shared/createUser/CreateUser";
import {alertActions} from "../../actions/alert/alert.actions";

class HomePage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            showCreateUser: false,
            externalUsers: undefined
        }
    }

    showCreateUser = () => {
        this.setState({
            showCreateUser: true
        });
    };

    hideCreateUser = () => {
        this.setState({
            showCreateUser: false
        });
    }

    loadExternalUsers = () => {
        userService.getExternalUsers()
            .then(users => {
                store.dispatch(internalUserActions.getExternalUsersSuccess(users));
                store.dispatch(alertActions.success('Get external users'));

                this.setState({
                    externalUsers: users.value
                });
            })
            .catch(error => {
                store.dispatch(internalUserActions.getExternalUsersFailure(error));
                store.dispatch(alertActions.error(error));
            });
    }

    handleDeleteExternal = (userId, user, event) => {
        userService.deleteExternalUser(userId).then(result => {
            store.dispatch(internalUserActions.deleteExternalUserSuccess(result));
            store.dispatch(alertActions.success('Delete user complete'));
            this.loadExternalUsers();
        }).catch(error => {
            store.dispatch(internalUserActions.deleteExternalUserFailure(error));
            store.dispatch(alertActions.error(error));
        })
        event.preventDefault();
    }

    handleLogout = () => {
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
                    backgroundColor: theme.palette.common.white,
                },
            },
        }))(TableRow);

        const user = JSON.parse(localStorage.getItem('user'));
        const userData = jwt_decode(user.token);
        if(userData.role === 'internal') {
            const { externalUsers } = this.state;
            if(externalUsers === undefined) {
                this.loadExternalUsers();
            }
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
                    <div>
                        <Button>
                            <FaSync className="refresh-button" onClick={this.loadExternalUsers}/>
                        </Button>
                        {
                            (externalUsers !== undefined) ?
                                <div>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="customized label">
                                            <TableHead>
                                                <TableRow>
                                                    <StyledTableCell>Email</StyledTableCell>
                                                    <StyledTableCell align="right">Username</StyledTableCell>
                                                    <StyledTableCell align="right">Instagram</StyledTableCell>
                                                    <StyledTableCell align="right">Delete option</StyledTableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {externalUsers.map(user => (
                                                    <StyledTableRow key={user.email}>
                                                        <StyledTableCell component="th" scope="row">
                                                            {user.email}
                                                        </StyledTableCell>
                                                        <StyledTableCell align="right">{user.username}</StyledTableCell>
                                                        <StyledTableCell align="right"><img src={userData.imgSource} alt="" className="profile-img"/></StyledTableCell>
                                                        <StyledTableCell align="right">
                                                            <Button color="secondary" onClick={this.handleDeleteExternal.bind(user, user.userId, this)}>Delete</Button>
                                                        </StyledTableCell>
                                                    </StyledTableRow>
                                                ))}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </div>
                            :
                                <div>
                                    <h3>No external users at the moment!</h3>
                                </div>
                        }
                    </div>
                    <br />
                    {
                        showCreateUser ?
                            <div className="create-user">
                                <FaMinus className="toggle-button" onClick={this.hideCreateUser} />
                                <CreateUser isRegisterComponent={false} loadExternalUsers={this.loadExternalUsers} />
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
                        <h3>This is the home page component! Welcome {userData.username}</h3>
                    </div>);
        }
    }
}

export default HomePage;