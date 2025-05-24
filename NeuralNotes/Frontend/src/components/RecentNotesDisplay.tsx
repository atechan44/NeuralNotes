import React, { useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import NoteCard from './NoteCard';
import SearchBar from './SearchBar';
import TagFilter from './TagFilter';
import { ChevronDown } from 'lucide-react';
import { useLayoutMode } from '../contexts/LayoutModeContext';
import ThemeToggle from './ThemeToggle';
import LayoutModeSwitcher from './LayoutModeSwitcher';

// Mock data for notes - replace with actual data fetching later
const mockNotes = [
  { id: '1', title: 'and Morty', content: 'Sezon 2 bölüm 5, sondan 10dk kala ve 8:56 öncesi (buza...)', date: 'May 3', imageUrl: 'https://placehold.co/600x400/202124/FFF?text=R%26M', tags: ['tv-show', 'animation'], isStarred: true },
  { id: '2', title: 'Nokron', content: 'Elden Ring Nokron eternal city.', date: 'April 22', imageUrl: 'https://placehold.co/600x400/2a2b2d/FFF?text=Nokron', tags: ['game', 'elden-ring'], isStarred: true },
  { id: '3', title: 'Kendine İnanç', content: 'En büyük yolculuk, kendine duyduğun inancın sınırlarını aşmaktır. Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quod.', date: 'January 6', tags: ['self-improvement'], isStarred: true },
  { id: '4', title: 'Kardeşime', content: 'Kendi müzik albüm resim albümlerini çizmesini söyle. December 21, 2024', date: 'December 21', imageUrl: 'https://placehold.co/600x400/303134/FFF?text=Grimes', tags: ['music', 'art'] },
  { id: '5', title: 'Rezonans ve İnsan', content: 'Rezonans insan, insan vücuduna nasıl etki eder?', date: 'March 26', tags: ['science', 'health'] },
  { id: '6', title: 'GameDev Scratch', content: 'Karakter hareket sistemi prototipi. Sprite animasyonlarını ekle. Basit çarpışma algısı test et.', date: 'September 28', tags: ['gamedev', 'programming'] },
  { id: '7', title: 'Algoritma', content: 'Kapsülleme ile ilgili güzel banka yönetim uygulaması yap.', date: 'April 30', tags: ['programming', 'study'] },
  { id: '8', title: 'Discovery EU', content: 'No text.', date: 'April 13', imageUrl: 'https://placehold.co/600x400/3a3b3d/FFF?text=Discovery', tags: ['space', 'exploration'] },
  { id: '9', title: 'Andromeda Galaxy', content: '2.2 milyon ışık yılı uzak...', date: 'February 23', imageUrl: 'https://placehold.co/600x400/404144/FFF?text=Andromeda', tags: ['space', 'astronomy'] },
  { id: '10', title: 'Egzersiz Rutin', content: 'Pazartesi: Göğüs + Triceps. Çarşamba: Sırt + Biceps. Cuma: Bacak + Omuz. Pazar: Karın + Ön kol.', date: 'December 17', tags: ['fitness', 'health'] },
  { id: '11', title: 'Haftalık Alışveriş', content: 'Süt, yumurta, tam buğday ekmek, avokado, yoğurt.', date: 'October 18', tags: ['shopping', 'personal'] },
  { id: '12', title: 'API Dökümantasyonu', content: 'GET /notes -> Tüm notları döner.', date: 'November 13', tags: ['work', 'programming'] },
  { id: '13', title: 'Skull Knight', content: 'Yaklaşık 1000 yaşında.', date: 'November 13', imageUrl: 'https://placehold.co/600x400/4a4b4d/FFF?text=Berserk', tags: ['manga', 'berserk'] },
];

const ITEMS_PER_LOAD = 8;

const RecentNotesDisplay: React.FC = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [displayedNotes, setDisplayedNotes] = useState(mockNotes.slice(0, ITEMS_PER_LOAD));
  const [loadedCount, setLoadedCount] = useState(ITEMS_PER_LOAD);
  const [allNotes, setAllNotes] = useState(mockNotes);
  const { layoutMode, setLayoutMode } = useLayoutMode();

  const availableTags = Array.from(new Set(allNotes.flatMap(note => note.tags ?? []))).map(tag => ({id: tag, label: t(`tags.${tag}`, tag)}));

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const clearSearch = () => {
    setSearchTerm('');
  };

  const handleTagToggle = (tagId: string) => {
    setSelectedTags(prev => 
      prev.includes(tagId) ? prev.filter(t => t !== tagId) : [...prev, tagId]
    );
  };

  const loadMoreNotes = useCallback(() => {
    if (layoutMode === 'masonry') {
      const newLoadedCount = Math.min(allNotes.length, loadedCount + ITEMS_PER_LOAD * 2);
      setDisplayedNotes(allNotes.slice(0, newLoadedCount));
      setLoadedCount(newLoadedCount);
    } else {
      const newLoadedCount = loadedCount + ITEMS_PER_LOAD;
      setDisplayedNotes(allNotes.slice(0, newLoadedCount));
      setLoadedCount(newLoadedCount);
    }
  }, [loadedCount, allNotes, layoutMode]);

  useEffect(() => {
    let filtered = mockNotes;
    if (searchTerm) {
      filtered = filtered.filter(note => 
        note.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
        (note.content && note.content.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    if (selectedTags.length > 0) {
      filtered = filtered.filter(note => 
        selectedTags.every(tag => note.tags?.includes(tag))
      );
    }
    setAllNotes(filtered);
    const initialLoadCount = layoutMode === 'masonry' ? Math.min(filtered.length, ITEMS_PER_LOAD * 2) : ITEMS_PER_LOAD;
    setDisplayedNotes(filtered.slice(0, initialLoadCount));
    setLoadedCount(initialLoadCount);
  }, [searchTerm, selectedTags, layoutMode]);

  const notesContainerClass = layoutMode === 'grid' 
    ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
    : "columns-1 sm:columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-6 space-y-6";

  return (
    <section className="w-full max-w-full mx-auto py-8 px-4 md:px-6 lg:px-8">
      <div className="mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto items-center">
          <div className="w-full sm:w-auto sm:flex-shrink-0">
            <SearchBar searchTerm={searchTerm} onSearchChange={handleSearchChange} onClearSearch={clearSearch} />
          </div>
          <TagFilter availableTags={availableTags} selectedTags={selectedTags} onSelectTag={handleTagToggle} />
        </div>
      </div>
      
      <h2 className="text-2xl font-semibold text-neutral-700 dark:text-neutral-200 mb-6 text-left">
        {t('notes.recentNotes', 'Recent Notes')}
      </h2>

      {displayedNotes.length > 0 ? (
        <motion.div 
          className={notesContainerClass}
          key={layoutMode}
        >
          <AnimatePresence>
            {displayedNotes.map(note => (
              <NoteCard 
                key={note.id} 
                {...note} 
                layoutMode={layoutMode}
                onClick={() => console.log('Clicked note:', note.id)}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      ) : (
        <p className="text-center text-neutral-500 dark:text-neutral-400 py-10">
          {t('notes.noNotesFound', 'No notes found matching your criteria.')}
        </p>
      )}

      {loadedCount < allNotes.length && (
        <div className="text-center mt-10">
          <motion.button
            onClick={loadMoreNotes}
            className="bg-primary-500 hover:bg-primary-600 text-white font-semibold py-2.5 px-8 rounded-lg flex items-center justify-center mx-auto gap-2 transition-colors duration-200 shadow-md hover:shadow-lg"
            whileHover={{ scale: 1.03, y: -2 }}
            whileTap={{ scale: 0.97, y: 0 }}
          >
            {t('common.loadMore', 'Load More')}
            <ChevronDown size={20} />
          </motion.button>
        </div>
      )}
    </section>
  );
};

export default RecentNotesDisplay; 