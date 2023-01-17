const { errors: { LengthError, NotFoundError, ConflictError } } = require('com')
const { User, Post, Chat } = require('../models')
/**
 * Create a chat on a post
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 */
function createChat(userId, postId) {
    if (typeof userId !== 'string') throw TypeError('userId is not a string')
    if (userId.length === 0) throw new LengthError('userId is empty')

    if (typeof postId !== 'string') throw TypeError('postId is not a string')
    if (postId.length === 0) throw new LengthError('postId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Post.findById(postId)
        })
        .then(post => {
            if (!post)
                throw new NotFoundError(`post with id ${postId} does not exist`)

            let chat = post.chats.find(chat => chat.user._id.toString() === userId)

            if (chat) throw new ConflictError(`user with id ${userId} already has a chat with id ${chat.id} in post with id ${post.id}`)

            if (!chat) {
                chat = new Chat()

                chat.user = userId

                post.chats.push(chat)

                return post.save()
                    .then(() => chat.id)
            }
        })
}

module.exports = createChat