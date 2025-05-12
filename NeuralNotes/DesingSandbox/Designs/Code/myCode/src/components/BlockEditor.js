import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Block types
const BLOCK_TYPES = {
  TEXT: 'text',
  HEADING_1: 'heading_1',
  HEADING_2: 'heading_2',
  HEADING_3: 'heading_3',
  BULLETED_LIST: 'bulleted_list',
  NUMBERED_LIST: 'numbered_list',
  TO_DO: 'to_do',
  QUOTE: 'quote',
  CODE: 'code',
  DIVIDER: 'divider'
};

// Default block
const createDefaultBlock = (type = BLOCK_TYPES.TEXT, content = '') => ({
  id: Date.now().toString(),
  type,
  content,
  checked: false // For to-do blocks
});

const BlockEditor = ({ initialBlocks = [], onChange }) => {
  const { darkMode } = useTheme();
  const [blocks, setBlocks] = useState(() => {
    return initialBlocks.length > 0 
      ? initialBlocks 
      : [createDefaultBlock()];
  });
  const [activeBlockId, setActiveBlockId] = useState(blocks[0]?.id);
  const [showBlockMenu, setShowBlockMenu] = useState(false);
  const [blockMenuPosition, setBlockMenuPosition] = useState({ top: 0, left: 0 });
  const [blockMenuTargetId, setBlockMenuTargetId] = useState(null);
  
  const blockRefs = useRef({});
  const blockMenuRef = useRef(null);
  
  // Update parent component when blocks change
  useEffect(() => {
    if (onChange) {
      onChange(blocks);
    }
  }, [blocks, onChange]);
  
  // Close block menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (blockMenuRef.current && !blockMenuRef.current.contains(event.target)) {
        setShowBlockMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Handle block content change
  const handleBlockChange = (id, content) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, content } : block
    ));
  };
  
  // Handle block type change
  const handleBlockTypeChange = (id, type) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, type } : block
    ));
    setShowBlockMenu(false);
  };
  
  // Handle to-do block checkbox toggle
  const handleCheckboxToggle = (id) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, checked: !block.checked } : block
    ));
  };
  
  // Add a new block after the current one
  const addBlockAfter = (id) => {
    const index = blocks.findIndex(block => block.id === id);
    if (index === -1) return;
    
    const newBlock = createDefaultBlock();
    const newBlocks = [...blocks];
    newBlocks.splice(index + 1, 0, newBlock);
    
    setBlocks(newBlocks);
    setActiveBlockId(newBlock.id);
    
    // Focus on the new block after render
    setTimeout(() => {
      if (blockRefs.current[newBlock.id]) {
        blockRefs.current[newBlock.id].focus();
      }
    }, 0);
  };
  
  // Delete a block
  const deleteBlock = (id) => {
    // Don't delete if it's the only block
    if (blocks.length <= 1) {
      setBlocks([createDefaultBlock()]);
      return;
    }
    
    const index = blocks.findIndex(block => block.id === id);
    if (index === -1) return;
    
    const newBlocks = blocks.filter(block => block.id !== id);
    setBlocks(newBlocks);
    
    // Set focus to previous block or next block if deleting first block
    const newActiveId = newBlocks[index - 1]?.id || newBlocks[0]?.id;
    setActiveBlockId(newActiveId);
    
    // Focus on the new active block after render
    setTimeout(() => {
      if (blockRefs.current[newActiveId]) {
        blockRefs.current[newActiveId].focus();
      }
    }, 0);
  };
  
  // Handle key press in block
  const handleKeyDown = (e, id, index) => {
    // Enter to create new block
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      addBlockAfter(id);
    }
    
    // Backspace at beginning to delete block or convert to text
    if (e.key === 'Backspace' && e.target.selectionStart === 0 && e.target.selectionEnd === 0) {
      const block = blocks.find(b => b.id === id);
      
      // If block has content, convert to text block
      if (block.type !== BLOCK_TYPES.TEXT && block.content.trim().length > 0) {
        handleBlockTypeChange(id, BLOCK_TYPES.TEXT);
        return;
      }
      
      // If empty, delete the block
      if (block.content.trim().length === 0) {
        e.preventDefault();
        deleteBlock(id);
      }
    }
    
    // Slash command to show block menu
    if (e.key === '/' && e.target.selectionStart === 0) {
      e.preventDefault();
      const rect = e.target.getBoundingClientRect();
      setBlockMenuPosition({ 
        top: rect.bottom + window.scrollY, 
        left: rect.left + window.scrollX 
      });
      setBlockMenuTargetId(id);
      setShowBlockMenu(true);
    }
    
    // Arrow up to go to previous block
    if (e.key === 'ArrowUp' && e.target.selectionStart === 0) {
      e.preventDefault();
      const prevBlock = blocks[index - 1];
      if (prevBlock) {
        setActiveBlockId(prevBlock.id);
        setTimeout(() => {
          if (blockRefs.current[prevBlock.id]) {
            blockRefs.current[prevBlock.id].focus();
            // Move cursor to end of previous block
            const length = blockRefs.current[prevBlock.id].value.length;
            blockRefs.current[prevBlock.id].setSelectionRange(length, length);
          }
        }, 0);
      }
    }
    
    // Arrow down to go to next block
    if (e.key === 'ArrowDown' && e.target.selectionStart === e.target.value.length) {
      e.preventDefault();
      const nextBlock = blocks[index + 1];
      if (nextBlock) {
        setActiveBlockId(nextBlock.id);
        setTimeout(() => {
          if (blockRefs.current[nextBlock.id]) {
            blockRefs.current[nextBlock.id].focus();
            // Move cursor to beginning of next block
            blockRefs.current[nextBlock.id].setSelectionRange(0, 0);
          }
        }, 0);
      }
    }
  };
  
  // Render block based on type
  const renderBlock = (block, index) => {
    const isActive = block.id === activeBlockId;
    
    // Common props for all block inputs
    const commonProps = {
      ref: el => blockRefs.current[block.id] = el,
      value: block.content,
      onChange: (e) => handleBlockChange(block.id, e.target.value),
      onKeyDown: (e) => handleKeyDown(e, block.id, index),
      onFocus: () => setActiveBlockId(block.id),
      className: `w-full outline-none resize-none overflow-hidden ${
        darkMode ? 'bg-transparent text-gray-200' : 'bg-transparent text-gray-800'
      } ${isActive ? 'ring-1 ring-yellow-500 ring-opacity-50' : ''}`,
      placeholder: 'Type / for commands...'
    };
    
    // Add plus button for adding new blocks
    const plusButton = isActive && (
      <button
        onClick={() => {
          const rect = blockRefs.current[block.id].getBoundingClientRect();
          setBlockMenuPosition({ 
            top: rect.top + window.scrollY, 
            left: rect.left - 30 + window.scrollX 
          });
          setBlockMenuTargetId(block.id);
          setShowBlockMenu(true);
        }}
        className={`absolute -left-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity ${
          darkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-500 hover:text-gray-700'
        }`}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
      </button>
    );
    
    // Render different block types
    switch (block.type) {
      case BLOCK_TYPES.HEADING_1:
        return (
          <div className="relative group py-1">
            {plusButton}
            <textarea
              {...commonProps}
              rows={1}
              className={`${commonProps.className} text-3xl font-bold`}
              placeholder="Heading 1"
            />
          </div>
        );
        
      case BLOCK_TYPES.HEADING_2:
        return (
          <div className="relative group py-1">
            {plusButton}
            <textarea
              {...commonProps}
              rows={1}
              className={`${commonProps.className} text-2xl font-bold`}
              placeholder="Heading 2"
            />
          </div>
        );
        
      case BLOCK_TYPES.HEADING_3:
        return (
          <div className="relative group py-1">
            {plusButton}
            <textarea
              {...commonProps}
              rows={1}
              className={`${commonProps.className} text-xl font-bold`}
              placeholder="Heading 3"
            />
          </div>
        );
        
      case BLOCK_TYPES.BULLETED_LIST:
        return (
          <div className="relative group py-1 flex">
            {plusButton}
            <div className="flex-shrink-0 mr-2 mt-1">•</div>
            <textarea
              {...commonProps}
              rows={1}
              placeholder="List item"
            />
          </div>
        );
        
      case BLOCK_TYPES.NUMBERED_LIST:
        return (
          <div className="relative group py-1 flex">
            {plusButton}
            <div className="flex-shrink-0 mr-2 mt-1">{index + 1}.</div>
            <textarea
              {...commonProps}
              rows={1}
              placeholder="List item"
            />
          </div>
        );
        
      case BLOCK_TYPES.TO_DO:
        return (
          <div className="relative group py-1 flex items-start">
            {plusButton}
            <div className="flex-shrink-0 mr-2 mt-1">
              <input
                type="checkbox"
                checked={block.checked}
                onChange={() => handleCheckboxToggle(block.id)}
                className="rounded"
              />
            </div>
            <textarea
              {...commonProps}
              rows={1}
              className={`${commonProps.className} ${block.checked ? 'line-through opacity-50' : ''}`}
              placeholder="To-do item"
            />
          </div>
        );
        
      case BLOCK_TYPES.QUOTE:
        return (
          <div className="relative group py-1">
            {plusButton}
            <div className={`border-l-4 ${darkMode ? 'border-gray-600' : 'border-gray-300'} pl-3`}>
              <textarea
                {...commonProps}
                rows={1}
                className={`${commonProps.className} italic`}
                placeholder="Quote"
              />
            </div>
          </div>
        );
        
      case BLOCK_TYPES.CODE:
        return (
          <div className="relative group py-1">
            {plusButton}
            <div className={`${darkMode ? 'bg-gray-800' : 'bg-gray-100'} p-3 rounded-md font-mono`}>
              <textarea
                {...commonProps}
                rows={3}
                placeholder="Code block"
              />
            </div>
          </div>
        );
        
      case BLOCK_TYPES.DIVIDER:
        return (
          <div className="relative group py-4">
            {plusButton}
            <hr className={darkMode ? 'border-gray-700' : 'border-gray-300'} />
          </div>
        );
        
      case BLOCK_TYPES.TEXT:
      default:
        return (
          <div className="relative group py-1">
            {plusButton}
            <textarea
              {...commonProps}
              rows={1}
              placeholder="Type / for commands..."
            />
          </div>
        );
    }
  };
  
  // Block menu for selecting block types
  const blockMenu = (
    <div
      ref={blockMenuRef}
      className={`absolute z-50 w-64 rounded-md shadow-lg ${
        darkMode ? 'bg-gray-800 border border-gray-700' : 'bg-white border border-gray-200'
      }`}
      style={{ top: blockMenuPosition.top, left: blockMenuPosition.left }}
    >
      <div className="p-2">
        <div className={`text-sm font-medium mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Basic blocks
        </div>
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => handleBlockTypeChange(blockMenuTargetId, BLOCK_TYPES.TEXT)}
            className={`flex items-center p-2 rounded-md text-left ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">📝</span>
            <span>Text</span>
          </button>
          <button
            onClick={() => handleBlockTypeChange(blockMenuTargetId, BLOCK_TYPES.HEADING_1)}
            className={`flex items-center p-2 rounded-md text-left ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">H1</span>
            <span>Heading 1</span>
          </button>
          <button
            onClick={() => handleBlockTypeChange(blockMenuTargetId, BLOCK_TYPES.HEADING_2)}
            className={`flex items-center p-2 rounded-md text-left ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">H2</span>
            <span>Heading 2</span>
          </button>
          <button
            onClick={() => handleBlockTypeChange(blockMenuTargetId, BLOCK_TYPES.HEADING_3)}
            className={`flex items-center p-2 rounded-md text-left ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">H3</span>
            <span>Heading 3</span>
          </button>
        </div>
        
        <div className={`text-sm font-medium mt-3 mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Lists
        </div>
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => handleBlockTypeChange(blockMenuTargetId, BLOCK_TYPES.BULLETED_LIST)}
            className={`flex items-center p-2 rounded-md text-left ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">•</span>
            <span>Bullet List</span>
          </button>
          <button
            onClick={() => handleBlockTypeChange(blockMenuTargetId, BLOCK_TYPES.NUMBERED_LIST)}
            className={`flex items-center p-2 rounded-md text-left ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">1.</span>
            <span>Numbered List</span>
          </button>
          <button
            onClick={() => handleBlockTypeChange(blockMenuTargetId, BLOCK_TYPES.TO_DO)}
            className={`flex items-center p-2 rounded-md text-left ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">☑️</span>
            <span>To-do List</span>
          </button>
        </div>
        
        <div className={`text-sm font-medium mt-3 mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Other
        </div>
        <div className="grid grid-cols-2 gap-1">
          <button
            onClick={() => handleBlockTypeChange(blockMenuTargetId, BLOCK_TYPES.QUOTE)}
            className={`flex items-center p-2 rounded-md text-left ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">❝</span>
            <span>Quote</span>
          </button>
          <button
            onClick={() => handleBlockTypeChange(blockMenuTargetId, BLOCK_TYPES.CODE)}
            className={`flex items-center p-2 rounded-md text-left ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">&lt;/&gt;</span>
            <span>Code</span>
          </button>
          <button
            onClick={() => handleBlockTypeChange(blockMenuTargetId, BLOCK_TYPES.DIVIDER)}
            className={`flex items-center p-2 rounded-md text-left ${
              darkMode ? 'hover:bg-gray-700' : 'hover:bg-gray-100'
            }`}
          >
            <span className="mr-2">—</span>
            <span>Divider</span>
          </button>
        </div>
      </div>
    </div>
  );
  
  return (
    <div className="w-full">
      {blocks.map((block, index) => (
        <div key={block.id} className="mb-1">
          {renderBlock(block, index)}
        </div>
      ))}
      
      {showBlockMenu && blockMenu}
    </div>
  );
};

export default BlockEditor;
