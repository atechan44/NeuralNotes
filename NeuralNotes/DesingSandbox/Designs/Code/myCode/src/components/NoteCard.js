import React from 'react';
import { useTheme } from '../contexts/ThemeContext';

const NoteCard = ({ note, viewMode, onEdit, onDelete }) => {
  const { darkMode } = useTheme();
  const { id, title, content, tags, createdAt, imageUrl } = note;
  
  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    }).format(date);
  };
  
  // Get a preview of the content (first 100 characters)
  const contentPreview = content.length > 100 
    ? `${content.substring(0, 100)}...` 
    : content;
  
  // Card styles based on theme and view mode
  const cardClasses = `
    ${darkMode ? 'bg-dark-secondary text-dark-text' : 'bg-white text-gray-800'} 
    ${darkMode ? 'hover:bg-opacity-90' : 'hover:bg-gray-50'} 
    ${viewMode === 'grid' ? 'rounded-lg shadow-sm' : 'rounded-md shadow-sm mb-3'} 
    transition-all duration-200 ease-in-out
    border ${darkMode ? 'border-dark-secondary' : 'border-gray-200'}
    overflow-hidden
  `;

  return (
    <div className={cardClasses}>
      {/* Card Header with Image (if available) */}
      {imageUrl && viewMode === 'grid' && (
        <div className="h-40 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={title} 
            className="w-full h-full object-cover"
          />
        </div>
      )}
      
      <div className="p-4">
        {/* Title and Actions */}
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-medium line-clamp-1">{title}</h3>
          <div className="flex space-x-1">
            <button 
              onClick={() => onEdit(id)} 
              className={`p-1 rounded-full ${darkMode ? 'hover:bg-dark-primary' : 'hover:bg-light-primary'} transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </button>
            <button 
              onClick={() => onDelete(id)} 
              className={`p-1 rounded-full ${darkMode ? 'hover:bg-dark-primary' : 'hover:bg-light-primary'} transition-colors`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Content Preview */}
        <div className={`${viewMode === 'grid' ? 'h-16' : 'h-auto'} overflow-hidden mb-3`}>
          <p className={`text-sm ${darkMode ? 'text-gray-300' : 'text-gray-600'} whitespace-pre-line line-clamp-3`}>
            {contentPreview}
          </p>
        </div>
        
        {/* Image in list view (smaller) */}
        {imageUrl && viewMode === 'list' && (
          <div className="h-20 w-20 float-right ml-3 mb-2 overflow-hidden rounded">
            <img 
              src={imageUrl} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          </div>
        )}
        
        {/* Footer with Tags and Date */}
        <div className="flex justify-between items-center mt-auto">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {tags.slice(0, 3).map(tag => (
              <span 
                key={tag} 
                className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                  darkMode 
                    ? 'bg-dark-primary text-dark-accent' 
                    : 'bg-light-primary text-light-accent'
                }`}
              >
                {tag}
              </span>
            ))}
            {tags.length > 3 && (
              <span 
                className={`inline-block px-2 py-0.5 text-xs rounded-full ${
                  darkMode 
                    ? 'bg-dark-primary text-gray-400' 
                    : 'bg-light-primary text-gray-500'
                }`}
              >
                +{tags.length - 3}
              </span>
            )}
          </div>
          
          {/* Date */}
          <div className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            {formatDate(createdAt)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
