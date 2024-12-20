import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./page/Home";
import { KeywordSearchResult } from "./page/KeywordSearchResult";
import Header from "./components/Header";
import { RecoilRoot } from "recoil";
import { createGlobalStyle } from "styled-components";
import Footer from "./components/Footer";
import MyPage from "./page/header/MyPage";
import LocaionSet from "./page/LocationSet";
import SignIn from "./page/header/SignIn";
import Login from "./page/header/Login";
import FindId from "./page/FindId";
import FindPassword from "./page/FindPassword";
import NoticeList from "./page/header/NoticeList";
import "./index.css"
import Notice from "./page/header/Notice";
import QnA_List from "./page/header/QnA_List";
import QnA from "./page/header/QnA";
import Place from "./page/Place";
import Phone from "./page/Phone";

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
  background-color: #ffffff;
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

body{
    -ms-overflow-style: none;
    }
   ::-webkit-scrollbar {
     display: none;
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
          <Route path="/SignIn" element={<SignIn />} />
          <Route path="/LogIn" element={<Login />} />
          <Route path="/FindId" element={<FindId />} />
          <Route path="/FindPassword" element={<FindPassword />} />
          <Route path="/locationSet" element={<LocaionSet />} />
          <Route path="/myPage/:sessionID" element={<MyPage />} />
          <Route path="/search" element={<KeywordSearchResult />} />
          <Route path="/place/:id" element={<Place />} />
          <Route path="/phone" element={<Phone />} />
          <Route path="/noticeList" element={<NoticeList />} />
          <Route path="/noticeList/:id" element={<Notice />} />
          <Route path="/QnA_List" element={<QnA_List />} />
          <Route path="/QnA_List/:id" element={<QnA />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default App;