const retrievePublicPosts = require('../logic/retrievePublicPosts')
const { errors: { FormatError, NotFoundError, ConflictError } } = require('com')

module.exports = (req, res) => {
    try {
        const { userId } = req

        retrievePublicPosts(userId)
            .then(posts => res.json(posts))
            .catch(error => {
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