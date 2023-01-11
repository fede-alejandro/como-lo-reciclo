import { errors } from 'com'
import { useContext } from 'react'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import createChat from '../logic/createChat'
import createComment from '../logic/createComment'
import Context from '../components/Context'
import Button from './Button'

const { FormatError, AuthError, LengthError, NotFoundError } = errors

function CreateComment({ onCreated, onClose, postId, chatId }) {
    const { showAlert } = useContext(Context)

    const submitCreateComment = event => {
        event.preventDefault()

        const { comment: { value: text } } = event.target

        try {
            if(!chatId) {
                createChat(sessionStorage.token, text, postId)
                    .then(chatId => {
                        try {
                            createComment(sessionStorage.token, text, postId, chatId)
                                .then(() => onCreated())
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
                    })
                    .catch(error => showAlert(error.message, 'fatal'))
            } else {
                createComment(sessionStorage.token, text, postId, chatId)
                    .then(() => onCreated())
                    .catch(error => {
                        if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                            showAlert(error.message, 'warn')
                        else if (error instanceof AuthError || error instanceof NotFoundError)
                            showAlert(error.message, 'error')
                        else
                            showAlert(error.message, 'fatal')
                    })
            }
        } catch (error) {
            if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                showAlert(error.message, 'warn')
            else
                showAlert(error.message, 'fatal')
        }
    }

    return <article className='bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden'>
        <div className='bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden' onClick={onClose}>
            <div className='p-5 rounded-xl flex flex-col items-end bg-white border-2 border-slate-600 shadow-inner shadow-slate-600' onClick={event => event.stopPropagation()}>
                <AiOutlineCloseCircle size='1.5rem' onClick={onClose} className='cursor-pointer' />

                <form className='flex flex-col gap-2' onSubmit={submitCreateComment}>
                    <label className='font-bold' htmlFor='text'>Text</label>
                    <textarea className='bg-slate-100 text-black border-black rounded-md text-center' type='text' name='comment' id='comment' placeholder='input a comment'></textarea>
                    <Button>Create</Button>
                </form>
            </div>
        </div>
    </article>
}
export default CreateComment