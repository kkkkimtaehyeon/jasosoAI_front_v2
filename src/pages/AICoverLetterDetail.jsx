// import {useState, useEffect, useRef} from 'react'
// import {useParams, useNavigate} from 'react-router-dom'
// import {ArrowLeft, Save, ArrowClockwise, FileText, Plus, Link as LinkIcon} from 'react-bootstrap-icons'
// import './AICoverLetterDetail.css'
//
// // similarResumes mock 데이터 추가
// const similarResumes = [
//     {
//         id: 1,
//         question: "What are your strengths?",
//         company: "Tech Innovations Inc.",
//         content: "My key strengths include strong analytical thinking, excellent problem-solving skills, and the ability to work effectively in team environments. I have demonstrated these strengths through various projects where I successfully identified and resolved complex technical challenges. My communication skills allow me to explain technical concepts clearly to both technical and non-technical stakeholders.",
//         icon: "📊"
//     },
//     {
//         id: 2,
//         question: "Describe a challenging project and how you overcame it.",
//         company: "Global Solutions Ltd.",
//         content: "I led a critical software migration project that was initially behind schedule. The main challenge was coordinating between multiple teams and managing stakeholder expectations. I restructured the project timeline, implemented daily stand-up meetings, and established clear communication channels. Through these efforts, we completed the project on time and received positive feedback from all stakeholders.",
//         icon: "🌱"
//     },
//     {
//         id: 3,
//         question: "Why are you interested in this role?",
//         company: "Future Dynamics Corp.",
//         content: "I am passionate about leveraging technology to solve real-world problems and drive innovation. This role aligns perfectly with my career goals and allows me to work with cutting-edge technologies while contributing to meaningful projects. The company's commitment to sustainability and innovation resonates with my personal values, and I believe I can make a significant contribution to the team's success.",
//         icon: "🌊"
//     }
// ]
//
// const AICoverLetterDetail = () => {
//     const {id} = useParams()
//     const navigate = useNavigate()
//     const [currentItemIndex, setCurrentItemIndex] = useState(0)
//     const [isEditing, setIsEditing] = useState(true)
//     const [isRegenerating, setIsRegenerating] = useState(false)
//     const [expandedCard, setExpandedCard] = useState(null)
//     const [coverLetter, setCoverLetter] = useState({
//         id: id,
//         title: '카카오 AI 자소서',
//         date: '2024-01-12',
//         jobUrl: 'https://careers.kakao.com/jobs/P-12345',
//         items: [
//             {
//                 question: '성장과정',
//                 content: '대학 시절 컴퓨터공학을 전공하면서 다양한 프로젝트를 통해 실무 경험을 쌓았습니다. 특히 졸업 작품으로 개발한 IoT 기반 스마트팜 시스템을 통해 하드웨어와 소프트웨어의 융합 기술에 대한 깊은 이해를 얻었습니다.',
//                 wordLimit: 500
//             },
//             {
//                 question: '지원동기',
//                 content: '카카오의 혁신적인 기술과 사용자 중심의 서비스 철학에 깊이 공감합니다. 특히 AI 기술을 통해 더 나은 사용자 경험을 제공하는 카카오의 비전에 함께하고 싶습니다.',
//                 wordLimit: 400
//             },
//             {
//                 question: '프로젝트 경험',
//                 content: '팀 프로젝트에서 리더십을 발휘하여 성공적인 결과를 도출한 경험이 있습니다. 여러 작업을 관리하고 마감 기한을 맞추는 능력을 강조하고 싶습니다.',
//                 wordLimit: 600
//             },
//             {
//                 question: '향후 계획',
//                 content: '앞으로 AI 기술 발전에 기여하고 싶습니다. 특히 자연어 처리와 머신러닝 분야에서 전문성을 쌓아가고 있습니다.',
//                 wordLimit: 300
//             }
//         ]
//     })
//     const [editingContent, setEditingContent] = useState(coverLetter.items[0]?.content || '')
//
//     // 아이템 전환 시 에디팅 내용 동기화
//     useEffect(() => {
//         setEditingContent(coverLetter.items[currentItemIndex]?.content || '')
//     }, [currentItemIndex, coverLetter.items])
//
//     const handleSave = () => {
//         const newItems = [...coverLetter.items]
//         newItems[currentItemIndex].content = editingContent
//         setCoverLetter({...coverLetter, items: newItems})
//         setIsEditing(false)
//     }
//
//     const handleCancel = () => {
//         setEditingContent(coverLetter.items[currentItemIndex]?.content || '')
//         setIsEditing(false)
//     }
//
//     const handleRegenerate = () => {
//         setIsRegenerating(true)
//         setTimeout(() => {
//             const newContent = `AI가 재생성한 ${coverLetter.items[currentItemIndex].question}에 대한 새로운 답변입니다. 이는 실제 AI 생성 결과가 아닌 시뮬레이션입니다. 실제 구현에서는 AI API를 연동하여 진짜 자소서를 생성합니다.`
//             const newItems = [...coverLetter.items]
//             newItems[currentItemIndex].content = newContent
//             setCoverLetter({...coverLetter, items: newItems})
//             setEditingContent(newContent)
//             setIsRegenerating(false)
//         }, 2000)
//     }
//
//     const handleCardClick = (cardId) => {
//         setExpandedCard(expandedCard === cardId ? null : cardId)
//     }
//
//     const currentItem = coverLetter.items[currentItemIndex]
//
//     return (
//         <div className="bg-slate-50 min-h-screen">
//             {/* 메인 콘텐츠 */}
//             <main className="flex-1 w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
//                 {/* 좌측 사이드바 - AI 가이드 */}
//                 <aside
//                     className="lg:col-span-1 bg-white rounded-lg border border-slate-200 flex flex-col max-h-[calc(100vh-120px)]">
//                     <div className="flex-1 overflow-y-auto p-6">
//                         <div className="space-y-6">
//                             <div>
//                                 <h3 className="font-semibold text-slate-800 mb-2">작성 가이드</h3>
//                                 <p className="text-sm text-slate-600 leading-relaxed">
//                                     팀 프로젝트에서 리더십 기술과 경험을 강조하세요. 여러 작업을 관리하고 마감 기한을 맞추는 능력을 강조하세요. 성공적인 프로젝트 결과와 기여에 대한
//                                     구체적인 예를 제공하세요.
//                                 </p>
//                             </div>
//                             <div>
//                                 <h3 className="font-semibold text-slate-800 mb-4">유사한 질문</h3>
//                                 <div className="space-y-3">
//                                     {similarResumes.map((resume, index) => (
//                                         <div key={resume.id} className="transition-all duration-300">
//                                             <div
//                                                 className="flex gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
//                                                 onClick={() => handleCardClick(resume.id)}
//                                             >
//                                                 <div className="flex-grow">
//                                                     <p className="font-semibold text-slate-800 mt-1">{resume.question}</p>
//                                                     <p className="text-xs text-slate-500 mt-1">{resume.company}</p>
//                                                 </div>
//                                             </div>
//                                             {/* 펼쳐진 내용 */}
//                                             {expandedCard === resume.id && (
//                                                 <div
//                                                     className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-in slide-in-from-top-2 duration-300">
//                                                     <h4 className="font-semibold text-slate-800 mb-2">Sample
//                                                         Answer:</h4>
//                                                     <p className="text-sm text-slate-600 leading-relaxed">{resume.content}</p>
//                                                     <div className="mt-3 flex gap-2">
//                                                         <button
//                                                             className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation()
//                                                                 setEditingContent(resume.content)
//                                                                 setIsEditing(true)
//                                                             }}
//                                                         >
//                                                             이 내용 사용하기
//                                                         </button>
//                                                         <button
//                                                             className="px-3 py-1 text-xs bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
//                                                             onClick={(e) => {
//                                                                 e.stopPropagation()
//                                                                 setExpandedCard(null)
//                                                             }}
//                                                         >
//                                                             닫기
//                                                         </button>
//                                                     </div>
//                                                 </div>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </aside>
//                 {/* 메인 콘텐츠 영역 */}
//                 <section className="lg:col-span-2 bg-white rounded-lg p-6 border border-slate-200">
//                     <div className="flex items-center justify-between mb-6">
//                         <h2 className="text-2xl font-bold text-slate-900">자소서 항목</h2>
//                         <div className="flex items-center gap-2">
//                             {coverLetter.items.map((_, index) => (
//                                 <button
//                                     key={index}
//                                     className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg transition-colors ${
//                                         index === currentItemIndex
//                                             ? 'bg-blue-600 text-white'
//                                             : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
//                                     }`}
//                                     onClick={() => setCurrentItemIndex(index)}
//                                 >
//                                     {index + 1}
//                                 </button>
//                             ))}
//                             <button
//                                 className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-200 text-slate-500 hover:bg-slate-300 transition-colors">
//                                 <Plus size={16}/>
//                             </button>
//                         </div>
//                     </div>
//                     <form className="space-y-6">
//                         <div>
//                             <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="question">
//                                 질문
//                             </label>
//                             <h3 className="text-lg font-semibold text-slate-900 bg-slate-100 rounded-lg px-4 py-3">
//                                 {currentItem?.question}
//                             </h3>
//                         </div>
//                         <div>
//                             <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="content">
//                                 내용
//                             </label>
//                             {isEditing ? (
//                                 <textarea
//                                     className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
//                                     id="content"
//                                     placeholder="여기에 내용을 입력하세요..."
//                                     rows={12}
//                                     value={editingContent}
//                                     onChange={(e) => setEditingContent(e.target.value)}
//                                 />
//                             ) : (
//                                 <textarea
//                                     className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
//                                     id="content"
//                                     placeholder="여기에 내용을 입력하세요..."
//                                     rows={12}
//                                     value={currentItem?.content || ""}
//                                     readOnly
//                                 />
//                             )}
//                             <div className="flex justify-between items-center mt-2">
//                 <span className="text-sm text-slate-500">
//                   글자수: {isEditing ? editingContent.length : (currentItem?.content?.length || 0)} / {currentItem?.wordLimit || 500}
//                 </span>
//
//                             </div>
//                         </div>
//                         <div className="flex justify-end pt-4">
//                             <button
//                                 type="button"
//                                 onClick={handleSave}
//                                 className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
//                             >
//                                 <Save className="inline mr-2" size={16}/>
//                                 저장
//                             </button>
//                         </div>
//                     </form>
//                 </section>
//             </main>
//         </div>
//     )
// }
//
// export default AICoverLetterDetail


