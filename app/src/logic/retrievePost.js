const { errors: { LengthError, NotFoundError, UnexpectedError, ConflictError } } = require('com')

/**
 * Retrieve a post from a user
 * 
 * @param {string} token The user token
 * @param {string} postId The post postId
 */
function retrievePost(token, postId) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new LengthError('token is empty')
    if (typeof postId !== 'string') throw new TypeError('postId is not a string')
    if (!postId.length) throw new LengthError('postId is empty')

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = function () {
            const { status, responseText: json } = xhr

            if (status === 200) {
                resolve(JSON.parse(json))
            } else if (status === 400) {
                const { error } = JSON.parse(json)

                if (error.includes('is not a '))
                    reject(new TypeError(error))
                else if (error.includes('empty'))
                    reject(new LengthError(error))
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

        xhr.open('GET', `http://localhost/posts/${postId}`)
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.send()
    })
}

export default retrievePost