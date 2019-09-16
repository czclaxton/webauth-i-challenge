const express = require("express");

const UsersRouter = require("./users/users-router.js");

const server = express();

server.use(express.json());
server.use("/api/users", UsersRouter);

module.exports = server;