import {useState, useEffect, useRef} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {ArrowLeft, Save, ArrowClockwise, FileText, Plus, Link as LinkIcon} from 'react-bootstrap-icons'
import './AICoverLetterDetail.css'
import CoverLetterItemList from "../components/CoverLetterItemList.jsx";

// similarResumes mock 데이터 추가
const similarResumes = [
    {
        id: 1,
        question: "What are your strengths?",
        company: "Tech Innovations Inc.",
        content: "My key strengths include strong analytical thinking, excellent problem-solving skills, and the ability to work effectively in team environments. I have demonstrated these strengths through various projects where I successfully identified and resolved complex technical challenges. My communication skills allow me to explain technical concepts clearly to both technical and non-technical stakeholders.",
        icon: "📊"
    },
    {
        id: 2,
        question: "Describe a challenging project and how you overcame it.",
        company: "Global Solutions Ltd.",
        content: "I led a critical software migration project that was initially behind schedule. The main challenge was coordinating between multiple teams and managing stakeholder expectations. I restructured the project timeline, implemented daily stand-up meetings, and established clear communication channels. Through these efforts, we completed the project on time and received positive feedback from all stakeholders.",
        icon: "🌱"
    },
    {
        id: 3,
        question: "Why are you interested in this role?",
        company: "Future Dynamics Corp.",
        content: "I am passionate about leveraging technology to solve real-world problems and drive innovation. This role aligns perfectly with my career goals and allows me to work with cutting-edge technologies while contributing to meaningful projects. The company's commitment to sustainability and innovation resonates with my personal values, and I believe I can make a significant contribution to the team's success.",
        icon: "🌊"
    }
]

