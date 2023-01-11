const { Schema } = require('mongoose')
const { Types: { ObjectId }} = Schema
const comment = require('./comment')

module.exports = new Schema({
    user: {
        type: ObjectId,
        ref: 'User'
    },
    comments: [comment]
})