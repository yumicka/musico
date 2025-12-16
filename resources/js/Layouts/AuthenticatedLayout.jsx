import { Link, usePage } from '@inertiajs/react';
import Nav from '../Components/MainPage/Logged/EditProfileNav'
import { useState } from 'react';

export default function AuthenticatedLayout({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-black">
           
            <Nav />

            {header && (
                <header className="bg-gradient-to-r from-black to-gray-900 shadow-lg">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        {header}
                    </div>
                </header>
            )}

            <main className="py-8 mt-12">{children}</main>
        </div>
    );
}