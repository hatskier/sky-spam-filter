const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Controllers
const details = require("./controllers/details");
const items = require("./controllers/items");

const config = require("./config");
const PORT = process.env.PORT || config.port;

const app = express();

// DB connection
mongoose
  .connect(
    config.db,
    {
      useNewUrlParser: true,
      useFindAndModify: false,
    }
  )
  .then(
    function () {
      console.log("DB was connected.");
    },
    function (err) {
      console.error("DB connection failed: ", err);
    }
  );

// App configuration
app.use(bodyParser.json());
app.use(bodyParser.json({type: "application/vnd.api+json"}));
app.use(bodyParser.urlencoded({
  extended: true,
  // limit: '50mb'
}));
app.use(cors());

// Init controllers
details(app);
items(app);

// App running
app.listen(PORT, function () {
  console.log("Spam Filter API app is listening on port " + PORT);
});
