import React from 'react';
import {Plus, Trash2} from 'lucide-react';

const CoverLetterItemList = ({items, currentItemIndex, onSelectItem, onAddItem, onRemoveItem}) => {
    return (
        <div className="flex items-center gap-2 flex-wrap">
            {items.map((_, index) => (
                <div key={index} className="relative group">
                    <button
                        className={`w-10 h-10 flex items-center justify-center rounded-full font-bold text-lg transition-colors ${
                            index === currentItemIndex
                                ? 'bg-blue-600 text-white'
                                : 'bg-slate-200 text-slate-500 hover:bg-slate-300'
                        }`}
                        onClick={() => onSelectItem(index)}
                    >
                        {index + 1}
                    </button>
                    {/* onRemoveItem(수정모드) && items.length > 1일 때만 삭제 버튼 표시 */}
                    {onRemoveItem && items.length > 1 && (
                        <button
                            onClick={() => onRemoveItem(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                            aria-label="Remove item"
                            type="button"
                        >
                            <Trash2 size={14}/>
                        </button>
                    )}
                </div>
            ))}
            {/* onAddItem 함수가 있을 때만 추가 버튼 표시 */}
            {onAddItem && (
                <button
                    onClick={onAddItem}
                    className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
                >
                    <Plus size={20}/>
                </button>
            )}
        </div>
    );
};

export default CoverLetterItemList;