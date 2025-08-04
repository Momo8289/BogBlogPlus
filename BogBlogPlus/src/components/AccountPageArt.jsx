import Reeds from '../assets/SVG/justReeds.svg';
import Frog from '../assets/SVG/onlyFrog.svg';
import Lillies from '../assets/SVG/Lillies3.svg';
import {motion} from 'framer-motion'

function AccountPageArt(){

    return(
        <>
        
        <motion.img
        src={Reeds}
        alt="Banner"
        className="acctArtReeds"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}/>

       
        <motion.img
        src={Frog}
        alt="Frog"
        style={{position: "relative",width: "80%", left: 40}}
        animate={{ y: [40, 8, 40] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}/>

       
        <motion.img
        src={Lillies}
        alt="Lillies"
        className="acctArtLillies"
        style={{position: "relative",width: "100%"}}
        animate={{ y: [40, 8, 40] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}/>

      
        
        
        </>
    )
}

export default AccountPageArt