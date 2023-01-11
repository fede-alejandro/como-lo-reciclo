const { User } = require('../../../../..')
const { compare } = require('bcryptjs')
const { hash } = require('bcryptjs')
const { errors: { LengthError, AuthError, NotFoundError } } = require('com')

function changePassword(userId, password, newPassword) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')
    
    if (typeof password !== 'string') throw new TypeError('password is not a string')
    if (!password.length) throw new LengthError('password is empty')
    
    if (typeof newPassword !== 'string') throw new TypeError('newPassword is not a string')
    if (!newPassword.length) throw new LengthError('newPassword is empty')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

            return compare(password, user.password)
                .then(match => {
                    if (!match) throw new AuthError('password wrong')

                    return hash(newPassword, 8)
                        .then((hash) => User.updateOne({ _id: userId }, { $set: { password: hash } }))
                })
        })
}

module.exports = changePassword