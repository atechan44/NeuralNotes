import React, { createContext, useContext, useState } from 'react';

// Mock AI responses
const mockResponses = {
  'summarize': 'Here\'s a summary of your note: This note contains key information about your project timeline, important deadlines, and team responsibilities.',
  'ideas': 'Based on your note, here are some ideas:\n1. Consider breaking down the larger tasks into smaller, manageable chunks\n2. Set specific milestones with deadlines\n3. Create a visual representation of your progress',
  'expand': 'I can help expand on your note. Here are some additional points to consider:\n- Include specific metrics for success\n- Add contact information for key stakeholders\n- Consider potential risks and mitigation strategies',
  'default': 'I\'m your NeuralNotes AI assistant. How can I help with your notes today? I can summarize content, suggest ideas, help with formatting, or answer questions.'
};

// Function to generate mock AI responses
const generateMockResponse = (query) => {
  const lowerQuery = query.toLowerCase();
  
  if (lowerQuery.includes('summarize') || lowerQuery.includes('summary')) {
    return mockResponses.summarize;
  } else if (lowerQuery.includes('idea') || lowerQuery.includes('suggest')) {
    return mockResponses.ideas;
  } else if (lowerQuery.includes('expand') || lowerQuery.includes('more')) {
    return mockResponses.expand;
  } else {
    return mockResponses.default;
  }
};

const AIContext = createContext();

export const useAI = () => useContext(AIContext);

export const AIProvider = ({ children }) => {
  const [isAIOpen, setIsAIOpen] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'ai', text: 'Hello! I\'m your NeuralNotes AI assistant. How can I help with your notes today?' }
  ]);
  const [isLoading, setIsLoading] = useState(false);

  const toggleAI = () => {
    setIsAIOpen(!isAIOpen);
  };

  const sendMessage = (text) => {
    // Add user message
    const userMessage = { id: Date.now(), sender: 'user', text };
    setMessages([...messages, userMessage]);
    
    // Simulate AI thinking
    setIsLoading(true);
    
    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponse = { 
        id: Date.now() + 1, 
        sender: 'ai', 
        text: generateMockResponse(text) 
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <AIContext.Provider value={{ 
      isAIOpen, 
      toggleAI, 
      messages, 
      sendMessage,
      isLoading 
    }}>
      {children}
    </AIContext.Provider>
  );
};
