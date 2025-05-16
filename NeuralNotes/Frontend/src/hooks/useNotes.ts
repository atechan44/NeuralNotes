import { useState } from 'react';

// Not tipi tanımlaması
export interface Note {
  id: string;
  title: string;
  content: string;
  date: string;
  tags: string[];
}

// Sıralama seçenekleri
export type SortOption = 'newest' | 'oldest' | 'alphabetical' | 'lastUpdated';

/**
 * Notları yönetmek için hook
 * Şimdilik mock veri kullanıyor, ileride API'ye bağlanacak
 */
export function useNotes() {
  // Örnek notlar (mock veri)
  const mockNotes: Note[] = [
    {
      id: '1',
      title: 'React Hooks',
      content: 'useEffect, useState ve useContext hook\'larının kullanımı hakkında notlar.',
      date: new Date().toISOString(),
      tags: ['react', 'hooks', 'frontend']
    },
    {
      id: '2',
      title: 'Tailwind CSS İpuçları',
      content: 'Tailwind CSS ile responsive tasarım ve koyu tema desteği ekleme üzerine ipuçları.',
      date: new Date(Date.now() - 86400000).toISOString(), // 1 gün önce
      tags: ['css', 'tailwind', 'frontend']
    },
    {
      id: '3',
      title: 'TypeScript Tipleri',
      content: 'TypeScript\'te generic tiplerin kullanımı ve utility type\'lar hakkında.',
      date: new Date(Date.now() - 172800000).toISOString(), // 2 gün önce
      tags: ['typescript', 'frontend']
    },
    {
      id: '4',
      title: 'Framer Motion Animasyonları',
      content: 'React uygulamalarında Framer Motion ile performanslı animasyonlar oluşturma.',
      date: new Date(Date.now() - 259200000).toISOString(), // 3 gün önce
      tags: ['animation', 'react', 'frontend']
    },
    {
      id: '5',
      title: 'CI/CD Pipeline Kurulumu',
      content: 'GitHub Actions kullanarak otomatik test ve deployment pipeline\'ı oluşturma.',
      date: new Date(Date.now() - 345600000).toISOString(), // 4 gün önce 
      tags: ['devops', 'github', 'ci-cd']
    }
  ];

  // State tanımlamaları
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  /**
   * Yeni not ekleme
   */
  const addNote = (note: Omit<Note, 'id' | 'date'>) => {
    const newNote = {
      ...note,
      id: Math.random().toString(36).substring(2, 9), // Basit ID oluşturma
      date: new Date().toISOString()
    };

    setNotes([newNote, ...notes]);
    return newNote;
  };

  /**
   * Not silme
   */
  const deleteNote = (id: string) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  /**
   * Not güncelleme
   */
  const updateNote = (id: string, updatedNote: Partial<Omit<Note, 'id' | 'date'>>) => {
    setNotes(
      notes.map(note => 
        note.id === id 
          ? { 
              ...note, 
              ...updatedNote,
              date: new Date().toISOString() // Güncellenme tarihini güncelle
            } 
          : note
      )
    );
  };

  /**
   * Not detayını getirme
   */
  const getNote = (id: string) => {
    return notes.find(note => note.id === id) || null;
  };

  /**
   * Notları filtreleme
   */
  const filterNotes = (searchTerm: string, tag: string = 'all') => {
    return notes.filter(note => {
      // Etiket filtresi
      const tagMatch = tag === 'all' || note.tags.includes(tag);
      
      // Arama filtresi
      const searchMatch = !searchTerm || 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
        note.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
      
      return tagMatch && searchMatch;
    });
  };

  /**
   * Notları sıralama
   */
  const sortNotes = (notes: Note[], sortBy: SortOption = 'newest') => {
    const sortedNotes = [...notes];
    
    switch (sortBy) {
      case 'newest':
        return sortedNotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      case 'oldest':
        return sortedNotes.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      case 'alphabetical':
        return sortedNotes.sort((a, b) => a.title.localeCompare(b.title));
      case 'lastUpdated':
        return sortedNotes.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      default:
        return sortedNotes;
    }
  };

  return {
    notes,
    loading,
    error,
    addNote,
    deleteNote,
    updateNote,
    getNote,
    filterNotes,
    sortNotes
  };
}

export default useNotes;
