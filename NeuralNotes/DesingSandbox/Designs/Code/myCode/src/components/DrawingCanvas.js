import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useTheme } from '../contexts/ThemeContext';

const DrawingCanvas = ({ width = '100%', height = '100%', onSave }) => {
  const canvasRef = useRef(null);
  const { darkMode } = useTheme();
  
  const [isDrawing, setIsDrawing] = useState(false);
  const [tool, setTool] = useState('pen'); // pen, eraser, highlighter
  const [color, setColor] = useState('#ffffff');
  const [lineWidth, setLineWidth] = useState(2);
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Save canvas state to history
  const saveCanvasState = useCallback(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const state = canvas.toDataURL();
    
    // If we're in the middle of the history, remove everything after current index
    setHistory(prevHistory => {
      if (historyIndex < prevHistory.length - 1) {
        return [...prevHistory.slice(0, historyIndex + 1), state];
      }
      return [...prevHistory, state];
    });
    
    setHistoryIndex(prevIndex => prevIndex + 1);
  }, [historyIndex]);

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Set background color
    ctx.fillStyle = darkMode ? '#1a1a1a' : '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Save initial state
    saveCanvasState();
  }, [darkMode, saveCanvasState]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const tempCanvas = document.createElement('canvas');
      const tempCtx = tempCanvas.getContext('2d');
      
      // Copy current canvas to temp canvas
      tempCanvas.width = canvas.width;
      tempCanvas.height = canvas.height;
      tempCtx.drawImage(canvas, 0, 0);
      
      // Resize main canvas
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      
      // Restore background
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = darkMode ? '#1a1a1a' : '#f5f5f5';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Restore drawing
      ctx.drawImage(tempCanvas, 0, 0);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [darkMode]);



  // Undo
  const undo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const img = new Image();
      img.src = history[newIndex];
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  // Redo
  const redo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      
      const img = new Image();
      img.src = history[newIndex];
      img.onload = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
      };
    }
  };

  // Clear canvas
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.fillStyle = darkMode ? '#1a1a1a' : '#f5f5f5';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    saveCanvasState();
  };

  // Start drawing
  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Get mouse position relative to canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    // Set drawing style based on selected tool
    if (tool === 'pen') {
      ctx.strokeStyle = color;
      ctx.lineWidth = lineWidth;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    } else if (tool === 'eraser') {
      ctx.strokeStyle = darkMode ? '#1a1a1a' : '#f5f5f5';
      ctx.lineWidth = lineWidth * 2;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    } else if (tool === 'highlighter') {
      ctx.strokeStyle = `${color}80`; // Add transparency
      ctx.lineWidth = lineWidth * 3;
      ctx.lineCap = 'square';
      ctx.lineJoin = 'bevel';
    }
    
    setIsDrawing(true);
  };

  // Draw
  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const rect = canvas.getBoundingClientRect();
    
    // Get mouse position relative to canvas
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  // Stop drawing
  const stopDrawing = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    ctx.closePath();
    setIsDrawing(false);
    
    // Save canvas state to history
    saveCanvasState();
  };

  // Handle touch events for mobile
  const handleTouchStart = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousedown', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    startDrawing(mouseEvent);
  };

  const handleTouchMove = (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent('mousemove', {
      clientX: touch.clientX,
      clientY: touch.clientY
    });
    draw(mouseEvent);
  };

  const handleTouchEnd = (e) => {
    e.preventDefault();
    stopDrawing();
  };

  // Save canvas as image
  const saveCanvas = () => {
    const canvas = canvasRef.current;
    const dataUrl = canvas.toDataURL('image/png');
    
    if (onSave) {
      onSave(dataUrl);
    } else {
      // Default save behavior - download the image
      const link = document.createElement('a');
      link.download = `neuralnotes-canvas-${new Date().toISOString().slice(0, 10)}.png`;
      link.href = dataUrl;
      link.click();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center p-2 bg-gray-800 rounded-t-lg">
        <div className="flex space-x-2">
          {/* Tool selection */}
          <button 
            onClick={() => setTool('pen')}
            className={`p-2 rounded-md ${tool === 'pen' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            title="Pen"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 19l7-7 3 3-7 7-3-3z"></path>
              <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"></path>
              <path d="M2 2l7.586 7.586"></path>
              <circle cx="11" cy="11" r="2"></circle>
            </svg>
          </button>
          <button 
            onClick={() => setTool('eraser')}
            className={`p-2 rounded-md ${tool === 'eraser' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            title="Eraser"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M20 20H7L3 16c-1.5-1.5-1.5-3.5 0-5l7-7c1.5-1.5 3.5-1.5 5 0l5 5c1.5 1.5 1.5 3.5 0 5l-4 4"></path>
              <path d="M6 11l5 5"></path>
            </svg>
          </button>
          <button 
            onClick={() => setTool('highlighter')}
            className={`p-2 rounded-md ${tool === 'highlighter' ? 'bg-gray-700' : 'hover:bg-gray-700'}`}
            title="Highlighter"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 11l-6 6v3h9l3-3"></path>
              <path d="M22 12l-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"></path>
            </svg>
          </button>
          
          {/* Color selection */}
          <div className="flex items-center space-x-1">
            <input 
              type="color" 
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="w-6 h-6 rounded cursor-pointer"
              title="Color"
            />
            <select 
              value={lineWidth}
              onChange={(e) => setLineWidth(parseInt(e.target.value))}
              className="bg-gray-700 rounded p-1 text-xs"
              title="Line Width"
            >
              <option value="1">Thin</option>
              <option value="2">Medium</option>
              <option value="4">Thick</option>
              <option value="8">Very Thick</option>
            </select>
          </div>
        </div>
        
        <div className="flex space-x-2">
          {/* History controls */}
          <button 
            onClick={undo}
            disabled={historyIndex <= 0}
            className={`p-2 rounded-md ${historyIndex <= 0 ? 'text-gray-500' : 'hover:bg-gray-700'}`}
            title="Undo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button 
            onClick={redo}
            disabled={historyIndex >= history.length - 1}
            className={`p-2 rounded-md ${historyIndex >= history.length - 1 ? 'text-gray-500' : 'hover:bg-gray-700'}`}
            title="Redo"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
          <button 
            onClick={clearCanvas}
            className="p-2 rounded-md hover:bg-gray-700"
            title="Clear"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
              <line x1="10" y1="11" x2="10" y2="17"></line>
              <line x1="14" y1="11" x2="14" y2="17"></line>
            </svg>
          </button>
          <button 
            onClick={saveCanvas}
            className="p-2 rounded-md hover:bg-gray-700"
            title="Save"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
              <polyline points="17 21 17 13 7 13 7 21"></polyline>
              <polyline points="7 3 7 8 15 8"></polyline>
            </svg>
          </button>
        </div>
      </div>
      
      <div className="flex-1 relative bg-gray-900 rounded-b-lg overflow-hidden">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        />
      </div>
    </div>
  );
};

export default DrawingCanvas;
