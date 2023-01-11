import log from '../utils/coolog'
import Context from './Context'
import { useContext, useEffect, useState } from 'react'
import retrieveUser from '../logic/retrieveUser'
import { errors } from 'com'
import LOGO from '../img/LOGO.png'
import Settings from './Settings'

import { AiOutlineLogout, AiOutlineMenu, AiOutlineSetting } from 'react-icons/ai'

const { FormatError, AuthError, LengthError, NotFoundError } = errors

export default function Header() {
    log.info('Header -> render')

    const { logout, showAlert } = useContext(Context)
    const [user, setUser] = useState()
    const [toggleButton, setToggleButton] = useState('menu')
    const [settingsPanel, setSettingsPanel] = useState()

    useEffect(() => {
        try {
            retrieveUser(sessionStorage.token)
                .then(user => setUser(user))
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
    }, [])

    const handleToggleMenu = () => setToggleButton(toggleButton === 'menu' ? 'close' : 'menu')

    const settings = () => {
        !settingsPanel ? setSettingsPanel(true) : setSettingsPanel()

        setToggleButton('menu')
    }
    const closeSettingsPanel = () => setSettingsPanel()

    return <header className='fixed w-full h-[2.5rem] flex justify-between items-center gap-2 bg-slate-200'>
        <img src={LOGO} alt='LOGO' className='h-10 ml-4' />
        {user && <p className='font-bold text-black mx-1.5 '>{user.name}</p>}
        <div className='mr-4'>
            <button type='button' className='flex' onClick={handleToggleMenu}><AiOutlineMenu size='1.5rem' /></button>
            {toggleButton === 'close' && <div className='flex flex-col gap-1.5 mt-2.5 fixed bg-slate-200 border-8 rounded-lg'>
                <button onClick={logout}><AiOutlineLogout size='1.25rem' /></button>
                <button onClick={settings}><AiOutlineSetting size='1.25rem' /></button>
            </div>}
        </div>

        {settingsPanel && <Settings onClose={closeSettingsPanel} />}
 
    </header>
}