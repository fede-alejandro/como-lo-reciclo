import Context from '../components/Context'
import { useEffect, useState, useContext } from 'react'
import { errors } from 'com'
import Button from './Button'
import updatePost from '../logic/updatePost'
import retrievePost from '../logic/retrievePost'

import { AiOutlineCloseCircle } from 'react-icons/ai'
import { MdOutlineVisibility } from 'react-icons/md'
const { FormatError, AuthError, LengthError, NotFoundError } = errors

function EditPost({ onUpdated, onClose, postId }) {
    const [post, setPost] = useState()
    const [visibility, setVisibility] = useState()
    const { showAlert } = useContext(Context)
    
    useEffect(() => {
        try {
            retrievePost(sessionStorage.token, postId)
                .then(post => setPost(post))
                .catch(error => alert(error.message)) 
        } catch (error) {
            alert(error.message)
        }
    }, [])

    const submitUpdatePost = event => {
        event.preventDefault()

        const { 
            title: { value: title },
            text: { value: text }, 
            visibility: { value: visibility },
            image: { value: image }
        } = event.target

        try {
            updatePost(sessionStorage.token, postId, title, text, visibility, image)
                .then(() => onUpdated())
            
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
    const changeVisibility = event => setVisibility(event.target.value)


    return <div className='bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden' onClick={onClose}>
        <div className='p-5 rounded-xl flex flex-col items-end bg-white border-2 border-slate-600 shadow-inner shadow-slate-600' onClick={event => event.stopPropagation()}>
            <AiOutlineCloseCircle size='1.5rem' onClick={onClose} className='cursor-pointer' />

            <form className='flex flex-col gap-2 ' onSubmit={submitUpdatePost}>
                <label className='font-bold' htmlFor='text'>Title</label>
                <input className='bg-slate-100 text-black border-black resize-y rounded-md text-center' type='text' name='title' id='title' placeholder='input a title' defaultValue={post?.title} />

                <label className='font-bold' htmlFor='text'>Text</label>
                <textarea className='bg-slate-100 text-black border-black resize-y rounded-md text-center' type='text' name='text' id='text' placeholder='input a text' defaultValue={post?.text}></textarea>

                <label className='font-bold' htmlFor='image'>Image</label>
                <input className='bg-slate-100 text-black border-black resize-y rounded-md text-center' type='text' name='image' id='image' placeholder='input an image url' />
                
                <label htmlFor='visibility'><MdOutlineVisibility /></label>
                <select className='bg-slate-100 text-black' id='visibility' name='visibility' value={visibility} onChange={changeVisibility}>
                    <option value='public'>public</option>
                    <option value='private'>private</option>
                </select>
                
                <Button>Update</Button>
            </form>
        </div>
    </div>
}
export default EditPost
