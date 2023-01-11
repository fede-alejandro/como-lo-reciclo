const {
    errors: { LengthError, FormatError, NotFoundError },
    regex: { IS_EMAIL_REGEX } } = require('com')
const { User } = require('../../../../..')

function changeEmail(userId, newEmail) {
    if (typeof userId !== 'string') throw new TypeError('userId is not a string')
    if (!userId.length) throw new LengthError('userId is empty')

    if (typeof newEmail !== 'string') throw new TypeError('newEmail is not a string')
    if (!newEmail.length) throw new LengthError('newEmail is empty')
    if (!IS_EMAIL_REGEX.test(newEmail)) throw new FormatError('newEmail is not valid')

    return User.findById(userId)
        .then(user => {
            if (!user) throw new NotFoundError(`user with id ${userId} does not exist`)

            return User.updateOne({ _id: userId }, { $set: { email: newEmail } }, { new: true })
        })
        .then(() => {})
        // .then(user => {
        //     // if(user.email === newEmail) throw new Error('you cannot use the same email')

        //     user.email = newEmail

        //     return User.save()
        // })
}

module.exports = changeEmail