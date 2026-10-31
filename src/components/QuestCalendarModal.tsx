import React, { useState } from 'react';
import { DayLog } from '../types';
import { X, ChevronLeft, ChevronRight, Calendar as CalendarIcon, Award, Sparkles } from 'lucide-react';

interface QuestCalendarModalProps {
  history: Record<string, DayLog>;
  onClose: () => void;
  onPlayClickSound: () => void;
}

export const QuestCalendarModal: React.FC<QuestCalendarModalProps> = ({
  history,
  onClose,
  onPlayClickSound,
}) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const todayStr = new Date().toISOString().split('T')[0];
  const [selectedDateStr, setSelectedDateStr] = useState<string>(todayStr);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthNames = [
    'JANUARY', 'FEBRUARY', 'MARCH', 'APRIL', 'MAY', 'JUNE',
    'JULY', 'AUGUST', 'SEPTEMBER', 'OCTOBER', 'NOVEMBER', 'DECEMBER'
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => {
    onPlayClickSound();
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    onPlayClickSound();
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const selectedLog = history[selectedDateStr];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-3 sm:p-4 animate-in fade-in">
      <div className="bg-[#fcf6ea] border-4 border-[#2d2740] shadow-pixel-lg max-w-lg w-full p-4 sm:p-5 relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2.5 right-2.5 p-1 text-[#2d2740] hover:bg-white border border-[#2d2740] shadow-pixel-sm active:translate-x-[1px] active:translate-y-[1px]"
        >
          <X size={16} />
        </button>

        {/* Modal Title */}
        <div className="flex items-center gap-2 mb-3 pb-2 border-b-2 border-dashed border-[#2d2740]">
          <CalendarIcon size={18} className="text-[#3b6f99]" />
          <div>
            <h3 className="font-pixel text-xs sm:text-sm text-[#2d2740] uppercase">
              8-BIT QUEST LOG & CALENDAR
            </h3>
            <span className="font-retro text-[10px] text-[#4c4270] font-bold">
              YOUR JOURNEY OVER TIME
            </span>
          </div>
        </div>

        {/* Month Navigation */}
        <div className="flex items-center justify-between bg-white border-2 border-[#2d2740] shadow-pixel-sm px-3 py-1.5 mb-3">
          <button
            onClick={handlePrevMonth}
            className="p-1 hover:bg-[#eef0fb] text-[#2d2740]"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-pixel text-xs text-[#2d2740] tracking-wider">
            {monthNames[month]} {year}
          </span>
          <button
            onClick={handleNextMonth}
            className="p-1 hover:bg-[#eef0fb] text-[#2d2740]"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Days of Week Header */}
        <div className="grid grid-cols-7 gap-1 text-center mb-1">
          {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d) => (
            <span
              key={d}
              className="font-retro text-[10px] font-bold text-[#4c4270] py-0.5"
            >
              {d}
            </span>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 mb-4">
          {/* Empty cells before month start */}
          {Array.from({ length: firstDayIndex }).map((_, i) => (
            <div key={`empty-${i}`} className="h-11 sm:h-12 bg-transparent" />
          ))}

          {/* Days of the Month */}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const dayNum = i + 1;
            const formattedMonth = String(month + 1).padStart(2, '0');
            const formattedDay = String(dayNum).padStart(2, '0');
            const dateKey = `${year}-${formattedMonth}-${formattedDay}`;

            const dayLog = history[dateKey];
            const hasActivity = dayLog && dayLog.xpEarned > 0;
            const isToday = dateKey === todayStr;
            const isSelected = dateKey === selectedDateStr;

            return (
              <button
                key={dateKey}
                onClick={() => {
                  onPlayClickSound();
                  setSelectedDateStr(dateKey);
                }}
                className={`h-11 sm:h-12 p-1 border flex flex-col justify-between items-center transition-all relative ${
                  isSelected
                    ? 'border-[#2d2740] ring-2 ring-[#3b6f99] bg-[#eef0fb]'
                    : isToday
                    ? 'border-[#3b6f99] bg-white'
                    : 'border-[#2d2740]/40 bg-white/80 hover:bg-white'
                }`}
              >
                <div className="w-full flex items-center justify-between text-[10px] font-retro font-bold">
                  <span className={isToday ? 'text-[#3b6f99] underline' : 'text-[#2d2740]'}>
                    {dayNum}
                  </span>
                  {hasActivity && <span className="text-[9px]">💎</span>}
                </div>

                {hasActivity ? (
                  <span className="font-pixel text-[8px] text-[#15803d] truncate w-full text-center">
                    +{dayLog.xpEarned}
                  </span>
                ) : (
                  <span className="text-[8px] text-gray-300">-</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Selected Day Details Card */}
        <div className="p-3 bg-white border-2 border-[#2d2740] shadow-pixel-sm">
          <div className="flex items-center justify-between border-b border-dashed border-[#2d2740]/40 pb-2 mb-2">
            <span className="font-pixel text-xs text-[#2d2740]">
              DATE: {selectedDateStr}
            </span>
            {selectedDateStr === todayStr && (
              <span className="font-retro text-[10px] text-[#3b6f99] font-bold bg-[#eef0fb] px-1.5 py-0.5 border border-[#3b6f99]">
                TODAY
              </span>
            )}
          </div>

          {selectedLog ? (
            <div className="space-y-1.5 text-xs font-retro">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">XP GAINED:</span>
                <span className="font-pixel text-[11px] text-[#15803d]">
                  +{selectedLog.xpEarned} XP
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">QUESTS COMPLETED:</span>
                <span className="font-bold text-[#2d2740]">
                  {selectedLog.questsCompleted} Completed
                </span>
              </div>
              {selectedLog.reflection && (
                <div className="pt-1.5 border-t border-dashed border-gray-200">
                  <span className="text-[10px] text-[#4c4270] font-bold uppercase block">
                    Daily Improvement:
                  </span>
                  <p className="text-[#2d2740] italic mt-0.5">"{selectedLog.reflection}"</p>
                </div>
              )}
              {selectedLog.tomorrowQuest && (
                <div className="pt-1 border-t border-dashed border-gray-200">
                  <span className="text-[10px] text-[#9c5548] font-bold uppercase block">
                    Next Quest Set:
                  </span>
                  <p className="text-[#2d2740] italic mt-0.5">"{selectedLog.tomorrowQuest}"</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-2 text-xs font-retro text-gray-400">
              <p>No quests recorded on this day.</p>
              <p className="text-[10px] mt-0.5 text-gray-400">
                (Rest is part of the game. Embers kept warm! ☕)
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
