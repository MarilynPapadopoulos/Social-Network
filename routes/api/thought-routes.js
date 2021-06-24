const router = require('express').Router();

const {
    getAllThoughts,
    getThoughtById,
    createThought,
    updateThought,
    deleteThought,
    createReaction,
    deleteReaction
} = require('../../controllers/thought-controllers');

// api/thought
router
    .route('/')
    .get(getAllThoughts)
    .post(createThought);

// api/thought/:id
router
    .route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// api/thought/:id.reactions
router
    .route('/:id/reactions')    
    .post(createReaction)
    .delete(deleteReaction)

module.exports = router;