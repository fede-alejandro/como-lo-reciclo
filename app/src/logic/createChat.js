const { errors: { LengthError, AuthError, ConflictError, NotFoundError, UnexpectedError } } = require('com')
/**
 * Creates a chat against API
 * 
 * @param {string} token The user token
 * @param {string} text The comment text
 * @param {string} postId The post id
 * 
 */
function createChat(token, text, postId) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new LengthError('token is empty')

    if (typeof text !== 'string') throw new TypeError('text is not a string')
    if (!text.length) throw new LengthError('text is empty')

    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new LengthError('postId is empty')

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
            const { status, responseText: json } = xhr

            // const data = JSON.parse(json)

            if (status === 201) {
                const { chatId } = JSON.parse(json)

                resolve(chatId)
            } else if (status === 400) {
                const { error } = JSON.parse(json)

                if (error.includes('is not a '))
                    reject(new TypeError(error))
                else if (error.includes('length'))
                    reject(new LengthError(error))
            } else if (status === 401) {
                const { error } = JSON.parse(json)

                reject(new AuthError(error))
            } else if (status === 404) {
                const { error } = JSON.parse(json)

                reject(new NotFoundError(error))
            } else if (status === 409) {
                const { error } = JSON.parse(json)

                reject(new ConflictError(error))
            } else if (status < 500)
                reject(new UnexpectedError('client error'))
            else
                reject(new UnexpectedError('server error'))
        }

        xhr.onerror = () => reject(new Error('connection error'))

        xhr.open('POST', `http://localhost/posts/${postId}/chats`)
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.setRequestHeader('Content-Type', 'application/json')

        const payload = { text }

        const json = JSON.stringify(payload)

        xhr.send(json)
    })
}
export default createChat