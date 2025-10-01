import { useState } from 'react'
import { X, Plus, Save } from 'lucide-react'
import './CoverLetterUpload.css'

const CoverLetterUpload = ({ onUpload, onClose }) => {
  const [title, setTitle] = useState('')
  const [items, setItems] = useState([
    { question: '', content: '' }
  ])

  const addItem = () => {
    setItems(prev => [...prev, { question: '', content: '' }])
  }

  const removeItem = (index) => {
    if (items.length > 1) {
      setItems(prev => prev.filter((_, i) => i !== index))
    }
  }

  const updateItem = (index, field, value) => {
    setItems(prev => prev.map((item, i) => 
      i === index ? { ...item, [field]: value } : item
    ))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) {
      alert('제목을 입력해주세요.')
      return
    }

    const validItems = items.filter(item => 
      item.question.trim() && item.content.trim()
    )

    if (validItems.length === 0) {
      alert('최소 하나의 유효한 항목을 입력해주세요.')
      return
    }

    onUpload({
      title: title.trim(),
      items: validItems
    })
  }

  return (
    <div className="upload-overlay">
      <div className="upload-modal">
        <div className="upload-header">
          <h2>자소서 업로드</h2>
          <button className="close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="upload-form">
          <div className="form-group">
            <label htmlFor="title">자소서 제목</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="예: 삼성전자 지원 자소서"
              required
            />
          </div>

          <div className="form-group">
            <label>자소서 항목</label>
            <div className="items-container">
              {items.map((item, index) => (
                <div key={index} className="item-card">
                  <div className="item-header">
                    <span className="item-number">항목 {index + 1}</span>
                    {items.length > 1 && (
                      <button
                        type="button"
                        className="remove-item-btn"
                        onClick={() => removeItem(index)}
                      >
                        <X size={16} />
                      </button>
                    )}
                  </div>
                  <div className="item-fields">
                    <div className="field-group">
                      <label>질문</label>
                      <input
                        type="text"
                        value={item.question}
                        onChange={(e) => updateItem(index, 'question', e.target.value)}
                        placeholder="예: 지원동기를 작성해주세요"
                        required
                      />
                    </div>
                    <div className="field-group">
                      <label>내용</label>
                      <textarea
                        value={item.content}
                        onChange={(e) => updateItem(index, 'content', e.target.value)}
                        placeholder="자기소개서 내용을 작성해주세요"
                        rows={4}
                        required
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              type="button"
              className="add-item-btn"
              onClick={addItem}
            >
              <Plus size={16} />
              항목 추가하기
            </button>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onClose}>
              취소
            </button>
            <button type="submit" className="save-btn">
              <Save size={16} />
              저장하기
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CoverLetterUpload
