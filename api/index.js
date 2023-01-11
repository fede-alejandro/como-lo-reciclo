require('dotenv').config()

const mongoose = require('mongoose')
const express = require('express')

const authenticateUserHandler = require('./handlers/authenticateUserHandler')
const registerUserHandler = require('./handlers/registerUserHandler')
const retrieveUserHandler = require('./handlers/retrieveUserHandler')
const retrieveAUserHandler = require('./handlers/retrieveAUserHandler')
const changePasswordHandler = require('./handlers/changePasswordHandler')
const changeEmailHandler = require('./handlers/changeEmailHandler')

const createPostHandler = require('./handlers/createPostHandler')
const retrievePublicPostsHandler = require('./handlers/retrievePublicPostsHandler')
const retrievePostHandler = require('./handlers/retrievePostHandler')
const updatePostHandler = require('./handlers/updatePostHandler')
const deletePostHandler = require('./handlers/deletePostHandler')
const retrievePostsFromUserHandler = require('./handlers/retrievePostsFromUserHandler')
const retrievePostsUserHandler = require('./handlers/retrievePostsUserHandler')

const createChatHandler =require('./handlers/createChatHandler')
const createCommentHandler = require('./handlers/createCommentHandler')
const retrieveCommentHandler = require('./handlers/retrieveCommentHandler')
const deleteCommentHandler = require('./handlers/deleteCommentHandler')

const jsonBodyParser = require('./utils/jsonBodyParser')
const cors = require('./utils/cors')
const jwtVerifier = require('./utils/jwtVerifier')


const { MONGODB_URL } = process.env

mongoose.connect(MONGODB_URL)
.then(() => {
    console.log(`db connected to ${MONGODB_URL}`)
    
    const api = express()
    
    api.use(cors)
    
    api.post('/users/auth', jsonBodyParser, authenticateUserHandler)
    api.post('/users', jsonBodyParser, registerUserHandler)
    api.get('/users', jwtVerifier, retrieveUserHandler)
    api.get('/users/:targetUserId', jwtVerifier, retrieveAUserHandler)
    
    api.patch('/users/password', jwtVerifier, jsonBodyParser, changePasswordHandler)
    api.patch('/users/email', jwtVerifier, jsonBodyParser, changeEmailHandler)

    api.get('/users/:targetUserId/posts', jwtVerifier, retrievePostsFromUserHandler)
    
    api.post('/posts', jwtVerifier, jsonBodyParser, createPostHandler)
    api.get('/posts/public', jwtVerifier, retrievePublicPostsHandler)
    api.get('/posts/:postId', jwtVerifier, retrievePostHandler)
    api.patch('/posts/:postId', jwtVerifier, jsonBodyParser, updatePostHandler)
    api.delete('/posts/:postId', jwtVerifier, deletePostHandler)
    api.get('/posts',jwtVerifier, retrievePostsUserHandler)

    api.post('/posts/:postId/chats', jwtVerifier, jsonBodyParser, createChatHandler)
    api.post('/posts/:postId/chats/:chatId/comments', jwtVerifier, jsonBodyParser, createCommentHandler)
    api.get('/posts/:postId/chats/:chatId/comments/:commentId', jwtVerifier, retrieveCommentHandler)
    api.delete('/posts/:postId/chats/:chatId/comments/:commentId', jwtVerifier, deleteCommentHandler)


    
        const { PORT } = process.env

        api.listen(PORT, () => console.log(`server listening on port ${PORT}`))
    })
    .catch(error => console.error(error))