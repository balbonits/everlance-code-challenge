import React, { useCallback } from 'react';
import { searchUsers } from '../data/api';
import { GithubIcon } from '../icons';

import './UserResults.css';

const UserResults = ({ users = [], setUsers }) => {

  /**
   * handleLoadMore - handles "Load More" functionality.
   * Fetches the next set of users based on current search query and page,
   * then adds them to the 'users' state.
   *
   * @async
   * @function
   * @param {string} query - 'users' search query.
   * @param {number} currentPage - current page number for search results.
   * @param {function} setUsers - update 'users' state with new 'users'.
   * @param {function} setCurrentPage - update current page state.
   */
  const handleLoadMore = useCallback(async () => {
    const currentPage = Math.ceil(users.length / 10);
    const nextPage = currentPage + 1;
    const result = await searchUsers(users[0].login, nextPage);

    setUsers((prevUsers) => [...prevUsers, ...result.items]);
  }, [users, setUsers]);

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
        {users.length > 0 && (
          <button 
            className='user-results-loadMore absolute bottom-0 right-0 trasnform translate-y-10 border border-gray-300 rounded-md hover:bg-gray-300'
            onClick={handleLoadMore}
            style={{ cursor: 'pointer' }}
          >Load more</button>
        )}
      </div>
    </>
  );
};

export default UserResults;
