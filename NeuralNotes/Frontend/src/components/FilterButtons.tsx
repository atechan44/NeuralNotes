import { useState } from 'react';

/**
 * Filtre butonları bileşeni
 * Basit filtre seçenekleri sunar
 */
const FilterButtons = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');

  const filters = [
    { id: 'all', label: 'All' },
    { id: 'myself', label: 'Myself' },
    { id: 'starred', label: 'Starred', icon: '★' },
    { id: 'shared', label: 'Shared' }
  ];

  return (
    <div className="flex space-x-2 py-2">
      {filters.map(filter => (
        <button
          key={filter.id}
          onClick={() => setSelectedFilter(filter.id)}
          className={`px-3 py-1.5 text-sm rounded-full flex items-center ${
            selectedFilter === filter.id
              ? 'bg-gray-700 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          {filter.icon && <span className="mr-1">{filter.icon}</span>}
          {filter.label}
        </button>
      ))}
    </div>
  );
};

export default FilterButtons; 