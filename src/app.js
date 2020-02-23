import express from "express";
import bodyParser from "body-parser";
import {validateToken} from "./util/validation";

const healthcheckRoute = require('./routes/healthcheck');
const infoRoute = require('./routes/info');
const authRoutes = require('./routes/auth');
const getExternalUsersRoute = require('./routes/getExternalUsers');
const createExternalUserRoute = require('./routes/createExternalUser');
const deleteExternalUserRoute = require("./routes/deleteExternalUser");

const app = express();
const cors = require('cors');

app.use(bodyParser.json());
app.use(cors());
app.options('*', cors());

app.use("/api/healthcheck", healthcheckRoute);
app.use("/api/info", infoRoute);
app.use("/api", authRoutes);
app.use("/api", getExternalUsersRoute);
app.use("/api", createExternalUserRoute);
app.use("/api", deleteExternalUserRoute);


module.exports = app;