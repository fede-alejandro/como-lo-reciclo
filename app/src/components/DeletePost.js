import deletePost from '../logic/deletePost'
import Button from './Button'
import { errors } from 'com'
import Context from '../components/Context'
import { useContext } from 'react'

const { FormatError, AuthError, NotFoundError } = errors

function DeletePost({ postId, onDeleted, onClose }) {
    const { showAlert } = useContext(Context)
    
    const confirmDeletePost = event => {
        event.preventDefault()

        try {
            deletePost(sessionStorage.token, postId)
                .then(() => onDeleted())
                .catch(error => {   
                    if (error instanceof TypeError || error instanceof FormatError)
                    showAlert(error.message, 'warn')
                else if (error instanceof AuthError || error instanceof NotFoundError)
                    showAlert(error.message, 'error')
                else
                    showAlert(error.message, 'fatal')
                })
        } catch (error) {
            if (error instanceof TypeError || error instanceof FormatError)
            showAlert(error.message, 'warn')
        else
            showAlert(error.message, 'fatal')
        }
    }

    return <div className="bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden" onClick={onClose}>
        <div className="bg-[white] p-5 rounded-xl flex flex-col items-end gap-2" onClick={event => event.stopPropagation()}>
            <p>Are you sure you want to delete this post?</p>
            <div className="flex gap-2" >
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={confirmDeletePost}>Delete</Button>
            </div>
        </div>
    </div>
}

export default DeletePost