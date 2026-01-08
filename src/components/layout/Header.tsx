import React, { useState } from 'react';
import { Menu, Bell, Search } from 'lucide-react';
import { useSiteConfig } from '../../context/SiteConfigContext';
import { SearchModal } from './SearchModal';
import { NotificationDropdown } from './NotificationDropdown';

interface HeaderProps {
    onMenuClick: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onMenuClick }) => {
    const { config } = useSiteConfig();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isNotifOpen, setIsNotifOpen] = useState(false);
    const [unreadCount, setUnreadCount] = useState(3);

    const handleMarkAllRead = () => {
        setUnreadCount(0);
    };

    return (
        <>
            <header className="fixed top-0 left-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-100 z-30 lg:hidden">
                <div className="flex items-center justify-between h-full px-4">
                    {/* Left: Hamburger + Logo */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={onMenuClick}
                            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <Menu size={22} className="text-txt-secondary" strokeWidth={1.5} />
                        </button>
                        <div>
                            <h1 className="text-sm font-bold bg-gradient-to-r from-amber-600 to-yellow-500 bg-clip-text text-transparent truncate">
                                {config.appName}
                            </h1>
                            <p className="text-xs text-txt-tertiary truncate">{config.appSubtitle}</p>
                        </div>
                    </div>

                    {/* Right: Actions */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsSearchOpen(true)}
                            className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                        >
                            <Search size={20} className="text-txt-secondary" strokeWidth={1.5} />
                        </button>
                        <div className="relative">
                            <button
                                onClick={() => setIsNotifOpen(!isNotifOpen)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors relative"
                            >
                                <Bell size={20} className="text-txt-secondary" strokeWidth={1.5} />
                                {unreadCount > 0 && (
                                    <span className="absolute top-1.5 right-1.5 min-w-[18px] h-[18px] bg-red-500 rounded-full flex items-center justify-center text-[10px] font-bold text-white px-1 animate-pulse-badge">
                                        {unreadCount}
                                    </span>
                                )}
                            </button>
                            <NotificationDropdown
                                isOpen={isNotifOpen}
                                onClose={() => setIsNotifOpen(false)}
                                onMarkAllRead={handleMarkAllRead}
                            />
                        </div>
                    </div>
                </div>
            </header>

            {/* Search Modal */}
            <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
        </>
    );
};

export default Header;
