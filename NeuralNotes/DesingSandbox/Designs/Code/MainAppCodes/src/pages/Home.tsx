import { useState } from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Ana sayfa bileşeni
 */
const Home = () => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState('');

  // Sample notes data matching the screenshot
  const notes = [
    {
      id: '1',
      title: 'Rick and Morty',
      content: 'Sezon 2 bölüm 5 sondan 10dk kala ve 8:56 öncesi (kızla...)',
      category: 'TV Show',
      date: 'May 4'
    },
    {
      id: '2',
      title: 'Nokron',
      content: 'Karanlık yerde var olan...',
      category: 'Game',
      date: '22:45'
    },
    {
      id: '3',
      title: 'Kendine İnanç',
      content: 'En büyük yolculuk, kendine düşdüğün inançın sınırları geçmektir.',
      category: 'Personal',
      date: 'January 6'
    },
    {
      id: '4',
      title: 'Kardeşime',
      content: 'Kendi müzik albüm resim albümlerini çırmemi söyle',
      category: 'Family',
      date: 'December 21, 2024'
    },
    {
      id: '5',
      title: 'Algoritma',
      content: 'Kapitalizme ile ilgili güzel banka yönetim uygulaması yap',
      category: 'Programming',
      date: 'April 30'
    },
    {
      id: '6',
      title: 'Egzersiz Rutin',
      content: 'Pazartesi: Göğüs + Triceps Çarşamba: Sırt + Biceps Cuma: Bacak + Omuz Pazar: Kol + üst kol',
      category: 'Fitness',
      date: 'December 17, 2024'
    },
    {
      id: '7',
      title: 'Andromeda Galaxy',
      content: '2.5 milyon ışık yılı uzak...',
      category: 'Astronomy',
      date: 'February 23'
    },
    {
      id: '8',
      title: 'Rezonans ve İnsan',
      content: 'Rezonans insan vücuduna nasıl etki eder?',
      category: 'Science',
      date: 'March 26'
    },
  ];

  return (
    <div className="min-h-screen w-full bg-black text-white p-6">
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">What can I help with?</h1>
        
        {/* Search */}
        <div className="max-w-md mx-auto relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask anything"
            className="w-full bg-[#111] rounded-full py-2 px-4 pl-5 pr-10 text-white focus:outline-none"
          />
          <button className="absolute right-3 top-2.5">
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center gap-4 mb-6">
          <button className="px-4 py-1 bg-[#333] rounded-full text-sm">All</button>
          <button className="px-4 py-1 rounded-full text-sm text-gray-400">Myself</button>
          <button className="px-4 py-1 rounded-full text-sm text-gray-400 flex items-center gap-1">
            <span className="text-yellow-400">★</span> Starred
          </button>
          <button className="px-4 py-1 rounded-full text-sm text-gray-400 flex items-center gap-1">
            <span className="text-orange-400">🏷️</span> Tags
          </button>
        </div>
      </header>

      {/* Notes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {notes.map((note) => (
          <div key={note.id} className="bg-[#111] rounded-lg p-4 relative group cursor-pointer">
            {/* Star button */}
            <button className="absolute top-2 right-2 text-yellow-400">
              ★
            </button>
            
            <h3 className="text-lg font-semibold mb-1">{note.title}</h3>
            <p className="text-gray-400 text-sm mb-3 line-clamp-2">{note.content}</p>
            
            <div className="flex justify-between items-center mt-auto">
              <span className="text-xs px-2 py-0.5 bg-[#222] rounded-md">{note.category}</span>
              <span className="text-xs text-gray-500">{note.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
