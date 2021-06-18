const { Schema, model } = require('mongoose');
//require('mongoose-type-email');
const validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};


const UserSchema = new Schema({
    userame: {
        type: String,
        unique: true,
        required: true,
        trim: true
    },
    email: {
        
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
       
    },
    // email: {
    //     type: String,
    //     email: {
    //         work: {type: mongoose.SchemaTypes.Email, required: true}
    //     },
    //     unique: true,
    // },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought'
        }
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
},
{
    toJSON: {
        virtuals: true
    },
    id: false
}
);

UserSchema.virtual('friendCount').get(function() {
    return this.friendCount.length
});

const User = model('User', UserSchema);
module.exports = User;