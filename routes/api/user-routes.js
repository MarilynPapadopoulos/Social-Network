const router = require('express').Router();
//from user-controllers

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} = require('../../controllers/user-controllers');

//router.get('/', UserController.getAllUsers);

// api/user
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// api/user/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);


module.exports = router;