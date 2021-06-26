const router = require('express').Router();
//from user-controllers

const {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend
} = require('../../controllers/user-controllers');

//router.get('/', UserController.getAllUsers);

// api/users
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

// api/users/:id
router
    .route('/:id')
    .get(getUserById)
    .put(updateUser)
    .delete(deleteUser);

    // api/users/id/friends
router
.route('/:id/friends')
.post(addFriend)
.delete(deleteFriend);
  


module.exports = router;