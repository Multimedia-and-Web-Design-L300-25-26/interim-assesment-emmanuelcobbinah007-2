import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Crypto from './models/Crypto.js';

dotenv.config();

const seedCryptos = [
  {
    name: 'Bitcoin',
    symbol: 'BTC',
    price: 45230.50,
    image: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
    change24h: 2.45,
  },
  {
    name: 'Ethereum',
    symbol: 'ETH',
    price: 2420.75,
    image: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    change24h: 1.82,
  },
  {
    name: 'Cardano',
    symbol: 'ADA',
    price: 0.98,
    image: 'https://cryptologos.cc/logos/cardano-ada-logo.png',
    change24h: -0.45,
  },
  {
    name: 'Solana',
    symbol: 'SOL',
    price: 139.50,
    image: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    change24h: 3.21,
  },
  {
    name: 'XRP',
    symbol: 'XRP',
    price: 2.35,
    image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png',
    change24h: -1.12,
  },
  {
    name: 'Polkadot',
    symbol: 'DOT',
    price: 9.45,
    image: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png',
    change24h: 0.87,
  },
  {
    name: 'Dogecoin',
    symbol: 'DOGE',
    price: 0.35,
    image: 'https://cryptologos.cc/logos/dogecoin-doge-logo.png',
    change24h: 4.92,
  },
  {
    name: 'Litecoin',
    symbol: 'LTC',
    price: 540.25,
    image: 'https://cryptologos.cc/logos/litecoin-ltc-logo.png',
    change24h: 1.34,
  },
  {
    name: 'Chainlink',
    symbol: 'LINK',
    price: 28.60,
    image: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    change24h: 5.67,
  },
  {
    name: 'Uniswap',
    symbol: 'UNI',
    price: 19.85,
    image: 'https://cryptologos.cc/logos/uniswap-uni-logo.png',
    change24h: -2.34,
  },
  {
    name: 'Avalanche',
    symbol: 'AVAX',
    price: 39.72,
    image: 'https://cryptologos.cc/logos/avalanche-2-avax-logo.png',
    change24h: 6.45,
  },
  {
    name: 'Polygon',
    symbol: 'MATIC',
    price: 0.89,
    image: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    change24h: 2.11,
  },
];

async function seedDatabase() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✓ Connected to MongoDB');

    // Clear existing cryptos
    await Crypto.deleteMany({});
    console.log('✓ Cleared existing crypto data');

    // Insert seed data
    const inserted = await Crypto.insertMany(seedCryptos);
    console.log(`✓ Inserted ${inserted.length} cryptocurrencies`);

    console.log('\n📊 Seeded Cryptocurrencies:');
    inserted.forEach(crypto => {
      console.log(
        `   ${crypto.symbol} - ${crypto.name}: $${crypto.price.toFixed(2)} (${crypto.change24h > 0 ? '+' : ''}${crypto.change24h}%)`
      );
    });

    // Disconnect
    await mongoose.disconnect();
    console.log('\n✓ Database seeded successfully and connection closed');
    process.exit(0);
  } catch (err) {
    console.error('✗ Seed error:', err.message);
    process.exit(1);
  }
}

seedDatabase();
