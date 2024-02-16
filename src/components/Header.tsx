import { useForm } from "react-hook-form"
import styled from "styled-components"
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { keyword } from "../atom";

const Logo = styled(Link)`
    text-decoration: none;
    color: black;
`

const Nav = styled.header`
    display: flex;
    justify-content: space-between;
`

interface DataForm {
    search: string
}

function Header() {
    const { register, handleSubmit } = useForm<DataForm>();
    const navigate = useNavigate();
    const setSearchWord = useSetRecoilState(keyword);
    const onValid = ({search}: DataForm) => {
        setSearchWord(search);
        console.log("header:", search)
        navigate(`/search?keyword=${search}`);
    }
    return (
        <div>
            <Nav>
                <Logo to={'/'}>Logo</Logo>
                <form onSubmit={handleSubmit(onValid)}>
                    <button type="reset">지우기</button>
                    <input {...register("search", {required: true})} />
                    <button type="submit">검색</button>
                </form>
                <span>Log in</span>
            </Nav>
            <hr />
        </div>
    )
}

export default Header;