// src/components/DashboardLayout.jsx

import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardHeader from './DashboardHeader';

const DashboardLayout = () => {
    return (
        <div className="w-screen min-h-screen bg-white text-gray-900">
            <DashboardHeader />
            <main className="w-full">
                <Outlet />
            </main>
        </div>
    );
};

export default DashboardLayout;