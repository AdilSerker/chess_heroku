"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const homeController = require("../controllers/home");
const contactController = require("../controllers/contact");
exports.router = express.Router();
exports.router.get("/contact", contactController.getContact);
exports.router.post("/contact", contactController.postContact);
exports.router.get("/", homeController.index);
//# sourceMappingURL=apiRouts.js.map