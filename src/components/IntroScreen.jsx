import { useState, useRef } from 'react';
import { useTypewriter } from '../hooks/useTypewriter';
import { t } from '../i18n/translations';

export default function IntroScreen({ darkMode, onSubmit }) {
  const [dateInput, setDateInput] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [dateError, setDateError] = useState('');
  const [showSubtext, setShowSubtext] = useState(false);
  const dateInputRef = useRef(null);

  const { displayText, done: typewriterDone } = useTypewriter(
    'Welcome to Life in Weeks.',
    true
  );

  // Show subtext shortly after typewriter finishes
  if (typewriterDone && !showSubtext) {
    setTimeout(() => setShowSubtext(true), 200);
  }

  const handleDateInputChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');

    let displayValue = value;
    if (value.length > 4 && value.length <= 6) {
      displayValue = `${value.substring(0, 4)}/${value.substring(4)}`;
    } else if (value.length > 6) {
      displayValue = `${value.substring(0, 4)}/${value.substring(4, 6)}/${value.substring(6, 8)}`;
    }

    setDateInput(displayValue);

    if (value.length === 8) {
      const year = parseInt(value.substring(0, 4));
      const month = parseInt(value.substring(4, 6));
      const day = parseInt(value.substring(6, 8));

      if (month < 1 || month > 12) {
        setDateError('Invalid month (must be 01-12)');
        setBirthdate('');
        return;
      }

      if (day < 1 || day > 31) {
        setDateError('Invalid day (must be 01-31)');
        setBirthdate('');
        return;
      }

      const testDate = new Date(year, month - 1, day);
      if (testDate.getMonth() !== month - 1 || testDate.getDate() !== day) {
        setDateError('Invalid date for this month');
        setBirthdate('');
        return;
      }

      setDateError('');
      setBirthdate(`${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`);
    } else {
      setBirthdate('');
      setDateError('');
    }
  };

  const isBirthdayToday = () => {
    if (!dateInput || dateInput.length < 10) return false;
    const parts = dateInput.split('/');
    if (parts.length !== 3) return false;

    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);
    const today = new Date();

    return month === (today.getMonth() + 1) && day === today.getDate();
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && birthdate) {
      onSubmit(birthdate);
    }
  };

  const handleClick = () => {
    if (birthdate) onSubmit(birthdate);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh]">
      <div className="max-w-md w-full">
        <div className={`mb-12 space-y-4 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
          <p className="text-base leading-relaxed">
            {displayText}<span className="animate-pulse">|</span>
          </p>
          {showSubtext && (
            <>
              <p className="text-base leading-relaxed animate-fadeIn">
                A simple visualization to help you reflect on the passage of time.
                Each week of your life, represented as a single mark.
              </p>
              <p className="text-base leading-relaxed animate-fadeIn" style={{ animationDelay: '0.2s' }}>
                To begin, enter your birthday below.
              </p>
            </>
          )}
        </div>

        {showSubtext && (
          <div className="space-y-3 animate-fadeIn" style={{ animationDelay: '0.4s' }}>
            <input
              type="text"
              className={`w-full px-0 py-2 bg-transparent border-b transition-colors ${
                darkMode
                  ? 'border-gray-800 text-gray-100 focus:border-teal-500'
                  : 'border-gray-300 text-gray-900 focus:border-teal-600'
              } focus:outline-none placeholder-gray-400`}
              style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}
              value={dateInput}
              onChange={handleDateInputChange}
              onKeyPress={handleKeyPress}
              placeholder="1990/01/15"
              maxLength={10}
              ref={dateInputRef}
            />
            <div className="flex justify-end">
              {dateError ? (
                <span className={`text-sm ${darkMode ? 'text-teal-400' : 'text-teal-700'}`} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>
                  {dateError}
                </span>
              ) : (
                <button
                  onClick={handleClick}
                  className={`text-sm transition-opacity disabled:opacity-20 disabled:cursor-not-allowed ${
                    darkMode ? 'text-teal-400 hover:opacity-70' : 'text-teal-700 hover:opacity-70'
                  }`}
                  style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}
                  disabled={!birthdate}
                >
                  {isBirthdayToday() ? 'Happy Birthday!' : t('visualizeButton')} →
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
