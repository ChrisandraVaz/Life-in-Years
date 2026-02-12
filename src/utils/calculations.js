// World population estimates by year (in billions)
const POPULATION_DATA = {
  1950: 2.5,
  1960: 3.0,
  1970: 3.7,
  1980: 4.4,
  1990: 5.3,
  2000: 6.1,
  2010: 6.9,
  2020: 7.8,
  2025: 8.1
};

export const getPopulationAtYear = (year) => {
  const years = Object.keys(POPULATION_DATA).map(Number);
  const closestYear = years.reduce((prev, curr) =>
    Math.abs(curr - year) < Math.abs(prev - year) ? curr : prev
  );
  return Math.round(POPULATION_DATA[closestYear] * 1000000000);
};

export const getAverageBirthsPerDay = () => 385000;

export const getAverageDeathsPerDay = () => 166000;

export const calculateStats = (date) => {
  const birthDate = new Date(date);
  const today = new Date();
  const birthYear = birthDate.getFullYear();

  const msInWeek = 1000 * 60 * 60 * 24 * 7;
  const weeksLived = Math.floor((today - birthDate) / msInWeek);

  const totalWeeks = 4160; // ~80 years
  const weeksRemaining = totalWeeks - weeksLived;
  const percentageLived = Math.round((weeksLived / totalWeeks) * 100);

  const msInDay = 1000 * 60 * 60 * 24;
  const daysLived = Math.floor((today - birthDate) / msInDay);

  const hoursSlept = Math.floor(daysLived * 8);
  const heartbeats = Math.floor(daysLived * 24 * 60 * 70);
  const breaths = Math.floor(daysLived * 24 * 60 * 16);
  const seasons = Math.floor(daysLived / 91.25);

  return {
    weeksLived,
    totalWeeks,
    weeksRemaining,
    percentageLived,
    daysLived,
    hoursSlept,
    heartbeats,
    breaths,
    seasons,
    birthYear
  };
};

export const getDaysUntilBirthday = (birthdate) => {
  if (!birthdate) return null;
  const birth = new Date(birthdate);
  const today = new Date();
  const nextBirthday = new Date(today.getFullYear(), birth.getMonth(), birth.getDate());

  if (nextBirthday < today) {
    nextBirthday.setFullYear(today.getFullYear() + 1);
  }

  const diffTime = nextBirthday - today;
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getWeekDate = (weekNumber, birthdate) => {
  if (!birthdate) return null;
  const birthDate = new Date(birthdate);
  return new Date(birthDate.getTime() + (weekNumber * 7 * 24 * 60 * 60 * 1000));
};

export const getAgeAtWeek = (weekNumber) => {
  const years = Math.floor(weekNumber / 52);
  const weeks = weekNumber % 52;
  return { years, weeks };
};
