import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Users, Package, FileText, LayoutDashboard, ArrowRight } from 'lucide-react';

// Mock search data
const searchableItems = {
    pages: [
        { id: 'p1', name: 'Tableau de bord', path: '/', type: 'page', icon: LayoutDashboard },
        { id: 'p2', name: 'Production', path: '/production', type: 'page', icon: FileText },
        { id: 'p3', name: 'Pointage', path: '/pointage', type: 'page', icon: FileText },
        { id: 'p4', name: 'Personnel', path: '/personnel', type: 'page', icon: Users },
        { id: 'p5', name: 'Inventaire', path: '/inventaire', type: 'page', icon: Package },
        { id: 'p6', name: 'Sécurité', path: '/securite', type: 'page', icon: FileText },
        { id: 'p7', name: 'Analytiques', path: '/analytiques', type: 'page', icon: FileText },
        { id: 'p8', name: 'Dépenses', path: '/depenses', type: 'page', icon: FileText },
    ],
    personnel: [
        { id: 'e1', name: 'Jean Kabongo', path: '/personnel', type: 'personnel', role: 'Chef d\'Équipe A' },
        { id: 'e2', name: 'Marie Mutombo', path: '/personnel', type: 'personnel', role: 'Opératrice' },
        { id: 'e3', name: 'Pierre Kasongo', path: '/personnel', type: 'personnel', role: 'Technicien' },
        { id: 'e4', name: 'André Mbala', path: '/personnel', type: 'personnel', role: 'Chef d\'Équipe B' },
    ],
    inventaire: [
        { id: 'i1', name: 'Foreuse A', path: '/inventaire', type: 'inventaire', status: 'Opérationnel' },
        { id: 'i2', name: 'Foreuse B', path: '/inventaire', type: 'inventaire', status: 'Maintenance' },
        { id: 'i3', name: 'Convoyeur Principal', path: '/inventaire', type: 'inventaire', status: 'Opérationnel' },
        { id: 'i4', name: 'Générateur Diesel', path: '/inventaire', type: 'inventaire', status: 'Opérationnel' },
    ],
};

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isOpen]);

    useEffect(() => {
        if (!query.trim()) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const matchedResults: any[] = [];

        // Search pages
        searchableItems.pages.forEach(page => {
            if (page.name.toLowerCase().includes(lowerQuery)) {
                matchedResults.push({ ...page, category: 'Pages' });
            }
        });

        // Search personnel
        searchableItems.personnel.forEach(person => {
            if (person.name.toLowerCase().includes(lowerQuery) || person.role.toLowerCase().includes(lowerQuery)) {
                matchedResults.push({ ...person, category: 'Personnel' });
            }
        });

        // Search inventaire
        searchableItems.inventaire.forEach(item => {
            if (item.name.toLowerCase().includes(lowerQuery)) {
                matchedResults.push({ ...item, category: 'Inventaire' });
            }
        });

        setResults(matchedResults.slice(0, 8)); // Limit to 8 results
    }, [query]);

    const handleResultClick = (result: any) => {
        navigate(result.path);
        onClose();
        setQuery('');
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
                {/* Search Input */}
                <div className="flex items-center gap-3 p-4 border-b border-gray-100">
                    <Search size={20} className="text-gray-400 flex-shrink-0" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Rechercher pages, personnel, équipements..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        className="flex-1 text-base outline-none bg-transparent placeholder-gray-400"
                    />
                    <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                        <X size={18} className="text-gray-500" />
                    </button>
                </div>

                {/* Results */}
                {results.length > 0 && (
                    <div className="max-h-80 overflow-y-auto p-2">
                        {results.map((result) => (
                            <button
                                key={result.id}
                                onClick={() => handleResultClick(result)}
                                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors text-left"
                            >
                                <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${result.type === 'page' ? 'bg-blue-100 text-blue-600' :
                                    result.type === 'personnel' ? 'bg-green-100 text-green-600' :
                                        'bg-purple-100 text-purple-600'
                                    }`}>
                                    {result.type === 'page' && <LayoutDashboard size={18} />}
                                    {result.type === 'personnel' && <Users size={18} />}
                                    {result.type === 'inventaire' && <Package size={18} />}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 truncate">{result.name}</p>
                                    <p className="text-xs text-gray-500 truncate">
                                        {result.role || result.status || result.category}
                                    </p>
                                </div>
                                <ArrowRight size={16} className="text-gray-400 flex-shrink-0" />
                            </button>
                        ))}
                    </div>
                )}

                {/* Empty State */}
                {query && results.length === 0 && (
                    <div className="p-8 text-center">
                        <p className="text-gray-500 text-sm">Aucun résultat pour "{query}"</p>
                    </div>
                )}

                {/* Quick Links (when no query) */}
                {!query && (
                    <div className="p-4">
                        <p className="text-xs text-gray-400 mb-2 font-medium">ACCÈS RAPIDE</p>
                        <div className="flex flex-wrap gap-2">
                            {['Production', 'Pointage', 'Inventaire', 'Sécurité'].map((page) => (
                                <button
                                    key={page}
                                    onClick={() => setQuery(page)}
                                    className="px-3 py-1.5 bg-gray-100 text-gray-600 text-sm rounded-lg hover:bg-gray-200 transition-colors"
                                >
                                    {page}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchModal;
