const users = require('../repositories/users.js')
const bcrypt = require('bcrypt')
const { generateToken } = require('../services/jwt.js')

async function createUser(req, res) {
	try {
		// Validate required fields
		if (!req.body.email || !req.body.password) {
			return res
				.status(400)
				.send({ message: 'Email and password are required' })
		}

		// Validate email format
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		if (!emailRegex.test(req.body.email)) {
			return res.status(400).send({ message: 'Invalid email format' })
		}

		// Check if user already exists
		const existingUser = await users.getByEmail(req.body.email)
		if (existingUser) {
			return res.status(409).send({ message: 'User already exists' })
		}

		const user = await users.create(req.body.email, req.body.password)
		return res.status(201).send({ id: user.id })
	} catch (error) {
		console.error(error)
		return res.status(500).send({ message: 'Internal server error' })
	}
}

async function signInUser(req, res) {
	const user = await users.getByEmail(req.body.email)
	if (!user) {
		return res.status(404).send({ message: 'User not found' })
	}

	// Check if both password and hash are provided
	if (!req.body.password || !user.password) {
		return res.status(400).send({ message: 'Password is required' })
	}

	const isPasswordValid = await bcrypt.compare(req.body.password, user.password)
	if (!isPasswordValid) {
		return res.status(401).send({ message: 'Invalid credentials' })
	}

	const token = generateToken(user)

	return res.send({ message: 'User signed in successfully', token })
}

module.exports = {
	createUser,
	signInUser,
}
