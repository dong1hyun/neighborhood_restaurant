import styled from "styled-components"

const Nav = styled.header`
    display: flex;
    justify-content: space-between;
`

function Header() {
    return (
        <Nav>
            <span>a</span>
            <span>a</span>
            <span>a</span>
            <span>a</span>
        </Nav>
    )
}

export default Header;