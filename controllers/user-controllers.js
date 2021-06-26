const { User } = require('../models');

// api/users 
const UserController = {
   
    getAllUsers(req, res) {
        User.find({})
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getUserById(req, res) {
        User.findOne({ _id: req.params.id})
            .populate({
                path: 'friends',
                select: '__v'
            })
            .populate({
                path: 'thoughts',
                select: '__v'
            })
            .then(dbUserData => {
                if (!dbUserData) {
                    res.status(404).json({ message: 'No user found with this Id' })
                    return;
                }
                res.jsona(dbUserData);
            })
            .catch(err => {
                console.log(err);
                res.status(400).json(err);
              });
    },
    createUser(req, res) {
        User.create(req.body)
            .then(dbUserData => res.json(dbUserData))
            .catch(err => res.status(400).json(err));
    },
    updateUser( req, res) {
        User.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true, runValidators: true})
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteUser(req, res) {
        User.findByIdAndDelete({ _id: req.params.id})
        .then(dbUserData => {
            if (!dbUserData) {
                res.status(404).json({ message: 'No user found with this id!' });
                return;
            }
            res.json(dbUserData);
            })
            .catch(err => res.status(400).json(err));
    },
    addFriend(req, res) {
        User.findOneAndUpdate({ _id: req.params.id}, { friends: req.body }, { new: true }) 
        .then(dbUserData => {
            if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id!' });
            return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteFriend(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { friends: { $in: req.body }}},
            { new: true }
        )
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.json(err));
    },
};

module.exports = UserController;