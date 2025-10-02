import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { user, login, googleLogin } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) navigate('/');
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-8 flex flex-col items-center">
        <div className="mb-6 flex flex-col items-center">
          <h1 className="text-2xl font-bold text-slate-900">로그인</h1>
          <p className="text-slate-500 text-sm mt-1">AI 자소서 서비스를 이용하려면 로그인하세요.</p>
        </div>
        <button
          className="w-full flex items-center justify-center gap-2 bg-white border border-slate-300 rounded-lg px-4 py-3 font-semibold text-slate-700 hover:bg-slate-100 transition mb-4"
          onClick={googleLogin}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" className="w-5 h-5" />
          구글 계정으로 로그인
        </button>
        <div className="text-xs text-slate-400 mt-2">이메일/비밀번호 로그인은 추후 지원 예정</div>
      </div>
    </div>
  );
};

export default Login;
