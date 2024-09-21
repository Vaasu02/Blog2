const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register User
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (username.length < 4) {
      return res.status(400).json({ msg: "Username must be at least 4 characters long" });
    }

    if (password.length < 6) {
      return res.status(400).json({ msg: "Password must be at least 6 characters long" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "Email already exists" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const user = new User({ username, email, password: hashedPassword });

    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// Login User
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ msg: "User does not exist" });

    const isMatch = bcrypt.compareSync(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid email or password" });

    const payload = { id: user._id, email: user.email };
    jwt.sign(payload, process.env.JWT_SECRET, {}, (err, token) => {
      if (err) throw err;
      res.cookie("token", token, {
        same_site:"none"
      }).json({ id: user._id, email: user.email });
    });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

// Profile
const profile = (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.status(401).json({ msg: "Token not provided" });
  
  jwt.verify(token, process.env.JWT_SECRET, {}, (err, info) => {
    if (err) return res.status(403).json({ msg: "Invalid token" });
    res.json(info);
  });
};

// Logout User
const logout = (req, res) => {
  res.cookie("token", "").json("ok");
};

module.exports = { register, login, profile, logout };
