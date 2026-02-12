import { Sprout, Leaf, TreeDeciduous, TreePine } from 'lucide-react';

export const getTreeStage = (weekNumber) => {
  if (weekNumber <= 200) return 'Seed';
  if (weekNumber <= 400) return 'Sprout';
  if (weekNumber <= 700) return 'Sapling';
  if (weekNumber <= 1000) return 'Young Tree';
  if (weekNumber <= 1400) return 'Branching';
  if (weekNumber <= 1900) return 'Canopy';
  if (weekNumber <= 2500) return 'Fruiting';
  return 'Seasonal';
};

export const getTreeIcon = (stage) => {
  switch (stage) {
    case 'Seed': return Sprout;
    case 'Sprout': return Sprout;
    case 'Sapling': return Leaf;
    case 'Young Tree': return TreeDeciduous;
    case 'Branching': return TreeDeciduous;
    case 'Canopy': return TreePine;
    case 'Fruiting': return TreePine;
    case 'Seasonal': return TreePine;
    default: return TreeDeciduous;
  }
};

export const getTreeColor = (isPast, isCurrent, stage, darkMode) => {
  if (isCurrent) return darkMode ? 'text-orange-400' : 'text-orange-500';
  if (!isPast) return darkMode ? 'text-gray-700' : 'text-gray-300';

  switch (stage) {
    case 'Seed': return darkMode ? 'text-teal-400' : 'text-teal-600';
    case 'Sprout': return darkMode ? 'text-teal-500' : 'text-teal-700';
    case 'Sapling': return darkMode ? 'text-cyan-500' : 'text-cyan-600';
    case 'Young Tree': return darkMode ? 'text-cyan-600' : 'text-cyan-700';
    case 'Branching': return darkMode ? 'text-sky-500' : 'text-sky-600';
    case 'Canopy': return darkMode ? 'text-teal-600' : 'text-teal-700';
    case 'Fruiting': return darkMode ? 'text-cyan-700' : 'text-cyan-800';
    case 'Seasonal': return darkMode ? 'text-sky-600' : 'text-sky-700';
    default: return darkMode ? 'text-teal-500' : 'text-teal-600';
  }
};
