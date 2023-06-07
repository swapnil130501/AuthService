const express = require('express');
const bodyParser = require('body-parser');

const apiRoutes = require('./routes/index');
const { PORT } = require('./config/serverConfig');

const {User,Role} = require('./models/index');

const db = require('./models/index');

// const UserService = require('./services/user-service');
const app = express();

const prepareAndStartServer = () => {

        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({extended: true}));
        app.use('/api', apiRoutes);
    
    app.listen(PORT, async () => {
        console.log(`Server started on Port: ${PORT}`);
        if(process.env.DB_SYNC){
            db.sequelize.sync({alter: true});
        }

        // const u1 = await User.findByPk(2);
        // const r1 = await Role.findByPk(1);
        // u1.addRole(r1);
        
        // const service = new UserService();
        // // const newToken = service.createToken({email: 'swapnil@admin.com', id: 1});
        // // console.log("new token is", newToken);

        // const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN3YXBuaWxAYWRtaW4uY29tIiwiaWQiOjEsImlhdCI6MTY4NTM1MDkzMywiZXhwIjoxNjg1NDM3MzMzfQ.d4mvKItj3gnY0Vd8SN0XZWsnHFHB-f-ojpemutC8HBI';
        // const response = service.verifyToken(token);
        // console.log(response);
    })
}
prepareAndStartServer();