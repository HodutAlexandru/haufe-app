import React from "react";
import Button from "@material-ui/core/Button";
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
                <h3>This is the anonymous page. You don't need to be authenticated to see this page.</h3>
                <div>
                    <Button variant="contained" color="primary" onClick={this.handleRegisterNavigation}>Register</Button>
                    <Button variant="contained" color="primary" onClick={this.handleLoginNavigation}>Login</Button>
                </div>
            </div>
        );
    }
}

export default AnonymousPage;