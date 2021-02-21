const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { name } = request.body;

        const [id] = await connection('todo_list').insert({ name });

        return response.json({ id });
    },
    //BUG
    /*
    async index(request, response) {
        const todoLists = await connection('todo_list').select('*');

        const todoListWithTask = todoLists.map(async (todo) => {
            const tasks = await connection('task').where('list_id', todo.id);
             todo.tasks = tasks
             return todo
        });

        return response.json(todoListWithTask);
    },
    */

    async index(request, response) {
        const todoLists = await connection('todo_list').select('*');

        const allTasks = await connection('task').select('*');

        const todoListsWithTasks = todoLists.map((todo) => {
            const tasks = allTasks.filter(({ list_id }) => list_id === todo.id);
            todo.tasks = tasks;
            return todo;
        });

        return response.json(todoListsWithTasks);
    },

    async update(request, response) {
        const { id } = request.params;

        const { name, completed_at = null } = request.body;

        const update_at = connection.fn.now();

        await connection('todo_list')
            .where('id', id)
            .update({ name, update_at, completed_at });

        return response.status(204).send();
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('todo_list').where('id', id).delete();

        return response.status(204).send();
    },
};
