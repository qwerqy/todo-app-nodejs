process.env.NODE_ENV = 'test'
const request = require('./util/httpRequests.js')
const users = require('../repositories/users.js')

describe('User Authentication API', () => {
	const testUser = {
		email: 'test@example.com',
		password: 'password123',
	}

	afterAll(async () => {
		await users.deleteAll()
	})

	describe('User Registration', () => {
		it('should successfully register a new user and return user id with 201 status', async () => {
			const response = await request.post('/auth/register', testUser)
			expect(response.status).toBe(201)
			expect(response.body).toHaveProperty('id')
			expect(typeof response.body.id).toBe('number')
		})

		it('should fail to register with invalid email format', async () => {
			const response = await request.post('/auth/register', {
				email: 'invalid-email',
				password: 'password123',
			})
			expect(response.status).toBe(400)
			expect(response.body).toHaveProperty('message')
		})

		it('should fail to register with missing password', async () => {
			const response = await request.post('/auth/register', {
				email: 'test@example.com',
			})
			expect(response.status).toBe(400)
			expect(response.body).toHaveProperty('message')
		})
	})

	describe('User Sign In', () => {
		it('should successfully sign in and return JWT token with 200 status', async () => {
			const response = await request.post('/auth/signin', testUser)
			expect(response.status).toBe(200)
			expect(response.body).toHaveProperty('token')
			expect(response.body).toHaveProperty(
				'message',
				'User signed in successfully',
			)
			expect(typeof response.body.token).toBe('string')
		})

		it('should fail to sign in with non-existent email', async () => {
			const response = await request.post('/auth/signin', {
				email: 'nonexistent@example.com',
				password: 'password123',
			})
			expect(response.status).toBe(404)
			expect(response.body).toHaveProperty('message', 'User not found')
		})

		it('should fail to sign in with incorrect password', async () => {
			const response = await request.post('/auth/signin', {
				email: testUser.email,
				password: 'wrongpassword',
			})
			expect(response.status).toBe(401)
			expect(response.body).toHaveProperty('message', 'Invalid credentials')
		})

		it('should fail to sign in with missing credentials', async () => {
			const response = await request.post('/auth/signin', {
				email: testUser.email,
			})
			expect(response.status).toBe(400)
			expect(response.body).toHaveProperty('message')
		})
	})
})
