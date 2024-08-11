import { motion } from "framer-motion";
import { Img } from "../../styled-components/homeStyle";
import styled from "styled-components";

const Container = styled(motion.div)`
    width: 100%;
    height: 100%;
    position: relative;
`;

const Location = styled.img`
    position: relative;
    z-index: 50; // Img보다 높은 z-index 설정
    width: 300px;
    height: 300px;
`;

export default function Third() {
    return (
        <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Img
                src={`${process.env.PUBLIC_URL}/home/fruits.jpg`}
            />
            <Location src={`${process.env.PUBLIC_URL}/home/location.png`} />
        </Container>
    );
}
