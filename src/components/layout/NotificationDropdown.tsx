import React from 'react';
import { X, Fuel, Wrench, Clock, AlertTriangle, CheckCircle } from 'lucide-react';

interface Notification {
    id: string;
    type: 'critique' | 'maintenance' | 'info' | 'success';
    title: string;
    description: string;
    time: string;
    read: boolean;
}

const mockNotifications: Notification[] = [
    { id: 'n1', type: 'critique', title: 'Stock Carburant faible', description: 'Niveau à 1200L - Commande requise', time: 'Il y a 10 min', read: false },
    { id: 'n2', type: 'maintenance', title: 'Foreuse B en panne', description: 'Maintenance planifiée requise', time: 'Il y a 30 min', read: false },
    { id: 'n3', type: 'info', title: 'Jean Kabongo a pointé', description: 'Arrivée à 08:00', time: 'Il y a 1h', read: false },
    { id: 'n4', type: 'success', title: 'Objectif atteint', description: 'Production journalière: 250g', time: 'Il y a 2h', read: true },
    { id: 'n5', type: 'info', title: 'Marie Mutombo a pointé', description: 'Arrivée à 07:45', time: 'Il y a 3h', read: true },
];

const typeConfig: Record<string, { bg: string; icon: React.ElementType; iconColor: string }> = {
    critique: { bg: 'bg-red-50', icon: AlertTriangle, iconColor: 'text-red-500' },
    maintenance: { bg: 'bg-orange-50', icon: Wrench, iconColor: 'text-orange-500' },
    info: { bg: 'bg-blue-50', icon: Clock, iconColor: 'text-blue-500' },
    success: { bg: 'bg-green-50', icon: CheckCircle, iconColor: 'text-green-500' },
};

interface NotificationDropdownProps {
    isOpen: boolean;
    onClose: () => void;
    onMarkAllRead: () => void;
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({ isOpen, onClose, onMarkAllRead }) => {
    const [notifications, setNotifications] = React.useState(mockNotifications);

    const unreadCount = notifications.filter(n => !n.read).length;

    const handleMarkAllRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
        onMarkAllRead();
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop for mobile */}
            <div className="fixed inset-0 z-40 lg:hidden" onClick={onClose} />

            {/* Dropdown */}
            <div className="fixed lg:absolute top-0 lg:top-full right-0 lg:right-0 w-full lg:w-96 h-full lg:h-auto lg:max-h-[70vh] bg-white lg:rounded-2xl shadow-2xl z-50 lg:mt-2 flex flex-col overflow-hidden lg:border lg:border-gray-100">
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b border-gray-100 flex-shrink-0">
                    <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                        {unreadCount > 0 && (
                            <span className="px-2 py-0.5 bg-red-100 text-red-600 text-xs font-semibold rounded-full">
                                {unreadCount} nouvelles
                            </span>
                        )}
                    </div>
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors lg:hidden">
                        <X size={20} className="text-gray-500" />
                    </button>
                </div>

                {/* Notifications List */}
                <div className="flex-1 overflow-y-auto">
                    {notifications.map((notif) => {
                        const config = typeConfig[notif.type];
                        const Icon = config.icon;
                        return (
                            <div
                                key={notif.id}
                                className={`flex items-start gap-3 p-4 border-b border-gray-50 hover:bg-gray-50 transition-colors ${!notif.read ? 'bg-blue-50/30' : ''}`}
                            >
                                <div className={`w-9 h-9 rounded-full ${config.bg} flex items-center justify-center flex-shrink-0`}>
                                    <Icon size={16} className={config.iconColor} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-2">
                                        <p className={`text-sm ${!notif.read ? 'font-semibold' : 'font-medium'} text-gray-900 truncate`}>
                                            {notif.title}
                                        </p>
                                        {!notif.read && (
                                            <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />
                                        )}
                                    </div>
                                    <p className="text-xs text-gray-500 truncate mt-0.5">{notif.description}</p>
                                    <p className="text-[10px] text-gray-400 mt-1">{notif.time}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Footer */}
                {unreadCount > 0 && (
                    <div className="p-3 border-t border-gray-100 flex-shrink-0">
                        <button
                            onClick={handleMarkAllRead}
                            className="w-full py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            Tout marquer comme lu
                        </button>
                    </div>
                )}
            </div>
        </>
    );
};

export default NotificationDropdown;
