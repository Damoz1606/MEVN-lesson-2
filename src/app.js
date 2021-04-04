const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");
const path = require("path");
const app = express();

const { url } = require("./config/database");

//database
mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(console.log("MongoDB connected"))
  .catch();

//settings
app.set("port", process.env.PORT || 3000);

//middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//routes
app.use("/api/note", require("./app/routes/routes"));

//public
app.use(express.static(path.join(__dirname, "/public")));

//listeners
app.listen(app.get("port"), () => {
  console.log("Server on port: " + app.get("port"));
});
