import React from 'react'
import { Header, Sidebar, SmallScreenSidebar } from './index'
import { Outlet } from 'react-router-dom'

function Layout() {
    return (
        <div className="flex flex-col h-screen">
            {/* Fixed Header */}
            <Header className="sticky top-0 z-50" />

            <div className="flex flex-1 overflow-hidden">
                {/* Fixed Sidebar for Large Screens */}
                <div className="hidden lg:flex w-[15%] h-full sticky top-0 z-40">
                    <Sidebar />
                </div>

                {/* Main Content */}
                <main className="flex-1 overflow-y-auto bg-white text-black dark:bg-gray-950 dark:text-white">
                    <Outlet />
                </main>
            </div>

            {/* Small Screen Sidebar fixed at the bottom */}
            <div className="lg:hidden fixed bottom-0 w-full">
                <SmallScreenSidebar />
            </div>
        </div>
    )
}

export default Layout