const AICoverLetterDetail = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const [currentItemIndex, setCurrentItemIndex] = useState(0)
    const [isEditing, setIsEditing] = useState(true)
    const [isRegenerating, setIsRegenerating] = useState(false)
    const [expandedCard, setExpandedCard] = useState(null)
    const [coverLetter, setCoverLetter] = useState({
        id: id,
        title: '카카오 AI 자소서',
        date: '2024-01-12',
        jobUrl: 'https://careers.kakao.com/jobs/P-12345',
        items: [
            {
                question: '성장과정',
                content: '대학 시절 컴퓨터공학을 전공하면서 다양한 프로젝트를 통해 실무 경험을 쌓았습니다. 특히 졸업 작품으로 개발한 IoT 기반 스마트팜 시스템을 통해 하드웨어와 소프트웨어의 융합 기술에 대한 깊은 이해를 얻었습니다.',
                wordLimit: 500
            },
            {
                question: '지원동기',
                content: '카카오의 혁신적인 기술과 사용자 중심의 서비스 철학에 깊이 공감합니다. 특히 AI 기술을 통해 더 나은 사용자 경험을 제공하는 카카오의 비전에 함께하고 싶습니다.',
                wordLimit: 400
            },
            {
                question: '프로젝트 경험',
                content: '팀 프로젝트에서 리더십을 발휘하여 성공적인 결과를 도출한 경험이 있습니다. 여러 작업을 관리하고 마감 기한을 맞추는 능력을 강조하고 싶습니다.',
                wordLimit: 600
            },
            {
                question: '향후 계획',
                content: '앞으로 AI 기술 발전에 기여하고 싶습니다. 특히 자연어 처리와 머신러닝 분야에서 전문성을 쌓아가고 있습니다.',
                wordLimit: 300
            }
        ]
    })
    const [editingContent, setEditingContent] = useState(coverLetter.items[0]?.content || '')

    // 아이템 전환 시 에디팅 내용 동기화
    useEffect(() => {
        setEditingContent(coverLetter.items[currentItemIndex]?.content || '')
    }, [currentItemIndex, coverLetter.items])

    const handleSave = () => {
        const newItems = [...coverLetter.items]
        newItems[currentItemIndex].content = editingContent
        setCoverLetter({...coverLetter, items: newItems})
        setIsEditing(false)
    }

    const handleCancel = () => {
        setEditingContent(coverLetter.items[currentItemIndex]?.content || '')
        setIsEditing(false)
    }

    const handleRegenerate = () => {
        setIsRegenerating(true)
        setTimeout(() => {
            const newContent = `AI가 재생성한 ${coverLetter.items[currentItemIndex].question}에 대한 새로운 답변입니다. 이는 실제 AI 생성 결과가 아닌 시뮬레이션입니다. 실제 구현에서는 AI API를 연동하여 진짜 자소서를 생성합니다.`
            const newItems = [...coverLetter.items]
            newItems[currentItemIndex].content = newContent
            setCoverLetter({...coverLetter, items: newItems})
            setEditingContent(newContent)
            setIsRegenerating(false)
        }, 2000)
    }

    const handleCardClick = (cardId) => {
        setExpandedCard(expandedCard === cardId ? null : cardId)
    }

    // "이 내용 사용하기" → 현재 항목 textarea에 줄바꿈 후 추가
    const handleUseContent = (content) => {
        setEditingContent(prev => (prev ? prev + '\n' + content : content));
        setIsEditing(true);
    }

    const currentItem = coverLetter.items[currentItemIndex]

    return (
        <div className="bg-slate-50 min-h-screen">
            {/* 메인 콘텐츠 */}
            <main className="flex-1 w-full max-w-screen-2xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 p-6">
                {/* 좌측 사이드바 - AI 가이드 */}
                <aside
                    className="lg:col-span-1 bg-white rounded-lg border border-slate-200 flex flex-col max-h-[calc(100vh-120px)]">
                    <div className="flex-1 overflow-y-auto p-6">
                        <div className="space-y-6">
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-2">작성 가이드</h3>
                                <p className="text-sm text-slate-600 leading-relaxed">
                                    팀 프로젝트에서 리더십 기술과 경험을 강조하세요. 여러 작업을 관리하고 마감 기한을 맞추는 능력을 강조하세요. 성공적인 프로젝트 결과와 기여에 대한
                                    구체적인 예를 제공하세요.
                                </p>
                            </div>
                            <div>
                                <h3 className="font-semibold text-slate-800 mb-4">유사한 질문</h3>
                                <div className="space-y-3">
                                    {similarResumes.map((resume, index) => (
                                        <div key={resume.id} className="transition-all duration-300">
                                            <div
                                                className="flex gap-4 p-4 rounded-lg bg-slate-50 hover:bg-slate-100 cursor-pointer transition-colors"
                                                onClick={() => handleCardClick(resume.id)}
                                            >
                                                <div className="flex-grow">
                                                    <p className="font-semibold text-slate-800 mt-1">{resume.question}</p>
                                                    <p className="text-xs text-slate-500 mt-1">{resume.company}</p>
                                                </div>
                                            </div>
                                            {/* 펼쳐진 내용 */}
                                            {expandedCard === resume.id && (
                                                <div
                                                    className="mt-3 p-4 bg-blue-50 border border-blue-200 rounded-lg animate-in slide-in-from-top-2 duration-300">
                                                    <h4 className="font-semibold text-slate-800 mb-2">Sample
                                                        Answer:</h4>
                                                    <p className="text-sm text-slate-600 leading-relaxed">{resume.content}</p>
                                                    <div className="mt-3 flex gap-2">
                                                        <button
                                                            className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                handleUseContent(resume.content);
                                                            }}
                                                        >
                                                            이 내용 사용하기
                                                        </button>
                                                        <button
                                                            className="px-3 py-1 text-xs bg-slate-600 text-white rounded hover:bg-slate-700 transition-colors"
                                                            onClick={e => {
                                                                e.stopPropagation();
                                                                setExpandedCard(null);
                                                            }}
                                                        >
                                                            닫기
                                                        </button>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </aside>
                {/* 메인 콘텐츠 영역 */}
                <section className="lg:col-span-2 bg-white rounded-lg p-6 border border-slate-200">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-900">자소서 항목</h2>
                        {/* 채용공고 URL 추가 */}
                        {coverLetter.jobUrl && (
                            <a
                                href={coverLetter.jobUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-600 underline hover:text-blue-800 text-sm"
                            >
                                <LinkIcon size={16} />
                                채용공고 바로가기
                            </a>
                        )}
                    </div>
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="question">
                                질문
                            </label>
                            <h3 className="text-lg font-semibold text-slate-900 bg-slate-100 rounded-lg px-4 py-3">
                                {currentItem?.question}
                            </h3>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2" htmlFor="content">
                                내용
                            </label>
                            {isEditing ? (
                                <textarea
                                    className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
                                    id="content"
                                    placeholder="여기에 내용을 입력하세요..."
                                    rows={12}
                                    value={editingContent}
                                    onChange={e => setEditingContent(e.target.value)}
                                />
                            ) : (
                                <textarea
                                    className="w-full rounded-lg border border-slate-300 bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder:text-slate-400"
                                    id="content"
                                    placeholder="여기에 내용을 입력하세요..."
                                    rows={12}
                                    value={currentItem?.content || ""}
                                    readOnly
                                />
                            )}
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-sm text-slate-500">
                                    글자수: {isEditing ? editingContent.length : (currentItem?.content?.length || 0)} / {currentItem?.wordLimit || 500}
                                </span>
                            </div>
                        </div>
                        <div className="flex justify-end pt-4">
                            <button
                                type="button"
                                onClick={handleSave}
                                className="bg-blue-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Save className="inline mr-2" size={16}/>
                                저장
                            </button>
                        </div>
                    </form>
                </section>
            </main>
        </div>
    )
}

export default AICoverLetterDetail
