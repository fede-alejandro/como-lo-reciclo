const { errors: { LengthError, NotFoundError } } = require('com')
const { User, Post, Comment } = require('../../../../..')
/**
 * Retrieves a comment from user
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * @param {string} commentId The comment id
 */
module.exports = function (userId, postId, commentId) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')

    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new LengthError('postId is empty')

    if (typeof commentId !== 'string') throw new TypeError('commentId is not a string')
    if (!commentId.length) throw new LengthError('commentId is empty')

    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Post.findById(postId)
        })
        .then(post => {
            if (!post) throw new NotFoundError(`post with id ${postId} does not exist`)

            return Comment.findById(commentId).sort({ date: -1 })
        })
        .then(comments => {
            comments.forEach(comment => {
                comment.id = comment._id.toString()
                delete comment._id

                // if (!comment.user.id) {
                //     comment.user.id = comment.user._id.toString()
                //     delete comment.user._id
                // }

            })
            return comments

        })


}