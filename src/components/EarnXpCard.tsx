import React, { useState } from 'react';
import { Action, Stat } from '../types';
import { Plus, X } from 'lucide-react';

interface EarnXpCardProps {
  actions: Action[];
  stats: Stat[];
  onTriggerAction: (action: Action, e: React.MouseEvent) => void;
  onAddAction: (action: Omit<Action, 'id'>) => void;
  onPlayClickSound: () => void;
}

export const EarnXpCard: React.FC<EarnXpCardProps> = ({
  actions,
  stats,
  onTriggerAction,
  onAddAction,
  onPlayClickSound,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [xp, setXp] = useState(15);
  const [statId, setStatId] = useState(stats[0]?.id || 'knowledge');
  const [icon, setIcon] = useState('⭐');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onPlayClickSound();
    onAddAction({
      title: title.trim(),
      xp: Number(xp) || 10,
      statId,
      icon,
    });
    setTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-[#fdf6db] border-2 sm:border-[3px] border-[#2d2740] shadow-pixel p-4 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b-2 border-dashed border-[#d1be7c]">
          <div className="flex items-center gap-2">
            <span className="text-lg">⭐</span>
            <h2 className="font-pixel text-xs sm:text-sm text-[#9c7b28] tracking-wider uppercase">
              3. EARN XP
            </h2>
          </div>
          <button
            onClick={() => {
              onPlayClickSound();
              setShowAddModal(true);
            }}
            className="p-1 px-2 bg-[#ffffff] hover:bg-[#fdf6db] border border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] font-retro text-[10px] sm:text-xs flex items-center gap-1 text-[#9c7b28]"
            title="Add Custom Action"
          >
            <Plus size={12} />
            <span>NEW ACTION</span>
          </button>
        </div>

        <p className="font-retro text-[11px] text-[#684a14] font-bold text-center mb-3 uppercase tracking-wider">
          YOU EARN XP BY TAKING ACTION!
        </p>

        {/* Action list with instant XP rewards */}
        <div className="space-y-1.5">
          {actions.map((act) => (
            <button
              key={act.id}
              onClick={(e) => onTriggerAction(act, e)}
              className="w-full flex items-center justify-between px-2.5 py-1.5 bg-[#ffffff] hover:bg-[#fff9e6] active:bg-[#fcebb0] border border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] transition-all text-left group"
            >
              <div className="flex items-center gap-2">
                <span className="text-base group-hover:scale-110 transition-transform">
                  {act.icon}
                </span>
                <span className="font-retro text-xs font-bold text-[#2d2740] uppercase tracking-wide">
                  {act.title}
                </span>
              </div>
              <span className="font-pixel text-[11px] text-[#9c7b28] bg-[#fdf6db] border border-[#d1be7c] px-1.5 py-0.5">
                +{act.xp} XP
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="mt-4 p-2 bg-[#ffffff] border border-[#2d2740] text-center">
        <p className="font-retro text-[10px] sm:text-[11px] text-[#9c7b28] font-bold">
          SMALL ACTIONS. BIG IMPACT. ✨
        </p>
      </div>

      {/* Add Action Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[#fdf6db] border-[3px] border-[#2d2740] shadow-pixel-lg max-w-sm w-full p-4 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 p-1 text-[#2d2740] hover:bg-white"
            >
              <X size={16} />
            </button>
            <h3 className="font-pixel text-xs text-[#9c7b28] uppercase mb-3">
              Add Quick Action
            </h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-retro text-xs text-[#2d2740] uppercase font-bold mb-1">
                  Action Title:
                </label>
                <input
                  type="text"
                  placeholder="e.g. Read 5 pages, Journal, Pushups"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border-2 border-[#2d2740] font-retro text-xs text-[#2d2740] outline-none"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-retro text-xs text-[#2d2740] uppercase font-bold mb-1">
                    XP Reward:
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    step="5"
                    value={xp}
                    onChange={(e) => setXp(Number(e.target.value))}
                    className="w-full px-2 py-1 bg-white border-2 border-[#2d2740] font-retro text-xs text-[#2d2740] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-retro text-xs text-[#2d2740] uppercase font-bold mb-1">
                    Icon:
                  </label>
                  <input
                    type="text"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    className="w-full px-2 py-1 bg-white border-2 border-[#2d2740] font-retro text-xs text-[#2d2740] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-retro text-xs text-[#2d2740] uppercase font-bold mb-1">
                  Connect to Stat:
                </label>
                <select
                  value={statId}
                  onChange={(e) => setStatId(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border-2 border-[#2d2740] font-retro text-xs text-[#2d2740] outline-none"
                >
                  {stats.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.icon} {s.name}
                    </option>
                  ))}
                </select>
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
                  className="px-3 py-1 font-pixel text-xs bg-[#9c7b28] text-white border border-[#2d2740] shadow-pixel-sm"
                >
                  ADD ACTION
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

