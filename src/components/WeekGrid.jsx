import { useState } from 'react';
import { Sprout, Leaf, TreeDeciduous, TreePine } from 'lucide-react';
import { getTreeStage, getTreeIcon, getTreeColor } from '../utils/treeTheme';
import { getWeekDate, getAgeAtWeek } from '../utils/calculations';

export default function WeekGrid({ stats, birthdate, darkMode }) {
  const [showHoverData, setShowHoverData] = useState(false);
  const [hoverWeek, setHoverWeek] = useState(null);

  if (!stats) return null;

  const rows = [];
  const weeksPerRow = 52;
  const totalRows = Math.ceil(stats.totalWeeks / weeksPerRow);

  for (let row = 0; row < totalRows; row++) {
    const weekCells = [];
    for (let col = 0; col < weeksPerRow; col++) {
      const weekNumber = row * weeksPerRow + col;
      if (weekNumber < stats.totalWeeks) {
        const isPast = weekNumber < stats.weeksLived;
        const isCurrent = weekNumber === stats.weeksLived;
        const stage = getTreeStage(weekNumber);
        const Icon = getTreeIcon(stage);
        const colorClass = getTreeColor(isPast, isCurrent, stage, darkMode);

        let iconClass = `transition-all ${colorClass} `;
        if (isCurrent) {
          iconClass += 'animate-pulse ';
        }

        weekCells.push(
          <div
            key={weekNumber}
            className="w-3 h-3 m-0.5 flex-shrink-0 relative group"
            onMouseEnter={() => {
              setHoverWeek(weekNumber);
              setShowHoverData(true);
            }}
            onMouseLeave={() => setShowHoverData(false)}
          >
            <Icon className={iconClass} size={12} strokeWidth={2} />

            {showHoverData && hoverWeek === weekNumber && (
              <div className={`absolute z-50 bottom-full mb-2 left-1/2 -translate-x-1/2 whitespace-nowrap px-3 py-2 rounded-lg backdrop-blur-md text-xs ${
                darkMode
                  ? 'bg-gray-800/80 text-gray-200 border border-gray-700/50'
                  : 'bg-white/80 text-gray-700 border border-gray-200/50'
              } shadow-lg`}>
                {(() => {
                  const weekDate = getWeekDate(weekNumber, birthdate);
                  const age = getAgeAtWeek(weekNumber);
                  return (
                    <div className="space-y-1">
                      <div className="font-medium">
                        {isCurrent ? 'Today' : `Week ${weekNumber + 1}`}
                      </div>
                      {weekDate && (
                        <div className="text-xs opacity-75">
                          {weekDate.toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </div>
                      )}
                      <div className="text-xs opacity-75">
                        Age {age.years}y {age.weeks}w
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        );
      }
    }

    rows.push(
      <div key={row} className="flex">
        {weekCells}
      </div>
    );
  }

  return (
    <div className="mt-6">
      <div className="flex flex-col" style={{ width: 'fit-content', margin: '0 auto', maxWidth: '100%', transform: 'scale(1)', transformOrigin: 'center top' }}>
        {rows}
      </div>

      {/* Legend */}
      <div className={`flex mt-8 pt-6 text-xs gap-6 flex-wrap border-t ${
        darkMode ? 'border-gray-800' : 'border-gray-200'
      }`} style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif' }}>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3"><Sprout className="text-teal-600" size={12} strokeWidth={2} /></div>
          <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Seed (0-200w)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3"><Leaf className="text-cyan-600" size={12} strokeWidth={2} /></div>
          <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Sapling (401-700w)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3"><TreeDeciduous className="text-sky-600" size={12} strokeWidth={2} /></div>
          <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Branching (1001-1400w)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3"><TreePine className="text-teal-700" size={12} strokeWidth={2} /></div>
          <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Canopy (1401-1900w)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3"><TreeDeciduous className="text-orange-500" size={12} strokeWidth={2} /></div>
          <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Current Week</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3"><TreeDeciduous className={darkMode ? 'text-gray-700' : 'text-gray-300'} size={12} strokeWidth={2} /></div>
          <span className={darkMode ? 'text-gray-500' : 'text-gray-500'}>Future</span>
        </div>
      </div>
    </div>
  );
}
