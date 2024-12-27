import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from "../components/Register/Register";
import Login from '../components/Login/Login';
import LandingPage from '../components/LandingPage/LandingPage';
import Workspace from '../components/Workspace/Workspace';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/workspace" element={<Workspace />} />

        </Routes>
    </BrowserRouter>
);

export default App;
