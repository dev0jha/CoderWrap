export const emojis = {
  wave: '👋',
  star: '⭐',
  fire: '🔥',
  rocket: '🚀',
  trophy: '🏆',
  heart: '❤️',
  sparkles: '✨',
  code: '💻',
  package: '📦',
  chart: '📊',
  calendar: '📅',
  party: '🎉',
  tada: '🎊',
  muscle: '💪',
  brain: '🧠',
  target: '🎯',
  lightning: '⚡',
  gem: '💎',
  crown: '👑',
  medal: '🏅',
};

export const welcomeMessages = [
  'Ready to see your coding journey?',
  'Let\'s unwrap your year in code!',
  'Time to celebrate your achievements!',
  'Your 2025 GitHub story awaits...',
  'Buckle up for your code highlights!',
];

export const commitMessages = {
  low: (count: number) => ({
    title: 'Every journey starts somewhere',
    message: `You made ${count} commits this year. Keep building!`,
    emoji: emojis.sparkles,
  }),
  medium: (count: number) => ({
    title: 'Steady progress!',
    message: `${count} commits show your dedication. Keep it up!`,
    emoji: emojis.fire,
  }),
  high: (count: number) => ({
    title: 'Commit champion!',
    message: `${count} commits! You're on fire this year!`,
    emoji: emojis.rocket,
  }),
  legendary: (count: number) => ({
    title: 'Legendary contributor!',
    message: `${count} commits! You're absolutely unstoppable!`,
    emoji: emojis.trophy,
  }),
};

export function getCommitMessage(count: number) {
  if (count < 50) return commitMessages.low(count);
  if (count < 200) return commitMessages.medium(count);
  if (count < 500) return commitMessages.high(count);
  return commitMessages.legendary(count);
}

export const repoMessages = {
  low: (count: number) => ({
    title: 'Building your portfolio',
    message: `${count} repositories and counting!`,
    emoji: emojis.package,
  }),
  medium: (count: number) => ({
    title: 'Diverse creator!',
    message: `${count} repos show your versatility!`,
    emoji: emojis.sparkles,
  }),
  high: (count: number) => ({
    title: 'Repository master!',
    message: `${count} repositories! You're a prolific creator!`,
    emoji: emojis.crown,
  }),
};

export function getRepoMessage(count: number) {
  if (count < 10) return repoMessages.low(count);
  if (count < 30) return repoMessages.medium(count);
  return repoMessages.high(count);
}

export const languageMessages: { [key: string]: string } = {
  JavaScript: 'The language of the web! 🌐',
  TypeScript: 'Type-safe and stellar! ✨',
  Python: 'Elegant and powerful! 🐍',
  Java: 'Enterprise champion! ☕',
  Go: 'Fast and efficient! ⚡',
  Rust: 'Blazingly fast! 🦀',
  'C++': 'Power and performance! 💪',
  C: 'The foundation! 🏗️',
  'C#': 'Modern and versatile! 🎯',
  Ruby: 'Elegant and expressive! 💎',
  PHP: 'Powering the web! 🌐',
  Swift: 'Apple ecosystem master! 🍎',
  Kotlin: 'Modern JVM language! 🚀',
  Dart: 'Flutter wizard! 🎨',
  default: 'Expanding your horizons! 🌟',
};

export function getLanguageMessage(language: string): string {
  return languageMessages[language] || languageMessages.default;
}

export const streakMessages = {
  noStreak: {
    title: 'Ready for consistency?',
    message: 'Start a streak today and watch it grow!',
    emoji: emojis.target,
  },
  building: (days: number) => ({
    title: 'Building momentum!',
    message: `${days} days of coding! Keep the streak alive!`,
    emoji: emojis.fire,
  }),
  strong: (days: number) => ({
    title: 'Consistency is key!',
    message: `${days} days strong! You're dedicated!`,
    emoji: emojis.muscle,
  }),
  legendary: (days: number) => ({
    title: 'Legendary dedication!',
    message: `${days} days! Nothing can stop you!`,
    emoji: emojis.trophy,
  }),
};

export function getStreakMessage(days: number) {
  if (days === 0) return streakMessages.noStreak;
  if (days < 7) return streakMessages.building(days);
  if (days < 30) return streakMessages.strong(days);
  return streakMessages.legendary(days);
}

export const communityMessages = {
  stars: (count: number) => {
    if (count === 0) return 'Your next star is just around the corner!';
    if (count < 10) return `${count} star${count === 1 ? '' : 's'}! Your work is appreciated! ⭐`;
    if (count < 50) return `${count} stars! People love your work! ✨`;
    if (count < 100) return `${count} stars! You're making an impact! 🌟`;
    return `${count} stars! You're a community favorite! 👑`;
  },
  followers: (count: number) => {
    if (count === 0) return 'Your community is growing!';
    if (count < 10) return `${count} follower${count === 1 ? '' : 's'} supporting your journey!`;
    if (count < 50) return `${count} followers! You're building influence!`;
    if (count < 100) return `${count} followers! You're an inspiration!`;
    return `${count} followers! You're a community leader!`;
  },
};

export const finalMessages = [
  {
    title: '2025: A Year of Code',
    message: 'You turned ideas into reality, one commit at a time.',
    emoji: emojis.sparkles,
  },
  {
    title: 'Keep Building',
    message: 'Every line of code is a step toward something amazing.',
    emoji: emojis.rocket,
  },
  {
    title: 'Your Impact Matters',
    message: 'You\'re not just writing code, you\'re creating the future.',
    emoji: emojis.heart,
  },
];

export function getRandomFinalMessage() {
  return finalMessages[Math.floor(Math.random() * finalMessages.length)];
}

export const shareMessages = {
  title: 'Share Your Wrapped!',
  subtitle: 'Show the world what you\'ve accomplished this year',
  cta: 'Share on Twitter',
};

export function generateShareText(username: string, stats: {
  commits: number;
  repos: number;
  language: string;
  streak: number;
}): string {
  return `🎉 My 2025 GitHub Wrapped!\n\n` +
    `💻 ${stats.commits} commits\n` +
    `📦 ${stats.repos} repositories\n` +
    `🔥 ${stats.language} is my top language\n` +
    `⚡ ${stats.streak}-day streak\n\n` +
    `Check out your own GitHub Wrapped! 🚀`;
}
