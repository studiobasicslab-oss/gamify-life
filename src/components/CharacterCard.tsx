import React, { useState } from 'react';
import { Character } from '../types';
import { PixelAvatar, AVATAR_OPTIONS } from './PixelAvatar';
import { Edit3, Check } from 'lucide-react';

interface CharacterCardProps {
  character: Character;
  onUpdateCharacter: (character: Character) => void;
  onPlayClickSound: () => void;
}

export const CharacterCard: React.FC<CharacterCardProps> = ({
  character,
  onUpdateCharacter,
  onPlayClickSound,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(character.name);
  const [title, setTitle] = useState(character.title);
  const [avatarId, setAvatarId] = useState(character.avatarId);

  const handleSave = () => {
    onPlayClickSound();
    onUpdateCharacter({
      name: name.trim() || 'Hero',
      title: title.trim() || 'Adventurer',
      avatarId,
    });
    setIsEditing(false);
  };

  return (
    <div className="bg-[#eef0fb] border-2 sm:border-[3px] border-[#2d2740] shadow-pixel p-4 flex flex-col justify-between h-full">
      {/* Header */}
      <div>
        <div className="flex items-center justify-between pb-3 mb-3 border-b-2 border-dashed border-[#8a7dc4]">
          <div className="flex items-center gap-2">
            <span className="text-lg">🚩</span>
            <h2 className="font-pixel text-xs sm:text-sm text-[#4c4270] tracking-wider uppercase">
              1. CHOOSE CHARACTER
            </h2>
          </div>
          <button
            onClick={() => {
              onPlayClickSound();
              setIsEditing(!isEditing);
            }}
            className="p-1 bg-[#ffffff] hover:bg-[#eef0fb] border border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px] text-xs font-retro flex items-center gap-1 text-[#4c4270]"
            title="Customize Hero"
          >
            {isEditing ? <Check size={12} /> : <Edit3 size={12} />}
            <span>{isEditing ? 'DONE' : 'EDIT'}</span>
          </button>
        </div>

        {/* Character showcase */}
        <div className="flex flex-col sm:flex-row items-center gap-4 my-2">
          {/* Avatar frame */}
          <div className="p-3 bg-[#ffffff] border-2 border-[#2d2740] shadow-pixel-sm flex flex-col items-center justify-center shrink-0">
            <div className="w-20 h-20 flex items-center justify-center bg-[#fdf6db] border border-[#8a7dc4]">
              <PixelAvatar avatarId={isEditing ? avatarId : character.avatarId} size={68} />
            </div>
            <span className="font-retro text-[10px] text-[#4c4270] mt-1.5 uppercase font-bold tracking-wider">
              MAIN HERO
            </span>
          </div>

          {/* Details / Story text */}
          <div className="flex-1 text-center sm:text-left">
            {!isEditing ? (
              <>
                <h3 className="font-pixel text-sm text-[#2d2740] mb-0.5">{character.name}</h3>
                <p className="font-retro text-xs text-[#8a7dc4] font-bold mb-2">"{character.title}"</p>
                <div className="border-t border-dashed border-[#8a7dc4] pt-2">
                  <p className="font-retro text-xs text-[#2d2740] mb-1">
                    You are the main character in your own story.
                  </p>
                  <p className="font-retro text-xs text-[#4c4270]">
                    Decide who you want to become and play that role every day.
                  </p>
                </div>
              </>
            ) : (
              <div className="space-y-2 text-left w-full">
                <div>
                  <label className="block font-retro text-[10px] text-[#4c4270] uppercase font-bold mb-0.5">
                    Hero Name:
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={18}
                    className="w-full px-2 py-1 bg-white border border-[#2d2740] font-retro text-xs text-[#2d2740] outline-none"
                  />
                </div>
                <div>
                  <label className="block font-retro text-[10px] text-[#4c4270] uppercase font-bold mb-0.5">
                    Hero Title:
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    maxLength={28}
                    className="w-full px-2 py-1 bg-white border border-[#2d2740] font-retro text-xs text-[#2d2740] outline-none"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Avatar Picker if editing */}
        {isEditing && (
          <div className="mt-3 p-2 bg-[#ffffff] border-2 border-[#2d2740]">
            <p className="font-retro text-[11px] font-bold text-[#4c4270] mb-2 uppercase">
              Choose Your Class / Sprite:
            </p>
            <div className="grid grid-cols-3 gap-2">
              {AVATAR_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setAvatarId(opt.id);
                    onPlayClickSound();
                  }}
                  className={`p-1 flex flex-col items-center border ${
                    avatarId === opt.id
                      ? 'border-[#4c4270] bg-[#eef0fb] ring-2 ring-[#4c4270]'
                      : 'border-gray-300 hover:border-[#8a7dc4]'
                  }`}
                >
                  <PixelAvatar avatarId={opt.id} size={36} />
                  <span className="font-retro text-[9px] text-[#2d2740] mt-1 text-center truncate w-full">
                    {opt.name}
                  </span>
                </button>
              ))}
            </div>
            <button
              onClick={handleSave}
              className="mt-3 w-full py-1.5 bg-[#4c4270] hover:bg-[#382f5c] text-white font-pixel text-xs border border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px]"
            >
              SAVE HERO
            </button>
          </div>
        )}
      </div>

      {/* Footer Banner */}
      <div className="mt-4 p-2 bg-[#ffffff] border border-[#2d2740] text-center">
        <p className="font-retro text-[10px] sm:text-[11px] text-[#4c4270] font-bold">
          YOU CAN LEVEL UP ANY SKILL, BUILD ANY HABIT, AND CREATE THE LIFE YOU WANT. ⭐
        </p>
      </div>
    </div>
  );
};
