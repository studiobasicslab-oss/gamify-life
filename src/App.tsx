import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { GameState, Action, Quest, Reward, Stat, Character } from './types';
import { loadSavedState, saveStateToStorage, INITIAL_STATE } from './utils/storage';
import { soundManager } from './utils/sound';

import { Header } from './components/Header';
import { CharacterCard } from './components/CharacterCard';
import { StatsCard } from './components/StatsCard';
import { EarnXpCard } from './components/EarnXpCard';
import { LevelCard } from './components/LevelCard';
import { QuestsCard } from './components/QuestsCard';
import { RewardsCard } from './components/RewardsCard';
import { ProgressSummaryCard } from './components/ProgressSummaryCard';
import { MemoryCardModal } from './components/MemoryCardModal';
import { LevelUpModal } from './components/LevelUpModal';
import { CampfireStreak } from './components/CampfireStreak';
import { QuestCalendarModal } from './components/QuestCalendarModal';
import { FloatingXpEffect, FloatingItem } from './components/FloatingXpEffect';
import { Download, Sparkles } from 'lucide-react';

export const App: React.FC = () => {
  const [state, setState] = useState<GameState>(() => loadSavedState());
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showCalendarModal, setShowCalendarModal] = useState(false);
  const [showLevelUpModal, setShowLevelUpModal] = useState(false);
  const [floatingItems, setFloatingItems] = useState<FloatingItem[]>([]);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'actions' | 'quests' | 'rewards'>('all');

  // Auto-save on state change
  useEffect(() => {
    saveStateToStorage(state);
  }, [state]);

  // Listen for PWA install prompt
  useEffect(() => {
    const handleBeforeInstall = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handleBeforeInstall);
    return () => window.removeEventListener('beforeinstallprompt', handleBeforeInstall);
  }, []);

  const handleInstallApp = async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } else {
      alert('To install on iOS: Tap Share 📤 then "Add to Home Screen". On Android/Chrome: Tap browser menu (⋮) -> "Install App"');
    }
  };

  // Sound helper that respects user setting
  const playSound = useCallback((fn: () => void) => {
    if (state.soundEnabled) {
      fn();
    }
  }, [state.soundEnabled]);

  const addFloatingText = (text: string, x: number, y: number, color?: string) => {
    const id = Date.now().toString() + Math.random().toString();
    setFloatingItems((prev) => [...prev, { id, text, x, y, color }]);
    setTimeout(() => {
      setFloatingItems((prev) => prev.filter((item) => item.id !== id));
    }, 1200);
  };

  // Core XP & Level up engine
  const addXpAndRewards = (xpGain: number, goldGain: number = 0, statId?: string) => {
    setState((prev) => {
      let newCurrentXp = prev.currentXp + xpGain;
      let newTotalXp = prev.totalXp + xpGain;
      let newLevel = prev.level;
      let newXpToNext = prev.xpToNextLevel;
      let leveledUp = false;
      let bonusGold = 0;

      // Check level threshold (every 100 XP * level)
      while (newCurrentXp >= newXpToNext) {
        newCurrentXp -= newXpToNext;
        newLevel += 1;
        newXpToNext = 100 * newLevel; // Progressive milestones
        bonusGold += 50; // Bonus gold on level up!
        leveledUp = true;
      }

      // Also level up the linked stat if provided
      let updatedStats = [...prev.stats];
      if (statId) {
        updatedStats = updatedStats.map((st) => {
          if (st.id === statId) {
            let sXp = st.xp + xpGain;
            let sLvl = st.level;
            let sMax = st.maxXp;
            if (sXp >= sMax) {
              sXp -= sMax;
              sLvl += 1;
              sMax = Math.round(sMax * 1.2);
            }
            return { ...st, xp: sXp, level: sLvl, maxXp: sMax };
          }
          return st;
        });
      }

      if (leveledUp) {
        setTimeout(() => {
          playSound(() => soundManager.playLevelUp());
          confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
          });
          setShowLevelUpModal(true);
        }, 100);
      }

      const today = new Date().toISOString().split('T')[0];
      const prevDayLog = prev.history[today] || {
        date: today,
        xpEarned: 0,
        questsCompleted: 0,
      };

      // Calculate Cozy Campfire Streak (No penalty for rest days)
      let newStreak = prev.streak || 1;
      let newRestDays = prev.restDays || 0;
      if (prev.lastActiveDate && prev.lastActiveDate !== today) {
        const lastDate = new Date(prev.lastActiveDate);
        const curDate = new Date(today);
        const diffTime = Math.abs(curDate.getTime() - lastDate.getTime());
        const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          newStreak += 1;
        } else if (diffDays > 1) {
          // Rest days taken - streak continues without resetting to 0!
          newRestDays += (diffDays - 1);
          newStreak += 1;
        }
      }

      return {
        ...prev,
        level: newLevel,
        currentXp: newCurrentXp,
        xpToNextLevel: newXpToNext,
        totalXp: newTotalXp,
        gold: prev.gold + goldGain + bonusGold,
        stats: updatedStats,
        lastActiveDate: today,
        streak: newStreak,
        restDays: newRestDays,
        history: {
          ...prev.history,
          [today]: {
            ...prevDayLog,
            xpEarned: prevDayLog.xpEarned + xpGain,
          },
        },
      };
    });
  };

  // Action Click Handler
  const handleTriggerAction = (action: Action, e: React.MouseEvent) => {
    playSound(() => soundManager.playXpGain());
    addFloatingText(`+${action.xp} XP`, e.clientX, e.clientY);
    addXpAndRewards(action.xp, Math.round(action.xp / 2), action.statId);
  };

  // Quest Toggle Handler
  const handleToggleQuest = (quest: Quest, e: React.MouseEvent) => {
    const willComplete = !quest.completed;
    if (willComplete) {
      playSound(() => soundManager.playQuestComplete());
      addFloatingText(`+${quest.xp} XP 🪙+${quest.gold}`, e.clientX, e.clientY);
      addXpAndRewards(quest.xp, quest.gold, quest.statId);
    } else {
      playSound(() => soundManager.playClick());
    }

    setState((prev) => {
      const today = new Date().toISOString().split('T')[0];
      const prevLog = prev.history[today] || {
        date: today,
        xpEarned: 0,
        questsCompleted: 0,
      };

      return {
        ...prev,
        quests: prev.quests.map((q) =>
          q.id === quest.id ? { ...q, completed: willComplete } : q
        ),
        history: {
          ...prev.history,
          [today]: {
            ...prevLog,
            questsCompleted: Math.max(
              0,
              prevLog.questsCompleted + (willComplete ? 1 : -1)
            ),
          },
        },
      };
    });
  };

  // Reward Redeem Handler
  const handleRedeemReward = (reward: Reward, e: React.MouseEvent) => {
    if (state.gold < reward.cost) return;
    playSound(() => soundManager.playChestOpen());
    addFloatingText(`🎉 ENJOY! -${reward.cost} Gold`, e.clientX, e.clientY);
    confetti({
      particleCount: 40,
      spread: 45,
      origin: { y: 0.7 },
    });

    setState((prev) => ({
      ...prev,
      gold: prev.gold - reward.cost,
      rewards: prev.rewards.map((r) =>
        r.id === reward.id ? { ...r, redeemedCount: r.redeemedCount + 1 } : r
      ),
    }));
  };

  // Daily Treasure Chest Click
  const handleOpenChest = (e: React.MouseEvent) => {
    if (state.chestClaimedToday) return;
    playSound(() => soundManager.playChestOpen());
    addFloatingText('+30 XP 🪙+25 Gold!', e.clientX, e.clientY);
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.65 },
    });

    setState((prev) => ({
      ...prev,
      chestClaimedToday: true,
    }));
    addXpAndRewards(30, 25);
  };

  return (
    <div className="min-h-screen bg-[#fcf6ea] text-[#2d2740] pb-16 px-3 sm:px-6 max-w-7xl mx-auto font-retro">
      {/* PWA Floating Install Pill (for mobile & desktop) */}
      <div className="pt-2 flex justify-center">
        <button
          onClick={handleInstallApp}
          className="px-3 py-1 bg-[#ffffff] hover:bg-[#fdf6db] border-2 border-[#2d2740] shadow-pixel-sm font-retro text-[11px] font-bold text-[#2d2740] flex items-center gap-1.5 active:translate-x-[1px] active:translate-y-[1px]"
        >
          <Download size={13} />
          <span>INSTALL APP TO PHONE / DESKTOP (PWA)</span>
          <Sparkles size={12} className="text-[#eab308]" />
        </button>
      </div>

      {/* Main Header */}
      <Header
        soundEnabled={state.soundEnabled}
        onToggleSound={() =>
          setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }))
        }
        onOpenSaveModal={() => setShowSaveModal(true)}
        onOpenCalendar={() => setShowCalendarModal(true)}
        onReset={() => {
          if (window.confirm('Restart game from beginning?')) {
            setState(INITIAL_STATE);
          }
        }}
      />

      {/* Cozy Campfire Streak (No Penalty for Rest Days) */}
      <CampfireStreak
        streak={state.streak || 1}
        restDays={state.restDays || 0}
        isActiveToday={Boolean((state.history[new Date().toISOString().split('T')[0]]?.xpEarned || 0) > 0)}
      />

      {/* Mobile Quick-View Tabs (when on small screens) */}
      <div className="flex md:hidden gap-1 mb-4 overflow-x-auto pb-1">
        {(['all', 'actions', 'quests', 'rewards'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => {
              playSound(() => soundManager.playClick());
              setActiveTab(tab);
            }}
            className={`px-3 py-1 font-retro text-xs uppercase border-2 border-[#2d2740] shrink-0 ${
              activeTab === tab
                ? 'bg-[#2d2740] text-white font-bold'
                : 'bg-white text-[#2d2740]'
            }`}
          >
            {tab === 'all' ? 'All Sections' : tab}
          </button>
        ))}
      </div>

      {/* Grid of the 7 sections matching the reference poster */}
      <div className="space-y-6">
        {/* ROW 1: 1. Choose Character | 2. Create Stats | 3. Earn XP */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
            activeTab === 'all' || activeTab === 'actions' ? '' : 'hidden md:grid'
          }`}
        >
          <CharacterCard
            character={state.character}
            onUpdateCharacter={(character: Character) =>
              setState((prev) => ({ ...prev, character }))
            }
            onPlayClickSound={() => playSound(() => soundManager.playClick())}
          />

          <StatsCard
            stats={state.stats}
            onAddStat={(newStat) =>
              setState((prev) => ({
                ...prev,
                stats: [
                  ...prev.stats,
                  { ...newStat, xp: 0, level: 1, maxXp: 100 },
                ],
              }))
            }
            onPlayClickSound={() => playSound(() => soundManager.playClick())}
          />

          <EarnXpCard
            actions={state.actions}
            stats={state.stats}
            onTriggerAction={handleTriggerAction}
            onAddAction={(newAction) =>
              setState((prev) => ({
                ...prev,
                actions: [
                  ...prev.actions,
                  { ...newAction, id: 'a_' + Date.now() },
                ],
              }))
            }
            onPlayClickSound={() => playSound(() => soundManager.playClick())}
          />
        </div>

        {/* ROW 2: 4. Level Up | 5. Quests & Missions | 6. Rewards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${
            activeTab === 'all' ||
            activeTab === 'quests' ||
            activeTab === 'rewards'
              ? ''
              : 'hidden md:grid'
          }`}
        >
          <div className={activeTab === 'quests' || activeTab === 'rewards' ? 'hidden md:block' : ''}>
            <LevelCard
              level={state.level}
              currentXp={state.currentXp}
              xpToNextLevel={state.xpToNextLevel}
              totalXp={state.totalXp}
            />
          </div>

          <div className={activeTab === 'rewards' ? 'hidden md:block' : ''}>
            <QuestsCard
              quests={state.quests}
              stats={state.stats}
              onToggleQuest={handleToggleQuest}
              onAddQuest={(newQuest) =>
                setState((prev) => ({
                  ...prev,
                  quests: [
                    ...prev.quests,
                    { ...newQuest, id: 'q_' + Date.now(), completed: false },
                  ],
                }))
              }
              onDeleteQuest={(id) =>
                setState((prev) => ({
                  ...prev,
                  quests: prev.quests.filter((q) => q.id !== id),
                }))
              }
              onPlayClickSound={() => playSound(() => soundManager.playClick())}
            />
          </div>

          <div className={activeTab === 'quests' ? 'hidden md:block' : ''}>
            <RewardsCard
              rewards={state.rewards}
              gold={state.gold}
              onRedeemReward={handleRedeemReward}
              onAddReward={(newReward) =>
                setState((prev) => ({
                  ...prev,
                  rewards: [
                    ...prev.rewards,
                    { ...newReward, id: 'r_' + Date.now(), redeemedCount: 0 },
                  ],
                }))
              }
              onPlayClickSound={() => playSound(() => soundManager.playClick())}
            />
          </div>
        </div>

        {/* ROW 3: 7. Track Progress & Today's Summary */}
        <div className={activeTab === 'all' ? '' : 'hidden md:block'}>
          <ProgressSummaryCard
            state={state}
            onOpenChest={handleOpenChest}
            onUpdateReflection={(reflection, tomorrowQuest) => {
              const today = new Date().toISOString().split('T')[0];
              setState((prev) => ({
                ...prev,
                history: {
                  ...prev.history,
                  [today]: {
                    ...(prev.history[today] || {
                      date: today,
                      xpEarned: prev.currentXp,
                      questsCompleted: prev.quests.filter((q) => q.completed).length,
                    }),
                    reflection,
                    tomorrowQuest,
                  },
                },
              }));
            }}
            onPlayClickSound={() => playSound(() => soundManager.playClick())}
          />
        </div>
      </div>

      {/* Floating XP Visual Effect */}
      <FloatingXpEffect items={floatingItems} />

      {/* Save Cartridge / Memory Card Modal */}
      {showSaveModal && (
        <MemoryCardModal
          state={state}
          onRestoreState={(restored) => setState(restored)}
          onResetState={() => setState(INITIAL_STATE)}
          onClose={() => setShowSaveModal(false)}
          onPlayClickSound={() => playSound(() => soundManager.playClick())}
        />
      )}

      {/* 8-Bit Quest Log & Calendar Modal */}
      {showCalendarModal && (
        <QuestCalendarModal
          history={state.history}
          onClose={() => setShowCalendarModal(false)}
          onPlayClickSound={() => playSound(() => soundManager.playClick())}
        />
      )}

      {/* Level Up Celebration Modal */}
      {showLevelUpModal && (
        <LevelUpModal
          level={state.level}
          avatarId={state.character.avatarId}
          onClose={() => setShowLevelUpModal(false)}
        />
      )}
    </div>
  );
};

