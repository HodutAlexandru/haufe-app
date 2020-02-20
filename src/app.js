import express from "express";
import bodyParser from "body-parser";

const healthcheckRoute = require('./routes/healthcheck');
const infoRoute = require('./routes/info');
const authRoutes = require('./routes/auth');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});

app.use("/api/healthcheck", healthcheckRoute);
app.use("/api/info", infoRoute);
app.use("/api", authRoutes);

module.exports = app;