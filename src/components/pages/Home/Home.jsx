import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchUsers } from "../../../features/user/userSlice";
import logo from "../../../assets/logo.png";

const Home = () => {
  const [query, setQuery] = useState("");
  const { users, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleQueryInput = (e) => {
    setQuery(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(fetchUsers(query));
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center justify-center p-4 bg-white-light-mode text-blue-grey dark:bg-black-dark-mode dark:text-white">
      <div className="search-form text-center mb-6">
        <h4 className="text-2xl mb-4 tracking-widest font-bold dark:text-white">
          GitHub Search User
        </h4>
        <form
          className="flex items-center space-x-2"
          onSubmit={handleFormSubmit}
        >
          <input
            type="text"
            value={query}
            onChange={handleQueryInput}
            placeholder="Enter GitHub username"
            className="p-2 rounded w-64 text-black bg-white-light-mode border border-gray-300 focus:outline-none focus:border-blue-500 dark:bg-navy dark:text-white dark:border-gray-600 dark:focus:border-blue-400"
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-blue text-white p-2 rounded w-12 h-12 dark:bg-blue-dark"
          >
            <FaSearch />
          </button>
        </form>
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}

      <div className="search-results w-full max-w-md p-4 rounded-lg shadow-lg bg-light-gray dark:bg-navy">
        {users.length > 0 ? (
          users.map((user) => (
            <div key={user.id} className="user flex items-center mb-4">
              <div className="image bg-gray-300 dark:bg-gray-700 rounded-full w-16 h-16 mr-4 overflow-hidden">
                <img
                  src={user.avatar_url}
                  alt={`${user.login}'s profile`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="user-info">
                <h4 className="text-lg font-bold dark:text-white">
                  {user.login}
                </h4>
                <small className="text-gray dark:text-gray-400">
                  ID: {user.id}
                </small>
                <br />
                <Link
                  to={`/user/${user.login}`} // Updated to pass the username
                  className="text-blue underline mt-2 block dark:text-blue-light"
                >
                  View Profile
                </Link>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center">
            <img src={logo} alt="" />
            <p className="text-center text-gray-500 dark:text-gray-400">
              No users found. Please enter a GitHub username.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
