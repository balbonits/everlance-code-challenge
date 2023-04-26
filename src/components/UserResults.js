import React, { useCallback, useState } from 'react';
import { searchUsers } from '../data/api';
import { GithubIcon } from '../icons';

import './UserResults.css';

const UserResults = ({ users = [], setUsers }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePageChange = useCallback(async (pageNumber) => {
    setCurrentPage(pageNumber);
    const result = await searchUsers(users[0].login, pageNumber);
    setUsers(result.items);
  }, [users, setUsers, setCurrentPage]);

  const pageSize = 10;
  const totalUsers = users.length;
  const totalPages = Math.ceil(totalUsers / pageSize);

  const getPageNumbers = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return (
    <>
      <div className='user-results relative'>
        <div className='user-results-items grid grid-cols-3 gap-6 mb-12'>
          {users.map((user, idx) => (
          <div className='user-results-item rounded-lg border border-gray-300 overflow-hidden' key={idx}>
            <div className='user-results-item-head '>
              <a className='flex items-center my-4' href={`/user/${user.login}`}>
                <img
                  className='user-results-item-head-thumb h-12 w-12 rounded-full mr-4'
                  src={user.avatar_url}
                  alt={user.login}
                />
                <h2 className='user-results-item-head-name text-xl'>{user.login}</h2>
              </a>
            </div>
            <div className='user-results-item-links flex items-center justify-between px-4 py-2'>
              <a className='user-results-item-link-github flex items-center' href={user.html_url}>
                <GithubIcon />
              </a>
              <a
                className='user-results-item-link-profile text-xs font-medium text-cyan-600 hover:text-gray-300'
                href={`/user/${user.login}`}>
                View Profile
              </a>
            </div>
          </div>
          ))}
        </div>
        <div className='user-results-pagination flex justify-center'>
          {pageNumbers.map((number) => (
            <button
              key={number}
              className={`user-results-pagination-button border border-gray-300 rounded-md px-4 py-2 mx-1 ${
                number === currentPage ? 'bg-gray-300' : ''
              }`}
              onClick={() => handlePageChange(number)}
              style={{ cursor: 'pointer' }}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default UserResults;
