import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Note } from '../hooks/useNotes';
import NoteCard from './NoteCard';

interface NoteGridProps {
  notes: Note[];
}

// Örnek veriler
const SAMPLE_NOTES = [
  {
    id: '1',
    title: 'Rick and Morty',
    content: 'Sezon 2 bölüm 5 sondan 10dk kala ve 8:56 öncesi (buza...',
    date: 'May 3',
    starred: true,
    thumbnail: null
  },
  {
    id: '2',
    title: 'Nokron',
    content: 'Karanlık şehir görüntüsü, sualtı benzeri',
    date: '22:43',
    starred: true,
    thumbnail: 'https://via.placeholder.com/300x200/111/333?text=Nokron'
  },
  {
    id: '3',
    title: 'Kendine İnanç',
    content: 'En büyük yolculuk, kendine duyduğun inancın sınırlarını aşmaktır.',
    date: 'January 6',
    starred: true,
    thumbnail: null
  },
  {
    id: '4',
    title: 'Andromeda Galaxy',
    content: '2.2 milyon ışık yılı uzak...',
    date: 'February 23',
    thumbnail: 'https://via.placeholder.com/300x200/111/333?text=Galaxy'
  },
  {
    id: '5',
    title: 'Algoritma',
    content: 'Kapsülleme ile ilgili güzel banka yönetim uygulaması yap',
    date: 'April 30',
    thumbnail: null
  }
];

/**
 * Not grid bileşeni
 * Not kartlarını grid düzeninde görüntüler
 */
const NoteGrid = () => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      {SAMPLE_NOTES.map(note => (
        <div key={note.id}>
          <NoteCard
            title={note.title}
            content={note.content}
            date={note.date}
            thumbnail={note.thumbnail || undefined}
          />
        </div>
      ))}
    </div>
  );
};

export default NoteGrid; 