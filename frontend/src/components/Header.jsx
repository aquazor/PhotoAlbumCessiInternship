import { useEffect, useRef } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from 'react-icons/fa';
import { CiMenuKebab } from 'react-icons/ci';
import { IoNotifications } from 'react-icons/io5';
import { Button, Menu } from './index';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (!menuRef.current) {
        return;
      }

      if (!menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('click', handler, true);

    return () => {
      window.removeEventListener('click', handler);
    };
  }, []);

  return (
    <header className="flex justify-between py-4">
      <div className="flex gap-6">
        <Link
          to={'/'}
          className="f-bold block bg-purple-600 py-2 px-4 border border-black rounded"
        >
          Logo
        </Link>

        <input
          className="min-w-64 border border-neutral-700 rounded-md py-1 px-2 text-base"
          type="text"
        />
      </div>

      <div className="flex items-center gap-3">
        <Button className="relative p-1">
          <IoNotifications size={30} />
          <div className="block w-3 h-3 absolute top-1 right-1 bg-red-500 rounded-full"></div>
        </Button>

        <Link to={'/profile'} className="flex items-center justify-center p-1">
          <FaUserCircle size={30} />
        </Link>

        <div ref={menuRef} className="relative">
          <Button onClick={() => setIsMenuOpen((current) => !current)} className="p-1">
            <CiMenuKebab size={30} />
          </Button>

          {isMenuOpen && <Menu setIsOpen={setIsMenuOpen} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
