exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        { id: 1, username: "test", password: "pass" },
        { id: 2, username: "test2", password: "pass2" },
        { id: 3, username: "test3", password: "pass3" }
      ]);
    });
};
