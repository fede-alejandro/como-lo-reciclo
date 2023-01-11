const { errors: { LengthError, NotFoundError, UnexpectedError, ConflictError } } = require('com')
/**
 * Retrieves post from users
 * 
 * @param {string} token The token user 
 * @param {string} targetUserId The target user id 
 * 
 */
function retrievePostsFromUser(token, targetUserId) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new LengthError('token is empty')
    if (typeof targetUserId !== 'string') throw new TypeError('targetUserId is not a string')
    if (!targetUserId.length) throw new LengthError('targetUserId is empty')

        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest()

            xhr.onload = function () {
                const { status, responseText: json } = xhr


            if (status === 200) {
               
                const  post  = JSON.parse(json)

                resolve(post)
            }
            else if (status === 400) {
                const { error } = JSON.parse(json)

                if (error.includes('is not a '))
                    reject(new TypeError(error))
                else if (error.includes('empty'))
                    reject(new LengthError(error))
            }  else if (status === 404) {
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

            xhr.open('GET', `http://localhost/users/${targetUserId}/posts`)
            xhr.setRequestHeader('Authorization', `Bearer ${token}`)
            xhr.send()
        })
}

export default retrievePostsFromUser