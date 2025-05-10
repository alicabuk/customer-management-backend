const client = require("../config/db");

const createCustomer = async (req, res) => {
  const { first_name, last_name, national_id, registration_date } = req.body;
  
  if (!first_name || !last_name || !national_id || !registration_date) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!isValidNationalId(national_id)) {
    return res.status(400).json({ error: 'Invalid national ID. It must be 11 digits and cannot start with 0.' });
  }

  if (!isValidDate(registration_date)) {
    return res.status(400).json({ error: 'Invalid date format.' });
  }

  try {
    await client.query(
      'INSERT INTO customers (first_name, last_name, national_id, registration_date) VALUES ($1, $2, $3, $4)',
      [first_name, last_name, national_id, registration_date]
    );
    res.status(201).json({ message: 'Customer created' });
  } catch (err) {
    console.error('Create customer error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const getAllCustomers = async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM customers ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    console.error('Get customers error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const updateCustomer = async (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, national_id, registration_date } = req.body;

  try {
    await client.query(
      'UPDATE customers SET first_name = $1, last_name = $2, national_id = $3, registration_date = $4 WHERE id = $5',
      [first_name, last_name, national_id, registration_date, id]
    );
    res.json({ message: 'Customer updated' });
  } catch (err) {
    console.error('Update customer error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const deleteCustomer = async (req, res) => {
  const { id } = req.params;

  try {
    await client.query('DELETE FROM customers WHERE id = $1', [id]);
    res.json({ message: 'Customer deleted' });
  } catch (err) {
    console.error('Delete customer error:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};

const isValidNationalId = (tc) => {
    return /^[1-9][0-9]{10}$/.test(tc);
};

const isValidDate = (dateString) => {
    const date = new Date(dateString);
    return !isNaN(date.getTime());
};

module.exports = {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
};
