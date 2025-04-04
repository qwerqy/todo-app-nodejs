/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
	return knex.schema.alterTable('todos', table => {
		table.integer('user_id').references('users.id')
	})
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
	return knex.schema.alterTable('todos', table => {
		table.dropColumn('user_id')
	})
}
