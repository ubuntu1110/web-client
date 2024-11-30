// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Leaderboard from './pages/Leaderboard';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Snowflakes from './components/Snowflakes';
import PrizeSection from './components/PrizeSection';
import AdditionalPrizes from './components/ui/AdditionalPrizes'; // Импортируем компонент из папки ui

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen bg-gray-100 relative">
                {/* Фоновая анимация снежинок */}
                <Snowflakes />

                {/* Navbar */}
                <Navbar />

                {/* Основной контент */}
                <main className="flex-grow">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <Leaderboard />
                                    <PrizeSection />
                                    <AdditionalPrizes /> {/* Добавляем компонент AdditionalPrizes */}
                                </>
                            }
                        />
                        {/* Добавьте другие маршруты здесь */}
                    </Routes>
                </main>

                {/* Footer */}
                <Footer />
            </div>
        </Router>
    );
}

export default App;
