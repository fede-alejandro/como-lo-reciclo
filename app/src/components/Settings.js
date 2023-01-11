import { AiOutlineCloseCircle } from 'react-icons/ai'
import { useContext, useState, useEffect } from 'react'
import { errors } from 'com'
import Context from './Context'
import changeEmail from '../logic/changeEmail'
import changePassword from '../logic/changePassword'
import retrieveUser from '../logic/retrieveUser'

const { FormatError, AuthError, LengthError, NotFoundError } = errors

function Settings({ onClose }) {

    const { showAlert } = useContext(Context)
    const [user, setUser] = useState()

    useEffect(() => {
        try {
            retrieveUser(sessionStorage.token)
                .then(user => setUser(user))
                .catch(error => alert(error.message))

        } catch (error) {
            alert(error.message)
        }
    }, [])

    const submitUpdateEmail = event => {
        event.preventDefault()

        const { email: { value: newEmail } } = event.target

        try {
            changeEmail(sessionStorage.token, newEmail)
                .then(() => {
                    showAlert('email updated')
                    user.email = newEmail
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
    const submitUpdatePassword = event => {
        event.preventDefault()

        const { password: { value: password }, newPassword: { value: newPassword } } = event.target

        try {
            changePassword(sessionStorage.token, password, newPassword)
                .then(() => {
                    user.password = newPassword
                    showAlert('password updated')
                    onClose()
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

            event.target.password.value = ''
        }
    }

    return <div className='bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden z-10' onClick={onClose}>
        <div className='p-5 rounded-xl flex flex-col items-end bg-white border-2 border-slate-600 shadow-inner shadow-slate-600' onClick={event => event.stopPropagation()}>
            <AiOutlineCloseCircle size='1rem' onClick={onClose} className='cursor-pointer' />

            <form className='flex flex-col justify-start m-4 gap-4' onSubmit={submitUpdateEmail}>
                <div className='flex flex-row gap-4  items-center justify-start'>
                    <label className='mr-4' htmlFor='email'>Email</label>
                    <label className='bg-slate-200 text-black text-center rounded-xl ml-2.5 px-4'>{user?.email}</label>
                    <label htmlFor='email'>New Email</label>
                    <input name='newEmail' type='email' id='newEmail' placeholder='input your new email' className='border-b border-black text-black text-center rounded-xl ml-5' />
                    <button className='text-white bg-green-400 border-green-400 rounded-xl p-1'>Save</button>
                </div>
            </form>
            <form className='flex flex-col justify-start m-4 gap-4' onSubmit={submitUpdatePassword} >
                <div className='flex flex-row gap-2 items-center justify-start'>
                    <label htmlFor='password'>Password</label>
                    <input name='password' type='password' id='password' placeholder='input your a password' className='border-b border-black text-black text-center rounded-xl' />
                    <label htmlFor='newPassword'>New Password</label>
                    <input name='newPassword' type='password' id='newPassword' placeholder='input a new password' className='border-b border-black text-black text-center rounded-xl' />
                    <button className='ml-1.5 text-white bg-green-400 border-green-400 rounded-xl p-1'>Save</button>
                </div>
            </form>
        </div>
    </div>
}
export default Settings