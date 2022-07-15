import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import "./styles/main.scss";
import HomePage from "./pages/HomePage";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books" element={<div>Detail</div>} />
      </Routes>
    </>
  );
}

export default App;
