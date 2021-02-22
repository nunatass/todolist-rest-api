const connection = require('../database/connection');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    async create(request, response) {
        const { email, password } = request.body;

        const userExists = await connection('user')
            .select('email')
            .where('email', email)
            .first();

        console.log(userExists);

        if (userExists)
            return response.status(409).json({ error: 'User already exists.' });

        hashedPassword = bcrypt.hashSync(password, 8);
        const id = uuidv4();

        await connection('user')
            .insert({
                id,
                email,
                password: hashedPassword,
            })
            .returning('*');

        return response.status(209).send();
    },
    async index(request, response) {
        const users = await connection('user').select('*');

        const usersWithTodos = await users.map(async (user) => {
            const todoLists = await connection('todo_list').where(
                'user_id',
                user.id
            );

            delete user.password;
            user.todo_lists = todoLists;
            return user;
        });

        Promise.all(usersWithTodos).then((result) => {
            return response.json(result);
        });
    },

    async getUserById(request, response) {
        const { id } = request.params;

        const user = await connection('user').where('id', id).first();

        if (!user)
            return response.status(404).json({ error: 'user id not found' });

        const todoLists = await connection('todo_list').where(
            'user_id',
            user.id
        );

        delete user.password;

        return response.json(user);
    },

    async getUserByEmail(request, response) {
        const { email } = request.body;

        const user = await connection('user').where('email', email).first();

        if (!user)
            return response.status(404).json({ error: 'user email not found' });

        const todoLists = await connection('todo_list').where(
            'user_id',
            user.id
        );

        delete user.password;

        return response.json(user);
    },

    async deleteUserById(request, response) {
        const { id } = request.params;

        await connection('user').where('id', id).delete();

        return response.json();
    },

    async deleteUserByEmail(request, response) {
        const { email } = request.body;

        await connection('user').where('email', email).delete();

        return response.json();
    },

    async updatePassword(request, response) {
        const { email, password } = request.body;

        await connection('user').where('email', email).update({ password });

        return response.json();
    },
};
