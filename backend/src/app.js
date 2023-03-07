const express = require("express");
const app = express();
const cors = require("cors");
const ConnectDB = require("./db");
const { PORT } = require("./config");

app.use(express.json());
app.use(cors());
ConnectDB();

app.get("/", (req, res) => {
  res.send(`
      <h1 style="color:blue;text-align:center;">This is a heading</h1>`);
});

app.listen(PORT, () => {
  console.log(`server connection with port no. ${PORT}`);
});
