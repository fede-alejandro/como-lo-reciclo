const { ConflictError, NotFoundError, UnexpectedError, LengthError, AuthError } = require('com')

/**
 * Delete a post against API
 * 
 * @param {string} token The user token
 * @param {string} postId The post postId
 * 
 */
function deletePost(token, postId) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new LengthError('token is empty')
    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new LengthError('postId is empty')

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.onload = () => {
                const { status } = xhr

                const data = JSON.parse(json)

                if (status === 204) {
                    const { chatId } = data
    
                    resolve(chatId)
                } else if (status === 400) {
                    const { error } = data
    
                    if (error.includes('is not a '))
                        reject(new TypeError(error))
                    else if (error.includes('empty'))
                        reject(new LengthError(error))
                } else if (status === 401) {
                    const { error } = data
    
                    reject(new AuthError(error))
                } else if (status === 404) {
                    const { error } = data
    
                    reject(new NotFoundError(error))
                } else if (status === 409) {
                    const { error } = data
    
                    reject(new ConflictError(error))
                } else if (status < 500)
                    reject(new UnexpectedError('client error'))
                else
                    reject(new UnexpectedError('server error'))
            }

            xhr.onerror = () => reject(new Error('connection error'))

            xhr.open('DELETE', `http://localhost/posts/${postId}`)
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
            xhr.setRequestHeader('Content-Type', 'application/json')

            const payload = { postId }

            const json = JSON.stringify(payload)

            xhr.send(json)
        })
}

export default deletePost