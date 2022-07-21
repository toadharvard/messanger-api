require('dotenv').config();
const bodyParser = require('body-parser');
const utils = require('./utils');
const models = require('./models');
const http = require('http');
const express = require('express');
const path = require('path');
const routes = require('./routes');
const app = express();
const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: { origin: 'http://localhost:8080' },
});

const PORT = process.env.PORT || 3000;

app.set('io', io);
app.set('models', models);
app.set('utils', utils);
app.set('views', path.join(__dirname, './views'));
app.use(express.json());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'static')));
app.use('/api', routes.api);

server.listen(PORT, async () => {
    console.log(`Server listens https://localhost:${PORT}`);
    await models.sequelize.sync({ force: true });
});
