import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home";
import { SearchResult } from "./SearchResult";
import Header from "./components/Header";
import { KakaoMap } from "./components/KakaoMap";
import { RecoilRoot } from "recoil";

function App() {
  return (
    <RecoilRoot>
    <BrowserRouter>
    <Header />
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/search" element={<SearchResult />} /> 
        </Routes>
    </BrowserRouter>
    </RecoilRoot>
)
}

export default App;