process.env.NODE_ENV = 'test'
const jwt = require('../services/jwt')
const request = require('supertest')
const app = require('../server')

describe('JWT Service', () => {
	describe('Token Generation', () => {
		it('should generate a token successfully with valid user data', () => {
			const user = {
				email: 'test@example.com',
				name: 'Test User',
			}

			const token = jwt.generateToken(user)

			expect(token).toBeDefined()
			expect(typeof token).toBe('string')
			expect(token.length).toBeGreaterThan(0)
		})

		it('should throw an error when user data is missing required fields', () => {
			const invalidUser = {
				name: 'Test User',
				// Missing email
			}

			expect(() => {
				jwt.generateToken(invalidUser)
			}).toThrow()
		})
	})

	describe('Token Verification', () => {
		it('should verify a valid token successfully', () => {
			const user = {
				email: 'test@example.com',
				name: 'Test User',
			}

			const token = jwt.generateToken(user)
			const decoded = jwt.verifyToken(token)

			expect(decoded).toBeDefined()
			expect(decoded.email).toBe(user.email)
			expect(decoded.name).toBe(user.name)
		})

		it('should throw an error when verifying an invalid token', () => {
			const invalidToken = 'invalid.token.here'

			expect(() => {
				jwt.verifyToken(invalidToken)
			}).toThrow('Invalid token')
		})
	})
})

describe('Auth API Endpoints', () => {
	describe('POST /auth/generate', () => {
		it('should generate a JWT token and return status 201', async () => {
			const userData = {
				email: 'test@example.com',
				name: 'Test User',
			}

			const response = await request(app).post('/auth/generate').send(userData)

			expect(response.status).toBe(201)
			expect(response.body).toHaveProperty('token')
			expect(typeof response.body.token).toBe('string')
			expect(response.body.token.length).toBeGreaterThan(0)
		})

		it('should return status 400 when email or name is missing', async () => {
			const invalidData = {
				name: 'Test User',
				// Missing email
			}

			const response = await request(app)
				.post('/auth/generate')
				.send(invalidData)

			expect(response.status).toBe(400)
			expect(response.body).toHaveProperty('error')
			expect(response.body.error).toBe('Email and name are required')
		})
	})
})
