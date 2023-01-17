const { errors: { LengthError, NotFoundError } } = require('com')
const { User, Post} = require('../models');
/**
 * Delete comment from a post
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * @param {string} chatId The chat id
 * @param {string} commentId The comment id
 * 
 */
function deleteComment(userId, postId, chatId, commentId) {
    if (typeof userId !== 'string') throw TypeError('userId is not a string');
    if (userId.length === 0) throw new LengthError('userId is empty');

    if (typeof postId !== 'string') throw TypeError('postId is not a string');
    if (postId.length === 0) throw new LengthError('postId is empty');

    if (typeof chatId !== 'string') throw TypeError('chatId is not a string');
    if (chatId.length === 0) throw new LengthError('chatId is empty');

    if (typeof commentId !== 'string') throw TypeError('commentId is not a string');
    if (commentId.length === 0 || commentId.trim() === '') throw new LengthError('commentId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

            return Post.findById(postId) 
            //Post.updateOne({ _id: postId }, { $pull: { "chats.comments._id": commentId } })
        })
        .then(post => {
            if (!post) throw new NotFoundError(`post with id ${postId} not found`)

            const { chats } = post

            const chat = chats.find(chat => chat.id === chatId)

            if (!chat) throw new NotFoundError(`chat with id ${chatId} not found`)

            const { comments } = chat

            const commentIndex = comments.findIndex(comment => comment.id === commentId)

            if (commentIndex < 0) throw new NotFoundError(`comment with id ${commentId} not found`)

            const comment = comments[commentIndex]

            if (comment.user.toString() !== userId) throw new Error(`comment with id ${commentId} does not belong to user ${userId}`)

            comments.splice(commentIndex, 1)

            if (!chat.comments.length) {
                const chatIndex = chats.findIndex(_chat => _chat._id.toString() === chat._id.toString())

                chats.splice(chatIndex, 1)
            }

            return post.save()
        })
        .then(() => {})

}
module.exports = deleteComment