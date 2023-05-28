const express = require('express');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index');
const { PORT } = require('./config/serverConfig');

const app = express();

const prepareAndStartServer = () => {
    
    app.listen(PORT, () => {
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));

        app.use('/api', apiRoutes);
        console.log(`Server started on Port: ${PORT}`);
    })
}
prepareAndStartServer();