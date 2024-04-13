import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginState, signinState } from "../atom";

const OverLay = styled(motion.div)`
  position: fixed;
  z-index: 4;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

function Overlay() {
    const setLogin = useSetRecoilState(loginState)
    const setSignin = useSetRecoilState(signinState)
    const onOverlayClicked = () => {
      setLogin(false);
      setSignin(false);
    }
    return (
        <OverLay
          layoutId="overlay"
          onClick={onOverlayClicked}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
    )
}

export default Overlay;