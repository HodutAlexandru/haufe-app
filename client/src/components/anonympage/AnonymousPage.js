import React from "react";
import Button from "@material-ui/core/Button";
import {Box} from "@material-ui/core";

import "./AnonymousPage.css";
import {history} from "../../util/util";

class AnonymousPage extends React.Component {
    handleRegisterNavigation() {
        history.push('/register');
    }

    handleLoginNavigation() {
        history.push('/login');
    }

    render() {
        return(
            <div>
                <Box bgcolor="info.main">
                    <section id="header" className="header">
                        <section id="buttons" className="buttons">
                            <section id="register" className="button">
                                <Button variant="contained" color="white" onClick={this.handleRegisterNavigation}>Register</Button>
                            </section>
                            <section id="login" className="button">
                                <Button variant="contained" color="white" onClick={this.handleLoginNavigation}>Login</Button>
                            </section>
                        </section>
                        <section id="title" className="title">
                            <h2 className="title-text">HAUFE-APP</h2>
                        </section>
                    </section>
                </Box>
                <h3>This is the anonymous page. You don't need to be authenticated to see this page.</h3>
            </div>
        );
    }
}

export default AnonymousPage;