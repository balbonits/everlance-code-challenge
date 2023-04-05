import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getUserDetail } from '../data/api';
import { GithubIcon, TwitterIcon } from '../icons';
import { MapPinIcon, EnvelopeIcon, LinkIcon } from '@heroicons/react/24/solid';

import './UserProfile.css';

// create a Google Maps URL/query using 'location' string.
const generateGoogleMapsUrl = (location) => {
  const formattedLocation = encodeURIComponent(location);
  return `https://www.google.com/maps/search/?api=1&query=${formattedLocation}`;
};

const UserProfile = () => {
  const { username } = useParams();
  const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUserDetail = async () => {
      const userDetails = await getUserDetail(username);
      setUser(userDetails);
    };
    fetchUserDetail();
  }, [username]);
  
  const locationUrl = user.location ? generateGoogleMapsUrl(user.location) : null;
  
  return (
  <div className='user-profile rounded-lg border border-solid border-gray-300 p-4'>
    <div className='user-profile-columns grid grid-cols-2'>
      <div className='user-profile-left-column relative w-full'>
        <img
          className='user-profile-headshot absolute top-0 left-0 rounded-full'
          src={user.avatar_url}
          alt={user.name}
        />
        <h3 className='user-profile-name mt-12 mx-0 text-2xl font-bold'>{user.name}</h3>
        <h4 className='user-profile-handle mt-4'>{user.login}</h4>
        {user.bio && <p className='user-profile-details  mt-4'>{user.bio}</p>}
      </div>
      <div className='user-profile-right-column w-full pt-12'>
        <a
          className='user-profile-github relative pl-7'
          href={user.html_url}
          target='_blank'
          rel='noreferrer'
        >
          <GithubIcon className='absolute top-0 left-0' />
          {user.login}
        </a>
        <UserGithubCounter
          repos={user.public_repos}
          followers={user.followers}
          following={user.following}
        />
      </div>
    </div>
    <div className='user-profile-links grid grid-cols-2 mt-8'>
      <span className='relative w-full'>{(user.location && locationUrl) && 
        <a className='pl-7 text-black hover:text-gray-300' href={locationUrl} target='_blank' rel='noopener noreferrer'>
          <MapPinIcon className='absolute left-0 top-0 text-black w-6 h-auto' />
          {user.location}
        </a>}
      </span>
      <span className='relative w-full'>{user.twitter_username &&
        <a className='pl-7 hover:text-gray-300' href={`https://www.twitter.com/${user.twitter_username}`} target='_blank' rel='noopener noreferrer'>
          <TwitterIcon className='absolute left-0 top-0 w-6 h-auto' />
          {user.twitter_username}
        </a>}
      </span>
      <span className='relative w-full'>{user.email &&
        <a className='pl-7 text-black hover:text-gray-300' href={`mailto:${user.email}`}>
          <EnvelopeIcon className='absolute left-0 top-0  w-6 h-auto' />
          {user.email}
        </a>}
      </span>
      <span className='relative w-full'>{user.blog &&
        <a className='pl-7 text-black hover:text-gray-300' href={user.blog} target='_blank' rel='noopener noreferrer'>
          <LinkIcon className='absolute left-0 top-0 w-6 h-auto' />
          {user.blog}
        </a>}
      </span>
    </div>
  </div>
)};

const UserGithubCounter = ({ repos = 0, followers = 0, following = 0 }) => (
  <div className='user-github-counter grid grid-cols-3 rounded-lg bg-gray-100 mt-4 p-4'>
    <div className='user-github-counter-repos grid grid-row-2 justify-center text-center'>
      <span className='user-github-counter-repos-label text-gray-400'>Repos</span>
      <span className='user-github-counter-repos-count text-3xl mt-2'>
        {repos}
      </span>
    </div>
    <div className='user-github-counter-followers grid grid-row-2 justify-center text-center'>
      <span className='user-github-counter-followers-label text-gray-400'>Followers</span>
      <span className='user-github-counter-followers-count text-3xl mt-2'>
        {followers}
      </span>
    </div>
    <div className='user-github-counter-following grid grid-row-2 justify-center text-center'>
      <span className='user-github-counter-following-label text-gray-400'>Following</span>
      <span className='user-github-counter-following-count text-3xl mt-2'>
        {following}
      </span>
    </div>
  </div>
);



export default UserProfile;
