import React, { useState } from 'react';
import { GameState } from '../types';

interface ProgressSummaryCardProps {
  state: GameState;
  onOpenChest: (e: React.MouseEvent) => void;
  onUpdateReflection: (reflection: string, tomorrowQuest: string) => void;
  onPlayClickSound: () => void;
}

export const ProgressSummaryCard: React.FC<ProgressSummaryCardProps> = ({
  state,
  onOpenChest,
  onUpdateReflection,
  onPlayClickSound,
}) => {
  const today = new Date().toISOString().split('T')[0];
  const todayLog = state.history[today] || {
    date: today,
    xpEarned: state.currentXp,
    questsCompleted: state.quests.filter((q) => q.completed).length,
    reflection: '',
    tomorrowQuest: '',
  };

  const [reflection, setReflection] = useState(todayLog.reflection || '');
  const [tomorrowQuest, setTomorrowQuest] = useState(todayLog.tomorrowQuest || '');
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveReflection = () => {
    onPlayClickSound();
    onUpdateReflection(reflection, tomorrowQuest);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  const completedCount = state.quests.filter((q) => q.completed).length;

  return (
    <div className="space-y-6">
      {/* Container holding both the Reflection / Landscape and Today's Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 7. TRACK YOUR PROGRESS CARD */}
        <div className="bg-[#edf4fa] border-2 sm:border-[3px] border-[#2d2740] shadow-pixel p-4 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-2 border-b-2 border-dashed border-[#a3c3de]">
              <div className="flex items-center gap-2">
                <span className="text-lg">📊</span>
                <h2 className="font-pixel text-xs sm:text-sm text-[#3b6f99] tracking-wider uppercase">
                  7. TRACK YOUR PROGRESS
                </h2>
              </div>
            </div>

            <p className="font-retro text-[11px] text-[#2c4e6b] font-bold text-center mb-3 uppercase tracking-wider">
              END EACH DAY LIKE A TRUE PLAYER!
            </p>

            {/* Split layout: Pixel Landscape & Daily Reflection */}
            <div className="flex flex-col sm:flex-row gap-4 items-center mb-3">
              {/* Retro Pixel Landscape Canvas/SVG */}
              <div className="w-full sm:w-48 h-40 bg-[#7eb6e8] border-2 border-[#2d2740] shadow-pixel-sm relative overflow-hidden shrink-0">
                <svg
                  viewBox="0 0 160 120"
                  className="w-full h-full"
                  shapeRendering="crispEdges"
                >
                  {/* Sky */}
                  <rect width="160" height="120" fill="#8ec6f5" />
                  
                  {/* Sun / Soft warmth */}
                  <rect x="130" y="10" width="16" height="16" fill="#fef08a" />
                  
                  {/* Clouds */}
                  <rect x="20" y="15" width="28" height="10" fill="#ffffff" />
                  <rect x="26" y="10" width="16" height="6" fill="#ffffff" />
                  
                  <rect x="100" y="25" width="24" height="8" fill="#ffffff" />
                  
                  {/* Distant Mountains */}
                  <polygon points="10,85 45,35 80,85" fill="#a5b4fc" />
                  <polygon points="40,43 45,35 50,43" fill="#ffffff" /> {/* Snow cap */}
                  
                  <polygon points="60,90 100,45 140,90" fill="#818cf8" />
                  <polygon points="95,51 100,45 105,51" fill="#ffffff" /> {/* Snow cap */}

                  {/* Green Hill */}
                  <rect x="0" y="80" width="160" height="40" fill="#86efac" />
                  <rect x="0" y="90" width="160" height="30" fill="#4ade80" />

                  {/* Pixel Pine Trees */}
                  {/* Tree 1 */}
                  <rect x="20" y="70" width="10" height="15" fill="#15803d" />
                  <rect x="23" y="62" width="4" height="10" fill="#16a34a" />
                  <rect x="23" y="85" width="4" height="6" fill="#78350f" />

                  {/* Tree 2 */}
                  <rect x="125" y="65" width="12" height="18" fill="#15803d" />
                  <rect x="129" y="58" width="4" height="10" fill="#16a34a" />
                  <rect x="129" y="83" width="4" height="8" fill="#78350f" />

                  {/* Winding dirt path */}
                  <path
                    d="M 60,120 Q 75,100 85,85"
                    stroke="#fde047"
                    strokeWidth="16"
                    fill="none"
                  />
                  <path
                    d="M 60,120 Q 75,100 85,85"
                    stroke="#eab308"
                    strokeWidth="12"
                    fill="none"
                  />

                  {/* Signpost */}
                  <rect x="25" y="85" width="4" height="20" fill="#78350f" />
                  <rect x="15" y="80" width="24" height="12" fill="#d97706" stroke="#451a03" strokeWidth="1" />
                  <text
                    x="27"
                    y="88"
                    fontFamily="monospace"
                    fontSize="5"
                    fontWeight="bold"
                    fill="#451a03"
                    textAnchor="middle"
                  >
                    KEEP
                  </text>
                  <text
                    x="27"
                    y="94"
                    fontFamily="monospace"
                    fontSize="5"
                    fontWeight="bold"
                    fill="#451a03"
                    textAnchor="middle"
                  >
                    GOING!
                  </text>
                </svg>
              </div>

              {/* Reflection Prompts from poster */}
              <div className="flex-1 space-y-2 w-full text-xs">
                <div className="flex items-center gap-2">
                  <span>⚔️</span>
                  <span className="font-retro font-bold text-[#2d2740]">
                    Completed Quests Today: <span className="text-[#3b6f99]">{completedCount}</span>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🛡️</span>
                  <span className="font-retro font-bold text-[#2d2740]">
                    Total XP Gained: <span className="text-[#3b6f99]">{state.currentXp} XP</span>
                  </span>
                </div>

                <div className="pt-2">
                  <label className="block font-retro text-[10px] text-[#3b6f99] uppercase font-bold mb-1">
                    💎 What did I improve today?
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Learned new code, stayed hydrated..."
                    value={reflection}
                    onChange={(e) => setReflection(e.target.value)}
                    className="w-full px-2 py-1 bg-white border border-[#2d2740] font-retro text-xs text-[#2d2740] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-retro text-[10px] text-[#3b6f99] uppercase font-bold mb-1">
                    ⭐ Tomorrow's Main Quest:
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Finish reading book chapter 5"
                    value={tomorrowQuest}
                    onChange={(e) => setTomorrowQuest(e.target.value)}
                    className="w-full px-2 py-1 bg-white border border-[#2d2740] font-retro text-xs text-[#2d2740] outline-none"
                  />
                </div>

                <button
                  onClick={handleSaveReflection}
                  className="w-full py-1 bg-[#3b6f99] hover:bg-[#2e597c] text-white font-pixel text-[10px] border border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] transition-all"
                >
                  {isSaved ? 'LOG SAVED! ✅' : 'SAVE DAY LOG'}
                </button>
              </div>
            </div>
          </div>

          {/* Footer Banner */}
          <div className="mt-4 p-2 bg-[#ffffff] border border-[#2d2740] text-center">
            <p className="font-retro text-[10px] sm:text-[11px] text-[#3b6f99] font-bold">
              EVERY DAY IS A NEW CHAPTER. KEEP PLAYING. KEEP GROWING. ❤️
            </p>
          </div>
        </div>

        {/* TODAY'S SUMMARY CARD */}
        <div className="bg-[#edf4fa] border-2 sm:border-[3px] border-[#2d2740] shadow-pixel p-4 flex flex-col justify-between">
          <div>
            {/* Header */}
            <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-dashed border-[#a3c3de]">
              <h2 className="font-pixel text-xs sm:text-sm text-[#3b6f99] tracking-wider uppercase">
                TODAY'S SUMMARY
              </h2>
              <span className="font-retro text-[10px] text-[#2c4e6b] font-bold">
                DATE: {today}
              </span>
            </div>

            {/* Stats summary boxes */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between p-2 bg-white border border-[#2d2740] shadow-pixel-sm">
                <span className="font-retro text-xs font-bold text-[#2d2740] uppercase">
                  XP EARNED:
                </span>
                <span className="font-pixel text-xs text-[#3b6f99]">
                  +{state.currentXp} XP
                </span>
              </div>

              <div className="flex items-center justify-between p-2 bg-white border border-[#2d2740] shadow-pixel-sm">
                <span className="font-retro text-xs font-bold text-[#2d2740] uppercase flex items-center gap-1">
                  <span>LEVEL:</span>
                  <span>⭐</span>
                </span>
                <span className="font-pixel text-xs text-[#3b6f99]">
                  LVL {state.level}
                </span>
              </div>

              <div className="p-2 bg-white border border-[#2d2740] shadow-pixel-sm">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-retro text-xs font-bold text-[#2d2740] uppercase">
                    PROGRESS:
                  </span>
                  <span className="font-pixel text-[10px] text-[#3b6f99]">
                    {state.currentXp} / {state.xpToNextLevel} XP
                  </span>
                </div>
                <div className="w-full h-4 bg-[#f0f4f8] border border-[#2d2740] p-[2px] relative overflow-hidden">
                  <div
                    className="h-full bg-[#f472b6] transition-all duration-300"
                    style={{
                      width: `${Math.min(100, (state.currentXp / state.xpToNextLevel) * 100)}%`,
                    }}
                  >
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_6px,rgba(45,39,64,0.2)_7px)] bg-[length:8px_100%] opacity-40"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Pixel Treasure Chest & Cloud Note */}
            <div className="flex items-center gap-3 my-3">
              {/* Pixel Chest Button */}
              <button
                onClick={onOpenChest}
                disabled={state.chestClaimedToday}
                className={`p-2 border-2 border-[#2d2740] shadow-pixel flex flex-col items-center justify-center shrink-0 transition-transform ${
                  state.chestClaimedToday
                    ? 'bg-gray-200 opacity-60 cursor-not-allowed'
                    : 'bg-[#fef08a] hover:scale-105 active:translate-x-[1px] active:translate-y-[1px] animate-bounce'
                }`}
                title={state.chestClaimedToday ? 'Already Claimed Today!' : 'Click to Open Daily Treasure Chest!'}
              >
                {/* SVG Pixel Chest */}
                <svg width="44" height="36" viewBox="0 0 32 26" shapeRendering="crispEdges">
                  {/* Chest Lid */}
                  <rect x="4" y="4" width="24" height="8" fill="#b45309" stroke="#451a03" strokeWidth="1" />
                  <rect x="6" y="2" width="20" height="2" fill="#b45309" />
                  <rect x="8" y="5" width="2" height="6" fill="#facc15" />
                  <rect x="22" y="5" width="2" height="6" fill="#facc15" />
                  {/* Chest Base */}
                  <rect x="4" y="12" width="24" height="12" fill="#92400e" stroke="#451a03" strokeWidth="1" />
                  <rect x="8" y="12" width="2" height="10" fill="#facc15" />
                  <rect x="22" y="12" width="2" height="10" fill="#facc15" />
                  {/* Lock */}
                  <rect x="14" y="10" width="4" height="5" fill="#fef08a" stroke="#451a03" strokeWidth="1" />
                  <rect x="15" y="12" width="2" height="2" fill="#451a03" />
                </svg>
                <span className="font-pixel text-[8px] text-[#2d2740] mt-1 font-bold">
                  {state.chestClaimedToday ? 'OPENED' : 'CLAIM CHEST'}
                </span>
              </button>

              {/* Cloud Quote Box from poster */}
              <div className="flex-1 p-3 bg-white border-2 border-dashed border-[#8a7dc4] rounded-lg relative">
                <p className="font-retro text-xs font-bold text-[#4c4270] text-center leading-snug">
                  FOCUS ON BEING BETTER THAN YESTERDAY. YOU VS. YOU. 💜
                </p>
              </div>
            </div>
          </div>

          {/* Bottom rules directly from reference image */}
          <div className="mt-4 p-2.5 bg-[#ffffff] border border-[#2d2740] flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="text-sm">⚔️</span>
              <p className="font-retro text-[10px] sm:text-[11px] font-bold text-[#2d2740] leading-tight">
                NO EXP LOST FOR TAKING REST. NO LEVEL LOST FOR BAD DAYS. JUST CONTINUE YOUR JOURNEY.
              </p>
            </div>
            <span className="text-sm">🌱</span>
          </div>
        </div>
      </div>

      {/* FINAL POSTER FOOTER BANNER */}
      <div className="w-full text-center py-3 px-4 bg-[#ffffff] border-2 border-[#2d2740] shadow-pixel flex items-center justify-center gap-3">
        <span className="text-xl">💖</span>
        <p className="font-pixel text-xs sm:text-sm text-[#2d2740] tracking-wider">
          YOUR LIFE IS THE <span className="text-[#8a7dc4]">ULTIMATE GAME</span>. PLAY IT WISELY AND HAVE FUN.
        </p>
        <span className="text-xl">🎮</span>
      </div>
    </div>
  );
};

