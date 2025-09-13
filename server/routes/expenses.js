import express from 'express';
import jwt from 'jsonwebtoken';
import Expense from '../models/Expense.js';

const router = express.Router();

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
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userExpenses = await Expense.find({ userId: req.user.id }).sort({ expense_date: -1 });
    res.json(userExpenses);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new expense
router.post('/', authenticateToken, async (req, res) => {
  const { title, amount, category, type, country } = req.body;

  try {
    // Check for duplicate expense for today
    const today = new Date().toLocaleDateString();
    const existingExpense = await Expense.findOne({
      userId: req.user.id,
      title: title.trim().toLowerCase(),
      amount: Number(amount),
      category,
      type,
      country,
      expense_date: {
        $gte: new Date(today),
        $lt: new Date(new Date(today).getTime() + 24 * 60 * 60 * 1000)
      }
    });

    if (existingExpense) {
      return res.status(400).json({ message: 'Duplicate expense detected for today!' });
    }

    const expense = new Expense({
      userId: req.user.id,
      title: title.trim(),
      amount: Number(amount),
      category,
      type,
      country,
      expense_date: new Date()
    });

    await expense.save();
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
