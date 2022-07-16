import { Route, Routes } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";
import "./styles/main.scss";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import CreateUpdateBookPage from "./pages/CreateUpdateBookPage";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/books/:bookId" element={<DetailPage />} />
        <Route path="/books/create" element={<CreateUpdateBookPage />} />
        <Route
          path="/books/edit/:bookId"
          element={<CreateUpdateBookPage type={"EDIT"} />}
        />
      </Routes>
    </>
  );
}

export default App;
