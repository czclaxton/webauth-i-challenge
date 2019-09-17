const server = require("./server.js");
require("dotenv").config();

const PORT = process.env.PORT || 4444;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});
