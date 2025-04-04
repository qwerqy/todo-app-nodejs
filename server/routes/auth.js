const express = require('express')
const router = express.Router()
const { generateToken } = require('../services/jwt')
const { createUser, signInUser } = require('../services/users.js')
/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 * /auth/generate:
 *   post:
 *     summary: Generate a JWT token
 *     description: Generates a JWT token for a user with their email and name
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: JWT token generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid request body
 */
router.post('/generate', (req, res) => {
	const { email, name } = req.body

	if (!email || !name) {
		return res.status(400).json({ error: 'Email and name are required' })
	}

	try {
		const token = generateToken({ email, name })
		res.status(201).json({ token })
	} catch (error) {
		res.status(500).json({ error: 'Error generating token' })
	}
})

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     description: Registers a new user with their email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Invalid request body
 *       409:
 *         description: User already exists
 */
router.post('/register', createUser)

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication endpoints
 * /auth/signin:
 *   post:
 *     summary: Sign in a user
 *     description: Signs in a user with their email and password
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: User signed in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       401:
 *         description: Invalid credentials
 */
router.post('/signin', signInUser)

module.exports = router
