const express = require("express");
const bcrypt = require("bcryptjs");

const usersdb = require("./users-model");

const router = express.Router();

router.get("/", (req, res) => {
  usersdb
    .getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: "error getting users" });
    });
});

router.post("/register", (req, res) => {
  let user = req.body;

  user.password = bcrypt.hashSync(user.password, 10);

  usersdb
    .add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ message: "error adding user" });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;

  usersdb
    .findBy({ username })
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        console.log("db password", user.password);
        console.log("login password", password);
        res.status(200).json({ message: `Welcome ${user.username}` });
      } else {
        res.status(401).json({ message: "YOU SHALL NOT PASS!" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(error);
    });
});

module.exports = router;
