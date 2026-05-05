// CORS Middleware
const corsMiddleware = (req, res, next) => {
  // Allow requests from localhost (development) and specific production domains
const allowedOrigins = [
  'http://localhost:5173',
  'https://22169110-coinbase-clone.netlify.app',
];

  const origin = req.headers.origin;

  // Allow any origin that matches our list, or allow all origins (adjust based on security needs)
  if (!origin || allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin || '*');
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');

  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
};

export default corsMiddleware;
