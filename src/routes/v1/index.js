const express = require('express');

const UserController = require('../../controllers/user-controller');
const {AuthRequestValidators} = require('../../middlewares/index');


const router = express.Router();

router.post(
    '/signup', 
    AuthRequestValidators.validateUserAuth,
    UserController.create
);
router.post(
    '/signin',
    AuthRequestValidators.validateUserAuth,
    UserController.signIn
);

router.get(
    '/isAuthenticated',
    UserController.isAuthenticated,
);

router.patch(
    '/user/update/:id', 
    UserController.updateUser
);

router.delete(
    '/user/delete/:id', 
    UserController.deleteUser
);

router.get(
    '/user/:id',
    UserController.fetchUser
);

router.get(
    '/users',
    UserController.fetchAllUsers
);

router.get(
    '/isAdmin',
    AuthRequestValidators.validateIsAdminRequest,
    UserController.isAdmin
);

module.exports = router;