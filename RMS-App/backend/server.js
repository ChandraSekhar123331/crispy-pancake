require("dotenv").config();

const express = require("express");
const cors = require("cors");
// express app init and config
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "*",
    // origin: `http://localhost:${process.env.frontend_port}`,
    methods: ["POST", "PUT", "GET", "OPTIONS", "HEAD"],
    credentials: true,
  })
);

const conn_db = require("./services/connect_db");

app.use(conn_db.session_store);
require("./routes/index")(app);

// now listen on port 3000...
const port = 3000;
app.listen(port, () => {
  console.log(`App started on port ${port}`);
});
