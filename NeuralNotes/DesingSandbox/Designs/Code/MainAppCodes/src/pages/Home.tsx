/**
 * Boş ana sayfa bileşeni
 */
import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import NoteCard from '../components/NoteCard';

// Example notes for demonstration
const EXAMPLE_NOTES = [
  {
    id: '1',
    title: 'Rick and Morty',
    content: 'Sezon 2 bölüm 5 sondan 10dk kala ve 8:56 öncesi (buza...',
    date: 'May 3',
    tags: ['TV Show']
  },
  {
    id: '2',
    title: 'Nokron',
    content: 'Karanlık yerde var olan...',
    date: '22:43',
    tags: ['Game']
  },
  {
    id: '3',
    title: 'Kendine İnanç',
    content: 'En büyük yolculuk, kendine duyduğun inancın sınırlarını aşmaktır.',
    date: 'January 6',
    tags: ['Personal']
  },
  {
    id: '4',
    title: 'Kardeşime',
    content: 'Kendi müzik albüm resim albümlerini çizmesini söyle',
    date: 'December 21, 2024',
    tags: ['Family']
  }
];

// Second row of notes
const MORE_NOTES = [
  {
    id: '5',
    title: 'Algoritma',
    content: 'Kapsülleme ile ilgili güzel banka yönetim uygulaması yap',
    date: 'April 30',
    tags: ['Programming']
  },
  {
    id: '6',
    title: 'Egzersiz Rutin',
    content: 'Pazartesi: Göğüs + Triceps\nÇarşamba: Sırt + Biceps\nCuma: Bacak + Omuz\nPazar: Karın + Ön kol',
    date: 'December 17, 2024',
    tags: ['Fitness']
  },
  {
    id: '7',
    title: 'Andromeda Galaxy',
    content: '2.2 milyon ışık yılı uzak...',
    date: 'February 23',
    tags: ['Astronomy']
  },
  {
    id: '8',
    title: 'Rezonans ve İnsan',
    content: 'Rezonans insan vücuduna nasıl etki eder?',
    date: 'March 26',
    tags: ['Science']
  }
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <div className="p-6">
      {/* Arama ve Başlık Alanı */}
      <div className="max-w-4xl mx-auto mb-12 mt-12 text-center">
        <h1 className="text-4xl font-bold mb-5">What can I help with?</h1>
        
        {/* Arama Çubuğu */}
        <div className="relative max-w-md mx-auto">
          <input 
            type="text" 
            placeholder="Ask anything" 
            className="w-full py-3 px-4 pl-5 rounded-full bg-gray-100 dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        
        {/* Filtreler */}
        <div className="flex justify-center gap-2 mt-5">
          <button className="px-4 py-1.5 bg-gray-200 text-gray-800 dark:bg-zinc-800 dark:text-gray-200 rounded-full text-sm transition-colors duration-200">All</button>
          <button className="px-4 py-1.5 bg-gray-300 text-gray-800 dark:bg-zinc-900 dark:text-gray-200 rounded-full text-sm transition-colors duration-200">Myself</button>
          <button className="px-4 py-1.5 bg-gray-300 text-gray-800 dark:bg-zinc-900 dark:text-gray-200 rounded-full text-sm transition-colors duration-200">⭐ Starred</button>
          <button className="px-4 py-1.5 bg-gray-300 text-gray-800 dark:bg-zinc-900 dark:text-gray-200 rounded-full text-sm transition-colors duration-200">🏷️ Tags</button>
        </div>
      </div>
      
      {/* İlk Satır Notlar Grid'i */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto mb-5"
      >
        {EXAMPLE_NOTES.map((note) => (
          <motion.div key={note.id} layout>
            <NoteCard
              title={note.title}
              content={note.content}
              date={note.date}
              tags={note.tags}
              onClick={() => console.log(`Note ${note.id} clicked`)}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* İkinci Satır Notlar Grid'i */}
      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 max-w-7xl mx-auto"
      >
        {MORE_NOTES.map((note) => (
          <motion.div key={note.id} layout>
            <NoteCard
              title={note.title}
              content={note.content}
              date={note.date}
              tags={note.tags}
              onClick={() => console.log(`Note ${note.id} clicked`)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Home;
