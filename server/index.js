const express = require("express");
const App = express();
const cors = require("cors");
require("dotenv").config();

const mongoose = require("mongoose");
const { registerUser } = require("./controllers/auth");
const { loginUser } = require("./controllers/auth");
const { updateUser } = require("./controllers/user");
const { getUser } = require("./controllers/user");
const url = process.env.URL;
mongoose.set("strictQuery", false);

App.use(cors());
App.use(express.json());

mongoose
    .connect(url)
    .then(() => {
        console.log("Connected to the database ");
    })
    .catch((err) => {
        console.error(`Error connecting to the database. ${err}`);
    });

App.get("/", (req, res) => {
    res.send("Server running.");
});

App.post("/api/register", registerUser);
App.post("/api/login", loginUser);
App.post("/api/update", updateUser);
App.post("/api/info", getUser);

const port = process.env.PORT || 8080;

App.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
