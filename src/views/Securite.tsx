import React, { useState } from 'react';
import { MapPin, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { Card } from '../components/ui/Card';

interface Incident {
    id: string;
    date: string;
    type: 'accident' | 'equipement' | 'securite' | 'environnement';
    location: string;
    severity: 'critique' | 'majeur' | 'mineur';
    status: 'ouvert' | 'en_cours' | 'resolu';
    description: string;
}

const mockIncidents: Incident[] = [
    { id: 'INC-001', date: '7 Jan 2026', type: 'equipement', location: 'Zone Nord', severity: 'majeur', status: 'en_cours', description: 'Panne du système hydraulique sur la foreuse A' },
    { id: 'INC-002', date: '6 Jan 2026', type: 'securite', location: 'Puits 3', severity: 'mineur', status: 'resolu', description: 'Équipement de protection manquant' },
    { id: 'INC-003', date: '5 Jan 2026', type: 'accident', location: 'Base Camp', severity: 'critique', status: 'ouvert', description: 'Blessure légère lors de manutention' },
    { id: 'INC-004', date: '4 Jan 2026', type: 'environnement', location: 'Zone Stockage', severity: 'mineur', status: 'resolu', description: 'Fuite mineure de carburant contenue' },
    { id: 'INC-005', date: '3 Jan 2026', type: 'equipement', location: 'Zone Sud', severity: 'majeur', status: 'resolu', description: 'Défaillance électrique sur convoyeur' },
    { id: 'INC-006', date: '2 Jan 2026', type: 'securite', location: 'Entrée Site', severity: 'mineur', status: 'resolu', description: 'Signalisation endommagée' },
];

const typeLabels: Record<string, { label: string; color: string }> = {
    accident: { label: 'Accident', color: 'bg-red-100 text-red-700' },
    equipement: { label: 'Équipement', color: 'bg-orange-100 text-orange-700' },
    securite: { label: 'Sécurité', color: 'bg-blue-100 text-blue-700' },
    environnement: { label: 'Environnement', color: 'bg-green-100 text-green-700' },
};

const severityColors: Record<string, string> = {
    critique: 'text-red-600 bg-red-50',
    majeur: 'text-orange-600 bg-orange-50',
    mineur: 'text-yellow-600 bg-yellow-50',
};

const statusIcons: Record<string, React.ReactNode> = {
    ouvert: <XCircle size={14} className="text-red-500" />,
    en_cours: <AlertCircle size={14} className="text-orange-500" />,
    resolu: <CheckCircle size={14} className="text-green-500" />,
};

export const Securite: React.FC = () => {
    const [filterStatus, setFilterStatus] = useState<string>('all');

    const filteredIncidents = filterStatus === 'all'
        ? mockIncidents
        : mockIncidents.filter(i => i.status === filterStatus);

    const stats = {
        total: mockIncidents.length,
        ouverts: mockIncidents.filter(i => i.status === 'ouvert').length,
        enCours: mockIncidents.filter(i => i.status === 'en_cours').length,
        resolus: mockIncidents.filter(i => i.status === 'resolu').length,
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Sécurité & Incidents</h1>
                    <p className="text-gray-500">Suivi des incidents et mesures de sécurité</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Total Incidents</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                </Card>
                <Card className="p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Ouverts</p>
                    <p className="text-2xl font-bold text-red-600">{stats.ouverts}</p>
                </Card>
                <Card className="p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">En Cours</p>
                    <p className="text-2xl font-bold text-orange-600">{stats.enCours}</p>
                </Card>
                <Card className="p-4 text-center">
                    <p className="text-xs text-gray-500 mb-1">Résolus</p>
                    <p className="text-2xl font-bold text-green-600">{stats.resolus}</p>
                </Card>
            </div>

            {/* Filter Tabs */}
            <div className="flex gap-2 overflow-x-auto pb-2">
                {['all', 'ouvert', 'en_cours', 'resolu'].map((status) => (
                    <button
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${filterStatus === status
                            ? 'bg-gray-900 text-white'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                    >
                        {status === 'all' ? 'Tous' : status === 'en_cours' ? 'En cours' : status.charAt(0).toUpperCase() + status.slice(1)}
                    </button>
                ))}
            </div>

            {/* Incidents Table */}
            <Card className="overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">ID</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Date</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Localisation</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Gravité</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Statut</th>
                                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Description</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredIncidents.map((incident) => (
                                <tr key={incident.id} className="border-t border-gray-100 hover:bg-gray-50 transition-colors">
                                    <td className="py-3 px-4 text-sm font-medium text-gray-900">{incident.id}</td>
                                    <td className="py-3 px-4 text-sm text-gray-600">{incident.date}</td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${typeLabels[incident.type].color}`}>
                                            {typeLabels[incident.type].label}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600">
                                        <div className="flex items-center gap-1">
                                            <MapPin size={12} className="text-gray-400" />
                                            {incident.location}
                                        </div>
                                    </td>
                                    <td className="py-3 px-4">
                                        <span className={`px-2 py-1 rounded text-xs font-semibold uppercase ${severityColors[incident.severity]}`}>
                                            {incident.severity}
                                        </span>
                                    </td>
                                    <td className="py-3 px-4">
                                        <div className="flex items-center gap-1.5">
                                            {statusIcons[incident.status]}
                                            <span className="text-sm text-gray-600 capitalize">
                                                {incident.status === 'en_cours' ? 'En cours' : incident.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-3 px-4 text-sm text-gray-600 max-w-xs truncate">{incident.description}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </Card>
        </div>
    );
};

export default Securite;
