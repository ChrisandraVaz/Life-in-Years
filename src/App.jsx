import { useState } from 'react';
import { Sprout } from 'lucide-react';
import { t } from './i18n/translations';
import { calculateStats, getDaysUntilBirthday } from './utils/calculations';
import { getFormattedNumber } from './utils/formatting';
import ThemeToggle from './components/ThemeToggle';
import IntroScreen from './components/IntroScreen';
import WeekGrid from './components/WeekGrid';
import StatsPanel from './components/StatsPanel';

export default function App() {
  const [step, setStep] = useState(1);
  const [birthdate, setBirthdate] = useState('');
  const [stats, setStats] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const handleSubmit = (date) => {
    setBirthdate(date);
    setStats(calculateStats(date));
    setStep(2);
  };

  const handleReset = () => {
    setBirthdate('');
    setStats(null);
    setStep(1);
  };

  return (
    <div
      className={`min-h-screen transition-colors ${
        darkMode ? 'bg-neutral-900' : 'bg-stone-50'
      }`}
      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
    >
      {/* Logo */}
      <button
        onClick={handleReset}
        className="fixed top-8 left-8 transition-opacity hover:opacity-60"
      >
        <div className="flex items-center gap-2">
          <Sprout className={darkMode ? 'text-gray-400' : 'text-gray-700'} size={16} strokeWidth={2} />
          <span
            className={`text-sm font-medium tracking-tight ${
              darkMode ? 'text-gray-100' : 'text-gray-900'
            }`}
            style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}
          >
            Canopy
          </span>
        </div>
      </button>

      <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />

      <div className="max-w-4xl mx-auto px-8 py-20">
        {step === 1 ? (
          <IntroScreen darkMode={darkMode} onSubmit={handleSubmit} />
        ) : (
          <>
            {/* Header */}
            <div className="mb-8 flex flex-col md:flex-row md:justify-between gap-8">
              <div className="flex flex-col justify-end">
                <h1
                  className={`text-4xl mb-3 tracking-tight ${
                    darkMode ? 'text-gray-100' : 'text-gray-900'
                  }`}
                  style={{ fontWeight: 400, fontFamily: 'Georgia, "Times New Roman", serif' }}
                >
                  {t('pageTitle')}
                </h1>
                <p
                  className={`text-sm ${darkMode ? 'text-gray-500' : 'text-gray-500'}`}
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}
                >
                  {t('pageSubtitle')}
                </p>
              </div>
              <div
                className={`text-sm space-y-2 md:text-right ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
              >
                <div>
                  <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-700'}`}>
                    {getFormattedNumber(stats.weeksLived)}
                  </span>{' '}
                  weeks lived ({stats.percentageLived}%)
                </div>
                <div>
                  <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-700'}`}>
                    {getFormattedNumber(stats.daysLived)}
                  </span>{' '}
                  days experienced
                </div>
                <div>
                  Next birthday in{' '}
                  <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-700'}`}>
                    {getDaysUntilBirthday(birthdate)}
                  </span>{' '}
                  days
                </div>
                <div>
                  <span className={`font-medium ${darkMode ? 'text-teal-400' : 'text-teal-700'}`}>
                    {getFormattedNumber(stats.seasons)}
                  </span>{' '}
                  seasons observed
                </div>
              </div>
            </div>

            <WeekGrid stats={stats} birthdate={birthdate} darkMode={darkMode} />
            <StatsPanel stats={stats} darkMode={darkMode} />

            {/* Footer */}
            <div className={`mt-16 pt-8 border-t flex justify-end ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
              <button
                onClick={handleReset}
                className={`text-xs uppercase tracking-wider transition-opacity hover:opacity-60 ${
                  darkMode ? 'text-gray-600' : 'text-gray-400'
                }`}
                style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}
              >
                {t('startOverButton')}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
