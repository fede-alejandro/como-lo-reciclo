import log from '../utils/coolog'
import authenticateUser from '../logic/authenticateUser'
import { useContext } from 'react'
import Context from '../components/Context'
import { errors } from 'com'

const { FormatError, AuthError, LengthError, NotFoundError } = errors

function LoginForm({onClose}) {
    log.info('Login -> render')

    const { login, showAlert } = useContext(Context)

    const handleLogin = event => {
        log.info('Login -> handleLogin')

        event.preventDefault()

        const { email: { value: email }, password: { value: password } } = event.target

        try {
            authenticateUser(email, password)
                .then(token => login(token))
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

            event.target.password.value = '' // TODO improve this, do not manipulate the dom directly, do it by means of React
        }
    }
    return <div className='bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden z-10' onClick={onClose}>
        <div className='p-5 rounded-xl flex flex-col items-end bg-white border-2 border-slate-600 shadow-inner shadow-slate-600' onClick={event => event.stopPropagation()}>
            <form className='flex flex-col justify-start m-4 gap-2 border-2 border-slate-600 rounded-xl p-6 shadow-inner shadow-slate-600' onSubmit={handleLogin}>
                <label htmlFor='email' className='container__item--left'>E-mail</label>
                <input name='email' type='email' id='email' placeholder=' input your e-mail' className='border-b border-black text-black text-center rounded-xl' />
                <label htmlFor='password' className='container__item--left'>Password</label>
                <input name='password' type='password' id='password' placeholder=' input your password' className='border-b border-black text-black text-center rounded-xl' />
                <button className='bg-green-400 gap-2  font-bold text-white border-2 p-2 border-green-400 rounded-xl'>Login</button>
            </form>
        </div>
    </div>
}

export default LoginForm