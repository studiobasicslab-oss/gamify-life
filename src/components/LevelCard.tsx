import React from 'react';

interface LevelCardProps {
  level: number;
  currentXp: number;
  xpToNextLevel: number;
  totalXp: number;
}

export const LevelCard: React.FC<LevelCardProps> = ({
  level,
  currentXp,
  xpToNextLevel,
  totalXp,
}) => {
  const percentage = Math.min(100, Math.round((currentXp / xpToNextLevel) * 100));

  const milestones = [
    { from: 1, to: 2, xp: 100 },
    { from: 2, to: 3, xp: 200 },
    { from: 3, to: 4, xp: 300 },
    { from: 4, to: 5, xp: 400 },
    { from: 5, to: 6, xp: 500 },
  ];

  return (
    <div className="bg-[#e5f3fd] border-2 sm:border-[3px] border-[#2d2740] shadow-pixel p-4 flex flex-col justify-between h-full">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between pb-3 mb-2 border-b-2 border-dashed border-[#8ec0e4]">
          <div className="flex items-center gap-2">
            <span className="text-lg">⬆️</span>
            <h2 className="font-pixel text-xs sm:text-sm text-[#386b9a] tracking-wider uppercase">
              4. LEVEL UP
            </h2>
          </div>
          <span className="font-pixel text-xs bg-[#ffffff] border border-[#2d2740] px-2 py-0.5 text-[#386b9a]">
            LVL {level}
          </span>
        </div>

        {/* Level rule badge */}
        <div className="text-center my-2">
          <span className="inline-block px-3 py-1 bg-white border border-[#2d2740] shadow-pixel-sm font-retro text-xs font-bold text-[#386b9a]">
            EVERY 100 XP = LEVEL UP!
          </span>
        </div>

        {/* Current Level progress bar */}
        <div className="p-3 bg-white border border-[#2d2740] shadow-pixel-sm my-3">
          <div className="flex justify-between items-center mb-1">
            <span className="font-retro text-xs font-bold text-[#2d2740]">
              PROGRESS TO LVL {level + 1}
            </span>
            <span className="font-pixel text-[10px] text-[#386b9a]">
              {currentXp} / {xpToNextLevel} XP
            </span>
          </div>
          <div className="w-full h-4 bg-[#f0f4f8] border border-[#2d2740] p-[2px] relative overflow-hidden">
            <div
              className="h-full bg-[#38bdf8] transition-all duration-300"
              style={{ width: `${percentage}%` }}
            >
              <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_6px,rgba(45,39,64,0.2)_7px)] bg-[length:8px_100%] opacity-40"></div>
            </div>
          </div>
          <div className="text-right mt-1">
            <span className="font-retro text-[10px] text-gray-500">
              Total Lifetime XP: {totalXp}
            </span>
          </div>
        </div>

        {/* Milestone reference ladder matching the poster */}
        <div className="space-y-1.5 my-2">
          {milestones.map((m) => {
            const isCompleted = level > m.from;
            const isCurrent = level === m.from;
            return (
              <div
                key={m.from}
                className={`flex items-center justify-between px-2.5 py-1 text-xs border ${
                  isCurrent
                    ? 'bg-white border-[#386b9a] font-bold shadow-pixel-sm'
                    : isCompleted
                    ? 'bg-[#d8eaf8] border-transparent opacity-80'
                    : 'bg-white/60 border-transparent text-gray-500'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span>{isCompleted ? '✅' : '🛡️'}</span>
                  <span className="font-retro text-xs">
                    LVL {m.from} → LVL {m.to}
                  </span>
                </div>
                <span className="font-pixel text-[10px]">
                  {m.xp} XP
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Banner */}
      <div className="mt-4 p-2 bg-[#ffffff] border border-[#2d2740] flex items-center justify-between">
        <p className="font-retro text-[10px] sm:text-[11px] text-[#386b9a] font-bold">
          THE HIGHER YOU LEVEL, THE STRONGER YOU BECOME.
        </p>
        <span className="text-sm">⚔️</span>
      </div>
    </div>
  );
};
