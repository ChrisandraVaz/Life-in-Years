import { t } from '../i18n/translations';
import { getFormattedNumber } from '../utils/formatting';
import { getPopulationAtYear, getAverageBirthsPerDay, getAverageDeathsPerDay } from '../utils/calculations';

function StatSection({ title, children, darkMode }) {
  return (
    <div className={`pt-12 border-t transition-colors ${
      darkMode ? 'border-gray-800' : 'border-gray-200'
    }`}>
      <h2
        className={`text-xs uppercase tracking-wider mb-6 ${darkMode ? 'text-gray-600' : 'text-gray-400'}`}
        style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}
      >
        {title}
      </h2>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function StatText({ children, darkMode }) {
  return (
    <p
      className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
      style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
    >
      {children}
    </p>
  );
}

function Highlight({ children, darkMode }) {
  return (
    <span className={`font-medium ${darkMode ? 'text-cyan-400' : 'text-cyan-700'}`}>
      {children}
    </span>
  );
}

export default function StatsPanel({ stats, darkMode }) {
  if (!stats) return null;

  return (
    <div className="mt-12 space-y-8">
      {/* Life Highlights */}
      <StatSection title={t('lifeHighlightsTitle')} darkMode={darkMode}>
        <StatText darkMode={darkMode}>
          {t('lifeHighlightsWeeks')} <Highlight darkMode={darkMode}>{getFormattedNumber(stats.weeksLived)}</Highlight> {t('lifeHighlightsWeeksEnd')} <Highlight darkMode={darkMode}>{stats.percentageLived}%</Highlight> {t('lifeHighlightsPercent')}
        </StatText>
        <StatText darkMode={darkMode}>
          {t('lifeHighlightsDays')} <Highlight darkMode={darkMode}>{getFormattedNumber(stats.daysLived)}</Highlight> {t('lifeHighlightsDaysEnd')} <Highlight darkMode={darkMode}>{getFormattedNumber(stats.seasons)}</Highlight> {t('lifeHighlightsSeasonsEnd')}
        </StatText>
        <StatText darkMode={darkMode}>
          {t('lifeHighlightsHeartbeats')} <Highlight darkMode={darkMode}>{getFormattedNumber(stats.heartbeats)}</Highlight> {t('lifeHighlightsHeartbeatsEnd')}
        </StatText>
        <StatText darkMode={darkMode}>
          {t('lifeHighlightsBreaths')} <Highlight darkMode={darkMode}>{getFormattedNumber(stats.breaths)}</Highlight> {t('lifeHighlightsBreathsMiddle')} <Highlight darkMode={darkMode}>{getFormattedNumber(stats.hoursSlept)}</Highlight> {t('lifeHighlightsBreathsEnd')}
        </StatText>
      </StatSection>

      {/* Societal Context */}
      <StatSection title={t('societalContextTitle')} darkMode={darkMode}>
        <StatText darkMode={darkMode}>
          {t('societalPopulation')} {stats.birthYear ? <Highlight darkMode={darkMode}>{getFormattedNumber(getPopulationAtYear(stats.birthYear))}</Highlight> : ""} {t('societalPopulationEnd')} <Highlight darkMode={darkMode}>8</Highlight> {t('societalPopulationFinal')}
        </StatText>
        <StatText darkMode={darkMode}>
          {t('societalMeetings')} <Highlight darkMode={darkMode}>80,000</Highlight> {t('societalMeetingsMiddle')} <Highlight darkMode={darkMode}>{getFormattedNumber(Math.round(80000 * (stats.percentageLived / 100)))}</Highlight> {t('societalMeetingsEnd')}
        </StatText>
        <StatText darkMode={darkMode}>
          {t('societalBirthsDeaths')} <Highlight darkMode={darkMode}>{getFormattedNumber(Math.round(stats.daysLived * getAverageBirthsPerDay()))}</Highlight> {t('societalBirthsMiddle')} <Highlight darkMode={darkMode}>{getFormattedNumber(Math.round(stats.daysLived * getAverageDeathsPerDay()))}</Highlight> {t('societalDeathsEnd')}
        </StatText>
      </StatSection>

      {/* Cosmic Perspective */}
      <StatSection title={t('cosmicPerspectiveTitle')} darkMode={darkMode}>
        <StatText darkMode={darkMode}>
          {t('cosmicEarthTravel')} <Highlight darkMode={darkMode}>{getFormattedNumber(Math.round(stats.daysLived * 1.6 * 1000000))}</Highlight> {t('cosmicEarthTravelEnd')}
        </StatText>
        <StatText darkMode={darkMode}>
          {t('cosmicUniverse')} <Highlight darkMode={darkMode}>93</Highlight> {t('cosmicUniverseMiddle')} <Highlight darkMode={darkMode}>93</Highlight> {t('cosmicUniverseMiddle2')} <Highlight darkMode={darkMode}>{(80 / 13800000000 * 100).toFixed(10)}%</Highlight> {t('cosmicUniverseEnd')}
        </StatText>
        <StatText darkMode={darkMode}>
          {t('cosmicSolarSystem')} <Highlight darkMode={darkMode}>{getFormattedNumber(Math.round(stats.daysLived * 24 * 828000))}</Highlight> {t('cosmicSolarSystemEnd')}
        </StatText>
      </StatSection>

      {/* Natural World */}
      <StatSection title={t('naturalWorldTitle')} darkMode={darkMode}>
        <StatText darkMode={darkMode}>
          {t('naturalLunarCycles')} <Highlight darkMode={darkMode}>{getFormattedNumber(Math.round(stats.daysLived / 29.53))}</Highlight> {t('naturalLunarMiddle')} <Highlight darkMode={darkMode}>{getFormattedNumber(Math.floor(stats.daysLived / 365.25))}</Highlight> {t('naturalLunarEnd')}
        </StatText>
        <StatText darkMode={darkMode}>
          {t('naturalSequoia')} <Highlight darkMode={darkMode}>{((stats.daysLived / 365.25) / 3000 * 100).toFixed(2)}%</Highlight> {t('naturalSequoiaEnd')}
        </StatText>
        <StatText darkMode={darkMode}>
          {t('naturalCells')}
        </StatText>
      </StatSection>
    </div>
  );
}
