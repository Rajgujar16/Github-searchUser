import React from 'react';
import { FaMoon} from 'react-icons/fa'; // Import icons
import { IoSunnySharp } from 'react-icons/io5';
import useTheme from '../../hooks/useTheme';

const Header = () => {

    const[theme , toggleTheme] = useTheme()
    return (
        <div className='flex mb-6 mt-3 px-6'>
            <h1>devfinder</h1>
            <button className='ml-auto flex items-center' onClick={toggleTheme}>
                {theme === "dark" ? (
                    <>
                        <span className='font-bold uppercase text-sm'>Light</span>
                        <IoSunnySharp className='mr-2' />
                    </>
                ) : (
                    <>
                        <span className='font-bold uppercase text-sm'>Dark</span>
                        <FaMoon className='mr-2' />
                    </>
                )}
            </button>
        </div>
    );
};

export default Header;
