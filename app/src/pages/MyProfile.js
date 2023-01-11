import log from '../utils/coolog'
import { useContext, useEffect, useState } from 'react'
import { errors } from 'com'

import retrieveMyUser from '../logic/retrieveMyUser'
import retrievePostsUser from '../logic/retrievePostsUser'

import Header from '../components/Header'
import Post from '../components/Post'
import Footer from '../components/Footer'
import CreatePost from '../components/CreatePost'
import Context from '../components/Context'

const { FormatError, AuthError, LengthError, NotFoundError } = errors

function MyProfile() {
    log.info('MyProfile -> render')

    const [user, setUser] = useState()
    const [posts, setPosts] = useState()
    const { showAlert } = useContext(Context)
    const [createPostVisible, setCreatePostVisible] = useState(false)

    useEffect(() => {
        try {
            Promise.all([retrieveMyUser(sessionStorage.token), retrievePostsUser(sessionStorage.token)])
                .then(([user, posts]) => {
                    setUser(user)
                    setPosts(posts)
                })
                .catch(error => {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                        showAlert(error.message, 'warn')
                    else if (error instanceof AuthError || error instanceof NotFoundError)
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
    }, [])

    const openCreatePost = () => setCreatePostVisible(true)
    const closeCreatePost = () => setCreatePostVisible(false)

    const handlePostCreated = () => {
        try {
            retrievePostsUser(sessionStorage.token)
                .then(posts => {
                    setPosts(posts)
                    setCreatePostVisible(false)
                })
                .catch(error => {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                        showAlert(error.message, 'warn')
                    else if (error instanceof AuthError || error instanceof NotFoundError)
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

    const refreshPosts = () => {
        try {
            retrievePostsUser(sessionStorage.token)
                .then(posts => setPosts(posts))
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }

    return <main className='overflow-hidden min-h-screen bg-gradient-to-b from-[#439A97] via-[#62B6B7] to-[#97DECE]'>
        <Header />
            {posts &&
                <div className='flex flex-col items-center gap-4 py-[3rem]'>
                    {posts.map(post => <Post key={post.id} post={post} onPostUpdated={refreshPosts} onPostDeleted={refreshPosts} />)}
                </div>}
        <Footer onCreate={openCreatePost} />
        {createPostVisible && <CreatePost onCreated={handlePostCreated} onClose={closeCreatePost} />}


    </main>
}

export default MyProfile 