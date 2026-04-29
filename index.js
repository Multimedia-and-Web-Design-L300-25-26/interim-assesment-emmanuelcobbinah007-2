import express from 'express';
import connectToMongoDB from './utils/mongoConnection.js';
import authRoutes from './routes/auth.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

connectToMongoDB();

app.use(express.json());
app.use('/api/auth', authRoutes);

// Define your routes here
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});