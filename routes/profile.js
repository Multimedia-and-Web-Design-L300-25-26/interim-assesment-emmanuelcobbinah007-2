import express from 'express';
import protect from '../middleware/auth.js';
import User from '../models/User.js';

const profileRoutes = express.Router();

// GET /api/profile
// Returns the currently authenticated user's profile data.
profileRoutes.get('/', protect, async (req, res) => {
	try {
		const user = await User.findById(req.user.id).select('-password');

		if (!user) {
			return res.status(404).json({ message: 'User not found' });
		}

		return res.status(200).json({ user });
	} catch (err) {
		return res.status(500).json({ message: 'Failed to fetch profile', error: err.message });
	}
});

export default profileRoutes;
