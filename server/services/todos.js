const _ = require('lodash')
const todos = require('../repositories/todos.js')
const { addErrorReporting } = require('../utils.js')

function createToDo(req, data) {
	const protocol = req.protocol,
		host = req.get('host'),
		id = data.id

	return {
		title: data.title,
		order: data.order,
		completed: data.completed || false,
		url: `${protocol}://${host}/todos/${id}`,
	}
}

async function getAllTodos(req, res) {
	const allEntries = await todos.all()
	return res.send(allEntries.map(_.curry(createToDo)(req)))
}

async function getTodo(req, res) {
	const todo = await todos.get(req.params.id)
	return res.send(todo)
}

async function postTodo(req, res) {
	const created = await todos.create(req.body.title, req.body.order)
	return res.send(createToDo(req, created))
}

async function patchTodo(req, res) {
	const patched = await todos.update(req.params.id, req.body)
	return res.send(createToDo(req, patched))
}

async function deleteAllTodos(req, res) {
	const deletedEntries = await todos.clear()
	return res.send(deletedEntries.map(_.curry(createToDo)(req)))
}

async function deleteTodo(req, res) {
	const deleted = await todos.delete(req.params.id)
	return res.send(createToDo(req, deleted))
}

module.exports = {
	getAllTodos,
	getTodo,
	postTodo,
	patchTodo,
	deleteAllTodos,
	deleteTodo,
}
