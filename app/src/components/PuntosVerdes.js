function PuntosVerdes({ onClose }) {

    return <section className='bg-[#aaaa] fixed top-0 h-full w-full flex flex-col justify-center items-center overflow-hidden z-10' onClick={onClose}>
        <div className='bg-white p-5 border-white border-4 rounded-xl flex flex-col justify-center shadow-inner shadow-black' onClick={event => event.stopPropagation()}>
            <p>♻️ Los puntos verdes sirven para depositar los residuos que no podemos tirar en los sistemas de recogida habituales.</p>
            <p>Cuando llevamos los residuos a los puntos verdes contribuimos a mejorar su proceso de reciclaje y preservamos el</p> 
            <p>medio ambiente.</p>
            <p>En la ciudad de Barcelona, contamos con más de 130 puntos verdes, que se clasifican entre puntos verdes de zona,</p> 
            <p>puntos verdes de barrio y puntos verdes móviles.</p>
             
            <h1 className='font-bold text-green-500 text-xl'>Punto verde de barrio</h1>

            <p>Los puntos verdes de barrio son instalaciones medioambientales de dimensiones más reducidas que los</p> 
            <p>puntos verdes de zona y están situados dentro de la trama urbana.</p>
            <p>Están pensados para que la ciudadanía pueda llevar los residuos domésticos de menor volumen.</p>

            <h2 className='font-bold'>Qué se puede llevar 👍</h2>

            <p>Ropa, calzado, cartuchos de tinta, tóneres, aparatos eléctricos y electrónicos, aceites de cocina, cables eléctricos,</p>
            <p>neumáticos pequeños, aerosoles y esprays, baterías de coche, cosméticos, radiografías, pilas, aceites de motor,</p>
            <p>pinturas y barnices, fluorescentes y bombillas, cápsulas de café monodosis (plástico y aluminio), etc.</p>

            <h2 className='font-bold text-red-500'>Qué no se puede llevar 👎</h2>

            <p>Residuos industriales especiales, tóxicos y peligrosos; residuos sanitarios; residuos orgánicos;</p>
            <p>restos vegetales;escombros, muebles y trastos, y restos de maderas </p>

            <h1 className='font-bold text-xl text-green-500'>Punto verde móvil</h1>

            <p>Los puntos verdes móviles son camiones que cumplen todas las funciones de un punto verde de barrio.</p>
            <p>Con la finalidad de acercarse a la ciudadanía,se ubican en diferentes lugares de la ciudad, en horarios fijos.</p>
            <p>Los ciudadanos y ciudadanas pueden llevar los mismos residuos que se llevan a un punto verde de barrio.</p>

            <h2 className='font-bold'>Qué se puede llevar 👍</h2>

            <p> Ropa, calzado, cartuchos de tinta, tóneres, aparatos eléctricos y electrónicos, aceites de cocina, cables eléctricos,</p>
            <p>neumáticos pequeños, aerosoles y esprays, baterías de coche, cosméticos, radiografías, pilas, aceites de motor,</p>
            <p>pinturas y barnices, fluorescentes y bombillas, cápsulas de café monodosis (plástico y aluminio), etc.</p>

            <h2 className='font-bold text-red-500'>Qué no se puede llevar 👎</h2>

            <p>Residuos industriales especiales, tóxicos y peligrosos; residuos sanitarios; residuos orgánicos; restos vegetales;</p>
            <p>escombros, muebles y trastos, y restos de maderas.</p>
        </div>
    </section>



}
export default PuntosVerdes