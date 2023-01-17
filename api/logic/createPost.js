const { errors: { LengthError, FormatError, NotFoundError } } = require('com')
const { User, Post } = require('../models')
/**
 * Create post from user
 * 
 * @param {string} userId The user id
 * @param {string} title The post title
 * @param {string} text The post text
 * @param {string} visibility The post visibility
 * @param {string} image The post image
 * 
 */
function createPost( userId, title, text, visibility, image) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')

    if (typeof title !== 'string') throw new TypeError('title is not a string')
    if (!title.length) throw new LengthError('title is empty')

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

            return Post.create({ user: userId, title, text, visibility, image, date: new Date() })
        })
}

module.exports = createPost

