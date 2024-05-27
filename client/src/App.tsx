import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./page/Home";
import { KeywordSearchResult } from "./page/KeywordSearchResult";
import Header from "./components/Header";
import { KakaoMap } from "./components/search_result/KakaoMap";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";
import Place from "./page/Place";
import Register from "./components/login/Register";
import Login from "./components/login/Login";
import React from 'react';
import Footer from "./components/Footer";
import MyPage from "./page/MyPage";

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
  padding-top: 150px;
  line-height: 1;
  background-color: #d3d7d9
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
          <Route path="/myPage/:sessionID" element={<MyPage />} />
          <Route path="/search" element={<KeywordSearchResult />} />
          <Route path="/place/:id" element={<Place />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App;