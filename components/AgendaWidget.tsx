import React from 'react';
import { ListIcon } from './icons.tsx';
import { useCurrentTime } from '../hooks/useCurrentTime.ts';

const AGENDA_ITEMS = [
    { time: '09:00', task: 'Team Stand-up' },
    { time: '09:30', task: 'Review PRs' },
    { time: '10:00', task: 'Deep Work: Feature A' },
    { time: '12:00', task: 'Lunch Break' },
    { time: '13:00', task: 'Client Meeting' },
    { time: '14:00', task: 'Code Refactoring' },
    { time: '16:00', task: 'Documentation' },
    { time: '17:00', task: 'Plan Tomorrow' },
    { time: '18:00', task: 'End of Day' },
];

const AgendaWidget = () => {
    const now = useCurrentTime();

    const getCurrentItemIndex = () => {
        const currentTime = now.getHours() * 60 + now.getMinutes();
        let activeIndex = -1;
        for (let i = AGENDA_ITEMS.length - 1; i >= 0; i--) {
            const [hours, minutes] = AGENDA_ITEMS[i].time.split(':').map(Number);
            const itemTime = hours * 60 + minutes;
            if (currentTime >= itemTime) {
                activeIndex = i;
                break;
            }
        }
        return activeIndex;
    };
    
    const currentItemIndex = getCurrentItemIndex();

    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col shadow-lg h-64">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-800">Today's Agenda</h3>
                <ListIcon className="w-6 h-6 text-slate-400" />
            </div>

            <div className="flex-grow overflow-y-auto pr-2">
                <ul className="space-y-3">
                    {AGENDA_ITEMS.map((item, index) => {
                        const isCurrent = index === currentItemIndex;
                        const isPast = index < currentItemIndex;
                        return (
                            <li key={index} className="flex items-center gap-4">
                                <span className={`font-mono text-sm ${isCurrent ? 'text-blue-600 font-bold' : isPast ? 'text-slate-400' : 'text-slate-500'}`}>
                                    {item.time}
                                </span>
                                <div className={`flex-grow border-t ${isCurrent ? 'border-blue-500' : 'border-slate-200'}`}></div>
                                <span className={`text-sm ${isCurrent ? 'text-slate-800 font-semibold' : isPast ? 'text-slate-400 line-through' : 'text-slate-600'}`}>
                                    {item.task}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default AgendaWidget;