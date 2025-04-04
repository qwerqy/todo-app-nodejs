const swaggerJsdoc = require('swagger-jsdoc')

require('dotenv').config()

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'Todo API',
			version: '1.0.0',
			description: 'A simple Todo API',
		},
		servers: [
			{
				url: 'http://localhost:' + (process.env.PORT || 5000),
				description: 'Development server',
			},
		],
		components: {
			schemas: {
				Todo: {
					type: 'object',
					properties: {
						id: {
							type: 'string',
							description: 'The todo ID',
						},
						title: {
							type: 'string',
							description: 'The todo title',
						},
						completed: {
							type: 'boolean',
							description: 'The todo completion status',
						},
						order: {
							type: 'integer',
							description: 'The todo order',
						},
						url: {
							type: 'string',
							description: 'The todo URL',
						},
					},
				},
			},
		},
	},
	apis: ['./server.js'], // Path to the API docs
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec
