import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './server/mongoConnection.js';
import authRoutes from './server/routes/auth.js';
import expenseRoutes from './server/routes/expenses.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(express.json());

// Serve static files from the current directory (where index.html, signup.html, login.html are)
app.use(express.static(path.join(__dirname)));

app.use('/auth', authRoutes);
app.use('/expenses', expenseRoutes);

// Catch-all handler: send back index.html for any non-API routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
