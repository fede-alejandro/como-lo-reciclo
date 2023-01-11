import { Link } from 'react-router-dom'
import extractSubFromToken from '../utils/extractSubFromToken'

import { AiOutlinePlusCircle, AiFillHome } from 'react-icons/ai'
import { BsPersonCircle } from 'react-icons/bs'

function Footer({onCreate}) {
    const userId = extractSubFromToken(sessionStorage.token)

    return <footer className='fixed bg-slate-200 w-full h-[2rem] bottom-0 flex justify-around items-center'>
        <Link to={'/'} ><AiFillHome size='1.5rem' /></Link>
        <button onClick={onCreate}><AiOutlinePlusCircle size='1.5rem' /></button>
        <Link to={`/profile/${userId}`}><BsPersonCircle size='1.5rem' /></Link>
    </footer>
}

export default Footer