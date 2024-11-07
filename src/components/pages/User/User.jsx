import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import RepositoriesList from './RepositoriesList';
import UserProfile from './UserProfile';
import './User.css'; // Import the CSS file

const User = () => {
  const navigate = useNavigate(); // Hook to programmatically navigate
  const { username } = useParams(); // Get the username from the URL
  const [userData, setUserData] = useState(null);
  const [repositories, setRepositories] = useState([]);

  const handleBackClick = () => {
    navigate('/'); // Navigate to the home page
  }
  // Fetch user data when component mounts
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        const user = await userResponse.json();
        setUserData(user);

        const reposResponse = await fetch(user.repos_url); // Fetch repositories
        const repos = await reposResponse.json();
        setRepositories(repos);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <div className="user-container">
      <button className="back-button" onClick={handleBackClick}>
        <FaArrowLeft className="icon" />
      </button>
      <div className="content w-full flex gap-10 shadow-sm">
        {userData && (
          <>
            <div className="flex w-[50%] sticky top-10 bg-light-gray dark:bg-navy p-6 rounded-lg shadow-lg text-center text-blue-grey dark:text-white"><UserProfile/></div>
            <div className="w-[50%] p-4 rounded-lg bg-light-gray dark:bg-gray-800">
              <RepositoriesList/>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default User;
