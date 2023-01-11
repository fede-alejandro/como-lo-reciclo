const { model } = require('mongoose')
const { user, post, chat, comment } = require('./schemas')

const User = model('User', user)
const Post = model('Post', post)
const Chat = model('Chat', chat)
const Comment = model('Comment', comment)

module.exports = {
    User,
    Post,
    Chat,
    Comment,
}
    