import { Img } from "../../styled-components/homeStyle";

export default function Third() {
    return <>
        <Img
            src={`${process.env.PUBLIC_URL}home/fruits.jpg`}
        />
    </>
}