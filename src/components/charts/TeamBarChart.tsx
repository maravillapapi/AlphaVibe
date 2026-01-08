import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Rectangle } from 'recharts';
import { Card } from '../ui/Card';
import { TimeRangeSelector, type Period } from '../ui/TimeRangeSelector';
import { useData } from '../../context/DataContext';

// Custom Tooltip with full date display
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const data = payload[0].payload;
        return (
            <div className="bg-white border border-gray-200 rounded-lg shadow-lg px-3 py-2">
                <p className="text-xs font-medium text-txt-primary mb-1">
                    {data.fullLabel || label}
                </p>
                {payload.map((entry: any, index: number) => (
                    <p key={index} className="text-xs" style={{ color: entry.color }}>
                        {entry.name}: <span className="font-bold">{entry.value} g</span>
                    </p>
                ))}
            </div>
        );
    }
    return null;
};

// Empty state component
const EmptyState: React.FC<{ period: string }> = ({ period }) => (
    <div className="h-full min-h-[200px] flex items-center justify-center bg-gray-50/50 rounded-lg">
        <div className="text-center">
            <p className="text-txt-secondary text-sm">Aucune donnée disponible</p>
            <p className="text-txt-tertiary text-xs mt-1">pour la période "{period}"</p>
        </div>
    </div>
);

export const TeamBarChart: React.FC = () => {
    const [period, setPeriod] = useState<Period>('mois');
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const { getProductionByPeriod } = useData();
    const data = getProductionByPeriod(period === 'annee' ? 'annee' : period);

    // Calculer l'intervalle pour l'axe X selon la période
    const getXAxisInterval = () => {
        if (period === 'mois') {
            return Math.ceil(data.length / 7);
        }
        return 0;
    };

    const periodLabels = { semaine: 'Semaine', mois: 'Mois', annee: 'Année' };
    const hasData = data && data.length > 0;

    return (
        <Card className="p-3 sm:p-4 h-full flex flex-col">
            {/* Header - Responsive with Legend */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2 sm:gap-4">
                <div className="flex items-center gap-3">
                    <h3 className="text-sm md:text-base font-semibold text-gray-800 break-words">
                        Production par Équipe
                    </h3>
                    {/* Inline Legend */}
                    <div className="flex items-center gap-3 text-xs">
                        <div className="flex items-center gap-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                            <span className="text-gray-600">Équipe A</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-2.5 h-2.5 rounded-full bg-orange-500" />
                            <span className="text-gray-600">Équipe B</span>
                        </div>
                    </div>
                </div>
                <TimeRangeSelector value={period} onChange={setPeriod} />
            </div>

            {/* Chart Container - Fixed minimum height */}
            <div className="flex-1 min-h-[200px] h-64">
                {hasData ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
                            onMouseMove={(state) => {
                                if (state && state.activeTooltipIndex !== undefined) {
                                    setActiveIndex(state.activeTooltipIndex);
                                }
                            }}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <defs>
                                {/* Team A gradients */}
                                <linearGradient id="teamADefaultGradient" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#3B82F6" stopOpacity={1} />
                                </linearGradient>
                                <linearGradient id="teamAActiveGradient" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="#60A5FA" stopOpacity={1} />
                                    <stop offset="50%" stopColor="#3B82F6" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#1D4ED8" stopOpacity={1} />
                                </linearGradient>
                                {/* Team B gradients */}
                                <linearGradient id="teamBDefaultGradient" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="#F97316" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#F97316" stopOpacity={1} />
                                </linearGradient>
                                <linearGradient id="teamBActiveGradient" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="#FB923C" stopOpacity={1} />
                                    <stop offset="50%" stopColor="#F97316" stopOpacity={1} />
                                    <stop offset="100%" stopColor="#C2410C" stopOpacity={1} />
                                </linearGradient>
                                {/* Dimmed gradient */}
                                <linearGradient id="teamDimmedGradient" x1="0" y1="1" x2="0" y2="0">
                                    <stop offset="0%" stopColor="#E5E7EB" stopOpacity={0.3} />
                                    <stop offset="100%" stopColor="#E5E7EB" stopOpacity={1} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" vertical={false} />
                            <XAxis
                                dataKey="label"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 8, fill: '#9CA3AF' }}
                                interval={getXAxisInterval()}
                            />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 8, fill: '#9CA3AF' }} />
                            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                            <Bar
                                dataKey="teamA"
                                name="Équipe A"
                                radius={[4, 4, 0, 0]}
                                barSize={12}
                                fill="url(#teamADefaultGradient)"
                                activeBar={
                                    <Rectangle
                                        fill="url(#teamAActiveGradient)"
                                        stroke="#1D4ED8"
                                        strokeWidth={1.5}
                                        radius={[4, 4, 0, 0]}
                                        style={{ filter: 'drop-shadow(0px 0px 6px rgba(59, 130, 246, 0.5))' }}
                                    />
                                }
                            >
                                {data.map((_entry: any, index: number) => {
                                    const isDimmed = activeIndex !== null && activeIndex !== index;
                                    return (
                                        <Cell
                                            key={`cellA-${index}`}
                                            fill={isDimmed ? 'url(#teamDimmedGradient)' : 'url(#teamADefaultGradient)'}
                                            style={{ transition: 'fill 0.2s ease-out' }}
                                        />
                                    );
                                })}
                            </Bar>
                            <Bar
                                dataKey="teamB"
                                name="Équipe B"
                                radius={[4, 4, 0, 0]}
                                barSize={12}
                                fill="url(#teamBDefaultGradient)"
                                activeBar={
                                    <Rectangle
                                        fill="url(#teamBActiveGradient)"
                                        stroke="#C2410C"
                                        strokeWidth={1.5}
                                        radius={[4, 4, 0, 0]}
                                        style={{ filter: 'drop-shadow(0px 0px 6px rgba(249, 115, 22, 0.5))' }}
                                    />
                                }
                            >
                                {data.map((_entry: any, index: number) => {
                                    const isDimmed = activeIndex !== null && activeIndex !== index;
                                    return (
                                        <Cell
                                            key={`cellB-${index}`}
                                            fill={isDimmed ? 'url(#teamDimmedGradient)' : 'url(#teamBDefaultGradient)'}
                                            style={{ transition: 'fill 0.2s ease-out' }}
                                        />
                                    );
                                })}
                            </Bar>
                        </BarChart>
                    </ResponsiveContainer>
                ) : (
                    <EmptyState period={periodLabels[period]} />
                )}
            </div>
        </Card>
    );
};

export default TeamBarChart;
