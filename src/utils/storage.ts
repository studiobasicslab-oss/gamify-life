import { GameState } from '../types';

const STORAGE_KEY = 'gamify_life_save_state_v1';

export const INITIAL_STATE: GameState = {
  character: {
    name: 'Hero',
    title: 'Wanderer of Horizons',
    avatarId: 'unicorn_knight',
  },
  level: 1,
  currentXp: 45,
  xpToNextLevel: 100,
  totalXp: 45,
  gold: 60,
  soundEnabled: true,
  lastLoginDate: new Date().toISOString().split('T')[0],
  chestClaimedToday: false,
  stats: [
    { id: 'knowledge', name: 'Knowledge', level: 1, xp: 40, maxXp: 100, icon: '📘', color: '#3b6f99', barColor: '#6da678' },
    { id: 'health', name: 'Health', level: 1, xp: 60, maxXp: 100, icon: '🏋️', color: '#437c4e', barColor: '#6da678' },
    { id: 'focus', name: 'Focus', level: 1, xp: 35, maxXp: 100, icon: '🎯', color: '#9c5548', barColor: '#6da678' },
    { id: 'creativity', name: 'Creativity', level: 1, xp: 45, maxXp: 100, icon: '🎨', color: '#9c7b28', barColor: '#6da678' },
    { id: 'social', name: 'Social', level: 1, xp: 50, maxXp: 100, icon: '💬', color: '#8f4a88', barColor: '#6da678' },
    { id: 'discipline', name: 'Discipline', level: 1, xp: 30, maxXp: 100, icon: '🔒', color: '#4c4270', barColor: '#6da678' },
    { id: 'kindness', name: 'Kindness', level: 1, xp: 70, maxXp: 100, icon: '💖', color: '#dc2626', barColor: '#6da678' },
  ],
  actions: [
    { id: 'a1', title: 'Study / Learn', xp: 20, statId: 'knowledge', icon: '📖' },
    { id: 'a2', title: 'Exercise', xp: 20, statId: 'health', icon: '🏃' },
    { id: 'a3', title: 'Read', xp: 10, statId: 'knowledge', icon: '📚' },
    { id: 'a4', title: 'Practice a Skill', xp: 15, statId: 'creativity', icon: '🛠️' },
    { id: 'a5', title: 'Help Someone', xp: 15, statId: 'kindness', icon: '🤝' },
    { id: 'a6', title: 'Drink Water', xp: 5, statId: 'health', icon: '💧' },
    { id: 'a7', title: 'Wake Up Early', xp: 20, statId: 'discipline', icon: '⏰' },
    { id: 'a8', title: 'Stay Focused', xp: 20, statId: 'focus', icon: '🧠' },
    { id: 'a9', title: 'Try Something New', xp: 30, statId: 'creativity', icon: '🌟' },
    { id: 'a10', title: 'Take Care of Yourself', xp: 15, statId: 'kindness', icon: '🧘' },
  ],
  quests: [
    { id: 'q1', title: 'Read 1 book chapter today', xp: 25, gold: 15, statId: 'knowledge', frequency: 'daily', completed: false },
    { id: 'q2', title: 'Drink 8 glasses of fresh water', xp: 20, gold: 10, statId: 'health', frequency: 'daily', completed: false },
    { id: 'q3', title: '45-minute deep focus session', xp: 30, gold: 20, statId: 'focus', frequency: 'daily', completed: false },
    { id: 'q4', title: 'Read 1 entire book this week', xp: 60, gold: 40, statId: 'knowledge', frequency: 'weekly', completed: false },
    { id: 'q5', title: 'Call a friend or family member', xp: 25, gold: 15, statId: 'social', frequency: 'weekly', completed: false },
  ],
  rewards: [
    { id: 'r1', title: 'Watch a Movie', icon: '📺', cost: 40, redeemedCount: 0 },
    { id: 'r2', title: 'Enjoy a Treat', icon: '🍦', cost: 30, redeemedCount: 0 },
    { id: 'r3', title: 'Play a Game', icon: '🎮', cost: 40, redeemedCount: 0 },
    { id: 'r4', title: 'Go Somewhere New', icon: '🗺️', cost: 70, redeemedCount: 0 },
    { id: 'r5', title: 'Take a Break', icon: '☕', cost: 20, redeemedCount: 0 },
    { id: 'r6', title: 'Buy Something You Love', icon: '🛍️', cost: 100, redeemedCount: 0 },
    { id: 'r7', title: 'Do Whatever Makes You Happy', icon: '💖', cost: 50, redeemedCount: 0 },
  ],
  history: {},
};

export function loadSavedState(): GameState {
  if (typeof window === 'undefined') return INITIAL_STATE;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return INITIAL_STATE;
    const parsed = JSON.parse(raw);
    const today = new Date().toISOString().split('T')[0];
    
    // Check if new day for chest reset
    if (parsed.lastLoginDate !== today) {
      parsed.lastLoginDate = today;
      parsed.chestClaimedToday = false;
      // Reset daily quests on new day
      if (Array.isArray(parsed.quests)) {
        parsed.quests = parsed.quests.map((q: any) => 
          q.frequency === 'daily' ? { ...q, completed: false } : q
        );
      }
    }

    return { ...INITIAL_STATE, ...parsed };
  } catch (e) {
    console.error('Failed to load save state, falling back to initial:', e);
    return INITIAL_STATE;
  }
}

export function saveStateToStorage(state: GameState): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state:', e);
  }
}

// Download retro cartridge save file
export function exportSaveFile(state: GameState) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
  const downloadAnchor = document.createElement('a');
  const dateStr = new Date().toISOString().split('T')[0];
  downloadAnchor.setAttribute('href', dataStr);
  downloadAnchor.setAttribute('download', `gamify_life_save_${dateStr}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

// Import cartridge save file
export function importSaveFile(file: File): Promise<GameState> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        if (!parsed.stats || !parsed.level) {
          throw new Error('Invalid save file format.');
        }
        resolve(parsed as GameState);
      } catch (err) {
        reject(err);
      }
    };
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}
