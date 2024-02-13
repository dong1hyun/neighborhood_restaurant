import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home";
import { SearchResult } from "./SearchResult";
import Header from "./components/Header";

function App() {
  return (

    <BrowserRouter>
    <Header />
        <Routes>
            <Route path="/" element={<Home />} /> 
            <Route path="/search" element={<SearchResult />} /> 
        </Routes>
    </BrowserRouter>
)
}

export default App;