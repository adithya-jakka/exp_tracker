import mongoose from 'mongoose';

const expenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  type: { type: String, required: true },
  country: { type: String, required: true },
  expense_date: { type: Date, default: Date.now }
});

export default mongoose.model('Expense', expenseSchema);
