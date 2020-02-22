import {apiBaseUrl} from "../util/util";

export const healthService = {
    healthcheck
}

function healthcheck() {
    const request = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    fetch(`${apiBaseUrl}/healthcheck`, request).then(() => {
        return true;
    }).catch(() => {
        return false;
    });
}