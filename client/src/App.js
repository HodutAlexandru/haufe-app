import React from 'react';
import { Redirect, Route, Router, Switch } from "react-router-dom";
import {connect} from "react-redux";

import {Register} from "./components/register/Register";
import HomePage from "./components/homepage/HomePage";
import {Login} from "./components/login/Login";

import './App.css';

import {alertActions} from "./actions/alert/alert.actions";
import {history} from "./util/util";
import AnonymousPage from "./components/anonympage/AnonymousPage";
import { PrivateRoute } from "./util/privateRoute";

class App extends React.Component{
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            this.props.clearAlerts();
        })
    }

    render() {
        const alert = this.props;
        return (
            <div className="App">
                <div>
                    {alert.message &&
                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                    }
                    <Router history={history}>
                        <Switch>
                            <PrivateRoute exact path="/" component={HomePage}/>
                            <Route path="/anonym" component={AnonymousPage} />
                            <Route path="/register" component={Register}/>
                            <Route path="/login" component={Login}/>
                            <Redirect from="*" to="/"/>
                        </Switch>
                    </Router>
                </div>
            </div>
        );
    }
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const app = connect(mapState, actionCreators)(App);
export { app as App }
