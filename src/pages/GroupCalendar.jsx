import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';

// Calendar page for a group. Displays monthly calendar with current date highlighted.
export default function GroupCalendar() {
  const { group } = useOutletContext();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth()); // 0-based
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const startDay = new Date(year, month, 1).getDay();
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const prevMonth = () => {
    setMonth((m) => (m === 0 ? 11 : m - 1));
    if (month === 0) setYear((y) => y - 1);
  };
  const nextMonth = () => {
    setMonth((m) => (m === 11 ? 0 : m + 1));
    if (month === 11) setYear((y) => y + 1);
  };
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">Calendar</h2>
      <div className="flex items-center justify-between">
        <button onClick={prevMonth} className="text-blue-600 hover:underline">Previous Month</button>
        <span className="font-semibold">{monthNames[month]} {year}</span>
        <button onClick={nextMonth} className="text-blue-600 hover:underline">Next Month</button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((d) => (
          <div key={d} className="font-semibold py-2">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">
        {/* Empty cells for start day */}
        {Array.from({ length: startDay }, (_, i) => (
          <div key={i} className="py-2"></div>
        ))}
        {days.map((d) => {
          const isToday = today.getDate() === d && today.getMonth() === month && today.getFullYear() === year;
          return (
            <div
              key={d}
              className={`py-2 border rounded ${isToday ? 'bg-green-200 font-bold' : 'bg-white'}`}
            >
              {d}
            </div>
          );
        })}
      </div>
    </div>
  );
}