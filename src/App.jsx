// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Layout from './components/Layout';
// import CoverLetterManagement from './pages/CoverLetterManagement';
// import AICoverLetter from './pages/AICoverLetter';
// import MyCoverLetterDetail from './pages/MyCoverLetterDetail';
// import AICoverLetterDetail from './pages/AICoverLetterDetail';
// import Login from './pages/Login';
// import { AuthProvider, useAuth } from './context/AuthContext';
// import './App.css';
// import Index from './pages/Index';

// function PrivateRoute({ children }) {
//   const { user } = useAuth();
//   if (!user) return <Navigate to="/login" replace />;
//   return children;
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <Layout>
//           <Routes>
//             <Route path="/" element={<Index />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="/my-cover-letter" element={<PrivateRoute><CoverLetterManagement /></PrivateRoute>} />
//             <Route path="/ai-cover-letter" element={<PrivateRoute><AICoverLetter /></PrivateRoute>} />
//             <Route path="/my-cover-letter/:id" element={<PrivateRoute><MyCoverLetterDetail /></PrivateRoute>} />
//             <Route path="/ai-cover-letter/:id" element={<PrivateRoute><AICoverLetterDetail /></PrivateRoute>} />
//           </Routes>
//         </Layout>
//       </Router>
//     </AuthProvider>
//   );
// }

// export default App;

// App.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import CoverLetterManagement from './pages/CoverLetterManagement';
import AICoverLetter from './pages/AICoverLetter';
import MyCoverLetterDetail from './pages/MyCoverLetterDetail';
import AICoverLetterDetail from './pages/AICoverLetterDetail';
import Login from './pages/Login';
import { AuthProvider, useAuth } from './context/AuthContext';
import './App.css';
import Index from './pages/Index';

function PrivateRoute({ children }) {
  const { user } = useAuth();
  if (!user) return <Navigate to="/" replace />;
  return children;
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/my-cover-letter" element={<PrivateRoute><CoverLetterManagement /></PrivateRoute>} />
            <Route path="/ai-cover-letter" element={<PrivateRoute><AICoverLetter /></PrivateRoute>} />
            <Route path="/my-cover-letter/:id" element={<PrivateRoute><MyCoverLetterDetail /></PrivateRoute>} />
            <Route path="/ai-cover-letter/:id" element={<PrivateRoute><AICoverLetterDetail /></PrivateRoute>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;