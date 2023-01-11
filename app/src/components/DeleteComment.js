import { errors } from 'com'
import { useContext } from 'react'
import Button from './Button'
import Context from './Context'
import deleteComment from '../logic/deleteComment'

const { FormatError, AuthError, NotFoundError } = errors

function DeleteComment({ postId, chatId, commentId, onDeleted, onClose }) {
    const { showAlert } = useContext(Context)

    const confirmDeleteComment = event => {
        event.preventDefault()

        try {
            deleteComment(sessionStorage.token, postId, chatId, commentId)
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
            <p>Are you sure you want to delete this comment?</p>
            <div className="flex gap-2" >
                <Button onClick={onClose}>Cancel</Button>
                <Button onClick={confirmDeleteComment}>Delete</Button>
            </div>
        </div>
    </div>
}

export default DeleteComment