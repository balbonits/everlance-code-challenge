import React, { useState } from 'react';
import SearchBar from './SearchBar';
import UserResults from './UserResults';

const UserSearch = () => {
  const [users, setUsers] = useState([]);

  return (<>
      <SearchBar onSearch={setUsers} />
      <UserResults users={users} setUsers={setUsers} />
    </>);
};

export default UserSearch;
