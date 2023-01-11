import createPost from '../logic/createPost'
import Button from './Button'
import Context from '../components/Context'
import { useContext } from 'react'
import { errors } from 'com'
import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdOutlineVisibility } from 'react-icons/md'

const { FormatError, AuthError, LengthError, NotFoundError } = errors

function CreatePost({ onCreated, onClose }) {
    const { showAlert } = useContext(Context)

    const submitCreatePost = event => {
        event.preventDefault()

        const {
            title: { value: title },
            text: { value: text },
            image: { value: image },
            visibility: { value: visibility }
        } = event.target

        try {
            createPost(sessionStorage.token, title, text, visibility, image)
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
    }

    return <div className='bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden' onClick={onClose}>
        <div className='p-5 rounded-xl flex flex-col items-end bg-white border-2 border-slate-600 shadow-inner shadow-slate-600' onClick={event => event.stopPropagation()}>
            <AiOutlineCloseCircle size='1.5rem' onClick={onClose} className='cursor-pointer' />

            <form className='flex flex-col justify-start m-4 gap-2 p-4 border-2 rounded-xl shadow-inner shadow-slate-600' onSubmit={submitCreatePost}>
                <label className='font-bold' htmlFor='text'>Title</label>
                <input className='bg-slate-100 border-b border-black text-black rounded-xl text-center' type='text' name='title' id='title' placeholder='input a title' />

                <label className='font-bold' htmlFor='text'>Text</label>
                <textarea className='bg-slate-100 border-b border-black text-black rounded-xl text-center' type='text' name='text' id='text' placeholder='input a text'></textarea>

                <label className='font-bold' htmlFor='image'>Image</label>
                <input className='bg-slate-100 border-b border-black text-black rounded-xl text-center' type='text' name='image' id='image' placeholder='input an image url' />

                <label htmlFor='visibility'><MdOutlineVisibility /></label>
                <select className='bg-slate-100 text-black' id='visibility' name='visibility'>
                    <option value='public'>public</option>
                    <option value='private'>private</option>
                </select>

                <Button>Create</Button>
            </form>
        </div>
    </div>
}
export default CreatePost