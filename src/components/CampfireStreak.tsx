import React from 'react';

interface CampfireStreakProps {
  streak: number;
  restDays: number;
  isActiveToday: boolean;
}

export const CampfireStreak: React.FC<CampfireStreakProps> = ({
  streak,
  restDays,
  isActiveToday,
}) => {
  return (
    <div className="bg-[#fefce8] border-2 border-[#2d2740] shadow-pixel-sm p-2 sm:p-2.5 flex items-center justify-between gap-3 max-w-xl mx-auto my-3">
      {/* Pixel Campfire Graphic */}
      <div className="flex items-center gap-2.5 shrink-0">
        <div className="w-10 h-10 bg-[#fde047]/30 border border-[#2d2740] flex items-center justify-center relative overflow-hidden">
          {isActiveToday ? (
            /* Active Burning Pixel Flame */
            <svg
              width="28"
              height="28"
              viewBox="0 0 16 16"
              shapeRendering="crispEdges"
              className="animate-pulse"
            >
              {/* Wood logs */}
              <rect x="2" y="13" width="12" height="2" fill="#78350f" />
              <rect x="4" y="12" width="8" height="2" fill="#92400e" />
              {/* Outer flame */}
              <rect x="4" y="8" width="8" height="4" fill="#ea580c" />
              <rect x="5" y="5" width="6" height="4" fill="#f97316" />
              <rect x="6" y="3" width="4" height="3" fill="#facc15" />
              <rect x="7" y="1" width="2" height="3" fill="#fef08a" />
              {/* Flame core */}
              <rect x="6" y="7" width="4" height="4" fill="#fef08a" />
              <rect x="7" y="6" width="2" height="2" fill="#ffffff" />
            </svg>
          ) : (
            /* Cozy Resting Embers */
            <svg
              width="28"
              height="28"
              viewBox="0 0 16 16"
              shapeRendering="crispEdges"
            >
              {/* Wood logs */}
              <rect x="2" y="13" width="12" height="2" fill="#78350f" />
              <rect x="4" y="12" width="8" height="2" fill="#92400e" />
              {/* Glowing embers */}
              <rect x="5" y="11" width="2" height="1" fill="#ef4444" />
              <rect x="9" y="11" width="2" height="1" fill="#f97316" />
              <rect x="7" y="10" width="2" height="1" fill="#fbbf24" />
              {/* Soft smoke pixel */}
              <rect x="7" y="7" width="2" height="2" fill="#cbd5e1" opacity="0.6" />
              <rect x="8" y="4" width="2" height="2" fill="#cbd5e1" opacity="0.4" />
            </svg>
          )}
        </div>

        <div>
          <div className="flex items-center gap-1.5">
            <span className="font-pixel text-xs sm:text-sm text-[#b45309]">
              {streak} DAY STREAK
            </span>
            <span className="text-xs">{isActiveToday ? '🔥' : '🪵'}</span>
          </div>
          <p className="font-retro text-[10px] text-[#78350f]">
            {isActiveToday
              ? 'Campfire is burning bright!'
              : 'Embers resting warm (streak safe)'}
          </p>
        </div>
      </div>

      {/* Rest days counter & philosophy badge */}
      <div className="text-right">
        <span className="inline-block px-2 py-0.5 bg-white border border-[#2d2740] font-retro text-[10px] font-bold text-[#4c4270]">
          REST DAYS: {restDays} ☕
        </span>
        <p className="font-retro text-[9px] text-[#6b7280] mt-0.5 hidden sm:block">
          Zero streak loss for taking rest
        </p>
      </div>
    </div>
  );
};
