const { Schema, model } = require('mongoose');
const moment = require('moment');
const  ReactionSchema  = require('./reaction');

const ThoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minLength: 1, 
            maxLength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: time => moment(time).format('hhmm')
        },
        username: {
            type: String,
            required: true,
        },
        reactions: [
          ReactionSchema
        ]
    },
    {
        toJSON: {
            virtuals: true
        },
        id: false
        
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reaction.length;
});

const Thought = model('Thought', ThoughtSchema);
module.exports = Thought;