import React from 'react';
import { Volume2, VolumeX, Save, RotateCcw, Calendar } from 'lucide-react';

interface HeaderProps {
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenSaveModal: () => void;
  onOpenCalendar: () => void;
  onReset: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  soundEnabled,
  onToggleSound,
  onOpenSaveModal,
  onOpenCalendar,
  onReset,
}) => {
  return (
    <header className="w-full mb-6">
      {/* Top utility bar */}
      <div className="flex items-center justify-between mb-3 px-2 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="inline-block w-3 h-3 bg-green-500 border border-[#2d2740] rounded-none animate-pulse"></span>
          <span className="font-retro text-xs tracking-wider text-[#4c4270] uppercase">
            LOCAL OFFLINE SAVE ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCalendar}
            title="Open Quest Log & Calendar"
            className="flex items-center gap-1 px-2.5 py-1 bg-[#eef0fb] hover:bg-[#e0e4f7] border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] font-retro text-xs text-[#2d2740] transition-all"
          >
            <Calendar size={14} className="text-[#3b6f99]" />
            <span>CALENDAR</span>
          </button>

          <button
            onClick={onToggleSound}
            title={soundEnabled ? 'Mute 8-bit Audio' : 'Unmute 8-bit Audio'}
            className="p-1.5 bg-[#eef0fb] hover:bg-[#e0e4f7] border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] text-[#2d2740] transition-all"
          >
            {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>

          <button
            onClick={onOpenSaveModal}
            title="Save / Backup Memory Card"
            className="flex items-center gap-1 px-2.5 py-1 bg-[#fdf6db] hover:bg-[#faecc0] border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] font-retro text-xs text-[#2d2740] transition-all"
          >
            <Save size={14} />
            <span>SAVE CARD</span>
          </button>

          <button
            onClick={onReset}
            title="Reset Game"
            className="p-1.5 bg-[#fdf0ed] hover:bg-[#fbdcd6] border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] text-[#9c5548] transition-all"
          >
            <RotateCcw size={15} />
          </button>
        </div>
      </div>

      {/* Hero Header Area matching the poster */}
      <div className="text-center relative py-2">
        {/* Crown pixel icon */}
        <div className="inline-block mb-1">
          <svg width="34" height="20" viewBox="0 0 34 20" shapeRendering="crispEdges">
            <rect x="2" y="6" width="30" height="12" fill="#facc15" />
            <rect x="2" y="2" width="6" height="4" fill="#facc15" />
            <rect x="14" y="0" width="6" height="6" fill="#facc15" />
            <rect x="26" y="2" width="6" height="4" fill="#facc15" />
            <rect x="4" y="10" width="4" height="4" fill="#ef4444" />
            <rect x="15" y="10" width="4" height="4" fill="#3b82f6" />
            <rect x="26" y="10" width="4" height="4" fill="#10b981" />
            <rect x="0" y="16" width="34" height="4" fill="#b45309" />
          </svg>
        </div>

        {/* Big Pixelated Title */}
        <h1 className="font-pixel text-3xl sm:text-4xl md:text-5xl text-[#2d2740] tracking-wider mb-2 drop-shadow-[3px_3px_0px_#8a7dc4]">
          GAMIFY
        </h1>
        <h2 className="font-pixel text-3xl sm:text-4xl md:text-5xl text-[#4c4270] tracking-wider mb-3 drop-shadow-[3px_3px_0px_#cbd5e1]">
          YOUR LIFE
        </h2>

        {/* Vintage RPG Ribbon Banner */}
        <div className="relative inline-block max-w-xl mx-auto px-6 py-2 bg-[#ffffff] border-2 border-[#2d2740] shadow-pixel my-1">
          <p className="font-retro text-xs sm:text-sm font-bold tracking-wide text-[#2d2740] flex items-center justify-center gap-2">
            <span>TURN YOUR LIFE INTO A GAME AND BECOME YOUR BEST SELF.</span>
            <span className="text-[#ec4899]">❤️</span>
          </p>
        </div>

        {/* Quote Banner */}
        <div className="mt-4 max-w-md mx-auto p-3 bg-[#fdf6db] border-2 border-[#2d2740] shadow-pixel-sm">
          <p className="font-retro text-[11px] sm:text-xs font-bold text-[#684a14] leading-relaxed uppercase">
            REMEMBER: PROGRESS, NOT PERFECTION. CONSISTENCY, NOT INTENSITY. GROWTH, NOT COMPARISON. 💜
          </p>
        </div>
      </div>
    </header>
  );
};

