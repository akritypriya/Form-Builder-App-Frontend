import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from "../components/Register/Register";
import Login from '../components/Login/Login';
import LandingPage from '../components/LandingPage/LandingPage';
import Workspace from '../components/Workspace/Workspace';
import WorkspaceArea from '../components/Workspace/WorkspaceArea';
import Response from '../components/Workspace/Response';
import  Settings from '../components/Workspace/Settings';

const App = () => (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/workspace" element={<Workspace />} />  
            <Route path="/workspace/area" element={<WorkspaceArea />} />
            <Route path="/workspace/response" element={<Response />} />                 
            <Route path="/settings" element={<Settings />} />

        </Routes>
    </BrowserRouter>
);

export default App;
