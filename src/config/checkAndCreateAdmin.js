const bcrypt = require('bcrypt');
const client = require('./db'); 

const checkAndCreateAdmin = async () => {
  try {
    const result = await client.query('SELECT id FROM users WHERE username = $1', ['admin']);
    
    if (result.rows.length === 0) {
      const password = '123456';
      bcrypt.hash(password, 10, async (err, hashedPassword) => {
        if (err) {
          console.error('Hashing error:', err);
          return;
        }

        await client.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['admin', hashedPassword]);
        console.log('Admin user created with hashed password');
      });
    } else {
      console.log('Admin user already exists');
    }
  } catch (err) {
    console.error('Database error:', err);
  }
};

module.exports = checkAndCreateAdmin;
