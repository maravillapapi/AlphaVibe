import React, { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { Card } from '../ui/Card';
import { useData } from '../../context/DataContext';
import type { KpiData } from '../../types';

type Period = 'semaine' | 'mois' | 'annee';

// Icons as SVG components
const CoinsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="8" r="6" /><path d="M18.09 10.37A6 6 0 1 1 10.34 18" /><path d="M7 6h1v4" /><path d="m16.71 13.88.7.71-2.82 2.82" />
    </svg>
);

const CalendarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect width="18" height="18" x="3" y="4" rx="2" ry="2" /><line x1="16" x2="16" y1="2" y2="6" /><line x1="8" x2="8" y1="2" y2="6" /><line x1="3" x2="21" y1="10" y2="10" />
    </svg>
);

const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
);

const AlertIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" /><line x1="12" x2="12" y1="9" y2="13" /><line x1="12" x2="12.01" y1="17" y2="17" />
    </svg>
);

const iconMap: Record<string, React.FC<{ className?: string }>> = {
    Coins: CoinsIcon, Calendar: CalendarIcon, Clock: ClockIcon, AlertTriangle: AlertIcon,
};

// Solid background colors for icons
const iconBgColors: Record<number, string> = {
    0: 'bg-amber-500',   // Production Totale - Orange/Amber
    1: 'bg-pink-500',    // Production - Pink
    2: 'bg-blue-500',    // Heures Travaillées - Blue
    3: 'bg-red-500',     // Incidents - Red
};

const periodLabels: Record<Period, string> = { semaine: 'Semaine', mois: 'Mois', annee: 'Année' };

// Fonction pour obtenir le nombre de jours dans le mois actuel
const getDaysInCurrentMonth = (): number => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
};

// Labels de contexte dynamiques
const getContextLabel = (period: Period): string => {
    switch (period) {
        case 'semaine':
            return 'sur 7 jours';
        case 'mois':
            return `sur ${getDaysInCurrentMonth()} jours`;
        case 'annee':
            return 'sur 12 mois';
    }
};

interface KpiCardProps { data: KpiData; index: number; }

export const KpiCard: React.FC<KpiCardProps> = ({ data, index }) => {
    const [showMenu, setShowMenu] = useState(false);
    const [period, setPeriod] = useState<Period>('mois');
    const { getKpiValue } = useData();

    const Icon = iconMap[data.icon] || CoinsIcon;
    const bgColor = iconBgColors[index] || iconBgColors[0];

    const dynamicValue = data.id.includes('production')
        ? getKpiValue('production', period)
        : data.id.includes('hours')
            ? getKpiValue('hours', period)
            : data.value;

    const handlePeriodChange = (newPeriod: Period) => {
        setPeriod(newPeriod);
        setShowMenu(false);
    };

    return (
        <Card className="p-4 sm:p-5 flex flex-col h-full bg-white rounded-2xl shadow-sm">
            {/* HEADER: Title + Menu */}
            <div className="flex justify-between items-start w-full mb-3">
                {/* Title */}
                <h3 className="text-sm sm:text-base font-semibold text-gray-700 leading-tight">
                    {data.label}
                </h3>
                {/* Menu Button */}
                <button
                    onClick={() => setShowMenu(!showMenu)}
                    className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors p-1 -mr-1 -mt-1"
                >
                    <MoreHorizontal size={18} strokeWidth={2} />
                </button>
            </div>

            {/* Period Dropdown */}
            {showMenu && (
                <div className="absolute top-12 right-3 bg-white rounded-xl shadow-lg border border-gray-100 py-1.5 z-20 min-w-[90px]">
                    {(Object.keys(periodLabels) as Period[]).map((p) => (
                        <button
                            key={p}
                            onClick={() => handlePeriodChange(p)}
                            className={`w-full px-3 py-1.5 text-left text-xs hover:bg-gray-50 transition-colors ${period === p ? 'text-blue-600 font-semibold bg-blue-50' : 'text-gray-600'
                                }`}
                        >
                            {periodLabels[p]}
                        </button>
                    ))}
                </div>
            )}

            {/* BODY: Icon + Data */}
            <div className="flex items-center gap-4 flex-1">
                {/* Icon Circle */}
                <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full ${bgColor} flex items-center justify-center flex-shrink-0 shadow-md`}>
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>

                {/* Value + Trend */}
                <div className="flex flex-col min-w-0">
                    {/* Main Value */}
                    <span className="text-2xl sm:text-3xl font-bold text-gray-900 leading-none">
                        {dynamicValue}
                    </span>

                    {/* Trend Badge */}
                    {data.badge && (
                        <div className="flex flex-col items-start md:flex-row md:items-center md:gap-1.5 mt-1.5">
                            <span className={`text-xs sm:text-sm font-semibold ${data.badgeColor === 'green' ? 'text-emerald-500' :
                                data.badgeColor === 'red' ? 'text-red-500' : 'text-orange-500'
                                }`}>
                                {data.badge}
                            </span>
                            <span className="text-[10px] md:text-xs text-gray-400">
                                ({getContextLabel(period)})
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </Card>
    );
};

export default KpiCard;
