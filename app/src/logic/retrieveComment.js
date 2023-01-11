const { errors: { LengthError, NotFoundError, UnexpectedError, ConflictError } } = require('com')
/**
 * Retrieves  comment from users
 * 
 * @param {string} token The user token
 * @param {string} postId The post id
 * @param {string} chatId The chat id
 * @param {string} commentId The comment Id
 * 
 */
function retrieveComment(token, postId, chatId, commentId) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new Error('token is empty')

    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new Error('postId is empty')

    if (typeof chatId !== 'string') throw new TypeError('chatId is not a string')
    if (!chatId.length) throw new Error('chatId is empty')

    if (typeof commentId !== 'string') throw new TypeError('commentId is not a string')
    if (!commentId.length) throw new Error('commentId is empty')

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = function () {
            const { status, responseText: json } = xhr

            const data = JSON.parse(json)

            if (status === 200) {
                const { commentId } = data

                resolve(commentId)
            }
            else if (status === 400) {
                const { error } = data

                if (error.includes('is not a '))
                    reject(new TypeError(error))
                else if (error.includes('empty'))
                    reject(new LengthError(error))
            }  else if (status === 404) {
                const { error } = data

                reject(new NotFoundError(error))
            } else if (status === 409) {
                const { error } = data

                reject(new ConflictError(error))
            } else if (status < 500)
                reject(new UnexpectedError('client error'))
            else
                reject(new UnexpectedError('server error'))

            // if (status >= 500) {
            //     const { error } = JSON.parse(json)

            //     reject(new Error(error))

            //     return
            // }

            // const commentId = JSON.parse(json)

            // resolve(commentId)
        }

        xhr.onerror = () => reject(new Error('connection error'))

        xhr.open('GET', `http://localhost/posts/${postId}/chats/${chatId}/comments/${commentId}`)
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.send()
    })
}

export default retrieveComment