import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const NoteEditor = ({ note, onSave, onCancel, allTags }) => {
  const { darkMode } = useTheme();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isValidImageUrl, setIsValidImageUrl] = useState(true);
  const titleInputRef = useRef(null);
  
  // Initialize form with note data if editing
  useEffect(() => {
    if (note) {
      setTitle(note.title || '');
      setContent(note.content || '');
      setTags(note.tags || []);
      setImageUrl(note.imageUrl || '');
    } else {
      // Clear form for new note
      setTitle('');
      setContent('');
      setTags([]);
      setImageUrl('');
    }
  }, [note]);
  
  // Focus on title input when modal opens
  useEffect(() => {
    if (titleInputRef.current) {
      titleInputRef.current.focus();
    }
  }, []);
  
  // Handle tag input
  const handleTagInputKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag();
    }
  };
  
  // Add a tag
  const addTag = () => {
    const trimmedTag = tagInput.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags([...tags, trimmedTag]);
    }
    setTagInput('');
  };
  
  // Remove a tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };
  
  // Validate image URL
  const validateImageUrl = (url) => {
    if (!url) {
      setIsValidImageUrl(true);
      return;
    }
    
    const img = new Image();
    img.onload = () => setIsValidImageUrl(true);
    img.onerror = () => setIsValidImageUrl(false);
    img.src = url;
  };
  
  // Handle image URL change
  const handleImageUrlChange = (e) => {
    const url = e.target.value;
    setImageUrl(url);
    validateImageUrl(url);
  };
  
  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!title.trim()) {
      alert('Please enter a title for your note');
      return;
    }
    
    if (!isValidImageUrl) {
      alert('Please enter a valid image URL or leave it blank');
      return;
    }
    
    // Add any remaining tag from input
    if (tagInput.trim()) {
      addTag();
    }
    
    // Prepare note data
    const noteData = {
      title: title.trim(),
      content,
      tags,
      imageUrl: imageUrl || null
    };
    
    onSave(noteData);
  };
  
  // Suggest tags based on existing tags
  const suggestedTags = allTags.filter(tag => 
    !tags.includes(tag) && 
    tag.includes(tagInput.toLowerCase()) && 
    tagInput.length > 0
  );
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onCancel}
      ></div>
      
      {/* Modal */}
      <div 
        className={`relative w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-lg shadow-xl ${
          darkMode ? 'bg-gray-900 text-gray-200' : 'bg-white text-gray-800'
        } p-6`}
      >
        <h2 className="text-2xl font-bold mb-6">
          {note ? 'Edit Note' : 'Create New Note'}
        </h2>
        
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="mb-4">
            <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Title*
            </label>
            <input
              ref={titleInputRef}
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter a title"
              className={`w-full px-4 py-2 rounded-md ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-200' 
                  : 'bg-gray-100 border-gray-300 text-gray-800'
              } border focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              required
            />
          </div>
          
          {/* Content */}
          <div className="mb-4">
            <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Content
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your note content here..."
              rows="8"
              className={`w-full px-4 py-2 rounded-md ${
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-200' 
                  : 'bg-gray-100 border-gray-300 text-gray-800'
              } border focus:outline-none focus:ring-2 focus:ring-yellow-500`}
            ></textarea>
          </div>
          
          {/* Tags */}
          <div className="mb-4">
            <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {tags.map(tag => (
                <span 
                  key={tag}
                  className={`inline-flex items-center px-2 py-1 rounded-full text-sm ${
                    darkMode 
                      ? 'bg-gray-800 text-gray-300' 
                      : 'bg-gray-200 text-gray-700'
                  }`}
                >
                  {tag}
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="ml-1 rounded-full hover:bg-gray-700 hover:text-white"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </span>
              ))}
            </div>
            <div className="relative">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagInputKeyDown}
                onBlur={addTag}
                placeholder="Add tags (press Enter or comma to add)"
                className={`w-full px-4 py-2 rounded-md ${
                  darkMode 
                    ? 'bg-gray-800 border-gray-700 text-gray-200' 
                    : 'bg-gray-100 border-gray-300 text-gray-800'
                } border focus:outline-none focus:ring-2 focus:ring-yellow-500`}
              />
              {suggestedTags.length > 0 && (
                <div className={`absolute z-10 w-full mt-1 rounded-md shadow-lg ${
                  darkMode ? 'bg-gray-800' : 'bg-white'
                } border ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
                  {suggestedTags.map(tag => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => {
                        setTags([...tags, tag]);
                        setTagInput('');
                      }}
                      className={`block w-full text-left px-4 py-2 text-sm ${
                        darkMode 
                          ? 'hover:bg-gray-700 text-gray-300' 
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          {/* Image URL */}
          <div className="mb-6">
            <label className={`block mb-1 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Image URL (optional)
            </label>
            <input
              type="text"
              value={imageUrl}
              onChange={handleImageUrlChange}
              placeholder="https://example.com/image.jpg"
              className={`w-full px-4 py-2 rounded-md ${
                !isValidImageUrl ? 'border-red-500' : 
                darkMode 
                  ? 'bg-gray-800 border-gray-700 text-gray-200' 
                  : 'bg-gray-100 border-gray-300 text-gray-800'
              } border focus:outline-none focus:ring-2 ${!isValidImageUrl ? 'focus:ring-red-500' : 'focus:ring-yellow-500'}`}
            />
            {!isValidImageUrl && (
              <p className="mt-1 text-sm text-red-500">
                Please enter a valid image URL or leave it blank
              </p>
            )}
            {imageUrl && isValidImageUrl && (
              <div className="mt-2 h-40 overflow-hidden rounded-md">
                <img 
                  src={imageUrl} 
                  alt="Preview" 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onCancel}
              className={`px-4 py-2 rounded-md ${
                darkMode 
                  ? 'bg-gray-800 hover:bg-gray-700 text-gray-200' 
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 rounded-md ${
                darkMode 
                  ? 'bg-yellow-600 hover:bg-yellow-700 text-white' 
                  : 'bg-yellow-500 hover:bg-yellow-600 text-white'
              }`}
            >
              {note ? 'Save Changes' : 'Create Note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NoteEditor;
