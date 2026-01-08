import React from 'react';
import { useNavigate } from 'react-router-dom';
import { KpiCard } from './KpiCard';

const kpiData = [
    { id: "kpi-production", label: "Production Totale", value: "222g", badge: "▲ 69%", badgeColor: "green" as const, icon: "Coins", path: "/production" },
    { id: "kpi-production-week", label: "Production", value: "1.94 kg", badge: "▲ 10.9%", badgeColor: "green" as const, icon: "Calendar", path: "/production" },
    { id: "kpi-hours", label: "Heures Travaillées", value: "144h", badge: "▲ 19.9%", badgeColor: "green" as const, icon: "Clock", path: "/pointage" },
    { id: "kpi-incidents", label: "Incidents", value: "6", badge: "▼ 25%", badgeColor: "green" as const, icon: "AlertTriangle", path: "/securite" },
];

export const KpiGrid: React.FC = () => {
    const navigate = useNavigate();

    const handleKpiClick = (path: string) => {
        navigate(path);
    };

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 items-stretch">
            {kpiData.map((kpi, index) => (
                <div
                    key={kpi.id}
                    onClick={() => handleKpiClick(kpi.path)}
                    className="cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
                >
                    <KpiCard data={kpi as any} index={index} />
                </div>
            ))}
        </div>
    );
};

export default KpiGrid;
