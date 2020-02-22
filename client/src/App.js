import React from 'react';
import { Redirect, Route, Router, Switch } from "react-router-dom";

import Register from "./components/register/Register";
import HomePage from "./components/homepage/HomePage";
import Login from "./components/login/Login";

import './App.css';

import AnonymousPage from "./components/anonympage/AnonymousPage";
import { PrivateRoute } from "./util/privateRoute";
import {alertActions} from "./actions/alert/alert.actions";
import {store} from "./util/store";
import {history} from "./util/util";
import {healthService} from "./services/health.service";
import {userService} from "./services/user.service";

class App extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isHealthy: false
        }

        history.listen((location, action) => {
            store.dispatch(alertActions.clear());
        })

        const user = localStorage.getItem('user');
        if(user) {
            userService.autoAuth();
        }
    }

    componentDidMount() {
        this.setState({
            isHealthy: healthService.healthcheck()
        })
    }

    render() {
        const isHealthy = this.state;
        if(isHealthy) {
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
        } else {
            return <div>Application broke down</div>
        }
    }
}

export default App;
