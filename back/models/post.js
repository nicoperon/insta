const mongoose = require('mongoose');
const { Schema } = mongoose;

const postSchema =  new Schema({
    _id: Schema["Types"].ObjectId,
    content: {
        type: String,

    },
    user: {
        type: Object,

    },
    like: {
        type: [Object],
    },
    dilike: {
        type: [Object],
    },
}, {
    timestamps: true,
})

postSchema.set('toJSON', {
    transform: (doc, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject._v;
    }
})

module.exports = mongoose.model('Post', postSchema);