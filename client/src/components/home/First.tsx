import { Img } from "../../styled-components/homeStyle";

export default function First() {
    return <>
    <Img
        src={`${process.env.PUBLIC_URL}home/vegan.jpg`}
    />
</>;
}