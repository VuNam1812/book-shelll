import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import "./styles/main.scss";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:bookId" element={<DetailPage />} />
      </Routes>
    </>
  );
}

export default App;
