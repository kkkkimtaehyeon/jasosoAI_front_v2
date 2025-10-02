import {useState} from 'react'
import {useNavigate} from 'react-router-dom'
import {FileText, Plus} from 'lucide-react'
import CoverLetterUpload from '../components/CoverLetterUpload'
import './MyCoverLetter.css'
import EmptyState from "../components/EmptyState.jsx";
import CoverLetterList from "../components/CoverLetterList.jsx";
import PageHeader from "../components/PageHeader.jsx";
import useMyCoverLetters from "../hooks/useMyCoverLetters.js";
import React from 'react';

const MyCoverLetter = () => {
    const navigate = useNavigate()
    const [showUploadForm, setShowUploadForm] = useState(false)
    const {myCoverLetters, loading} = useMyCoverLetters();
    const [coverLetters, setCoverLetters] = useState([]);
    const [page, setPage] = useState(1);
    const pageSize = 9;

    // myCoverLetters가 변경될 때마다 동기화
    React.useEffect(() => {
        if (myCoverLetters) {
            setCoverLetters(myCoverLetters);
        }
    }, [myCoverLetters]);

    const handleUpload = (savedCoverLetter) => {
        setShowUploadForm(false)
        navigate(`/my-cover-letter/${savedCoverLetter.id}`)
    }

    const handleViewDetail = (coverLetter) => {
        navigate(`/my-cover-letter/${coverLetter.id}`)
    }

    // 페이지네이션 계산
    const total = coverLetters.length;
    const totalPages = Math.ceil(total / pageSize);
    const pagedCoverLetters = coverLetters.slice((page-1)*pageSize, page*pageSize);

    return (
        <div className="cover-letter-management">
            <PageHeader>
                <div className="page-title"></div>
                <button
                    className="upload-btn"
                    onClick={() => setShowUploadForm(true)}
                >
                    <Plus size={20}/>
                    자소서 업로드
                </button>
            </PageHeader>

            {loading ? (
                <div className="flex justify-center items-center py-16 text-slate-500 text-lg">로딩 중...</div>
            ) : (
                <CoverLetterList
                    coverLetters={pagedCoverLetters}
                    onItemClick={handleViewDetail}
                    emptyState={
                        (!myCoverLetters || myCoverLetters.length === 0) && (
                            <EmptyState
                                icon={<FileText size={48}/>}
                                title="자소서가 없습니다"
                                message="새로운 자소서를 업로드해보세요"
                            />
                        )
                    }
                />
            )}

            {/* 페이지네이션 UI */}
            {totalPages > 1 && !loading && (
                <div className="flex justify-center mt-8 gap-2">
                    {Array.from({length: totalPages}, (_, i) => i+1).map(num => (
                        <button
                            key={num}
                            className={`px-4 py-2 rounded-lg border ${num===page ? 'bg-blue-600 text-white' : 'bg-white text-blue-600 border-blue-600'} font-bold transition-colors`}
                            onClick={() => setPage(num)}
                        >
                            {num}
                        </button>
                    ))}
                </div>
            )}

            {showUploadForm && (
                <CoverLetterUpload
                    onUpload={handleUpload}
                    onClose={() => setShowUploadForm(false)}
                />
            )}
        </div>
    );
};

export default MyCoverLetter
