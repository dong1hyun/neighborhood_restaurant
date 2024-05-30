import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const OverLayBox = styled(motion.div)`
  position: fixed;
  z-index: 1;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
`;

function Overlay() {
    return (
      <OverLayBox />
    )
}

export default Overlay;