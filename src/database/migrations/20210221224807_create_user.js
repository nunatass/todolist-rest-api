exports.up = function (knex) {
    return knex.schema.createTable('user', (table) => {
        table.uuid('id').primary();

        table.string('email').notNullable().unique();

        table.string('password').notNullable();
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('user');
};
