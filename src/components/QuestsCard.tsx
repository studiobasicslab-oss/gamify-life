import React, { useState } from 'react';
import { Quest, Stat } from '../types';
import { Plus, Check, X, Scroll } from 'lucide-react';

interface QuestsCardProps {
  quests: Quest[];
  stats: Stat[];
  onToggleQuest: (quest: Quest, e: React.MouseEvent) => void;
  onAddQuest: (quest: Omit<Quest, 'id' | 'completed'>) => void;
  onDeleteQuest: (id: string) => void;
  onPlayClickSound: () => void;
}

export const QuestsCard: React.FC<QuestsCardProps> = ({
  quests,
  stats,
  onToggleQuest,
  onAddQuest,
  onDeleteQuest,
  onPlayClickSound,
}) => {
  const [filter, setFilter] = useState<'all' | 'daily' | 'weekly'>('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [xp, setXp] = useState(35);
  const [gold, setGold] = useState(15);
  const [frequency, setFrequency] = useState<'daily' | 'weekly' | 'custom'>('daily');
  const [statId, setStatId] = useState(stats[0]?.id || 'knowledge');

  const filteredQuests = quests.filter((q) => {
    if (filter === 'daily') return q.frequency === 'daily';
    if (filter === 'weekly') return q.frequency === 'weekly';
    return true;
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onPlayClickSound();
    onAddQuest({
      title: title.trim(),
      xp: Number(xp) || 20,
      gold: Number(gold) || 10,
      frequency,
      statId,
    });
    setTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-[#fdf0ed] border-2 sm:border-[3px] border-[#2d2740] shadow-pixel p-4 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b-2 border-dashed border-[#d8a89f]">
          <div className="flex items-center gap-2">
            <span className="text-lg">📜</span>
            <h2 className="font-pixel text-xs sm:text-sm text-[#9c5548] tracking-wider uppercase">
              5. QUESTS & MISSIONS
            </h2>
          </div>
          <button
            onClick={() => {
              onPlayClickSound();
              setShowAddModal(true);
            }}
            className="p-1 px-2 bg-[#ffffff] hover:bg-[#fdf0ed] border border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] font-retro text-[10px] sm:text-xs flex items-center gap-1 text-[#9c5548]"
            title="Create Quest"
          >
            <Plus size={12} />
            <span>NEW QUEST</span>
          </button>
        </div>

        <p className="font-retro text-[11px] text-[#74352b] font-bold text-center mb-3 uppercase tracking-wider">
          TURN BIG GOALS INTO QUESTS!
        </p>

        {/* Vintage RPG Scroll Frame for Main / Featured Quest */}
        <div className="relative mx-auto mb-4 p-4 bg-[#fcedd2] border-2 border-[#8c673d] shadow-pixel-sm rounded-sm">
          {/* Scroll curled pins */}
          <div className="absolute -top-2 left-2 w-4 h-2 bg-[#d1a674] border border-[#8c673d]"></div>
          <div className="absolute -top-2 right-2 w-4 h-2 bg-[#d1a674] border border-[#8c673d]"></div>
          <div className="absolute -bottom-2 left-2 w-4 h-2 bg-[#d1a674] border border-[#8c673d]"></div>
          <div className="absolute -bottom-2 right-2 w-4 h-2 bg-[#d1a674] border border-[#8c673d]"></div>

          <div className="text-center">
            <span className="font-retro text-[10px] text-[#8c673d] uppercase font-bold tracking-widest block">
              ACTIVE MAIN MISSION:
            </span>
            <h3 className="font-pixel text-xs sm:text-sm text-[#3f2a1d] my-1.5 leading-snug">
              READ 1 BOOK THIS WEEK
            </h3>
            <span className="inline-block font-retro text-xs font-bold text-[#b45309] bg-[#fff6e6] px-2 py-0.5 border border-[#8c673d]">
              REWARD: +50 XP 💎 +25 GOLD
            </span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1 mb-2">
          {(['all', 'daily', 'weekly'] as const).map((t) => (
            <button
              key={t}
              onClick={() => {
                onPlayClickSound();
                setFilter(t);
              }}
              className={`px-2 py-0.5 font-retro text-[10px] uppercase border border-[#2d2740] ${
                filter === t
                  ? 'bg-[#9c5548] text-white font-bold'
                  : 'bg-white text-[#2d2740] hover:bg-gray-100'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Quests list */}
        <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
          {filteredQuests.length === 0 ? (
            <div className="text-center py-4 bg-white/60 border border-dashed border-[#d8a89f]">
              <Scroll className="mx-auto text-[#9c5548] mb-1 opacity-60" size={24} />
              <p className="font-retro text-xs text-gray-500">No quests found in this category.</p>
            </div>
          ) : (
            filteredQuests.map((quest) => (
              <div
                key={quest.id}
                className={`p-2 border border-[#2d2740] shadow-pixel-sm transition-all flex items-center justify-between gap-2 ${
                  quest.completed
                    ? 'bg-[#e5e7eb] opacity-70 line-through'
                    : 'bg-white hover:bg-[#fff7f5]'
                }`}
              >
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <button
                    onClick={(e) => onToggleQuest(quest, e)}
                    className={`w-5 h-5 border-2 border-[#2d2740] flex items-center justify-center shrink-0 ${
                      quest.completed ? 'bg-[#9c5548] text-white' : 'bg-white'
                    }`}
                  >
                    {quest.completed && <Check size={14} strokeWidth={3} />}
                  </button>
                  <div className="truncate">
                    <p className="font-retro text-xs font-bold text-[#2d2740] truncate">
                      {quest.title}
                    </p>
                    <span className="font-retro text-[9px] text-[#9c5548] uppercase tracking-wide">
                      {quest.frequency} • +{quest.xp} XP • +{quest.gold} Gold
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => onDeleteQuest(quest.id)}
                  className="text-gray-400 hover:text-red-500 p-1"
                  title="Remove Quest"
                >
                  <X size={12} />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="mt-4 p-2 bg-[#ffffff] border border-[#2d2740] flex items-center justify-between">
        <p className="font-retro text-[10px] sm:text-[11px] text-[#9c5548] font-bold">
          BREAK BIG GOALS INTO SMALL MISSIONS AND COMPLETE THEM ONE BY ONE.
        </p>
        <span className="text-sm">📖</span>
      </div>

      {/* Add Quest Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[#fdf0ed] border-[3px] border-[#2d2740] shadow-pixel-lg max-w-sm w-full p-4 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 p-1 text-[#2d2740] hover:bg-white"
            >
              <X size={16} />
            </button>
            <h3 className="font-pixel text-xs text-[#9c5548] uppercase mb-3">
              Create New Quest
            </h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-retro text-xs text-[#2d2740] uppercase font-bold mb-1">
                  Quest Objective:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Complete chapter 4, 30 min run"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border-2 border-[#2d2740] font-retro text-xs text-[#2d2740] outline-none"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-retro text-xs text-[#2d2740] uppercase font-bold mb-1">
                    Frequency:
                  </label>
                  <select
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value as any)}
                    className="w-full px-2 py-1 bg-white border-2 border-[#2d2740] font-retro text-xs text-[#2d2740] outline-none"
                  >
                    <option value="daily">Daily Quest</option>
                    <option value="weekly">Weekly Mission</option>
                    <option value="custom">Epic Goal</option>
                  </select>
                </div>
                <div>
                  <label className="block font-retro text-xs text-[#2d2740] uppercase font-bold mb-1">
                    XP Reward:
                  </label>
                  <input
                    type="number"
                    min="10"
                    max="200"
                    step="5"
                    value={xp}
                    onChange={(e) => setXp(Number(e.target.value))}
                    className="w-full px-2 py-1 bg-white border-2 border-[#2d2740] font-retro text-xs text-[#2d2740] outline-none"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-3 py-1 font-retro text-xs bg-white border border-[#2d2740]"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="px-3 py-1 font-pixel text-xs bg-[#9c5548] text-white border border-[#2d2740] shadow-pixel-sm"
                >
                  START QUEST
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
