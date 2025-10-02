import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CoverLetterEditor from '../components/CoverLetterEditor';
import useMyCoverLetterDetail from '../hooks/useMyCoverLetterDetail.js';
import usePatchMyCoverLetter from '../hooks/usePatchMyCoverLetter.js';
import useDeleteMyCoverLetter from '../hooks/useDeleteMyCoverLetter.js';

const MyCoverLetterDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { coverLetter, loading, error } = useMyCoverLetterDetail(id);
    const [localCoverLetter, setLocalCoverLetter] = useState(null);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const { patchCoverLetter } = usePatchMyCoverLetter();
    const { deleteCoverLetter } = useDeleteMyCoverLetter();
    const [saving, setSaving] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    // API 데이터가 오면 local state에 복사
    useEffect(() => {
        if (coverLetter) {
            setLocalCoverLetter(coverLetter);
            setCurrentItemIndex(0);
        }
    }, [coverLetter]);

    const handleItemsChange = (newItems) => {
        setLocalCoverLetter(prev => ({ ...prev, items: newItems }));
    };

    const addItem = () => {
        const newItem = {
            question: 'New Question',
            content: 'Please fill in your response here.',
            char_limit: 1500
        };
        const newItems = [...(localCoverLetter?.items || []), newItem];
        setLocalCoverLetter(prev => ({ ...prev, items: newItems }));
        setCurrentItemIndex(newItems.length - 1);
    };

    const removeItem = (indexToRemove) => {
        if (!localCoverLetter || localCoverLetter.items.length <= 1) {
            alert('A cover letter must have at least one item.');
            return;
        }
        const newItems = localCoverLetter.items.filter((_, index) => index !== indexToRemove);
        setLocalCoverLetter(prev => ({ ...prev, items: newItems }));
        setCurrentItemIndex(newItems.length - 1);
    };

    const handleSave = async () => {
        if (!localCoverLetter) return;
        setSaving(true);
        try {
            await patchCoverLetter(id, {
                title: localCoverLetter.title,
                items: localCoverLetter.items.map(item => ({
                    id: item.id,
                    question: item.question,
                    char_limit: item.char_limit,
                    content: item.content,
                }))
            });
            setSaving(false);
            alert('저장되었습니다!');
            setIsEditing(false);
        } catch (err) {
            setSaving(false);
            alert('저장 실패: ' + (err?.response?.data?.detail || err.message));
        }
    };

    const handleDelete = async () => {
        if (!window.confirm('정말 삭제하시겠습니까?')) return;
        try {
            await deleteCoverLetter(id);
            alert('삭제되었습니다.');
            navigate('/my-cover-letter');
        } catch (err) {
            alert('삭제 실패: ' + (err?.response?.data?.detail || err.message));
        }
    };

    const handleDeleteAll = async () => {
        await handleDelete();
    };

    if (loading) return <div>로딩 중...</div>;
    if (error) return <div>에러 발생: {error.message}</div>;
    if (!localCoverLetter) return null;

    return (
        <div className="bg-slate-50 min-h-screen">
            <main className="w-full max-w-4xl mx-auto p-6">
                <div className="flex justify-between items-center mb-4">
                </div>
                <CoverLetterEditor
                    title={localCoverLetter.title}
                    items={localCoverLetter.items}
                    onItemsChange={handleItemsChange}
                    onAddItem={addItem}
                    onRemoveItem={removeItem}
                    currentItemIndex={currentItemIndex}
                    onSelectItem={setCurrentItemIndex}
                    onSave={handleSave}
                    saving={saving}
                    isEditing={isEditing}
                    setIsEditing={setIsEditing}
                    onDeleteAll={handleDeleteAll}
                />
            </main>
        </div>
    );
};

export default MyCoverLetterDetail;