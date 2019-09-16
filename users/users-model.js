const db = require("../data/db-config");

module.exports = {
  getUsers,
  login,
  add,
  find,
  findBy,
  findById
};

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return findById(id);
    });
}

function login() {}

function getUsers() {
  return db("users");
}

function find() {
  return db("users").select("id", "username", "password");
}

function findBy(filter) {
  return db("users").where(filter);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}
