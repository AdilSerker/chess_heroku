"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http = require("http");
const app_1 = require("./app");
const server_1 = require("./config/server");
const server = http.createServer(app_1.app);
exports.server = server;
/**
 * Start Express server.
 */
server.listen(process.env.PORT || 8888, () => {
    console.log(`  App is running at http://${server_1.ipAddress.home}`);
    console.log("  Press CTRL-C to stop\n");
});
require('./routers/ws-chess');
//# sourceMappingURL=server.js.map