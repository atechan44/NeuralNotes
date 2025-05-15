import React from 'react'
import NoteCard from '../components/NoteCard'

const Home: React.FC = () => {
  // Görsel ile uyumlu örnek veriler
  const notes = [
    {
      id: '1',
      title: 'Rick and Morty',
      content: 'Sezon 2 bölüm 5\nsondan 10dk kala ve\n8:56 öncesi (buza...',
      date: 'May 3',
      starred: true
    },
    {
      id: '2',
      title: 'Nokron',
      content: 'Karanlık yerde var olan...',
      date: '22:43',
      starred: true
    },
    {
      id: '3', 
      title: 'Kendine İnanç',
      content: 'En büyük yolculuk,\nkendine duyduğun inancın\nsınırlarını aşmaktır.',
      date: 'January 6',
      starred: true
    },
    {
      id: '4',
      title: 'Kardeşime',
      content: 'Kendi müzik albüm resim albümlerini çizmesini söyle',
      date: 'December 21, 2024'
    },
    {
      id: '5',
      title: 'Algoritma',
      content: 'Kapsülleme ile ilgili güzel banka yönetim uygulaması yap',
      date: 'April 30'
    },
    {
      id: '6',
      title: 'Egzersiz Rutin',
      content: 'Pazartesi: Göğüs + Triceps\nÇarşamba: Sırt + Biceps\nCuma: Bacak + Omuz\nPazar: Karın + Ön kol',
      date: 'December 17, 2024'
    },
    {
      id: '7',
      title: 'Andromeda Galaxy',
      content: '2.2 milyon ışık yılı uzak...',
      date: 'February 23'
    },
    {
      id: '8',
      title: 'Rezonans ve İnsan',
      content: 'Rezonans insan vücuduna nasıl etki eder?',
      date: 'March 26'
    },
    {
      id: '9',
      title: 'Discovery eu',
      content: 'No text',
      date: 'April 13'
    },
    {
      id: '10',
      title: 'Haftalık Alışveriş',
      content: 'Süt, yumurta, tam buğday ekmek, avokado, yoğurt.',
      date: 'October 18'
    },
    {
      id: '11',
      title: 'API Dökümantasyon',
      content: 'GET /notes → Tüm notları döner',
      date: 'April 30'
    }
  ]

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {notes.map(note => (
        <NoteCard
          key={note.id}
          title={note.title}
          content={note.content}
          date={note.date}
          starred={note.starred}
        />
      ))}
      {notes.length === 0 && (
        <p className="text-gray-400">Henüz hiç notunuz yok.</p>
      )}
    </div>
  )
}

export default Home 