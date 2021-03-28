const mongoose = require("mongoose");
const express = require("express");
const users = require("./routes/api/users");
const tweets = require("./routes/api/tweets");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const app = express();
const db = require("./config/keys").mongoURI;

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    if (process.env.NODE_ENV === "production") {
      app.use(express.static("frontend/build"));
      app.get("/", (req, res) => {
        res.sendFile(
          path.resolve(__dirname, "frontend", "build", "index.html")
        );
      });
    }
  })
  .catch((err) => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/tweets", tweets);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
