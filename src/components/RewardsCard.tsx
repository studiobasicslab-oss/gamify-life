import React, { useState } from 'react';
import { Reward } from '../types';
import { Plus, X, Sparkles } from 'lucide-react';

interface RewardsCardProps {
  rewards: Reward[];
  gold: number;
  onRedeemReward: (reward: Reward, e: React.MouseEvent) => void;
  onAddReward: (reward: Omit<Reward, 'id' | 'redeemedCount'>) => void;
  onPlayClickSound: () => void;
}

export const RewardsCard: React.FC<RewardsCardProps> = ({
  rewards,
  gold,
  onRedeemReward,
  onAddReward,
  onPlayClickSound,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [title, setTitle] = useState('');
  const [cost, setCost] = useState(30);
  const [icon, setIcon] = useState('🎁');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    onPlayClickSound();
    onAddReward({
      title: title.trim(),
      cost: Number(cost) || 20,
      icon,
    });
    setTitle('');
    setShowAddModal(false);
  };

  return (
    <div className="bg-[#f6ebfb] border-2 sm:border-[3px] border-[#2d2740] shadow-pixel p-4 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b-2 border-dashed border-[#cda2d8]">
          <div className="flex items-center gap-2">
            <span className="text-lg">🎁</span>
            <h2 className="font-pixel text-xs sm:text-sm text-[#83498f] tracking-wider uppercase">
              6. REWARDS
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-pixel text-[11px] bg-white border border-[#2d2740] px-2 py-0.5 text-[#d97706] shadow-pixel-sm">
              🪙 {gold} GOLD
            </span>
            <button
              onClick={() => {
                onPlayClickSound();
                setShowAddModal(true);
              }}
              className="p-1 px-2 bg-[#ffffff] hover:bg-[#f6ebfb] border border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] font-retro text-[10px] sm:text-xs flex items-center gap-1 text-[#83498f]"
              title="Add Reward"
            >
              <Plus size={12} />
              <span>NEW</span>
            </button>
          </div>
        </div>

        <p className="font-retro text-[11px] text-[#5e2d67] font-bold text-center mb-3 uppercase tracking-wider">
          LEVEL UP? TIME TO REWARD YOURSELF!
        </p>

        {/* Rewards list */}
        <div className="space-y-1.5 max-h-64 overflow-y-auto pr-1">
          {rewards.map((rew) => {
            const canAfford = gold >= rew.cost;
            return (
              <div
                key={rew.id}
                className="flex items-center justify-between p-2 bg-white border border-[#2d2740] shadow-pixel-sm"
              >
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-base shrink-0">{rew.icon}</span>
                  <div className="truncate">
                    <p className="font-retro text-xs font-bold text-[#2d2740] truncate uppercase">
                      {rew.title}
                    </p>
                    <span className="font-retro text-[9px] text-[#83498f] uppercase">
                      Cost: {rew.cost} Gold • Enjoyed {rew.redeemedCount}x
                    </span>
                  </div>
                </div>

                <button
                  disabled={!canAfford}
                  onClick={(e) => onRedeemReward(rew, e)}
                  className={`px-2 py-1 font-pixel text-[10px] border border-[#2d2740] flex items-center gap-1 shadow-pixel-sm transition-all ${
                    canAfford
                      ? 'bg-[#83498f] hover:bg-[#6c3977] text-white active:translate-x-[1px] active:translate-y-[1px]'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed border-gray-300'
                  }`}
                >
                  <Sparkles size={10} />
                  <span>CLAIM</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="mt-4 p-2 bg-[#ffffff] border border-[#2d2740] text-center">
        <p className="font-retro text-[10px] sm:text-[11px] text-[#83498f] font-bold">
          YOU EARNED IT! 💜
        </p>
      </div>

      {/* Add Reward Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-[#f6ebfb] border-[3px] border-[#2d2740] shadow-pixel-lg max-w-sm w-full p-4 relative">
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-2 right-2 p-1 text-[#2d2740] hover:bg-white"
            >
              <X size={16} />
            </button>
            <h3 className="font-pixel text-xs text-[#83498f] uppercase mb-3">
              Add New Reward
            </h3>
            <form onSubmit={handleCreate} className="space-y-3">
              <div>
                <label className="block font-retro text-xs text-[#2d2740] uppercase font-bold mb-1">
                  Reward Title:
                </label>
                <input
                  type="text"
                  placeholder="e.g. 1 Episode of Anime, Coffee run"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-2 py-1.5 bg-white border-2 border-[#2d2740] font-retro text-xs text-[#2d2740] outline-none"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-retro text-xs text-[#2d2740] uppercase font-bold mb-1">
                    Gold Cost:
                  </label>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    step="5"
                    value={cost}
                    onChange={(e) => setCost(Number(e.target.value))}
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
                  className="px-3 py-1 font-pixel text-xs bg-[#83498f] text-white border border-[#2d2740] shadow-pixel-sm"
                >
                  ADD REWARD
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
