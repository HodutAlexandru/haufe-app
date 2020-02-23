import React from "react";

import Grid from "@material-ui/core/Grid";

import {history} from "../../util/util";

import "./Register.css"
import CreateUser from "../shared/createUser/CreateUser";

class Register extends React.Component {
    render() {
        return (
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <CreateUser isRegisterComponent={true} />
                </Grid>
            </Grid>
        );
    }
}

export default Register;