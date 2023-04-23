const mongoose = require("mongoose");
const { model, Schema } = mongoose;

const User = new Schema(
    {
        username: { type: String, required: true, unique: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        stats: [
            {
                level: { type: Number },
                score: { type: Number },
            },
        ],
    },
    { collection: "userData" }
);

const userModel = model("userData", User);

module.exports = userModel;
