import React from 'react';

const EmptyState = ({ icon, title, message, children }) => {
    return (
        <div className="empty-state">
            {icon}
            <h3>{title}</h3>
            <p>{message}</p>
            {children}
        </div>
    );
};

export default EmptyState;