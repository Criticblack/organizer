"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = {
    //port
    port: process.env.PORT || 3000,
    //db
    db: process.env.MONGODB_URI,
    //test environment
    test_env: 'test',
    test_db: 'organizer-test',
    test_port: 3001
};
exports.default = config;
//# sourceMappingURL=main.js.map
