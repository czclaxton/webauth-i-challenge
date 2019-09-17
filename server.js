const express = require("express");
const session = require("express-session");
const connectSessionKnex = require("connect-session-knex");

const UsersRouter = require("./users/users-router.js");
const db = require("./data/db-config");

const server = express();
const KnexSessionStore = connectSessionKnex(session);

const sessionConfig = {
  name: "user session",
  secret: "moonsoon are messing with my gutters",
  cookie: {
    maxAge: 1000 * 60 * 60,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: db,
    tablename: "session",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(express.json());
server.use(session(sessionConfig));
server.use("/api/users", UsersRouter);

server.get("/", (req, res) => {
  res.status(200).json({ message: "server is up" });
});

module.exports = server;
