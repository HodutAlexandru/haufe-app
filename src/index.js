const app = require("./app");
const http = require("http");

const onError = error => {
    if (error.syscall !== "listen") {
        throw error;
    }
    const bind = typeof port === "string" ? "pipe " + port : "port " + port;
    switch (error.code) {
        case "EACCES":
            console.error(bind + " requires elevated privileges");
            process.exit(1);
            break;
        case "EADDRINUSE":
            console.error(bind + " is already in use");
            process.exit(1);
            break;
        default:
            throw error;
    }
};

const onListening = () => {
    const addr = server.address();
    const bind = typeof addr === "string" ? "pipe " + port : "port " + port;
};

const port = process.env.PORT || 3000;

const server = http.createServer(app);
server.on("error", onError);
server.on("listening", onListening);

console.log(`Listening on port ${port}`);

server.listen(port);
