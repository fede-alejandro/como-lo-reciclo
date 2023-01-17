const { errors: { LengthError, NotFoundError } } = require('com')
const { User } = require('../models')
/**
 * Retrieves a user
 * 
 * @param {string} userId The user id (requester)
 * @param {string} targetUserId The target user id to retrieve
 * 
 */
module.exports = function (userId, targetUserId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')
    if (typeof targetUserId !== 'string') throw new TypeError('targetUserId is not a string')
    if (!targetUserId.length) throw new LengthError('targetUserId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return User.findById(targetUserId).select('-password -__v')
        })
        .then(targetUser => {
            if (!targetUser) throw new NotFoundError(`target user with id ${userId} does not exist`)

            if (!targetUser.id) {
                targetUser.id = targetUser._id.toString()
                delete targetUser._id

            }
            return targetUser
        })
}