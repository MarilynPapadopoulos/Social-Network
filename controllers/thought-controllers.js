const { Thoughts, Thought} = require('../models');

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
        .then(dbThoughtData => res.json(dbThoughtData))
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
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
    }
}

module.exports = ThoughtController;