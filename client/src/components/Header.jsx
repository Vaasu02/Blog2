import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/UserContext";
import toast, { Toaster } from 'react-hot-toast';

const Header = () => {
  const { setUserinfo, userinfo } = useContext(UserContext);
  const navigate = useNavigate();

  const logout = () => {
    toast((t) => (
      <div className="flex flex-col items-center">
        <p className="mb-2">Are you sure you want to Logout?</p>
        <div className="flex space-x-2">
          <button 
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-300" 
            onClick={() => {
              performLogout();
              toast.dismiss(t.id);
            }}
          >
            Yes
          </button>
          <button 
            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition duration-300" 
            onClick={() => toast.dismiss(t.id)}
          >
            No
          </button>
        </div>
      </div>
    ), { duration: 6000 });
  }

  const performLogout = () => {
    fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => {
        setUserinfo(null);
        toast.success("Logged out successfully");
        setTimeout(() => {
          navigate('/login')
        }, 1000)
      })
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error("An error occurred during logout");
      });
  }

  const email = userinfo?.email;

  useEffect(() => {
    fetch('http://localhost:3000/auth/profile', {
      method: 'GET',
      credentials: 'include',
    })
      .then(response => response.json())
      .then(data => setUserinfo(data))
      .catch(error => {
        console.error('Fetch error:', error);
        toast.error("Failed to fetch user profile");
      });
  }, []);

  return (
    <header className="bg-white shadow-md rounded-md">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 py-6 flex flex-col sm:flex-row justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition duration-300">
        BloggingHub
        </Link>
        <nav className="mt-4 sm:mt-0">
          <ul className="flex flex-wrap justify-center sm:justify-end space-x-2 sm:space-x-4">
            {email ? (
              <>
                <li className="mt-1.5">
                  <Link 
                    to="/create" 
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition duration-300"
                  >
                    Create new Post
                  </Link>
                </li>
                <li>
                  <button 
                    onClick={logout} 
                    className="px-3 bg-blue-600 text-white hover:bg-blue-700 py-2 text-sm font-medium rounded-md transition duration-300"
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link 
                    to="/login" 
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition duration-300"
                  >
                    Login
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/register" 
                    className="px-3 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition duration-300"
                  >
                    Register
                  </Link>
                </li>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;