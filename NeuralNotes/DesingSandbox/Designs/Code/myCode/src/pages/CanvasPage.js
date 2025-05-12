import React, { useState } from 'react';
import DrawingCanvas from '../components/DrawingCanvas';
import { useTheme } from '../contexts/ThemeContext';

const CanvasPage = () => {
  const { darkMode } = useTheme();
  const [savedCanvases, setSavedCanvases] = useState([]);
  const [showGallery, setShowGallery] = useState(false);

  const handleSaveCanvas = (dataUrl) => {
    const newCanvas = {
      id: Date.now(),
      dataUrl,
      createdAt: new Date().toISOString()
    };
    
    setSavedCanvases([newCanvas, ...savedCanvases]);
    
    // Show success notification
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg
                            transform transition-all duration-500 ease-in-out translate-y-0 opacity-100`;
    notification.textContent = 'Canvas saved successfully!';
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.add('translate-y-10', 'opacity-0');
      setTimeout(() => {
        document.body.removeChild(notification);
      }, 500);
    }, 3000);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }).format(date);
  };

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Canvas</h1>
          <button
            onClick={() => setShowGallery(!showGallery)}
            className={`px-4 py-2 rounded-md ${darkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-white hover:bg-gray-200'} transition-colors duration-200`}
          >
            {showGallery ? 'Back to Canvas' : 'View Gallery'}
          </button>
        </div>

        {showGallery ? (
          <div>
            <h2 className="text-xl font-semibold mb-4">Saved Canvases</h2>
            {savedCanvases.length === 0 ? (
              <div className={`p-8 text-center rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
                <p className="text-gray-500">No saved canvases yet. Start drawing to create one!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {savedCanvases.map((canvas) => (
                  <div
                    key={canvas.id}
                    className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} transition-transform duration-200 hover:scale-105`}
                  >
                    <div className="relative aspect-video">
                      <img
                        src={canvas.dataUrl}
                        alt={`Canvas ${formatDate(canvas.createdAt)}`}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div className="p-4">
                      <p className="text-sm text-gray-500">{formatDate(canvas.createdAt)}</p>
                      <div className="flex justify-end mt-2">
                        <a
                          href={canvas.dataUrl}
                          download={`canvas-${new Date(canvas.createdAt).toISOString().slice(0, 10)}.png`}
                          className="text-blue-500 hover:text-blue-600 mr-4"
                        >
                          Download
                        </a>
                        <button
                          onClick={() => {
                            setSavedCanvases(savedCanvases.filter((c) => c.id !== canvas.id));
                          }}
                          className="text-red-500 hover:text-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className={`rounded-lg overflow-hidden shadow-lg ${darkMode ? 'bg-gray-800' : 'bg-white'}`}>
            <div className="h-[calc(100vh-12rem)]">
              <DrawingCanvas onSave={handleSaveCanvas} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CanvasPage;
