import express from 'express';
import Crypto from '../models/Crypto.js';

const cryptoRoutes = express.Router();

// GET /api/crypto - Fetch all cryptocurrencies
cryptoRoutes.get('/', async (req, res) => {
  try {
    const cryptos = await Crypto.find().sort({ createdAt: -1 });
    res.status(200).json({ cryptos });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch cryptocurrencies', error: err.message });
  }
});

// GET /api/crypto/gainers - Fetch top gainers (sorted by 24h change, highest first)
cryptoRoutes.get('/gainers', async (req, res) => {
  try {
    const gainers = await Crypto.find().sort({ change24h: -1 }).limit(10);
    res.status(200).json({ gainers });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch top gainers', error: err.message });
  }
});

// GET /api/crypto/new - Fetch new listings (sorted by createdAt, newest first)
cryptoRoutes.get('/new', async (req, res) => {
  try {
    const newListings = await Crypto.find().sort({ createdAt: -1 }).limit(10);
    res.status(200).json({ newListings });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch new listings', error: err.message });
  }
});

// POST /api/crypto - Create a new cryptocurrency
cryptoRoutes.post('/', async (req, res) => {
  const { name, symbol, price, image, change24h } = req.body;

  // Validate required fields
  if (!name || !symbol || price === undefined || !image) {
    return res.status(400).json({
      message: 'Missing required fields: name, symbol, price, image',
    });
  }

  try {
    // Check if cryptocurrency already exists
    const existingCrypto = await Crypto.findOne({ $or: [{ name }, { symbol }] });
    if (existingCrypto) {
      return res.status(400).json({
        message: 'Cryptocurrency with this name or symbol already exists',
      });
    }

    // Create new cryptocurrency
    const newCrypto = new Crypto({
      name,
      symbol,
      price,
      image,
      change24h: change24h || 0,
    });

    await newCrypto.save();
    res.status(201).json({
      message: 'Cryptocurrency created successfully',
      crypto: newCrypto,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Failed to create cryptocurrency',
      error: err.message,
    });
  }
});

export default cryptoRoutes;
