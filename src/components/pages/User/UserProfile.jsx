import React, { useEffect } from 'react';
import { FaMapMarkerAlt, FaLink, FaGithub, FaTwitter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData, fetchUserRepos } from '../../../features/user/userSlice';
import { useParams } from 'react-router-dom';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { userData, repositories, loading, error } = useSelector((state) => state.user);
  
  const { username } = useParams();

  useEffect(() => {
    if (username) {
      dispatch(fetchUserData(username));
      dispatch(fetchUserRepos(username));
    }
  }, [dispatch, username]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-lg w-full bg-light-gray dark:bg-navy p-6 rounded-lg shadow-lg text-center text-blue-grey dark:text-white">
      <div className="flex justify-center mb-4">
        <div className="rounded-full overflow-hidden w-24 h-24 bg-gray-300 dark:bg-gray-700">
          <img
            src={userData?.avatar_url}
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <h2 className="text-2xl font-bold dark:text-white">{username}</h2>
      <p className="text-blue text-lg">@{userData?.login}</p>
      <p className="mt-2 text-gray dark:text-gray-400">{userData?.bio || 'This profile has no bio'}</p>

      <div className="flex flex-col sm:flex-row sm:justify-between bg-gray-100 dark:bg-black-light-mode mt-4 p-4 rounded-lg">
        <div className="flex flex-col items-center mb-4 sm:mb-0">
          <p className="text-gray dark:text-gray-400">Repos</p>
          <p className="font-bold text-lg dark:text-white">
            {repositories[username]?.length || 0}
          </p> {/* Display repository count */}
        </div>
        <div className="flex flex-col items-center mb-4 sm:mb-0">
          <p className="text-gray dark:text-gray-400">Followers</p>
          <p className="font-bold text-lg dark:text-white">{userData?.followers}</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="text-gray dark:text-gray-400">Following</p>
          <p className="font-bold text-lg dark:text-white">{userData?.following}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        {userData?.location && (
          <p className="flex items-center justify-center">
            <FaMapMarkerAlt className="mr-2 text-blue" /> {userData?.location}
          </p>
        )}
        {userData?.blog && (
          <p className="flex items-center justify-center">
            <FaLink className="mr-2 text-blue" />
            <a href={userData?.blog} target="_blank" rel="noopener noreferrer" className="text-blue underline">
              {userData?.blog}
            </a>
          </p>
        )}
        <p className="flex items-center justify-center">
          <FaTwitter className="mr-2 text-blue" /> {userData?.twitter_username || 'Not Available'}
        </p>
        <p className="flex items-center justify-center">
          <FaGithub className="mr-2 text-blue" /> @{userData?.login}
        </p>
      </div>

      <div className="mt-4 text-gray dark:text-gray-400">
        <p className="flex items-center justify-center">
          <span>Joined GitHub on </span>
          <strong className="ml-1">{new Date(userData?.created_at).toLocaleDateString()}</strong>
        </p>
      </div>
    </div>
  );
};

export default UserProfile;
