const { Thoughts, Thought, User } = require('../models');

// api/thought
const ThoughtController = {
    getAllThoughts(req, res) {
        Thought.find({})
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    getThoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    createThought(req, res) {
        Thought.create(req.body) 
        
        // push the created thought's _id to the associated user's thoughts array field
        .then(({ _id })=> {
            return User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: _id }},
                { new: true}
            );
        })
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(400).json({ message: 'No user with this id' })
                return;
        }
            res.json(dbThoughtData);
        })
            .catch(err => {
                console.log(err);
                res.json(err); 
            })
                 
    },
    updateThought( req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id}, req.body, { new: true, runValidators: true})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
            res.status(404).json({ message: 'No thought found with this id!' });
            return;
            }
            res.json(dbThoughtData);
        })
        .catch(err => res.status(400).json(err));
    },
    deleteThought( req, res ) {
        Thought.findByIdAndDelete({ _id: req.params.id})
        .then(dbThoughtData => {
            if (!dbThoughtData) {
                res.status(404).json({ message: 'No thought found with this id!' });
                return;
            }
            res.json(dbThoughtData);
            })
            .catch(err => res.status(400).json(err));
    },

    // /api/thoughts/:thoughtId/reactions
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $push:{ reactions: { reactionBody: req.body.reactionBody } }},
            { new: true } 
            )
       
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.id },
            { $pull: { reactions: { reactionId: req.body.reactionId }}},
            { new: true }
        )
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => res.json(err));
    }
};

module.exports = ThoughtController;