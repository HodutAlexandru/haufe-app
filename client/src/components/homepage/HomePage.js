import React from 'react';

import {apiBaseUrl} from "../../util/util";

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          isHealthy: false
        };

    }

    componentDidMount() {
        fetch(`${apiBaseUrl}/healthcheck`)
            .then(() => {
                this.setState({
                    isHealthy: true
                });
            })
            .catch(() => {
                this.setState({
                    isHealthy: false
                });
            })
    }

    render() {
        const isHealthy = this.state;
        if(isHealthy) {
            return <div>This is the home page component!</div>
        } else {
            return <div>Error, the application is not healthy!</div>
        }
    }
}

export default HomePage;