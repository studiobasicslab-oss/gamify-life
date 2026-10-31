import React from 'react';

interface PixelAvatarProps {
  avatarId: string;
  size?: number;
  className?: string;
}

export const AVATAR_OPTIONS = [
  { id: 'unicorn_knight', name: 'Unicorn Knight', desc: 'Courageous & Legendary' },
  { id: 'retro_knight', name: 'Brave Warrior', desc: 'Steadfast & Disciplined' },
  { id: 'magic_wizard', name: 'Cosmic Mage', desc: 'Seeker of Deep Knowledge' },
  { id: 'forest_ranger', name: 'Forest Scout', desc: 'Nimble & Quick-witted' },
  { id: 'cozy_kitty', name: 'Cozy Adventurer', desc: 'Curious & Warm-hearted' },
  { id: 'cyber_ninja', name: 'Cyber Rogue', desc: 'Laser Focus & Stealth' },
];

export const PixelAvatar: React.FC<PixelAvatarProps> = ({ avatarId, size = 64, className = '' }) => {
  // Render clean SVG pixel art with shape-rendering="crispEdges"
  switch (avatarId) {
    case 'unicorn_knight':
    default:
      // The exact cute hooded unicorn kitten with sword from the poster
      return (
        <svg
          width={size}
          height={size}
          viewBox="0 0 32 32"
          shapeRendering="crispEdges"
          className={`drop-shadow-sm ${className}`}
        >
          {/* Cape / Hood Back */}
          <rect x="8" y="7" width="16" height="18" fill="#7564ad" />
          <rect x="6" y="10" width="20" height="12" fill="#7564ad" />
          <rect x="7" y="21" width="18" height="6" fill="#58498f" />

          {/* Unicorn Horn */}
          <rect x="15" y="1" width="2" height="3" fill="#fbbf24" />
          <rect x="14" y="4" width="4" height="2" fill="#f59e0b" />
          <rect x="15" y="3" width="2" height="1" fill="#fef08a" />

          {/* Kitten Face (White) */}
          <rect x="10" y="9" width="12" height="10" fill="#ffffff" />
          <rect x="9" y="10" width="14" height="8" fill="#ffffff" />
          
          {/* Inner Ears */}
          <rect x="10" y="8" width="2" height="2" fill="#f472b6" />
          <rect x="20" y="8" width="2" height="2" fill="#f472b6" />

          {/* Cute Eyes */}
          <rect x="12" y="13" width="2" height="2" fill="#1e1b4b" />
          <rect x="18" y="13" width="2" height="2" fill="#1e1b4b" />
          {/* Eye sparkles */}
          <rect x="12" y="13" width="1" height="1" fill="#ffffff" />
          <rect x="18" y="13" width="1" height="1" fill="#ffffff" />

          {/* Cheeks */}
          <rect x="10" y="15" width="2" height="1" fill="#fbcfe8" />
          <rect x="20" y="15" width="2" height="1" fill="#fbcfe8" />

          {/* Nose & mouth */}
          <rect x="15" y="15" width="2" height="1" fill="#f472b6" />

          {/* Hood Clasp / Chest jewel */}
          <rect x="14" y="20" width="4" height="2" fill="#fbbf24" />

          {/* White Body / Paws */}
          <rect x="11" y="21" width="10" height="6" fill="#ffffff" />
          <rect x="12" y="27" width="3" height="2" fill="#cbd5e1" />
          <rect x="17" y="27" width="3" height="2" fill="#cbd5e1" />

          {/* Tiny Pixel Sword in hand */}
          <rect x="24" y="16" width="2" height="8" fill="#94a3b8" />
          <rect x="25" y="15" width="1" height="8" fill="#e2e8f0" />
          <rect x="23" y="23" width="4" height="1" fill="#d97706" />
          <rect x="24" y="24" width="2" height="3" fill="#78350f" />
          <rect x="24" y="27" width="2" height="1" fill="#f59e0b" />
        </svg>
      );

    case 'retro_knight':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges" className={className}>
          {/* Helmet plume */}
          <rect x="14" y="2" width="4" height="5" fill="#ef4444" />
          <rect x="13" y="4" width="6" height="3" fill="#dc2626" />
          {/* Helmet */}
          <rect x="10" y="7" width="12" height="12" fill="#94a3b8" />
          <rect x="9" y="9" width="14" height="8" fill="#64748b" />
          <rect x="11" y="12" width="10" height="3" fill="#1e293b" />
          {/* Eyes in visor */}
          <rect x="13" y="13" width="2" height="1" fill="#38bdf8" />
          <rect x="17" y="13" width="2" height="1" fill="#38bdf8" />
          {/* Armor */}
          <rect x="10" y="19" width="12" height="8" fill="#475569" />
          <rect x="14" y="20" width="4" height="4" fill="#fbbf24" />
          {/* Shield */}
          <rect x="6" y="16" width="4" height="9" fill="#3b82f6" />
          <rect x="7" y="18" width="2" height="5" fill="#ffffff" />
          {/* Sword */}
          <rect x="23" y="15" width="2" height="11" fill="#cbd5e1" />
          <rect x="22" y="22" width="4" height="1" fill="#d97706" />
        </svg>
      );

    case 'magic_wizard':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges" className={className}>
          {/* Wizard Hat */}
          <rect x="15" y="2" width="2" height="3" fill="#3b82f6" />
          <rect x="14" y="5" width="4" height="3" fill="#3b82f6" />
          <rect x="12" y="8" width="8" height="4" fill="#2563eb" />
          <rect x="8" y="12" width="16" height="2" fill="#1d4ed8" />
          <rect x="13" y="10" width="6" height="2" fill="#fbbf24" />
          {/* Face */}
          <rect x="11" y="14" width="10" height="6" fill="#fde047" />
          <rect x="13" y="16" width="1" height="2" fill="#1e1b4b" />
          <rect x="18" y="16" width="1" height="2" fill="#1e1b4b" />
          {/* White Beard */}
          <rect x="12" y="18" width="8" height="6" fill="#ffffff" />
          <rect x="14" y="24" width="4" height="2" fill="#e2e8f0" />
          {/* Robes */}
          <rect x="10" y="20" width="12" height="9" fill="#1e40af" />
          {/* Magic Staff */}
          <rect x="24" y="10" width="2" height="18" fill="#78350f" />
          <rect x="23" y="7" width="4" height="4" fill="#a855f7" />
          <rect x="24" y="8" width="2" height="2" fill="#f43f5e" />
        </svg>
      );

    case 'forest_ranger':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges" className={className}>
          {/* Green Hood */}
          <rect x="10" y="5" width="12" height="12" fill="#15803d" />
          <rect x="9" y="8" width="14" height="8" fill="#166534" />
          <rect x="15" y="3" width="2" height="2" fill="#15803d" />
          {/* Face */}
          <rect x="11" y="11" width="10" height="6" fill="#fed7aa" />
          <rect x="13" y="13" width="1" height="2" fill="#14532d" />
          <rect x="18" y="13" width="1" height="2" fill="#14532d" />
          {/* Cloak & Tunic */}
          <rect x="9" y="17" width="14" height="10" fill="#166534" />
          <rect x="13" y="19" width="6" height="6" fill="#854d0e" />
          {/* Bow on Back */}
          <rect x="6" y="10" width="2" height="14" fill="#a16207" />
          <rect x="7" y="9" width="2" height="2" fill="#713f12" />
          <rect x="7" y="23" width="2" height="2" fill="#713f12" />
        </svg>
      );

    case 'cozy_kitty':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges" className={className}>
          {/* Cat Ears */}
          <rect x="10" y="7" width="3" height="4" fill="#f97316" />
          <rect x="19" y="7" width="3" height="4" fill="#f97316" />
          <rect x="11" y="8" width="1" height="2" fill="#fbcfe8" />
          <rect x="20" y="8" width="1" height="2" fill="#fbcfe8" />
          {/* Face */}
          <rect x="9" y="11" width="14" height="10" fill="#fb923c" />
          <rect x="11" y="14" width="2" height="2" fill="#1e293b" />
          <rect x="19" y="14" width="2" height="2" fill="#1e293b" />
          <rect x="15" y="16" width="2" height="1" fill="#be185d" />
          {/* Whiskers */}
          <rect x="7" y="15" width="2" height="1" fill="#475569" />
          <rect x="23" y="15" width="2" height="1" fill="#475569" />
          {/* Scarf */}
          <rect x="8" y="20" width="16" height="3" fill="#dc2626" />
          <rect x="10" y="23" width="3" height="4" fill="#b91c1c" />
          {/* Body */}
          <rect x="10" y="23" width="12" height="6" fill="#fdba74" />
        </svg>
      );

    case 'cyber_ninja':
      return (
        <svg width={size} height={size} viewBox="0 0 32 32" shapeRendering="crispEdges" className={className}>
          {/* Cyber Mask */}
          <rect x="10" y="7" width="12" height="12" fill="#0f172a" />
          <rect x="9" y="10" width="14" height="8" fill="#1e293b" />
          {/* Glowing Visor */}
          <rect x="10" y="12" width="12" height="3" fill="#06b6d4" />
          <rect x="12" y="13" width="8" height="1" fill="#67e8f9" />
          {/* Scarf / Headband tail */}
          <rect x="22" y="9" width="5" height="2" fill="#ec4899" />
          <rect x="24" y="11" width="4" height="2" fill="#ec4899" />
          {/* Cyber Armor */}
          <rect x="9" y="19" width="14" height="9" fill="#0f172a" />
          <rect x="14" y="20" width="4" height="4" fill="#06b6d4" />
          {/* Katana */}
          <rect x="6" y="8" width="2" height="18" fill="#e2e8f0" />
          <rect x="5" y="23" width="4" height="1" fill="#ec4899" />
        </svg>
      );
  }
};
