import log from '../utils/coolog'
import { useEffect, useState } from 'react'
import LoginForm from '../components/LoginForm'
import RegisterForm from '../components/RegisterForm'
import PuntosVerdes from '../components/PuntosVerdes'
import {
    LOGO,
    botellasplastico,
    botellasvidrio,
    carton,
    desecho,
    frutaverdura,
    organico,
    papelycarton,
    plastico,
    residuos,
    tgt,
    vidrio,
    vinted,
    Wallapop,
    chat,
    localizacion,
    mano
} from '../img'

function Login() {
    log.info('Login -> render')

    const [loginForm, setLoginForm] = useState()
    const [registerForm, setRegisterForm] = useState()
    const [puntosVerdes, setPuntosVerdes] = useState()
    const [spoty, setSpoty] = useState()
    
    useEffect(() => {
        (async () => {
            fetch('https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Fshow%2F0SgWmwew0jSG4WC9DM38zu')
                .then(response => {
                    return response.json()
                })
                .then(something => {
                    setSpoty(something)
                })
                
        })()
    }, [])


    const info = () => !puntosVerdes ? setPuntosVerdes(true) : setPuntosVerdes()
    const closePuntosVerdes = () => setPuntosVerdes()

    const login = () => !loginForm ? setLoginForm(true) : setLoginForm()
    const closeLoginForm = () => setLoginForm()

    const register = () => !registerForm ? setRegisterForm(true) : setRegisterForm()
    const closeRegisterForm = () => setRegisterForm()

    const showContent = event => {
        const { id } = event.target

        document.querySelector(`#${id}`).style.opacity ? document.querySelector(`#${id}`).style.opacity = '' :
            document.querySelector(`#${id}`).style.opacity = '0.1'
    }

  

    return <main className='h-full flex flex-col'>
        <link rel='alternate' type='application/json+oembed' href='https://open.spotify.com/oembed?url=https%3A%2F%2Fopen.spotify.com%2Fshow%2F5eXZwvvxt3K2dxha3BSaAe' />
        <section className='h-full w-full'>
            <div className='flex bg-BgImage bg-cover justify-center p-20'>
                <img src={LOGO} alt='Logo' className='h-72 ' />
            </div>
        </section>
        <section className='bg-gradient-to-r from-[#40B5D7] to-[#0099AA] w-full pt-10'>
            <div className='flex flex-row gap-10 justify-center items-center ml-52 mr-52'>
                <div className='flex flex-col justify-center items-center pt-8'>
                    <h2 className='font-bold text-white text-3xl'>RECICLA: ¿Cómo y dónde?</h2>
                    <p className='text-white text-xl'>Si tienes pilas y baterías que tirar, aerosoles, aceite usado de cocina o auto, neumáticos,</p>
                    <p className='text-white text-xl'>artículos electrónicos, llévalos a un punto limpio. ¿Sabes dónde quede el más próximo?</p>
                    <button className='bg-[#31B14A] h-8 w-20 m-6 text-white border-2  border-[#31B14A] rounded-xl shadow-inner shadow-black' onClick={info}>Info</button>
                </div>
                <a href='https://www.google.com/maps/embed?pb=!1m16!1m12!1m3!1d50727.53686849737!2d2.1526199753695816!3d41.40609151521783!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!2m1!1spuntos%20verde!5e0!3m2!1ses!2ses!4v1670927268322!5m2!1ses!2ses' target='blank' >
                    <img src={localizacion} alt='localizacion' className='h-32' />
                </a>
            </div>
        {/* </section> */}

        {/* <section className='bg-cyan-500 h-full w-full  p-8'> */}
            <span className='flex h-90 justify-around pt-2 pb-20'>
                <div>
                    <img src={carton} alt='carton' id='carton' className=' h-60 mt-6 absolute shadow-2xl shadow-slate-800 z-10' onClick={showContent} />
                    <img src={papelycarton} alt='papelycarton' className=' h-60 mt-6 shadow-2xl shadow-slate-800' />
                </div>
                <div>
                    <img src={desecho} alt='desecho' id='desecho' className='h-60 mt-6 absolute shadow-2xl shadow-slate-800 z-10' onClick={showContent} />
                    <img src={residuos} alt='residuos' className='h-60  shadow-2xl mt-6 shadow-slate-800' />
                </div>
                <div>
                    <img src={organico} alt='organico' id='organico' className='h-60 mt-6 absolute shadow-2xl shadow-slate-800 z-10' onClick={showContent} />
                    <img src={frutaverdura} alt='frutaverdura' className='h-60 mt-6 shadow-2xl shadow-slate-800' />
                </div>
                <div>
                    <img src={plastico} alt='plastico' id='plastico' className='h-60 mt-6 absolute shadow-2xl shadow-slate-800 z-10' onClick={showContent} />
                    <img src={botellasplastico} alt='botellasplastico' className='h-60 mt-6 shadow-2xl shadow-slate-800' />
                </div>
                <div>
                    <img src={vidrio} alt='vidrio' id='vidrio' className='h-60 mt-6 absolute shadow-2xl shadow-slate-800 z-10' onClick={showContent} />
                    <img src={botellasvidrio} alt='botellasvidrio' className='h-60 mt-6 shadow-2xl shadow-slate-800' />
                </div>
            </span>
        </section>
        <section className='bg-gradient-to-r from-[#565E6C] to-[#000213] w-full p-14'>
            <div className='flex justify-around content-center items-center ml-52 mr-52'>
                <div className='flex flex-col text-white text-xl'>
                    <h2 className='font-bold text-white text-3xl'>REUTILIZAR: dale una segunda vida</h2>
                    <p>Ingresa a nuestra comunidad y publica aquellos artículos</p>
                    <p>que tienes en casa, ya no utilizas y quisieras regalar.</p>
                    <p>¡Regístrate y comienza hoy!.</p>
                </div>
                <img src={chat} alt='chat' className='h-24' />
                <div className='flex flex-col items-center border-white border-2 rounded-xl p-5 shadow-inner shadow-black'>
                    <button onClick={login} className=' bg-[#31B14A] h-8 w-20 m-4 text-white border-2  border-[#31B14A] rounded-xl shadow-inner shadow-black'>Login</button>
                    <hr className='border-white w-20 ' />
                    <button onClick={register} className='bg-[#31B14A] h-8 w-20 m-4 text-white border-2 border-[#31B14A] rounded-xl shadow-inner shadow-black'>Register</button>
                </div>
            </div>
        </section>
        <section className='bg-[#0099AA] w-full p-10'>
            <div className='flex flex-col justify-between items-center pt-4'>
                <p className='font-bold text-white text-3xl'>Ideas y opciones para empezar a reciclar.</p>
                <p className='text-white text-xl'>Conoce algunas de las webs y apps que te ayudarán a comenzar a reciclar, reutilizar y reducir.</p>
                <p className='text-white text-xl'>Te animamos también a escuchar los Podcasts disponibles para mantenerte informado y conocer más</p>
                <p className='text-white text-xl'>sobre aquellas pequeñas acciones que puedes adoptar para cambiar el mundo.</p>
                <div className='flex flex-col pt-10 items-center'>
                <img src={mano} alt='mano'  className='h-14 animate-bounce'/>
                    <div className='flex flex-row ml-4 mb-10'>
                        <a href='https://es.wallapop.com/' target='blank'>
                            <img src={Wallapop} alt='wallapop' className='bg-slate-200 h-12 mt-4 mr-4 border-white border-2 rounded-lg' /></a>
                        <a href='https://www.vinted.es/' target='blank'>
                            <img src={vinted} alt='vinted' className='bg-slate-200 h-12 mt-4 mr-4 border-white border-2 rounded-lg' /></a>
                        <a href='https://toogoodtogo.es/es/' target='blank'>
                            <img src={tgt} alt='tgt' className='bg-slate-200 h-12 mt-4 mr-4 border-white border-2 rounded-lg' /></a>
                    </div>
                    {spoty && spoty.html &&
                        <div  dangerouslySetInnerHTML={{ __html: spoty.html }}></div>}
                    {/* <iframe width="100%" height="152" title="Spotify Embed: My Path to Spotify: Women in Engineering "  frameborder="0" allowfullscreen allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" src={spoty} /> */}
                    {/* <a href="https://open.spotify.com/embed/show/0SgWmwew0jSG4WC9DM38zu?utm_source=generator" width="100%" height="152" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy" target='blank'> <img src={spotify} alt='spotify' className='h-12 m-4 rounded-lg bg-slate-600 border-white border-2' /> </a> */}
                </div>
            </div>

        </section>
        {loginForm && <LoginForm onClose={closeLoginForm} />}
        {registerForm && <RegisterForm onClose={closeRegisterForm} />}
        {puntosVerdes && <PuntosVerdes onClose={closePuntosVerdes} />}

    </main>
}

export default Login