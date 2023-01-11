import { format } from 'timeago.js'
import { Link } from 'react-router-dom'
import { useEffect, useState, useContext } from 'react'
import extractSubFromToken from '../utils/extractSubFromToken'

import LikeButton from './LikeButton' 
import Context from '../components/Context'
import EditPost from '../components/EditPost'
import DeletePost from '../components/DeletePost'
import CreateComment from '../components/CreateComment'
import DeleteComment from './DeleteComment'
import retrievePost from '../logic/retrievePost'

import { AiOutlineEdit, AiOutlineDelete, AiOutlineLock } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa'


import { errors } from 'com'
const { FormatError, LengthError, ConflictError } = errors

function Post({ post: postFromProps, onPostUpdated, onPostDeleted }) {
    const [post, setPost] = useState()
    const [isEditVisible, setEditVisible] = useState(false)
    const [isDeleteVisible, setDeleteVisible] = useState(false)
    const [isDeleteCommentVisible, setDeleteCommentVisible] = useState(false)
    const [isCreateCommentVisible, setCreateCommentVisible] = useState(false)
    const [chatId, setChatId] = useState()
    const [commentId, setCommentId] = useState()
    const { showAlert } = useContext(Context)

    useEffect(() => {
        setPost(postFromProps)
    }, [postFromProps])

    const userId = extractSubFromToken(sessionStorage.token)

    const openEditPost = () => setEditVisible(true)
    const closeEditPost = () => setEditVisible()

    const openDeletePost = () => setDeleteVisible(true)
    const closeDeletePost = () => setDeleteVisible()
    // DELETE COMMENT
    const openDeleteComment = (chatId, commentId) => {
        setChatId(chatId)
        setCommentId(commentId)
        setDeleteCommentVisible(true)
    }
    const closeDeleteComment = () => {
        setDeleteCommentVisible(false)
    }

    const handleCommentDeleted = () => {
        try {
            retrievePost(sessionStorage.token, post.id)
                .then(postFromApi => {
                    setPost(postFromApi)
                    setChatId()
                    setCommentId()
                    

                    closeDeleteComment()
                })
                .catch(error => {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                        showAlert(error.message, 'warn')
                    else if (error instanceof ConflictError)
                        showAlert(error.message, 'error')
                    else
                        showAlert(error.message, 'fatal')
                })
        } catch (error) {
            if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                showAlert(error.message, 'warn')
            else
                showAlert(error.message, 'fatal')
        }
    }

    // CREATE CHAT //
    const openCreateChat = () => {
        setCreateCommentVisible(true)
    }

    const closeCreateChat = () => {
        setChatId()
        setCommentId()
        setCreateCommentVisible(false)
    }

    const handleChatCreated = () => {
        try {
            retrievePost(sessionStorage.token, post.id)
                .then(postFromApi => {
                    setPost(postFromApi)
                    setChatId()
                    setCommentId()
                    

                    closeCreateChat()
                })
                .catch(error => {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                        showAlert(error.message, 'warn')
                    else if (error instanceof ConflictError)
                        showAlert(error.message, 'error')
                    else
                        showAlert(error.message, 'fatal')
                })
        } catch (error) {
            if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                showAlert(error.message, 'warn')
            else
                showAlert(error.message, 'fatal')
        }
    }
    // CREATE COMMENT //
    const openCreateComment = (chatId) => {
        setChatId(chatId)
        setCreateCommentVisible(true)
    }

    const closeCreateComment = () => {
        setChatId()
        setCommentId()
        setCreateCommentVisible(false)
    }

    const handleCommentCreated = () => {
        try {
            retrievePost(sessionStorage.token, post.id)
                .then(postFromApi => {
                    setPost(postFromApi)
                    setChatId()
                    setCommentId()
                    

                    closeCreateChat()
                    closeCreateComment()
                })
                .catch(error => {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                        showAlert(error.message, 'warn')
                    else if (error instanceof ConflictError)
                        showAlert(error.message, 'error')
                    else
                        showAlert(error.message, 'fatal')
                })
        } catch (error) {
            if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                showAlert(error.message, 'warn')
            else
                showAlert(error.message, 'fatal')
        }
    }

    const onUpdatePost = () => {
        setEditVisible(false)
        setChatId()
        setCommentId()
        onPostUpdated()
        
    }

    return post ?
        <>
            <article className='bg-white rounded-xl w-[25%] flex flex-col p-[0.25rem] shadow-inner shadow-slate-900'>
                <div className='flex justify-between '><Link to={`/profile/${post.user.id}`}><strong>{post.user.name}</strong></Link>
                    <time className='flex justify-end font-bold text-xs'>{format(post.date)}</time>
                </div>
                <div className=' m-2 border rounded-xl'>
                    <h2 className='font-bold'>{post.title}</h2>
                    <p className='ml-2'>{post.text}</p>
                    {post.image && <div className='w-fit h-fit'><img src={post.image} alt='' /></div>}
                </div>
                <div className='flex justify-between'>
                    <div>
                        <button className='mx-2' onClick={() => openCreateChat()}><FaRegComment size='1rem' /></button>
                        <LikeButton id={post.id} />
                    </div>
                    {post.user.id === userId && <div className='flex justify-end'>
                        <div className='flex self-end pb-0'>
                            <button onClick={openEditPost}><AiOutlineEdit size='1rem' /></button>
                            <button onClick={openDeletePost}><AiOutlineDelete size='1rem' /></button>
                            {post.visibility === 'private' && <p className='self-end'><AiOutlineLock /></p>}
                        </div>
                    </div>}
                    {/* CREA COMENTARIO DEL POST */}
                </div>
                <hr className='border-1.5 border-slate-300' />
                {post.chats.length ? post.chats.map(chat => <div key={chat.id}>
                    {/* MUESTRA LOS COMENTARIOS DEBAJO DEL POST */}
                    {chat.comments.map(comment => {
                        return <div key={comment.id} className='bg-slate-100 m-2 border-black rounded-xl'>
                            <div className='flex justify-between pb-0 text-xs font-bold'>
                                <p className='ml-2'>{comment.user.name}</p>
                                <time className='mr-2'>{format(comment.date)}</time>
                            </div>
                            <p className='ml-2'>{comment.text}</p>
                            <div className='flex justify-end'>
                                <button className='mr-2' onClick={() => openCreateComment(chat.id)}><FaRegComment size='0.85rem' /></button>
                                {comment.user.id === userId && <button onClick={() => openDeleteComment(chat.id, comment.id)}><AiOutlineDelete size='0.85rem' /></button>}
                            </div>
                        </div>
                    })}
                </div>
                ) : null}
            </article>
            {isEditVisible && <EditPost postId={post.id} onUpdated={onUpdatePost} onClose={closeEditPost} />}
            {isDeleteVisible && <DeletePost postId={post.id} onDeleted={onPostDeleted} onClose={closeDeletePost} />}

            {isCreateCommentVisible && <CreateComment postId={post.id} chatId={chatId} onCreated={handleCommentCreated} onClose={closeCreateComment} onChatCreated={handleChatCreated} />}

            {isDeleteCommentVisible && <DeleteComment postId={post.id} chatId={chatId} commentId={commentId} onDeleted={handleCommentDeleted} onClose={closeDeleteComment} />}
        </>
        :
        null
}

export default Post