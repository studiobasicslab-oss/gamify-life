import React, { useRef, useState } from 'react';
import { GameState } from '../types';
import { exportSaveFile, importSaveFile } from '../utils/storage';
import { X, Download, Upload, Trash2, Smartphone, Monitor } from 'lucide-react';

interface MemoryCardModalProps {
  state: GameState;
  onRestoreState: (state: GameState) => void;
  onResetState: () => void;
  onClose: () => void;
  onPlayClickSound: () => void;
}

export const MemoryCardModal: React.FC<MemoryCardModalProps> = ({
  state,
  onRestoreState,
  onResetState,
  onClose,
  onPlayClickSound,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [msg, setMsg] = useState<{ text: string; success: boolean } | null>(null);

  const handleExport = () => {
    onPlayClickSound();
    exportSaveFile(state);
    setMsg({ text: 'Save Cartridge downloaded successfully!', success: true });
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      onPlayClickSound();
      const imported = await importSaveFile(file);
      onRestoreState(imported);
      setMsg({ text: 'Save data restored successfully!', success: true });
    } catch {
      setMsg({ text: 'Invalid save file format. Import failed.', success: false });
    }
  };

  const handleConfirmReset = () => {
    onPlayClickSound();
    if (window.confirm('Are you sure you want to restart your journey? All current progress will be reset.')) {
      onResetState();
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4">
      <div className="bg-[#fcf6ea] border-4 border-[#2d2740] shadow-pixel-lg max-w-md w-full p-5 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 p-1 text-[#2d2740] hover:bg-white"
        >
          <X size={18} />
        </button>

        {/* Header styling like a classic 8-bit memory card */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-dashed border-[#2d2740]">
          <span className="text-xl">💾</span>
          <div>
            <h3 className="font-pixel text-xs sm:text-sm text-[#2d2740] uppercase">
              MEMORY CARD / SAVE SLOTS
            </h3>
            <span className="font-retro text-[10px] text-[#8a7dc4] font-bold">
              100% PRIVATE • ZERO CLOUD • LOCAL STORAGE
            </span>
          </div>
        </div>

        {msg && (
          <div
            className={`p-2 mb-3 text-xs font-retro border border-[#2d2740] ${
              msg.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
            }`}
          >
            {msg.text}
          </div>
        )}

        {/* Current Save Info */}
        <div className="p-3 bg-white border-2 border-[#2d2740] shadow-pixel-sm mb-4 space-y-1">
          <p className="font-retro text-xs font-bold text-[#2d2740]">
            HERO: <span className="text-[#4c4270]">{state.character.name}</span> (LVL {state.level})
          </p>
          <p className="font-retro text-xs text-[#2d2740]">
            CURRENT XP: <span className="text-[#3b6f99] font-bold">{state.currentXp} XP</span> | GOLD: <span className="text-[#b45309] font-bold">{state.gold}</span>
          </p>
          <p className="font-retro text-[10px] text-gray-500">
            AUTO-SAVED TO YOUR BROWSER DATABASE
          </p>
        </div>

        {/* Cross-device explanation banner */}
        <div className="p-2.5 bg-[#fdf6db] border border-[#2d2740] mb-4 text-[11px] font-retro text-[#684a14]">
          <div className="flex items-center gap-1 font-bold mb-1">
            <Monitor size={14} />
            <span>↔️</span>
            <Smartphone size={14} />
            <span>HOW TO USE ACROSS DEVICES (NO CLOUD):</span>
          </div>
          <p>
            1. Tap <strong>Export Save Cartridge</strong> to download your <code className="bg-white px-1 font-mono">.json</code> save file.
          </p>
          <p className="mt-0.5">
            2. Send it to your phone or laptop (via AirDrop, email, or message) and tap <strong>Restore Save File</strong>!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleExport}
            className="w-full flex items-center justify-center gap-2 py-2 bg-[#fdf6db] hover:bg-[#faecc0] text-[#2d2740] font-pixel text-xs border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Download size={14} />
            <span>EXPORT SAVE CARTRIDGE (.JSON)</span>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleImport}
            accept=".json"
            className="hidden"
          />

          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full flex items-center justify-center gap-2 py-2 bg-[#eef0fb] hover:bg-[#e0e4f7] text-[#2d2740] font-pixel text-xs border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px]"
          >
            <Upload size={14} />
            <span>RESTORE SAVE FILE</span>
          </button>

          <button
            onClick={handleConfirmReset}
            className="w-full flex items-center justify-center gap-2 py-2 bg-[#fdf0ed] hover:bg-[#fbdcd6] text-[#9c5548] font-pixel text-xs border-2 border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] mt-4"
          >
            <Trash2 size={14} />
            <span>RESET ALL PROGRESS</span>
          </button>
        </div>
      </div>
    </div>
  );
};
