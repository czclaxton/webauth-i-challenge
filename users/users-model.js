const db = require("../data/db-config");

module.exports = {
  getUsers,
  login,
  add,
  find,
  findBy,
  findById
};

// async function add(user) {
//   const [id] = await db("users").insert(user);

//   return findById(id);
// }

function add(user) {
  return db("users")
    .insert(user)
    .then(ids => findById(ids[0]));
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
