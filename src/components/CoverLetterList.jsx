import React from 'react';
import CoverLetterCard from './CoverLetterCard.jsx';

const CoverLetterList = ({coverLetters, onItemClick, emptyState}) => {
    if (coverLetters.length === 0) {
        return (
            <div className="cover-letter-list">
                {emptyState}
            </div>
        );
    }

    return (
        <div className="cover-letter-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {coverLetters.map(coverLetter => (
                <CoverLetterCard
                    key={coverLetter.id}
                    coverLetter={coverLetter}
                    onClick={() => onItemClick(coverLetter)}
                />
            ))}
        </div>
    );
};

export default CoverLetterList;