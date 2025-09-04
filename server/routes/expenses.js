import express from 'express';
import jwt from 'jsonwebtoken';

const router = express.Router();

// In-memory expense storage (for testing without MongoDB)
let expenses = [];

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'fallback_secret');
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Get all expenses for the logged-in user
router.get('/', authenticateToken, (req, res) => {
  try {
    const userExpenses = expenses.filter(exp => exp.userId === req.user.id).sort((a, b) => new Date(b.expense_date) - new Date(a.expense_date));
    res.json(userExpenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new expense
router.post('/', authenticateToken, (req, res) => {
  const { title, amount, category, type, country } = req.body;

  try {
    // Check for duplicate expense for today
    const today = new Date().toLocaleDateString();
    const existingExpense = expenses.find(exp =>
      exp.userId === req.user.id &&
      exp.title.trim().toLowerCase() === title.trim().toLowerCase() &&
      Number(exp.amount) === Number(amount) &&
      exp.category === category &&
      exp.type === type &&
      exp.country === country &&
      new Date(exp.expense_date).toLocaleDateString() === today
    );

    if (existingExpense) {
      return res.status(400).json({ message: 'Duplicate expense detected for today!' });
    }

    const expense = {
      id: Date.now(),
      userId: req.user.id,
      title: title.trim(),
      amount: Number(amount),
      category,
      type,
      country,
      expense_date: new Date()
    };

    expenses.push(expense);
    res.status(201).json(expense);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an expense
router.delete('/:id', authenticateToken, (req, res) => {
  try {
    const expenseIndex = expenses.findIndex(exp => exp.id == req.params.id && exp.userId === req.user.id);

    if (expenseIndex === -1) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    expenses.splice(expenseIndex, 1);
    res.json({ message: 'Expense deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
