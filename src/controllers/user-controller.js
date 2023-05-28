const  UserService  = require('../services/user-service');

const userService = new UserService();
const create = async (req, res) => {
    try {
        const response = await userService.create({
            email: req.body.email,
            password: req.body.password
        });
        return res.status(201).json({
            data: response,
            message: 'Sucessfully created a new user',
            sucess: true,
            err: {}
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            data: {},
            message: 'Something went wrong',
            sucess: false,
            err: error
        });
    }
}

module.exports = {
    create
}