const express = require('express');
const bodyParser = require('body-parser');
const pool = require('./db');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Get all expenses
app.get('/api/expenses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM expenses ORDER BY expense_date DESC');
        res.json(result.rows);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Add expense
app.post('/api/expenses', async (req, res) => {
    try {
        const { title, amount, category, expense_date } = req.body;
        const result = await pool.query(
            'INSERT INTO expenses (title, amount, category, expense_date) VALUES ($1, $2, $3, $4) RETURNING *',
            [title, amount, category, expense_date || new Date()]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// Delete expense
app.delete('/api/expenses/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('DELETE FROM expenses WHERE id = $1', [id]);
        res.json({ message: 'Expense deleted' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
