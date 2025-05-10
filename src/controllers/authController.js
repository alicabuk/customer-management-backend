const bcrypt = require("bcrypt");
const client = require("../config/db");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await client.query(
      "SELECT username, password FROM users WHERE username = $1",
      [username]
    );
    const user = result.rows[0];

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    return res.status(200).json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { login };
