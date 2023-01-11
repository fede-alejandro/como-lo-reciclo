const { errors:{NotFoundError, ConflictError, FormatError, LengthError, AuthError} } = require('com')
const createChat = require('../logic/createChat')

module.exports = (req, res) => {
    try {
        const { body: { text }, params: { postId }, userId } = req

        createChat(userId, postId, text)
            .then(chatId => res.status(201).json({ chatId }))
            .catch(error => {
                if (error instanceof AuthError) res.status(401).json({ error: error.message })
                else if (error instanceof NotFoundError) res.status(404).json({ error: error.message })
                else if (error instanceof ConflictError) res.status(409).json({ error: error.message })
                else res.status(500).json({ error: error.message })
            })
    } catch (error) {
        if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
            res.status(400).json({ error: error.message })
        else
            res.status(500).json({ error: error.message })
    }
}