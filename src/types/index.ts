export type StatId = 
  | 'knowledge' 
  | 'health' 
  | 'focus' 
  | 'creativity' 
  | 'social' 
  | 'discipline' 
  | 'kindness' 
  | string;

export interface Stat {
  id: string;
  name: string;
  level: number;
  xp: number;
  maxXp: number;
  icon: string;
  color: string;
  barColor: string;
}

export interface Action {
  id: string;
  title: string;
  xp: number;
  statId: string;
  icon: string;
}

export interface Quest {
  id: string;
  title: string;
  xp: number;
  gold: number;
  statId: string;
  frequency: 'daily' | 'weekly' | 'custom';
  completed: boolean;
  completedAt?: string;
}

export interface Reward {
  id: string;
  title: string;
  icon: string;
  cost: number;
  redeemedCount: number;
}

export interface Character {
  name: string;
  title: string;
  avatarId: string;
}

export interface DayLog {
  date: string;
  xpEarned: number;
  questsCompleted: number;
  reflection?: string;
  tomorrowQuest?: string;
}

export interface GameState {
  character: Character;
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  totalXp: number;
  gold: number;
  stats: Stat[];
  actions: Action[];
  quests: Quest[];
  rewards: Reward[];
  soundEnabled: boolean;
  history: Record<string, DayLog>;
  lastLoginDate: string;
  chestClaimedToday: boolean;
}
