import React from 'react';
import { PixelAvatar } from './PixelAvatar';

interface LevelUpModalProps {
  level: number;
  avatarId: string;
  onClose: () => void;
}

export const LevelUpModal: React.FC<LevelUpModalProps> = ({
  level,
  avatarId,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 animate-in fade-in duration-200">
      <div className="bg-[#fef08a] border-4 border-[#2d2740] shadow-pixel-lg max-w-sm w-full p-6 text-center relative animate-bounce-once">
        {/* Sparkles decoration */}
        <div className="text-2xl mb-1">✨ ⚔️ ✨</div>

        <h2 className="font-pixel text-xl sm:text-2xl text-[#b45309] tracking-wider mb-2 drop-shadow-[2px_2px_0px_#fde047]">
          LEVEL UP!
        </h2>

        <p className="font-retro text-sm font-bold text-[#2d2740] mb-4">
          CONGRATULATIONS, PLAYER!
        </p>

        {/* Character celebration frame */}
        <div className="w-24 h-24 mx-auto bg-white border-2 border-[#2d2740] shadow-pixel flex items-center justify-center mb-4">
          <PixelAvatar avatarId={avatarId} size={76} />
        </div>

        <div className="bg-white border-2 border-[#2d2740] p-3 shadow-pixel-sm mb-4">
          <p className="font-retro text-xs text-[#2d2740] mb-1 font-bold">
            YOU HAVE REACHED
          </p>
          <p className="font-pixel text-lg text-[#3b82f6]">
            LEVEL {level}
          </p>
          <p className="font-retro text-[11px] text-[#15803d] mt-1 font-bold">
            +50 BONUS GOLD REWARDED! 🪙
          </p>
        </div>

        <p className="font-retro text-xs text-[#451a03] mb-4 font-bold">
          "The higher you level, the stronger you become!"
        </p>

        <button
          onClick={onClose}
          className="w-full py-2.5 bg-[#4c4270] hover:bg-[#382f5c] text-white font-pixel text-xs border-2 border-[#2d2740] shadow-pixel active:translate-x-[2px] active:translate-y-[2px] transition-all"
        >
          CONTINUE JOURNEY
        </button>
      </div>
    </div>
  );
};
