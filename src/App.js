import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { UserSearch, UserProfile } from './components';

import './App.css';

const App = () => {
  return (
    <Router>
      <div className='app'>
        <header className='app-header flex justify-start items-center h-16 shadow-md px-4 py-2'>
          <a 
            className='app-header-logo flex h-3/4 my-auto'
            href='https://www.everlance.com'
            target='_blank'
            rel='noreferrer'
            >
              <img
                className='h-full'
                src='https://assets.website-files.com/6019e7e5c68507850121a341/62878e69bbf29e103dfeaa72_Everlance-logo.png' 
                alt='Everlance'
              />
          </a>
        </header>
        <main className='app-main max-w-5xl mx-auto my-8 px-6 box-border'>
          <Routes>
            <Route path="/user/:username" element={<UserProfile  />} />
            <Route
              path="/"
              element={<UserSearch />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
