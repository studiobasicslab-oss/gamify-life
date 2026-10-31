import React from 'react';

export interface FloatingItem {
  id: string;
  text: string;
  x: number;
  y: number;
  color?: string;
}

interface FloatingXpEffectProps {
  items: FloatingItem[];
}

export const FloatingXpEffect: React.FC<FloatingXpEffectProps> = ({ items }) => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {items.map((item) => (
        <div
          key={item.id}
          style={{
            left: `${item.x}px`,
            top: `${item.y}px`,
          }}
          className="absolute -translate-x-1/2 -translate-y-1/2 animate-float-fade font-pixel text-sm sm:text-base font-bold drop-shadow-[2px_2px_0px_#2d2740] select-none text-[#fbbf24]"
        >
          {item.text}
        </div>
      ))}
    </div>
  );
};

