const { errors: { LengthError, FormatError, AuthError, NotFoundError, UnexpectedError, ConflictError } } = require('com')
/**
 * Creates a post against API
 * 
 * @param {string} token The user token
 * @param {string} title The title text
 * @param {string} text The post text
 * @param {string} visibility The post visibility
 * @param {string} image The image post
 */
function createPost(token, title, text, visibility, image) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new LengthError('token is empty')

    if (typeof title !== 'string') throw new TypeError('title is not a string')
    if (!title.length) throw new LengthError('title is empty')

    if (typeof text !== 'string') throw new TypeError('text is not a string')
    if (!text.length) throw new LengthError('text is empty')

    if (typeof visibility !== 'string') throw new TypeError('visibility is not a string')
    if (!visibility.length) throw new LengthError('visibility is empty')
    if (visibility !== 'public' && visibility !== 'private') throw new FormatError('invalid visibility')

    if (image) {
        if (typeof image !== 'string') throw new TypeError('image is not a string')
        if (!image.length) throw new LengthError('image is empty')
    }

    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
            const { status, responseText: json } = xhr

            // const data = JSON.parse(json)

            if (status === 201)
                resolve()
            else if (status === 400) {
                const { error } = JSON.parse(json)

                if (error.includes('is not a '))
                    reject(new TypeError(error))
                else if (error.includes('empty'))
                    reject(new LengthError(error))
                else if (error.includes('invalid'))
                    reject(new FormatError(error))
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

        xhr.open('POST', 'http://localhost/posts')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.setRequestHeader('Content-Type', 'application/json')

        const payload = { title, text, visibility }

        if (image) payload.image = image

        const json = JSON.stringify(payload)

        xhr.send(json)
    })
}

export default createPost