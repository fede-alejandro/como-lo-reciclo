const { errors: { LengthError, NotFoundError } } = require('com')
const { User, Post } = require('../models')
/**
 * Retrieves a post from user
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * 
 */
module.exports = function (userId, postId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')
    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new LengthError('postId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Post.findById(postId)
                .populate({
                    path: 'user',
                    select: '-email -password -__v'
                })
                .populate({
                    path: 'chats',
                    select: '-__v',
                    populate: [{
                        path: 'user',
                        select: 'name',
                    },
                    {
                        path: 'comments',
                        populate: {
                            path: 'user',
                            select: 'name'
                        }
                    }]
                })
                .lean()
        })                                           
        .then(post => {
            if (!post) throw new NotFoundError(`post with id ${postId} does not exist`)

            post.id = post._id.toString()
            delete post._id

            const { user } = post
            user.id = user._id.toString()
            delete user._id

            if (user.id !== userId) {
                const chat = post.chats.find(chat => chat.user._id.toString() === userId)

                post.chats = []

                if (chat)
                    post.chats.push(chat)
            }

            post.chats.forEach(chat => {
                chat.id = chat._id.toString()
                delete chat._id
                delete chat.__v

                chat.user = chat.user._doc

                const { user } = chat

                if (user._id) {
                    user.id = user._id.toString()
                    delete user._id
                    delete user.__v
                }

                chat.comments.forEach(comment => {
                    comment.id = comment._id.toString()
                    delete comment._id
                    delete comment.__v

                    comment.user = comment.user._doc

                    const { user } = comment

                    if (user._id) {
                        user.id = user._id.toString()
                        delete user._id
                        delete user.__v
                    }
                })
            })

            return post
        })
}