const express = require('express');

const routes = express.Router();

const TodoListController = require('./controllers/TodoListController');

const TaskController = require('./controllers/TaskController');

// todo
routes.get('/todolist', TodoListController.index);

routes.post('/todolist', TodoListController.create);

routes.put('/todolist/:id', TodoListController.update);

routes.delete('/todolist/:id', TodoListController.delete);

// task
routes.get('/todolist/task', TaskController.index);

routes.get('/todolist/task/:list_id', TaskController.indexById);

routes.post('/todolist/task', TaskController.create);

routes.put('/todolist/task/:id', TaskController.update);

routes.delete('/todolist/task/:id', TaskController.delete);

module.exports = routes;
