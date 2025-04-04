const app = require('./server-config.js')
const routes = require('./server-routes.js')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger.js')

const port = process.env.PORT || 5000

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Auth routes
app.use('/auth', routes.auth)

// Todos routes
app.use('/todos', routes.todos)

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => console.log(`Listening on port ${port}`))
}

module.exports = app
