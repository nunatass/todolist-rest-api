const express = require('express');

const dotenv = require('dotenv');

const cors = require('cors');

const routes = require('./routes');

dotenv.config({ path: '../.env' });

const PORT = process.env.PORT || 3333;

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes);

app.listen(PORT, () => {
    console.log(`server running in http://localhost:${PORT}`);
});
