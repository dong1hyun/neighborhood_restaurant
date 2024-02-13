import { useForm } from "react-hook-form"
import styled from "styled-components"
import { searchPlaces } from "../Search";
import { useNavigate } from "react-router-dom";

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
    const onValid = ({search}: DataForm) => {
        navigate(`/search?keyword=${search}`);
    }
    return (
        <div>
            <Nav>
                <span>Logo</span>
                <form onSubmit={handleSubmit(onValid)}>
                    <input {...register("search", {required: true})} />
                </form>
                <span>Log in</span>
            </Nav>
            <hr />
        </div>
    )
}

export default Header;