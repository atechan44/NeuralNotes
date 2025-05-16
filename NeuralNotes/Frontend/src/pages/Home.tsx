import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import NoteCard from '../components/NoteCard';

/**
 * Ana sayfa bileşeni
 */

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
  const [searchQuery, setSearchQuery] = useState('');
  
  return (
    <div className="p-6">
      {/* Arama ve Başlık Alanı */}
      <div className="max-w-4xl mx-auto mb-12 mt-8 md:mt-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-5">{t('app.searchTitle', 'What can I help with?')}</h1>
        
        {/* Arama Çubuğu */}
        <div className="relative max-w-md mx-auto">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('common.search', 'Ask anything')}
            className="w-full py-3 px-4 pl-5 rounded-full bg-neutral-100 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-colors duration-200"
          />
          <div className="absolute right-4 top-1/2 transform -translate-y-1/2 text-neutral-400 dark:text-neutral-500">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        
        {/* Filtreler */}
        <div className="flex flex-wrap justify-center gap-2 mt-5">
          <button className="px-4 py-1.5 bg-neutral-200 text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200 rounded-full text-sm hover:bg-neutral-300 dark:hover:bg-neutral-600 transition-colors duration-200">All</button>
          <button className="px-4 py-1.5 bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 rounded-full text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200">Myself</button>
          <button className="px-4 py-1.5 bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 rounded-full text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200">⭐ Starred</button>
          <button className="px-4 py-1.5 bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300 rounded-full text-sm hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors duration-200">🏷️ Tags</button>
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
              id={note.id}
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
              id={note.id}
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
