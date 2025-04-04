const express = require('express')
const router = express.Router()
const { generateToken } = require('../services/jwt')

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

module.exports = router
