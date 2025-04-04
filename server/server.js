const app = require('./server-config.js')
const routes = require('./server-routes.js')
const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger.js')

const port = process.env.PORT || 5000

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all todos
 *     description: Retrieve a list of all todos
 *     responses:
 *       200:
 *         description: A list of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 */
app.get('/', routes.getAllTodos)

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a todo by ID
 *     description: Retrieve a specific todo by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: The todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
app.get('/:id', routes.getTodo)

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new todo
 *     description: Create a new todo with the provided details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The todo title
 *               order:
 *                 type: integer
 *                 description: The todo order
 *     responses:
 *       200:
 *         description: The created todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 */
app.post('/', routes.postTodo)

/**
 * @swagger
 * /{id}:
 *   patch:
 *     summary: Update a todo
 *     description: Update an existing todo by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The todo title
 *               completed:
 *                 type: boolean
 *                 description: The todo completion status
 *               order:
 *                 type: integer
 *                 description: The todo order
 *     responses:
 *       200:
 *         description: The updated todo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: Todo not found
 */
app.patch('/:id', routes.patchTodo)

/**
 * @swagger
 * /:
 *   delete:
 *     summary: Delete all todos
 *     description: Remove all todos from the system
 *     responses:
 *       200:
 *         description: All todos have been deleted
 */
app.delete('/', routes.deleteAllTodos)

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a todo
 *     description: Remove a specific todo by its ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The todo ID
 *     responses:
 *       200:
 *         description: The todo has been deleted
 *       404:
 *         description: Todo not found
 */
app.delete('/:id', routes.deleteTodo)

if (process.env.NODE_ENV !== 'test') {
	app.listen(port, () => console.log(`Listening on port ${port}`))
}

module.exports = app
