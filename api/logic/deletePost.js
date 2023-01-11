
const { errors: { LengthError, NotFoundError } } = require('com')
const { User, Post } = require('../../../../..')
/**
 * Delete post from a specific user
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * 
 */
function deletePost(userId, postId) {
    if (typeof userId !== 'string') throw TypeError('userId is not a string');
    if (userId.length === 0) throw new LengthError('userId is empty');
    
    if (typeof postId !== 'string') throw TypeError('postId is not a string');
    if (postId.length === 0 || postId.trim() === '') throw new LengthError('postId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

            return Post.findById(postId)
        })
        .then(post => {
            if(!postId) throw new NotFoundError(`post with id ${postId} not found`)

            if (post.user.toString() !== userId) throw new Error(`post with id ${postId} does not belong to user ${userId}`)

            return Post.deleteOne({ _id: postId })
        })
}
module.exports = deletePost