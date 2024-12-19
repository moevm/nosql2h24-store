import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import MainComponentPage from "./pages/MainComponentPage";
import Footer from "./pages/Footer";
import RegistrationPage from "./pages/RegistrationPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/auth" element={<AuthPage />}></Route>
          <Route path="/registration" element={<RegistrationPage />}></Route>
          <Route path="/*" element={<MainComponentPage />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer />
    </>
  );
}

export default App;
