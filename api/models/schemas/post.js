const { Schema } = require('mongoose')
const { Types: { ObjectId } } = Schema
const chat = require('./chat')

module.exports = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    visibility: {
        type: String,
        enum: ['public', 'private'],
        default: 'public',
        required: true
    },
    image: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now,
        required: true
    },
    chats: [chat],
})