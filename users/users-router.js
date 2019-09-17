const express = require("express");
const bcrypt = require("bcryptjs");
const restricted = require("./restricted-middleware");

const usersdb = require("./users-model");

const router = express.Router();

router.get("/", restricted, (req, res) => {
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
      req.session.user = user;
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
        req.session.user = user;
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

router.get("/logout", (req, res) => {
  if (req.session) {
    req.session.destroy(err => {
      if (err) {
        res.json({
          message: "you can checkout but you cant leave"
        });
      } else {
        res.end();
      }
    });
  }
});

module.exports = router;
