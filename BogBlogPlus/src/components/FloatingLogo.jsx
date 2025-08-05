"use client";

import {motion} from 'framer-motion';
import OnlyBackground from "/src/assets/SVG/onlyBackground.svg";
import OnlyFrog from "/src/assets/SVG/onlyFrog.svg";
//floating logo component to animate frog floating on lily pad
function LogoSVG(){

return (
    <>
    <motion.div
    style={{ position: "absolute", top: 0, left: 0, width: "100%" }}
    animate={{ y: [80, 50, 80] }}
    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
  >
    <img src={OnlyFrog}alt="Floating Frog" style={{ width: "100%" }} />
  </motion.div>
  
  <img src={OnlyBackground} alt="Background" style={{ width: "100%" }} />
  </>
)

}

export default LogoSVG;