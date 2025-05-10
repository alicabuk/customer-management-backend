const express = require('express');
const router = express.Router();
const {
  createCustomer,
  getAllCustomers,
  updateCustomer,
  deleteCustomer
} = require('../controllers/customerController');
const authenticateToken = require('../middleware/auth');

router.post('/add', authenticateToken, createCustomer);
router.get('/list', authenticateToken, getAllCustomers);
router.put('/update/:id', authenticateToken, updateCustomer);
router.delete('/delete/:id', authenticateToken, deleteCustomer);

module.exports = router;
