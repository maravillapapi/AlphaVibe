import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '../ui/Card';

const expenseCategories = [
    { name: "Carburant & Énergie", value: 450, color: "#3B82F6" },
    { name: "Équipement & Maintenance", value: 220, color: "#8B5CF6" },
    { name: "Matériaux & Fournitures", value: 180, color: "#10B981" },
    { name: "Transport & Logistique", value: 150, color: "#F97316" },
    { name: "Autres Frais", value: 100, color: "#6B7280" },
];

export const ExpensesPieChart: React.FC = () => {
    const total = expenseCategories.reduce((sum, cat) => sum + cat.value, 0);

    return (
        <Card className="p-4 md:p-5 flex flex-col h-full">
            {/* Title */}
            <h3 className="text-sm md:text-base font-semibold text-gray-800 mb-4">
                Dépenses Opérationnelles
            </h3>

            {/* Content: Chart + Legend */}
            <div className="flex items-center gap-4 md:gap-6 flex-1">
                {/* Doughnut Chart */}
                <div className="w-24 h-24 md:w-28 md:h-28 flex-shrink-0">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={expenseCategories}
                                innerRadius="55%"
                                outerRadius="90%"
                                paddingAngle={2}
                                dataKey="value"
                                stroke="none"
                            >
                                {expenseCategories.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => [`$${value}`, '']}
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>

                {/* Legend with amounts */}
                <div className="flex-1 space-y-2 min-w-0">
                    {expenseCategories.map((cat) => (
                        <div key={cat.name} className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2 min-w-0">
                                <div
                                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                                    style={{ backgroundColor: cat.color }}
                                />
                                <span className="text-xs md:text-sm text-gray-600 truncate">
                                    {cat.name}
                                </span>
                            </div>
                            <span className="text-xs md:text-sm font-semibold text-gray-800 flex-shrink-0">
                                ${cat.value}
                            </span>
                        </div>
                    ))}
                </div>
            </div>

            {/* Total Section */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-200">
                <span className="text-sm text-gray-500 font-medium">Total</span>
                <span className="text-xl md:text-2xl font-bold text-gray-900">
                    ${total.toLocaleString()}
                </span>
            </div>
        </Card>
    );
};

export default ExpensesPieChart;
