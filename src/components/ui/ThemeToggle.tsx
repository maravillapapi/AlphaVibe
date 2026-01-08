import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export const ThemeToggle: React.FC<{ compact?: boolean }> = ({ compact = false }) => {
    const { resolvedTheme, toggleTheme } = useTheme();

    const isDark = resolvedTheme === 'dark';

    if (compact) {
        return (
            <button
                onClick={toggleTheme}
                className="w-10 h-10 flex items-center justify-center rounded-xl 
                           bg-[var(--background-tertiary)] hover:bg-[var(--border-color)]
                           transition-all duration-200"
                aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
                {isDark ? (
                    <Sun size={18} className="text-amber-400" />
                ) : (
                    <Moon size={18} className="text-[var(--text-secondary)]" />
                )}
            </button>
        );
    }

    return (
        <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl
                       bg-[var(--background-tertiary)] hover:bg-[var(--border-color)]
                       transition-all duration-200 group"
            aria-label={isDark ? 'Activer le mode clair' : 'Activer le mode sombre'}
        >
            <div className="w-8 h-8 rounded-lg bg-[var(--background-secondary)] flex items-center justify-center">
                {isDark ? (
                    <Sun size={16} className="text-amber-400" />
                ) : (
                    <Moon size={16} className="text-[var(--text-secondary)]" />
                )}
            </div>
            <div className="flex-1 text-left">
                <p className="text-sm font-medium text-[var(--text-primary)]">
                    {isDark ? 'Mode Sombre' : 'Mode Clair'}
                </p>
                <p className="text-xs text-[var(--text-tertiary)]">
                    {isDark ? 'Cliquer pour le mode clair' : 'Cliquer pour le mode sombre'}
                </p>
            </div>
            <div className={`w-11 h-6 rounded-full p-0.5 transition-colors duration-200 ${isDark ? 'bg-accent-blue' : 'bg-gray-300'}`}>
                <div className={`w-5 h-5 rounded-full bg-white shadow-md transform transition-transform duration-200 ${isDark ? 'translate-x-5' : 'translate-x-0'}`} />
            </div>
        </button>
    );
};

export default ThemeToggle;
