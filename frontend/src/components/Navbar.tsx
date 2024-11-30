// src/components/Navbar.tsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiMenu, FiX } from 'react-icons/fi';
import { FaSnowflake } from 'react-icons/fa';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-black text-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Логотип или название сайта */}
                    <div className="flex-shrink-0 flex items-center">
                        <Link to="/" className="flex items-center text-xl font-bold">
                            <FaSnowflake className="mr-2 text-primary" />
                            Снежинка
                        </Link>
                    </div>

                    {/* Меню для больших экранов */}
                    <div className="hidden md:flex md:items-center">
                        <Link
                            to="/"
                            className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition"
                        >
                            Главная
                        </Link>
                        {/* Добавьте дополнительные ссылки здесь при необходимости */}
                    </div>

                    {/* Кнопка меню для мобильных устройств */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={toggleMenu}
                            type="button"
                            className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none transition"
                            aria-controls="mobile-menu"
                            aria-expanded={isOpen}
                        >
                            <span className="sr-only">Открыть меню</span>
                            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Мобильное меню */}
            {isOpen && (
                <div className="md:hidden" id="mobile-menu">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition"
                            onClick={() => setIsOpen(false)}
                        >
                            Главная
                        </Link>
                        {/* Добавьте дополнительные ссылки здесь при необходимости */}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
