const server = require("./server.js");
require("dotenv").config();

const PORT = process.env.PORT || 4444;

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}...`);
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "server is up" });
});
