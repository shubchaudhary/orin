const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const registerUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const defaultStat = { level: 1, score: 0 };
        const user = await User.create({ username, email, password, stats: [defaultStat] });
        return res.json({ message: "user created", status: "200", id: user._id });
    } catch (err) {
        if (err.code === "11000") {
            return res.json({ message: "User already exists", status: "error" });
        }
        return res.json({ message: err.message, status: "error" });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email, password: password });
        if (!user || user.email !== email) {
            return res.json({ status: "not found", error: "Invalid credentials" });
        }
        const token = jwt.sign({ email: email }, `${process.env.JWT_SECRET_KEY}`, { expiresIn: "1d" });
        return res.json({ message: "user found", status: "200", token: token, id: user._id });
    } catch (err) {
        return res.json({ message: err.message, status: "error" });
    }
};

module.exports = { registerUser, loginUser };
