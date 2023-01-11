import log from '../utils/coolog'
import registerUser from '../logic/registerUser'
import { useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import Context from '../components/Context'
import { errors } from 'com'
const { FormatError, LengthError, ConflictError } = errors

function RegisterForm({ onClose }) {
    log.info('Register -> render')

    const navigate = useNavigate()
    const { showAlert } = useContext(Context)

    const handleRegister = event => {
        log.info('Register -> handleRegister')

        event.preventDefault()

        const { name: { value: name }, email: { value: email }, password: { value: password } } = event.target

        try {
            registerUser(name, email, password)
                .then(() => navigate('/login'))
                .then(() => onClose())
                .catch(error => {
                    if (error instanceof TypeError || error instanceof FormatError || error instanceof LengthError)
                        showAlert(error.message, 'warn')
                    else if (error instanceof ConflictError)
                        showAlert(error.message, 'error')
                    else
                        showAlert(error.message, 'fatal')
                })
        } catch (error) {
            showAlert(error.message, 'warn')

            event.target.password.value = ''
        }
    }

    return <main className='bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden z-10' onClick={onClose}>
        <div className='p-5 rounded-xl flex flex-col items-end bg-white border-2 border-slate-600 shadow-inner shadow-slate-600' onClick={event => event.stopPropagation()}>
            <form className='flex flex-col justify-start m-4 gap-2 border-2 border-slate-600 rounded-xl p-6 shadow-inner shadow-slate-600' onSubmit={handleRegister}>
                
                <label htmlFor='name' className='container__item--left'>Name</label>
                <input name='name' type='text' id='name' placeholder='  input your name' className='border-b border-black text-black text-center rounded-xl' />
                
                <label htmlFor='email' className='container__item--left'>E-mail</label>
                <input name='email' type='email' id='email' placeholder='  input your e-mail' className='border-b border-black text-black text-center rounded-xl' />
                
                <label htmlFor='password' className='container__item--left'>Password</label>
                <input name='password' type='password' id='password' placeholder='  input your password' className='border-b border-black text-black text-center rounded-xl' />
                
                <button className='bg-green-400 gap-2  font-bold text-white border-2 p-2 border-green-400 rounded-xl'>Register</button>
            </form>

        </div>
    </main>
}
export default RegisterForm