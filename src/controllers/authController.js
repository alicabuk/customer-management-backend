const bcrypt = require('bcrypt');
const client = require('../db');

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await client.query('SELECT * FROM admin WHERE username = $1', [username]);

    if (result.rows.length === 0) {
      return res.status(401).json({ message: 'User not found' });
    }

    const admin = result.rows[0];

    const match = await bcrypt.compare(password, admin.password_hash);

    if (!match) {
      return res.status(401).json({ message: 'Incorrect password' });
    }

    res.status(200).json({ message: 'Login successful' });
  } catch (error) {
    console.error('Giriş hatası:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { login };
