const knex = require('../database/connection.js')
const bcrypt = require('bcrypt')

async function create(email, password) {
	// hash the password
	const hashedPassword = await bcrypt.hash(password, 10)

	// create the user
	const results = await knex('users')
		.insert({ email, password: hashedPassword })
		.returning('*')
	return results[0]
}

async function get(id) {
	const results = await knex('users').where({ id })
	return results[0]
}

async function getByEmail(email) {
	const results = await knex('users').where({ email })
	return results[0]
}

async function deleteAll() {
	await knex('users').delete()
}

module.exports = {
	create,
	get,
	getByEmail,
	deleteAll,
}
