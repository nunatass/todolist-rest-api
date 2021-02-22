exports.up = function (knex) {
    return knex.schema.createTable('task', (table) => {
        table.increments('id').primary();

        table.string('title', 100).notNullable();

        table.integer('order_in_list').unsigned();

        table.boolean('is_completed').notNullable;

        table.timestamp('created_at').defaultTo(knex.fn.now()).notNullable();

        table.timestamp('update_at').defaultTo(knex.fn.now()).notNullable();

        table.timestamp('completed_at').defaultTo(knex.fn.now());

        table.integer('list_id').notNullable();

        table.foreign('list_id').references('id').inTable('todo_list');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('task');
};
