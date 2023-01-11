import { HAS_SPACES_REGEX } from "com/regex"
import { LengthError, FormatError } from "com/errors"
/**
 * Update User Passwrod
 * 
 * @param {string} token userId client 
 * @param {string} password current password
 * @param {string} newPassword new password 
 */
function changePassword(token, password, newPassword) {
    if (typeof token !== 'string') throw new TypeError('token is not a string')
    if (!token.length) throw new LengthError('token is empty')

    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (!password.length) throw new LengthError('password is empty')
    if (HAS_SPACES_REGEX.test(password)) throw new FormatError('password has spaces')

    if (typeof newPassword !== 'string') throw new TypeError('newPassword is not a string')
    if (!newPassword.length) throw new LengthError('newPassword is empty')
    if (HAS_SPACES_REGEX.test(newPassword)) throw new FormatError('newPassword has spaces')
    
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

        xhr.open('PATCH', 'http://localhost/users/password')
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
        xhr.setRequestHeader('Content-Type', 'application/json')

        const payload = { password, newPassword }

        const json = JSON.stringify(payload)

        xhr.send(json)
    })
}

export default changePassword