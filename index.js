import express from 'express';
import connectToMongoDB from './utils/mongoConnection.js';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import cryptoRoutes from './routes/crypto.js';
import corsMiddleware from './middleware/cors.js';
import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

connectToMongoDB();
// Apply CORS middleware early in the stack
app.use(corsMiddleware);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Handle malformed JSON payloads from clients and return JSON error
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    return res.status(400).json({ message: 'Invalid JSON payload', error: err.message });
  }
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/crypto', cryptoRoutes);

// Define your routes here
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});