import { AnimatePresence, motion } from "framer-motion"
import styled from "styled-components"

const RegisterContainer = styled(motion.div)`
    position: absolute;
    z-index: 1;
    top: 300px;
    text-align: center;
    background-color: whitesmoke;
    width: 400px;
    height: 200px;
    background-color: rgba(255, 255, 255, 1);
    border-radius: 40px;
    position: absolute;
    top: 200px;
    left: 0px;
    right: 0px;
    margin: 0 auto;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
    
`
const boxVariants = {
    initial: {
        opacity: 0,
        scale: 0
    },
    visible: {
        opacity: 1,
        scale: 1
    },
    leaving: {
        opacity: 0,
        scale: 0
    }
}

export default function RegisterBox() {
    return (
        <RegisterContainer
        variants={boxVariants}
        initial="initial"
        animate="visible"
        exit="leaving" 
        >
        <form>
            회원가입<br />
            아이디<input />
            <br />
            비밀번호<input />
        </form>
        </RegisterContainer>
    )
}