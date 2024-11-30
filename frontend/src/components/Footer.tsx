// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-black text-white py-4">
            <div className="max-w-7xl mx-auto px-4 text-center">
                <p className="text-sm">
                    © {new Date().getFullYear()} Снежинка. Все права защищены.
                </p>
                <p className="text-sm mt-1">
                    Разработано командой компании
                </p>
            </div>
        </footer>
    );
};

export default Footer;
