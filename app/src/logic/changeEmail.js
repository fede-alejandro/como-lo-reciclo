import { regex, errors } from 'com'
const { IS_EMAIL_REGEX } = regex
const { LengthError, FormatError } = errors
/**
 * Update User email
 * 
 * @param {string} token user token 
 * @param {string} newEmail new email
 *  
 */

function changeEmail(token, newEmail) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new LengthError('token is empty')

    if (typeof newEmail !== 'string') throw new TypeError('newEmail is not a string')
    if (!newEmail.length) throw new LengthError('newEmail is empty')
    if (!IS_EMAIL_REGEX.test(newEmail)) throw new FormatError('newEmail is not valid')


    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest()

        xhr.onload = () => {
            const { status, responseText: json } = xhr
            if (status >= 500) {
                const { error } = JSON.parse(json)

                reject(new Error(error))

                return
            }

            resolve()
        }

        xhr.onerror = () => reject(new Error('connection error'))

        xhr.open('PATCH', 'http://localhost/users/email')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.setRequestHeader('Content-Type', 'application/json')

        const payload = { newEmail }

        const json = JSON.stringify(payload)

        xhr.send(json)
    })
}

export default changeEmail