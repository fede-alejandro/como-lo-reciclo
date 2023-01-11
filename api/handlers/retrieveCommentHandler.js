const retrieveComment = require('../logic/retrieveComment')
const { errors: { FormatError, NotFoundError } } = require('com')

module.exports = (req, res) => {
    try {
        const { params: { postId }, userId, commentId } = req

        retrieveComment(userId, postId, commentId)
            .then(comment => res.json(comment))
            .catch(error =>{
                if (error instanceof NotFoundError)
                    res.status(404).json({ error: error.message })
                else if (error instanceof ConflictError)
                    res.status(409).json({ error: error.message })
                else
                    res.status(500).json({ error: error.message })
            })
    } catch (error) {
        if (error instanceof TypeError || error instanceof FormatError)
            res.status(400).json({ error: error.message })
        else
            res.status(500).json({ error: error.message })
    }
}