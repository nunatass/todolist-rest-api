exports.up = function (knex) {
    return knex.schema.createTable('todo_list', (table) => {
        table.increments('id').primary();

        table.string('name', 50).notNullable();

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();

        table.timestamp('update_at').defaultTo(knex.fn.now()).notNullable();

        table.timestamp('completed_at');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('todo_list');
};
