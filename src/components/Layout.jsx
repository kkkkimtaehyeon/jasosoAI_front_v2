import {useEffect, useState} from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FileText, Bot } from 'lucide-react'
import './Layout.css'
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Layout = ({ children }) => {
  const location = useLocation()
  const [activeTab, setActiveTab] = useState('my-cover-letter');

  // ✅ URL 경로에 따라 activeTab 자동 설정
  useEffect(() => {
    if (location.pathname.startsWith('/ai-cover-letter')) {
      setActiveTab('ai-cover-letter');
    } else {
      setActiveTab('my-cover-letter');
    }
  }, [location.pathname]);
  // const [activeTab, setActiveTab] = useState(
  //   location.pathname === '/' ? 'management' : 'ai'
  // )
  const { user, logout } = useAuth();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between px-6 py-3 border-b border-slate-200 bg-white sticky top-0 z-10">
        <div 
          className="flex items-center gap-3"
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer' }}
        >
          <div className="w-8 h-8 text-blue-600">
            <svg height="32" width="32" fill="none" viewBox="0 0 48 48"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M36.7273 44C33.9891 44 31.6043 39.8386 30.3636 33.69C29.123 39.8386 26.7382 44 24 44C21.2618 44 18.877 39.8386 17.6364 33.69C16.3957 39.8386 14.0109 44 11.2727 44C7.25611 44 4 35.0457 4 24C4 12.9543 7.25611 4 11.2727 4C14.0109 4 16.3957 8.16144 17.6364 14.31C18.877 8.16144 21.2618 4 24 4C26.7382 4 29.123 8.16144 30.3636 14.31C31.6043 8.16144 33.9891 4 36.7273 4C40.7439 4 44 12.9543 44 24C44 35.0457 40.7439 44 36.7273 44Z"
                  fill="currentColor"></path>
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900">자소서 AI</h1>
        </div>

        {user ? (
            <>
              <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
                <Link
                    to="/my-cover-letter"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        activeTab === 'my-cover-letter'
                            ? 'text-blue-600 bg-blue-50'
                            : 'hover:bg-slate-100'
                    }`}
                >
                  <FileText size={20} />
                  자소서 관리
                </Link>
                <Link
                    to="/ai-cover-letter"
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        activeTab === 'ai-cover-letter'
                            ? 'text-blue-600 bg-blue-50'
                            : 'hover:bg-slate-100'
                    }`}
                >
                  <Bot size={20} />
                  AI 자소서
                </Link>
            </nav>
            
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold hover:bg-blue-700 transition-colors"
              >
                {user.name.charAt(0)}
              </button>
              
              {showUserMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-10" 
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-20">
                    <div className="px-4 py-2 border-b border-slate-200">
                      <p className="text-sm font-medium text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.email}</p>
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-100 flex items-center gap-2"
                    >
                      로그아웃
                    </button>
                  </div>
                </>
              )}
            </div>
          </>
        ) : (
          <button
            onClick={handleLogin}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium text-sm"
          >
            로그인
          </button>
        )}
      </header>
      
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default Layout
