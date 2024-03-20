import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./page/Home";
import { SearchResult } from "./page/SearchResult";
import Header from "./components/Header";
import { KakaoMap } from "./components/KakaoMap";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";
import Place from "./page/Place";
import Register from "./page/Register";
import Login from "./page/Login";

const GlobalStyle = createGlobalStyle`
    html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}

a {
    text-decoration-line: none;
    color: black;
}
`

function App() {
  return (
    <RecoilRoot>
    <BrowserRouter>
    <GlobalStyle />
    <Header />
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/registerPage" element={<Register />} />
            <Route path="/loginpage" element={<Login />} />
            <Route path="/search" element={<SearchResult />} /> 
            <Route path="/place/:id" element={<Place />} />
        </Routes>
    </BrowserRouter>
    </RecoilRoot>
)
}

export default App;