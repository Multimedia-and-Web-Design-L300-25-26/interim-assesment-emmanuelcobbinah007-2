import jwt from 'jsonwebtoken';

const protect = (req, res, next) => {
     const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Format: "Bearer <token>"

  if (!token) return res.status(401).json({ message: 'No token provided' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user payload to request
    next();
  } catch (err) {
    res.status(403).json({ message: 'Invalid token' });
  }
};

module.exports = protect;