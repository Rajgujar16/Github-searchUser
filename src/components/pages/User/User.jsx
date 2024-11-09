import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import RepositoriesList from './RepositoriesList';
import UserProfile from './UserProfile';
import './User.css'; 

const User = () => {
  const navigate = useNavigate(); 

  const handleBackClick = () => {
    navigate('/'); 
  }

  return (
    <div className="user-container p-4 md:p-8">
      <button className="back-button mb-4 md:mb-6" onClick={handleBackClick}>
        <FaArrowLeft className="icon" />
      </button>
      <div className="content flex flex-col lg:flex-row gap-4 lg:gap-10">
        <div className="xl:w-1/2 xl:sticky xl:top-10 bg-light-gray dark:bg-navy p-6 rounded-lg shadow-lg text-center text-blue-grey dark:text-white">
          <UserProfile />
        </div>
        <div className="xl:w-1/2 p-4 rounded-lg bg-light-gray dark:bg-gray-800">
          <RepositoriesList />
        </div>
      </div>
    </div>
  );
};

export default User;
