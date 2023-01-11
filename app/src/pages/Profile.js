import log from '../utils/coolog'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import retrieveAUser from '../logic/retrieveAUser'
import retrievePostsFromUser from '../logic/retrievePostsFromUser'

import Post from '../components/Post'
import Header from '../components/Header'
import Footer from '../components/Footer'

function Profile() {
    log.info('Profile -> render')

    const { targetUserId } = useParams()
    const [user, setUser] = useState()
    const [posts, setPosts] = useState()

    useEffect(() => {
        try {
            Promise.all([retrieveAUser(sessionStorage.token, targetUserId), retrievePostsFromUser(sessionStorage.token, targetUserId)])
                .then(([user, posts]) => {
                    setUser(user)
                    setPosts(posts)
                })
                .catch(error => alert(error.message))
        } catch (error) {
            alert(error.message)
        }
    }, [])

    return <main className='overflow-hidden min-h-screen bg-gradient-to-b from-[#439A97] via-[#62B6B7] to-[#97DECE]'>
        <Header />
        {posts && <div className='flex flex-col items-center gap-4 py-[3rem]'>
            {posts.map(post => <Post key={post.id} post={post} />)}
        </div>}
        <Footer />
    </main>
}

export default Profile