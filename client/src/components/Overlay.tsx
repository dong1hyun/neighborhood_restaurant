import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OverLay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

function Overlay() {
    const navigate = useNavigate();
    const onOverlayClicked = () => {
      navigate("/");
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