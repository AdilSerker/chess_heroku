"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const compression = require("compression"); // compresses requests
const session = require("express-session");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const path = require("path");
const expressValidator = require("express-validator");
const chess = require("./routers/apiChess");
dotenv.config({ path: ".env.example" });
const app = express();
exports.app = app;
const expressWs = require('express-ws')(app);
app.set("port", process.env.PORT || 8888);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(expressValidator());
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: process.env.SESSION_SECRET,
}));
app.use(express.static(path.join(__dirname, "public"), { maxAge: 0, etag: true }));
app.use('/chess/:id', express.static(path.join(__dirname, "public")));
const api = require("./routers/apiRouts");
app.use('/', api.router);
app.use('/chess', chess.router);
//# sourceMappingURL=app.js.map