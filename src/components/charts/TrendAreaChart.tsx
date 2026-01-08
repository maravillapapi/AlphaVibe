import React, { useState } from 'react';
import { AreaChart, Area, BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Card } from '../ui/Card';
import { TimeRangeSelector, type Period } from '../ui/TimeRangeSelector';
import { useSiteConfig } from '../../context/SiteConfigContext';

// Jours de la semaine
const weekDays = ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'];

// Mois de l'année
const monthNames = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

// Génère les données de tendances dépenses selon la période
const generateTrendsData = (period: Period) => {
    const now = new Date();

    switch (period) {
        case 'semaine':
            return weekDays.map((day) => ({
                label: day,
                fullLabel: day,
                value: Math.floor(Math.random() * 400) + 200
            }));

        case 'mois':
            const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
            return Array.from({ length: daysInMonth }, (_, i) => ({
                label: String(i + 1),
                fullLabel: `${i + 1} ${monthNames[now.getMonth()]}`,
                value: Math.floor(Math.random() * 600) + 300
            }));

        case 'annee':
            return monthNames.map((month) => ({
                label: month,
                fullLabel: `${month} 2026`,
                value: Math.floor(Math.random() * 3000) + 2000
            }));
    }
};

// Cache les données
const cachedTrendsData: Record<Period, ReturnType<typeof generateTrendsData>> = {
    semaine: generateTrendsData('semaine'),
    mois: generateTrendsData('mois'),
    annee: generateTrendsData('annee'),
};

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2">
                <p className="text-xs font-medium text-txt-primary mb-1">
                    {data.fullLabel || label}
                </p>
                <p className="text-sm font-bold text-purple-600">
                    ${payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

export const TrendAreaChart: React.FC = () => {
    const [period, setPeriod] = useState<Period>('mois');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { chartPreference } = useSiteConfig();
    const data = cachedTrendsData[period];

    const getXAxisInterval = () => {
        if (period === 'mois') {
            return Math.ceil(data.length / 7);
        }
        return 0;
    };

    return (
        <Card className="p-4 flex flex-col h-full">
            {/* Header - Responsive */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-1 sm:gap-2">
                <h3 className="text-sm md:text-base font-semibold text-gray-800 break-words">
                    Tendances Dépenses
                </h3>
                <TimeRangeSelector value={period} onChange={setPeriod} size="sm" />
            </div>

            {/* Chart Container */}
            <div className="flex-1 min-h-[100px] h-24">
                <ResponsiveContainer width="100%" height="100%">
                    {chartPreference === 'bar' ? (
                        // BAR CHART WITH FOCUS EFFECT
                        <BarChart
                            data={data}
                            margin={{ top: 5, right: 5, left: 5, bottom: 0 }}
                            onMouseMove={(state) => {
                                if (state && state.activeTooltipIndex !== undefined) {
                                    setActiveIndex(state.activeTooltipIndex);
                                }
                            }}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <defs>
                                {/* Default gradient */}
                                <linearGradient id="trendDefaultGradient" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity={1} />
                                </linearGradient>
                                {/* Active gradient - brighter */}
                                <linearGradient id="trendActiveGradient" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="#A78BFA" stopOpacity={1} />
                                    <stop offset="50%" stopColor="#8B5CF6" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#6D28D9" stopOpacity={1} />
                                </linearGradient>
                                {/* Dimmed gradient */}
                                <linearGradient id="trendDimmedGradient" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="#E5E7EB" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#E5E7EB" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 8, fill: '#9CA3AF' }}
                                interval={getXAxisInterval()}
                            />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            <Bar
                                dataKey="value"
                                radius={[2, 2, 0, 0]}
                                maxBarSize={20}
                            >
                                {data.map((_entry, index) => {
                                    const isActive = activeIndex === index;
                                    const isDimmed = activeIndex !== null && activeIndex !== index;
                                    return (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={isActive ? 'url(#trendActiveGradient)' : isDimmed ? 'url(#trendDimmedGradient)' : 'url(#trendDefaultGradient)'}
                                            style={{
                                                filter: isActive ? 'drop-shadow(0px 0px 8px rgba(139, 92, 246, 0.6))' : 'none',
                                                transform: isActive ? 'scaleX(1.1)' : 'scaleX(1)',
                                                transformOrigin: 'center bottom',
                                                transition: 'all 0.3s ease-in-out',
                                            }}
                                        />
                                    );
                                })}
                            </Bar>
                        </BarChart>
                    ) : (
                        // AREA CHART (default)
                        <AreaChart data={data} margin={{ top: 5, right: 5, left: 5, bottom: 0 }}>
                            <defs>
                                <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.4} />
                                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.05} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 8, fill: '#9CA3AF' }}
                                interval={getXAxisInterval()}
                            />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="value" stroke="#8B5CF6" strokeWidth={2} fill="url(#trendGradient)" />
                        </AreaChart>
                    )}
                </ResponsiveContainer>
            </div>
        </Card>
    );
};

export default TrendAreaChart;
