import { createContext, useContext, useState } from 'react';
import {useGoogleLogin} from "@react-oauth/google";
import api from "../common/api-axios.js";
import {useNavigate} from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // localStorage에서 user 정보 불러오기
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      // 토큰을 FastAPI 백엔드로 전송
      const res = await api.post('/auth/google/login', {token: tokenResponse.access_token});
      const loggedUser = await res.data;
      setUser(loggedUser);
      localStorage.setItem('user', JSON.stringify(loggedUser)); // localStorage에 저장
      // 로그인 성공 후 유저 정보 저장 등 후속 처리
      window.location.href = '/my-cover-letter';
    },
    onError: () => {
      console.log('Login Failed')
    },
  });

  // 실제 구글 로그인 연동은 추후 구현
  const login = async (provider = 'google') => {
    // mock: 구글 로그인 성공 시
    const mockUser = {
      displayName: '홍길동',
      email: 'honggildong@example.com',
      photoURL: 'https://ui-avatars.com/api/?name=홍길동',
    };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser)); // localStorage에 저장
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user'); // localStorage에서 삭제
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, googleLogin}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
