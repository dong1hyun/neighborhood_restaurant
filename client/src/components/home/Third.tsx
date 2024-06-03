import { motion } from "framer-motion";
import { Img } from "../../styled-components/homeStyle";
import styled from "styled-components";

const Container = styled(motion.div)`
    width: 100%;
    height: 100%;
`

export default function Third() {
    return (
        <Container
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        >
            <Img
                src={`${process.env.PUBLIC_URL}home/fruits.jpg`}
            />
        </Container>
    )
}