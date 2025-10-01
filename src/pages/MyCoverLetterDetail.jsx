import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Save, Plus, Trash2 } from 'lucide-react';

const MyCoverLetterDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // State for managing the cover letter data
  const [coverLetter, setCoverLetter] = useState({
    id: id,
    title: 'Application for Software Engineer',
    date: '2024-01-15',
    items: [
      { 
        question: 'Software Development Experience', 
        content: "I have over 5 years of experience in software development, specializing in full-stack development. I've led several projects, including the development of a mobile application for a major retail company and a web platform for a healthcare provider. My technical skills include Java, Python, JavaScript, React, and SQL.",
        characterLimit: 2500,
      },
      { 
        question: 'Problem-Solving Approach', 
        content: 'I approach problem-solving with a systematic and analytical mindset. When faced with a challenge, I first break down the problem into smaller, manageable parts. I then research and evaluate potential solutions, considering their feasibility and impact. I often collaborate with team members to brainstorm ideas and ensure a comprehensive approach.',
        characterLimit: 2000,
      },
      {
        question: 'Communication and Collaboration',
        content: 'I believe in clear and open communication. I regularly update team members on my progress and any roadblocks I encounter. I actively participate in team meetings and provide constructive feedback. I also ensure that stakeholders are informed about project milestones and any changes in scope or timeline.',
        characterLimit: 1800,
      }
    ]
  });

  // UI/Interaction State
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [editingContent, setEditingContent] = useState('');
  const [isRegenerating, setIsRegenerating] = useState(false);

  // Effect to sync editing content with the current item
  useEffect(() => {
    setEditingContent(coverLetter.items[currentItemIndex]?.content || '');
    setIsEditing(false); // Reset editing state when switching items
  }, [currentItemIndex, coverLetter.items]);
  
  // Handlers for main content actions
  const handleSave = () => {
    const newItems = [...coverLetter.items];
    newItems[currentItemIndex].content = editingContent;
    setCoverLetter({ ...coverLetter, items: newItems });
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditingContent(coverLetter.items[currentItemIndex]?.content || '');
    setIsEditing(false);
  };

  const addItem = () => {
    const newItem = { 
      question: 'New Question', 
      content: 'Please fill in your response here.', 
      characterLimit: 1500 
    };
    const newItems = [...coverLetter.items, newItem];
    setCoverLetter({ ...coverLetter, items: newItems });
    setCurrentItemIndex(newItems.length - 1); // Switch to the new item
  };
  
  const removeItem = (indexToRemove) => {
    if (coverLetter.items.length <= 1) {
      alert("A cover letter must have at least one item.");
      return;
    }
    const newItems = coverLetter.items.filter((_, index) => index !== indexToRemove);
    // Adjust current index if needed
    if (currentItemIndex >= indexToRemove && currentItemIndex > 0) {
        setCurrentItemIndex(currentItemIndex - 1);
    }
    setCoverLetter({ ...coverLetter, items: newItems });
  };

  const currentItem = coverLetter.items[currentItemIndex];

  return (
    <div className="bg-slate-50 min-h-screen">
      <main className="w-full max-w-4xl mx-auto p-6">
        {/* Main Content Area */}
        <section className="bg-white rounded-lg p-6 sm:p-8 border border-slate-200 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-slate-900">{coverLetter.title}</h2>
            <div className="flex items-center gap-2 flex-wrap">
              {coverLetter.items.map((_, index) => (
                <div key={index} className="relative group">
                   <button
                    className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg transition-colors ${
                      index === currentItemIndex
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                    }`}
                    onClick={() => setCurrentItemIndex(index)}
                  >
                    {index + 1}
                  </button>
                  {coverLetter.items.length > 1 && (
                     <button
                        onClick={() => removeItem(index)}
                        className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                        aria-label="Remove item"
                     >
                        <Trash2 size={14} />
                     </button>
                  )}
                </div>
              ))}
              <button onClick={addItem} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors">
                <Plus size={20} />
              </button>
            </div>
          </div>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-slate-900 py-3 border-b border-slate-200">
                {currentItem?.question}
              </h3>
            </div>
            
            <div>
              {isEditing ? (
                <textarea
                  className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
                  id="content"
                  placeholder="Enter your content here..."
                  rows={12}
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                />
              ) : (
                <p className="whitespace-pre-line text-slate-800 leading-relaxed text-base min-h-[288px] bg-slate-50 p-4 rounded-md">
                  {currentItem?.content || ''}
                </p>
              )}
              
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm text-slate-500">
                  글자 수 : {isEditing ? editingContent.length : (currentItem?.content?.length || 0)} / {currentItem?.characterLimit || 2000}
                </span>
                {isEditing && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="text-sm font-semibold text-slate-600 hover:text-slate-800 transition-colors"
                  >
                    수정 취소
                  </button>
                )}
              </div>
            </div>
            
            <div className="flex justify-end pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Save className="inline mr-2" size={16} />
                {isEditing ? '저장' : '수정하기'}
              </button>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MyCoverLetterDetail;

