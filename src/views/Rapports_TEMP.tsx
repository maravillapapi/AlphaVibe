import React from 'react';
import { Card } from '../components/ui/Card';
import { FileText, Download, Calendar, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';

const reportTypes = [
    { id: 'production', name: 'Rapport Production', description: 'Données de production journalière/mensuelle', icon: '📊' },
    { id: 'financial', name: 'Rapport Financier', description: 'Achats, dépenses et bilan', icon: '💰' },
    { id: 'personnel', name: 'Rapport Personnel', description: 'Pointages, congés et effectifs', icon: '👥' },
    { id: 'inventory', name: 'Rapport Inventaire', description: 'État des équipements et stocks', icon: '📦' },
];

const recentReports = [
    { name: 'Production Janvier 2026', date: '2026-01-05', type: 'production', size: '2.4 MB' },
    { name: 'Bilan Financier Q4 2025', date: '2025-12-31', type: 'financial', size: '1.8 MB' },
    { name: 'Effectifs Décembre', date: '2025-12-28', type: 'personnel', size: '890 KB' },
];

export const Rapports: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-txt-primary">Rapports</h1>
                    <p className="text-txt-secondary text-sm">Générez et téléchargez des rapports détaillés</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Filter size={16} className="mr-1" />
                        Filtrer
                    </Button>
                    <Button variant="primary" size="sm">
                        <FileText size={16} className="mr-1" />
                        Nouveau Rapport
                    </Button>
                </div>
            </div>

            {/* Report Types */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {reportTypes.map((type) => (
                    <Card key={type.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                        <div className="text-3xl mb-3">{type.icon}</div>
                        <h3 className="font-semibold text-txt-primary mb-1">{type.name}</h3>
                        <p className="text-xs text-txt-secondary">{type.description}</p>
                    </Card>
                ))}
            </div>

            {/* Recent Reports */}
            <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-txt-primary">Rapports Récents</h2>
                    <Button variant="ghost" size="sm">
                        <Calendar size={14} className="mr-1" />
                        Historique complet
                    </Button>
                </div>

                <div className="space-y-3">
                    {recentReports.map((report, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-lg bg-amber-100 flex items-center justify-center">
                                    <FileText size={18} className="text-amber-600" />
                                </div>
                                <div>
                                    <p className="font-medium text-txt-primary text-sm">{report.name}</p>
                                    <p className="text-xs text-txt-secondary">{report.date} • {report.size}</p>
                                </div>
                            </div>
                            <Button variant="ghost" size="sm">
                                <Download size={16} />
                            </Button>
                        </div>
                    ))}
                </div>
            </Card>
        </div>
    );
};

export default Rapports;
