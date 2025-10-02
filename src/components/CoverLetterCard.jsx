import React from 'react';
import {Calendar, Link as LinkIcon} from 'lucide-react';

const CoverLetterCard = ({coverLetter, onClick}) => {
    return (
        <div className="cover-letter-item"
             onClick={onClick}
             style={{cursor: onClick ? 'pointer' : 'default'}}
        >
            <div className="cover-letter-info">
                <h3 className="cover-letter-title">{coverLetter.title}</h3>
                <div className="cover-letter-meta">
          <span className="date">
            <Calendar size={16}/>
              {coverLetter.date}
          </span>
                </div>
                {/* jobUrl이 있는 경우에만 표시 (AI 자소서) */}
                {coverLetter.jobUrl && (
                    <div className="job-url">
                        <LinkIcon size={14}/>
                        {coverLetter.jobUrl}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CoverLetterCard;