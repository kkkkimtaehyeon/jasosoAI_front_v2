import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // 실제 구글 로그인 연동은 추후 구현
  const login = async (provider = 'google') => {
    // mock: 구글 로그인 성공 시
    setUser({
      displayName: '홍길동',
      email: 'honggildong@example.com',
      photoURL: 'https://ui-avatars.com/api/?name=홍길동',
    });
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
