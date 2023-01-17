const { errors: { LengthError, NotFoundError, FormatError } } = require('com')
const { User, Post } = require('../models')
/**
 * Update users posts 
 * 
 * @param {string} userId The user id
 * @param {string} postId The user id
 * @param {string} title The title of the text
 * @param {string} text The user text
 * @param {string} visibility The text visibility
 * @param {string} image the image post
 * 
 */
module.exports = function (userId, postId, title, text, visibility, image) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')
    
    if (typeof title !== 'string') throw new TypeError('title is not a string')
    if (!title.length) throw new LengthError('title is empty')
    
    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new LengthError('postId is empty')
    
    if (typeof text !== 'string') throw new TypeError('text is not a string')
    if (!text.length) throw new LengthError('text is empty')
    
    if (typeof visibility !== 'string') throw new TypeError('visibility is not a string')
    if (!visibility.length) throw new LengthError('visibility is empty')
    if (visibility !== 'public' && visibility !== 'private') throw new FormatError('invalid visibility')

    if (image) {
        if (typeof image !== 'string') throw new TypeError('image is not a string')
        if (!image.length) throw new Error('image is empty')
    }

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Post.findById(postId)
        })
        .then(post => {
            if (post.user.toString() !== userId)
                throw new Error(`post with id ${postId} does not belong to user with id ${userId}`)
                 
                return Post.updateOne({_id: postId}, { $set: { title, text, visibility, image, date: new Date} }).lean()
            })
}