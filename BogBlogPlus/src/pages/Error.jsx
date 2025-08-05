import ErrorArt from '../assets/SVG/errorFrog.svg';
import {motion} from 'framer-motion'

function Error(){
return(
    <>
    <div className="errorPage">
    <motion.div className='errorMsg'
    initial={{ opacity: 100, y: -1150 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 3}}
    >
    <h1>Uh Oh</h1>
    <h2>Something went wrong...</h2>
    <p></p>

    </motion.div>
   
    <motion.img
    src = {ErrorArt}
    className='errorArt'
    initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 3}}
    />
    </div>
    </>
)
}

export default Error;