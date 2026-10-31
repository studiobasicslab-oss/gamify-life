import React, { useState } from 'react';
import { Stat } from '../types';
import { Plus, X } from 'lucide-react';

interface StatsCardProps {
  stats: Stat[];
  onAddStat: (stat: Omit<Stat, 'xp' | 'level' | 'maxXp'>) => void;
  onPlayClickSound: () => void;
}

export const StatsCard: React.FC<StatsCardProps> = ({
  stats,
  onAddStat,
  onPlayClickSound,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [newStatName, setNewStatName] = useState('');
  const [newStatIcon, setNewStatIcon] = useState('⚡');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStatName.trim()) return;
    onPlayClickSound();
    onAddStat({
      id: newStatName.toLowerCase().replace(/\s+/g, '_') + '_' + Date.now(),
      name: newStatName.trim(),
      icon: newStatIcon,
      color: '#437c4e',
      barColor: '#6da678',
    });
    setNewStatName('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-[#e9f7ea] border-2 sm:border-[3px] border-[#2d2740] shadow-pixel p-4 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-dashed border-[#88bf92]">
          <div className="flex items-center gap-2">
            <span className="text-lg">🛡️</span>
            <h2 className="font-pixel text-xs sm:text-sm text-[#437c4e] tracking-wider uppercase">
              2. YOUR STATS
            </h2>
          </div>
          <button
            onClick={() => {
              onPlayClickSound();
              setShowAddModal(true);
            }}
            className="p-1 px-2 bg-[#ffffff] hover:bg-[#e9f7ea] border border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] font-retro text-[10px] sm:text-xs flex items-center gap-1 text-[#437c4e]"
            title="Add Custom Stat"
          >
            <Plus size={12} />
            <span>NEW STAT</span>
          </button>
        </div>

        {/* Stats List */}
        <div className="space-y-2.5 my-2">
          {stats.map((stat) => {
            const percentage = Math.min(100, Math.round((stat.xp / stat.maxXp) * 100));
            return (
              <div key={stat.id} className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                {/* Stat label and icon */}
                <div className="flex items-center justify-between sm:w-36 shrink-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{stat.icon}</span>
                    <span className="font-retro text-xs font-bold text-[#2d2740] tracking-wider uppercase">
                      {stat.name}
                    </span>
                  </div>
                  <span className="font-retro text-[10px] text-[#437c4e] font-bold sm:hidden">
                    LVL {stat.level}
                  </span>
                </div>

                {/* Pixelated Progress Bar */}
                <div className="flex-1 flex items-center gap-2">
                  <div className="flex-1 h-4 bg-[#ffffff] border-2 border-[#2d2740] relative overflow-hidden p-[2px] shadow-pixel-sm">
                    {/* Retro segmented fill */}
                    <div
                      className="h-full bg-[#6da678] transition-all duration-300 relative"
                      style={{ width: `${percentage}%` }}
                    >
                      {/* Segmented pixel grid pattern */}
                      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_6px,rgba(45,39,64,0.3)_7px)] bg-[length:8px_100%] opacity-40"></div>
                    </div>
                  </div>
                  <span className="hidden sm:inline-block font-retro text-[10px] text-[#437c4e] font-bold w-12 text-right">
                    LVL {stat.level}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="mt-4 p-2 bg-[#ffffff] border border-[#2d2740] flex items-center justify-between">
        <p className="font-retro text-[10px] sm:text-[11px] text-[#437c4e] font-bold">
          IMPROVE YOUR STATS A LITTLE EVERYDAY.
        </p>
        <span className="text-sm">⬆️</span>
      </div>

      {/* Add Stat Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[#e9f7ea] border-[3px] border-[#2d2740] shadow-pixel-lg max-w-sm w-full p-4 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 p-1 text-[#2d2740] hover:bg-white"
            >
              <X size={16} />
            </button>
            <h3 className="font-pixel text-xs text-[#437c4e] uppercase mb-3">
              Add New Stat
            </h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-retro text-xs text-[#2d2740] uppercase font-bold mb-1">
                  Stat Name:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Coding, Meditation, Cooking"
                  value={newStatName}
                  onChange={(e) => setNewStatName(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border-2 border-[#2d2740] font-retro text-xs text-[#2d2740] outline-none"
                  autoFocus
                />
              </div>
              <div>
                <label className="block font-retro text-xs text-[#2d2740] uppercase font-bold mb-1">
                  Choose Icon:
                </label>
                <div className="flex gap-2 text-lg">
                  {['⚡', '💡', '🎵', '🌿', '🧘', '🔥', '⚔️'].map((ico) => (
                    <button
                      type="button"
                      key={ico}
                      onClick={() => setNewStatIcon(ico)}
                      className={`p-1 border ${
                        newStatIcon === ico ? 'border-[#2d2740] bg-white ring-1 ring-[#2d2740]' : 'border-transparent'
                      }`}
                    >
                      {ico}
                    </button>
                  ))}
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
                  className="px-3 py-1 font-pixel text-xs bg-[#437c4e] text-white border border-[#2d2740] shadow-pixel-sm"
                >
                  CREATE STAT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
