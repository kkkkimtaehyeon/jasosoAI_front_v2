// Index.jsx
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

function Index() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // 로그인되어 있으면 자소서 관리 페이지로 리다이렉트
    if (user) {
      navigate('/my-cover-letter', { replace: true });
    }
  }, [user, navigate]);

  // 로그인 안 했을 때만 보이는 페이지
  if (user) {
    return null; // 리다이렉트 중이므로 아무것도 렌더링하지 않음
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <h2 className="text-2xl font-bold text-slate-900 mb-4">환영합니다!</h2>
        <p className="text-slate-600 mb-6">
          자소서 AI와 함께 나만의 자기소개서를 작성해보세요.
        </p>
        <p className="text-sm text-slate-500">
          우측 상단의 로그인 버튼을 클릭해주세요.
        </p>
      </div>
    </div>
  );
}

export default Index;