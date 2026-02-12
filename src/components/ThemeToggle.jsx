import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button
      onClick={onToggle}
      className={`fixed top-8 right-8 p-2 transition-opacity hover:opacity-70 ${
        darkMode ? 'text-gray-500' : 'text-gray-400'
      }`}
      aria-label="Toggle dark mode"
    >
      {darkMode ? <Sun size={18} strokeWidth={1.5} /> : <Moon size={18} strokeWidth={1.5} />}
    </button>
  );
}
