const { errors: { LengthError } } = require('com')
const { User, Post } = require('../models')
/**
 * Retrieves all posts from a specific user
 * 
 * @param {string} userId The user id
 * @param {string} targetUserId The target user id to retrieve posts from
 * 
 */
function retrievePublicPosts(userId, targetUserId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')
    if (typeof targetUserId !== 'string') throw new TypeError('targetUserId is not a string')
    if (!targetUserId.length) throw new LengthError('targetUserId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new Error(`user with id ${userId} does not exist`)

            return User.findById(targetUserId)
        })
        .then(targetUser => {
            if (!targetUser) throw new Error(`target user with id ${userId} does not exist`)

            return Post.find({ user: (targetUserId), visibility: 'public' })
                .sort({ date: -1 })
                .populate({
                    path: 'user',
                    select: '-visibility -email -password'
                })
                .populate({
                    path: 'chats',
                    populate: {
                        path: 'user',
                        select: 'name -email -password'
                    }
                })
                .populate({
                    path: 'chats',
                    populate: {
                        path: 'comments',
                        populate: {
                            path: 'user',
                            select: 'name'
                        }
                    }
                })
                .select('-__v')
                .lean()
        })
        .then(posts => {
            posts.forEach(post => {
                post.id = post._id.toString()
                delete post._id
                delete post.__v

                const { user } = post

                if (user._id) {
                    user.id = user._id.toString()
                    delete user._id
                }

                    if (post.user.id === userId) {
                        post.chats = []

                        const chat = post.chats.find(chat => (chat.user._doc.id || chat.user._doc._id.toString()) !== userId)

                        if (chat) post.chats.push(chat)
                    }

                post.chats.forEach(chat => {
                    chat.id = chat._id.toString()
                    delete chat._id

                    chat.user = chat.user._doc

                    const { user } = chat

                    if (user._id) {
                        user.id = user._id.toString()

                        delete user._id
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
                        }
                    })
                })
            })
            return posts
        })
}

module.exports = retrievePublicPosts