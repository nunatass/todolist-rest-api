const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { title, order_in_list, is_completed, list_id } = request.body;

        const todolist = await connection('todo_list')
            .where('id', list_id)
            .first();

        if (!todolist)
            return response.status(400).json({ erro: 'todo list not found' });

        const [id] = await connection('task').insert({
            title,
            list_id,
            order_in_list,
            is_completed,
        });

        return response.json({ id });
    },

    async index(request, response) {
        const tasks = await connection('task').select('*');

        return response.json(tasks);
    },

    async indexById(request, response) {
        const { list_id } = request.params;

        const tasks = await connection('task').where('list_id', list_id);

        return response.json(tasks);
    },

    async update(request, response) {
        const { id } = request.params;

        const { title, is_completed, completed_at = null } = request.body;

        await connection('task')
            .where('id', id)
            .update({ title, is_completed, completed_at });

        return response.status(204).send();
    },

    async delete(request, response) {
        const { id } = request.params;

        await connection('task').where('id', id).delete();

        return response.status(204).send();
    },
};
