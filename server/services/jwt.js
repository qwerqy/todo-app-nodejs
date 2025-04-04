const jwt = require('jsonwebtoken')
const { addErrorReporting } = require('../utils')

// JWT secret should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

/**
 * Generates a JWT token for a user
 * @param {Object} user - The user object
 * @param {string} user.email - User's email
 * @returns {string} JWT token
 */
function generateToken(user) {
	if (!user.email) {
		throw new Error('Email is required')
	}

	const payload = {
		email: user.email,
	}

	const options = {
		expiresIn: '15m', // Token expires in 15 minutes
		audience: 'api',
		issuer: 'taskmanager',
	}

	return jwt.sign(payload, JWT_SECRET, options)
}

/**
 * Verifies a JWT token
 * @param {string} token - JWT token to verify
 * @returns {Object} Decoded token payload
 */
function verifyToken(token) {
	try {
		return jwt.verify(token, JWT_SECRET)
	} catch (error) {
		throw new Error('Invalid token')
	}
}

module.exports = {
	generateToken,
	verifyToken,
}
