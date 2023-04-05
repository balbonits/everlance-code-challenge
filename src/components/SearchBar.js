import React, { useState, useCallback } from 'react';
import { searchUsers } from '../data/api';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [search, setSearch] = useState('');

  const handleSearch = useCallback(async () => {
    const result = await searchUsers(search, 1);
    if (Array.isArray(result.items)) {
      onSearch(result.items);
    } else {
      onSearch([]);
    }
  }, [search, onSearch]);
  
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' || e.keyCode === 13) {
      handleSearch();
    }
  };
  
  return (
    <div className='search-bar flex justify-between items-end mb-6'>
        <h2 className='search-bar-head w-auto px-2 text-4xl font-bold'>Github Users</h2>
        <div className='search-bar-fields w-1/3 flex relative leading-none justify-end'>
          <input
              className='search-bar-field w-full pl-6 border border-gray-300 leading-loose focus:border-blue-300 focus:outline-none'
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={handleKeyPress}
              placeholder="Search for users..."
          />
          <button
              className='search-bar-button absolute top-0 left-1 transform translate-y-1/2'
              onClick={handleSearch}
          >
              <MagnifyingGlassIcon className='text-gray-300 w-4 h-4' />
          </button>
        </div>
    </div>
  );
};

export default SearchBar;
