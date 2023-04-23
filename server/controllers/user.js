const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const updateUser = async (req, res) => {
    const { level, score, token } = req.body;
    try {
        const decoded = jwt.verify(token, `${process.env.SECRET}`);
        const user = await User.findOne({ email: decoded.email });
        const id = user._id.toString();
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    stats: {
                        level: level,
                        score: score,
                    },
                },
            },
            { new: true }
        );
        updatedUser = await updateUser.save();
        return res.json({ message: "user updated", status: "200" });
    } catch (err) {
        return res.json({ message: err.message, status: "error" });
    }
};

const getUser = async (req, res) => {
    const { token } = req.body;
    try {
        const decoded = jwt.verify(token, `${process.env.SECRET}`);
        const email = decoded.email;
        const user = await User.findOne({ email: email });
        const userData = {
            username: user.username,
            email: user.email,
            level: user.stats[0].level,
            score: user.stats[0].score,
        };
        return res.json({ message: "user found", status: "200", userData });
    } catch (err) {
        return res.json({ error: err.message, status: "error" });
    }
};

module.exports = { updateUser, getUser };
