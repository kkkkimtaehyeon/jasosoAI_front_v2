import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Layout from './components/Layout';
import MyCoverLetter from './pages/MyCoverLetter.jsx';
import AICoverLetter from './pages/AICoverLetter';
import MyCoverLetterDetail from './pages/MyCoverLetterDetail';
import AICoverLetterDetail from './pages/AICoverLetterDetail';
import Login from './pages/Login';
import {AuthProvider, useAuth} from './context/AuthContext';
import './App.css';
import Index from './pages/Index';
import {GoogleOAuthProvider} from "@react-oauth/google";

function PrivateRoute({children}) {
    const {user} = useAuth();
    if (!user) return <Navigate to="/" replace/>;
    return children;
}
const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
function App() {
    return (
        <GoogleOAuthProvider clientId={googleClientId}>
            <AuthProvider>
                <Router>
                    <Layout>
                        <Routes>
                            <Route path="/" element={<Index/>}/>
                            <Route path="/login" element={<Login/>}/>
                            <Route path="/my-cover-letter" element={<PrivateRoute><MyCoverLetter/></PrivateRoute>}/>
                            <Route path="/ai-cover-letter" element={<PrivateRoute><AICoverLetter/></PrivateRoute>}/>
                            <Route path="/my-cover-letter/:id"
                                   element={<PrivateRoute><MyCoverLetterDetail/></PrivateRoute>}/>
                            <Route path="/ai-cover-letter/:id"
                                   element={<PrivateRoute><AICoverLetterDetail/></PrivateRoute>}/>
                        </Routes>
                    </Layout>
                </Router>
            </AuthProvider>
        </GoogleOAuthProvider>
    );
}

export default App;