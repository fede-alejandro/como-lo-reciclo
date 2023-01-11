const { errors: { LengthError, NotFoundError } } = require('com')
const { User, Post, Comment, Chat } = require('../../../../..')
/**
 * Create a comment on a post
 * 
 * @param {string} userId The user id
 * @param {string} postId The post id
 * @param {string} chatId The chat id
 * @param {string} text The post text
 * 
 */
function createComment(userId, postId, chatId, text) {
    if (typeof userId !== 'string') throw TypeError('userId is not a string')
    if (userId.length === 0) throw new LengthError('userId is empty')
    
    if (typeof postId !== 'string') throw TypeError('postId is not a string')
    if (postId.length === 0) throw new LengthError('postId is empty')

    if (typeof chatId !== 'string') throw TypeError('chatId is not a string')
    if (chatId.length === 0) throw new LengthError('chatId is empty')

    if (typeof text !== 'string') throw TypeError('text is not a string')
    if (text.length === 0 || text.trim() === '') throw new LengthError('text is empty')
   
    return User.findById(userId)
        .then(user => {
            if (!user)
                throw new NotFoundError(`user with id ${userId} does not exist`)

            return Post.findById(postId)
        })
        .then(post => {
            if (!post)
                throw new NotFoundError(`post with id ${postId} does not exist`)

            let chat = post.chats.find(chat => chat._id.toString() === chatId)

            if (!chat) {
                chat = new Chat()

                chat.user = userId

                post.chats.push(chat)

                return post.save()
                    .then(post => {
                        const chat = post.chats.find(chat => chat.user.toString() === userId)
                        
                        const comment = new Comment({ user: userId, text, date: new Date() })

                        chat.comments.push(comment)
                        
                        return post.save()
                    })
            } else {
                const comment = new Comment({ user: userId, text, date: new Date() })

                chat.comments.push(comment)
                
                return post.save()
            }

        })
        .then(result => {})

    // return Post.findById(postId)
    //     .then(post => {
    //         if (!post)
    //             throw new NotFoundError(`post with id ${postId} does not exist`)

    //         return User.findById(userId)
    //     })
    //     .then(user => {
    //         if (!user)
    //             throw new NotFoundError(`user with id ${userId} does not exist`)

    //         const comment = new Comment({ user: userId, text})

    //         return Post.findByIdAndUpdate(postId, { $push: { comments: comment } })
    //     })
    //     .then(result => {
    //         CÓMO SABER SI LA OPERACIÓN SALIÓ BIEN
    //         console.log(result)
    //         debugger
    //     })  
}

module.exports = createComment