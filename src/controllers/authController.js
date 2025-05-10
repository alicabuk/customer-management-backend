const bcrypt = require("bcrypt");
const client = require("../config/db");
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
  const { username, password } = req.body;
  if (!username) {
    return res.status(400).json({ message: "Username required" });
  }
  if (!password) {
    return res.status(400).json({ message: "Password required" });
  }
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

const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const { username } = req.user;
  
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ error: 'Both current and new password are required' });
    }
  
    try {
      const result = await client.query('SELECT * FROM users WHERE username = $1', [username]);
  
      if (result.rows.length === 0) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      const user = result.rows[0];
  
      const isMatch = await bcrypt.compare(currentPassword, user.password);
  
      if (!isMatch) {
        return res.status(400).json({ error: 'Current password is incorrect' });
      }
  
      bcrypt.hash(newPassword, 10, async (err, hashedPassword) => {
        if (err) {
          return res.status(500).json({ error: 'Error hashing new password' });
        }
  
        await client.query('UPDATE users SET password = $1 WHERE username = $2', [hashedPassword, username]);
        res.status(200).json({ message: 'Password updated successfully' });
      });
  
    } catch (err) {
      console.error('Error changing password:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  };

module.exports = { login, changePassword };
