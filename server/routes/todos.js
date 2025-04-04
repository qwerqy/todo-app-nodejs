const express = require('express')
const router = express.Router()
const {
	getAllTodos,
	getTodo,
	postTodo,
	patchTodo,
	deleteAllTodos,
	deleteTodo,
} = require('../services/todos')

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management endpoints
 * /todos/:
 *   get:
 *     summary: Get all todos
 *     description: Retrieve a list of all todos
 *     tags: [Todos]
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
router.get('/', getAllTodos)

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management endpoints
 * /todos/{id}:
 *   get:
 *     summary: Get a todo by ID
 *     description: Retrieve a specific todo by its ID
 *     tags: [Todos]
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
router.get('/:id', getTodo)

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management endpoints
 * /todos/:
 *   post:
 *     summary: Create a new todo
 *     description: Create a new todo with the provided details
 *     tags: [Todos]
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
router.post('/', postTodo)

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management endpoints
 * /todos/{id}:
 *   patch:
 *     summary: Update a todo
 *     description: Update an existing todo by its ID
 *     tags: [Todos]
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
router.patch('/:id', patchTodo)

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management endpoints
 * /todos/:
 *   delete:
 *     summary: Delete all todos
 *     description: Remove all todos from the system
 *     tags: [Todos]
 *     responses:
 *       200:
 *         description: All todos have been deleted
 */
router.delete('/', deleteAllTodos)

/**
 * @swagger
 * tags:
 *   name: Todos
 *   description: Todo management endpoints
 * /todos/{id}:
 *   delete:
 *     summary: Delete a todo
 *     description: Remove a specific todo by its ID
 *     tags: [Todos]
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
router.delete('/:id', deleteTodo)

module.exports = router
