import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Plus, FileText, Calendar, Edit, Trash2 } from 'lucide-react'
import CoverLetterUpload from '../components/CoverLetterUpload'
import './CoverLetterManagement.css'

const CoverLetterManagement = () => {
  const navigate = useNavigate()
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [coverLetters, setCoverLetters] = useState([
    {
      id: 1,
      title: '삼성전자 지원 자소서',
      date: '2024-01-15',
      type: 'my',
      items: [
        { question: '지원동기', content: '삼성전자에서 혁신적인 기술과 글로벌 경쟁력을 바탕으로 미래를 선도하는 기업이라는 점에 매력을 느꼈습니다. 특히 반도체 분야에서의 세계적인 기술력과 지속적인 R&D 투자를 통해 기술 발전에 기여하고 싶습니다.' },
        { question: '성장과정', content: '대학 시절 컴퓨터공학을 전공하면서 다양한 프로젝트를 통해 실무 경험을 쌓았습니다. 특히 졸업 작품으로 개발한 IoT 기반 스마트팜 시스템을 통해 하드웨어와 소프트웨어의 융합 기술에 대한 깊은 이해를 얻었습니다.' }
      ]
    },
    {
      id: 2,
      title: '네이버 지원 자소서',
      date: '2024-01-10',
      type: 'my',
      items: [
        { question: '지원동기', content: '네이버의 혁신적인 기술과 사용자 중심의 서비스 철학에 깊이 공감합니다. 특히 AI 기술을 통해 더 나은 사용자 경험을 제공하는 네이버의 비전에 함께하고 싶습니다.' }
      ]
    }
  ])

  const handleUpload = (newCoverLetter) => {
    const coverLetter = {
      id: Date.now(),
      title: newCoverLetter.title,
      date: new Date().toISOString().split('T')[0],
      type: 'my',
      items: newCoverLetter.items
    }
    setCoverLetters(prev => [coverLetter, ...prev])
    setShowUploadForm(false)
  }

  const handleDelete = (id) => {
    setCoverLetters(prev => prev.filter(cl => cl.id !== id))
  }

  const handleViewDetail = (coverLetter) => {
    navigate(`/my-cover-letter/${coverLetter.id}`)
  }

  return (
    <div className="cover-letter-management">
      <div className="page-header">
        <div className="page-title">
          <h1>내 자소서 관리</h1>
          <p>직접 작성한 자소서를 관리하세요</p>
        </div>
        <button
          className="upload-btn"
          onClick={() => setShowUploadForm(true)}
        >
          <Plus size={20} />
          자소서 업로드
        </button>
      </div>

      <div className="cover-letter-list">
        {coverLetters.length === 0 ? (
          <div className="empty-state">
            <FileText size={48} />
            <h3>자소서가 없습니다</h3>
            <p>새로운 자소서를 업로드해보세요</p>
          </div>
        ) : (
          coverLetters.map(coverLetter => (
            <div key={coverLetter.id} className="cover-letter-item">
              <div className="cover-letter-info" onClick={() => handleViewDetail(coverLetter)} style={{ cursor: 'pointer' }}>
                <h3 className="cover-letter-title">{coverLetter.title}</h3>
                <div className="cover-letter-meta">
                  <span className="date">
                    <Calendar size={16} />
                    {coverLetter.date}
                  </span>
                  <span className="item-count">
                    {coverLetter.items.length}개 항목
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showUploadForm && (
        <CoverLetterUpload
          onUpload={handleUpload}
          onClose={() => setShowUploadForm(false)}
        />
      )}
    </div>
  )
}

export default CoverLetterManagement
