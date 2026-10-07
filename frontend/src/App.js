import './App.css';
import LogIn from './pages/LogIn';
import Register from './pages/Register';
import Home from './pages/Home';
import ForgotPassword from './pages/ForgotPassword';

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <div
            style={{
                backgroundImage: 'url("/logbckgBPX.png")',
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundAttachment: "fixed",
                minHeight: "100dvh"
            }}
        >
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<LogIn />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/forgot-password" element={<ForgotPassword />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
