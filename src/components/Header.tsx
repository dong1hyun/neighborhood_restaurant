import { useForm } from "react-hook-form"
import styled from "styled-components"
import { searchPlaces } from "./KakaoMap";

const Nav = styled.header`
    display: flex;
    justify-content: space-between;
`



function Header() {
    const { register, handleSubmit } = useForm();
    const { kakao } = window as any;

    return (
        <div>
            <Nav>
                <span>Logo</span>
                <form onSubmit={handleSubmit(searchPlaces)}>
                    <input id="keyword" {...register("search", {required: true})} />
                </form>
                <span>Log in</span>
            </Nav>
            <hr />
        </div>
    )
}

export default Header;