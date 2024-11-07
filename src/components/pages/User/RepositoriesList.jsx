import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Repositories.css';
import { fetchUserRepos } from '../../../features/user/userSlice';
import { useParams } from 'react-router-dom';

const RepositoriesList = () => {
  // Get username from URL params
  const { username } = useParams(); // Destructure to get 'username' directly
  console.log(username); // Check if username is being received correctly

  const dispatch = useDispatch();

  useEffect(() => {
    if (username) {
      dispatch(fetchUserRepos(username)); // Fetch repositories for the specific user
    }
  }, [dispatch, username]);

  // Select repositories for the specific username from Redux store
  const repositories = useSelector((state) => state.user.repositories[username] || []);

  return (
    <div className="">
      {repositories.length > 0 ? (
        repositories.map((repo, index) => (
          <div key={index} className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow-lg">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{repo.name}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{repo.description}</p>
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline mt-2 block dark:text-blue-400"
            >
              View Repository
            </a>
          </div>
        ))
      ) : (
        <p className="text-gray-600 dark:text-gray-300">No repositories found.</p>
      )}
    </div>
  );
};

export default RepositoriesList;
