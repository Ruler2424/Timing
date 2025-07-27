// components/AgendaWidget.tsx
'use client'
import React, { useState, useEffect, useCallback } from 'react';
import { ListIcon } from './icons.tsx'; // Предполагается, что ListIcon тоже будет серым
import { useCurrentTime } from '../hooks/useCurrentTime.ts';
import { useAudioPlayer } from '../utils/sounds/playSound.tsx';

// Интерфейс для элемента расписания
interface AgendaItem {
    id: string; // Уникальный идентификатор для ключей при маппинге
    time: string;
    task: string;
}

// Начальные данные расписания
const INITIAL_AGENDA_ITEMS: AgendaItem[] = [
    { id: '1', time: '09:00', task: 'Team Stand-up' },
    { id: '2', time: '09:30', task: 'Review PRs' },
    { id: '3', time: '10:00', task: 'Deep Work: Feature A' },
    { id: '4', time: '12:00', task: 'Lunch Break' },
    { id: '5', time: '13:00', task: 'Client Meeting' },
    { id: '6', time: '14:00', task: 'Code Refactoring' },
    { id: '7', time: '16:00', task: 'Documentation' },
    { id: '8', time: '17:00', task: 'Plan Tomorrow' },
    { id: '9', time: '18:00', task: 'End of Day' },
];

const ALERT_BEFORE_MINUTES = 5;

const AgendaWidget = () => {
    // Состояние для хранения расписания
    const [agendaItems, setAgendaItems] = useState<AgendaItem[]>(INITIAL_AGENDA_ITEMS);
    
    // Состояния для редактирования
    const [isEditing, setIsEditing] = useState<string | null>(null); // ID редактируемого элемента
    const [editedTime, setEditedTime] = useState('');
    const [editedTask, setEditedTask] = useState('');

    const now = useCurrentTime();
    const { play, stop, isPlaying } = useAudioPlayer();
    const agendaAlertSound = '../utils/sounds/agenda-alert.mp3'; // Убедитесь, что этот путь корректен

    const getCurrentItemIndex = () => {
        const currentTime = now.getHours() * 60 + now.getMinutes();
        let activeIndex = -1;
        for (let i = agendaItems.length - 1; i >= 0; i--) {
            const [hours, minutes] = agendaItems[i].time.split(':').map(Number);
            const itemTime = hours * 60 + minutes;
            if (currentTime >= itemTime) {
                activeIndex = i;
                break;
            }
        }
        return activeIndex;
    };
    
    const getNextItemIndex = () => {
        const currentTime = now.getHours() * 60 + now.getMinutes();
        for (let i = 0; i < agendaItems.length; i++) {
            const [hours, minutes] = agendaItems[i].time.split(':').map(Number);
            const itemTime = hours * 60 + minutes;
            if (currentTime < itemTime) {
                return i;
            }
        }
        return -1; // Нет будущих событий
    };

    const currentItemIndex = getCurrentItemIndex();
    const nextItemIndex = getNextItemIndex();

    // Эффект для проверки и воспроизведения звука оповещения
    useEffect(() => {
        if (nextItemIndex !== -1) {
            const [nextHours, nextMinutes] = agendaItems[nextItemIndex].time.split(':').map(Number);
            const nextEventTimeInMinutes = nextHours * 60 + nextMinutes;
            const currentTimeInMinutes = now.getHours() * 60 + now.getMinutes();

            if (currentTimeInMinutes >= (nextEventTimeInMinutes - ALERT_BEFORE_MINUTES) &&
                currentTimeInMinutes < nextEventTimeInMinutes) {
                
                if (!isPlaying(agendaAlertSound)) {
                    play(agendaAlertSound);
                }
            } else {
                if (isPlaying(agendaAlertSound)) {
                    stop(agendaAlertSound);
                }
            }
        } else {
            if (isPlaying(agendaAlertSound)) {
                stop(agendaAlertSound);
            }
        }
    }, [now, nextItemIndex, ALERT_BEFORE_MINUTES, play, stop, isPlaying, agendaAlertSound, agendaItems]);

    // Обработчик для сохранения изменений
    const handleSave = useCallback((itemId: string) => {
        if (editedTime && editedTask.trim()) {
            setAgendaItems(prevItems => 
                prevItems.map(item => 
                    item.id === itemId 
                        ? { ...item, time: editedTime, task: editedTask.trim() } 
                        : item
                )
            );
            setIsEditing(null); // Выход из режима редактирования
        } else {
            alert("Please enter both time and task."); // Простое уведомление об ошибке
        }
    }, [editedTime, editedTask]);

    // Обработчик для отмены редактирования
    const handleCancelEdit = useCallback(() => {
        setIsEditing(null); // Просто выходим из режима редактирования
    }, []);

    // Обработчик для удаления события
    const handleDelete = useCallback((itemId: string) => {
        setAgendaItems(prevItems => prevItems.filter(item => item.id !== itemId));
        if (isEditing === itemId) {
            setIsEditing(null); // Если удалили редактируемый элемент, выходим из режима редактирования
        }
    }, [isEditing]);

    // Обработчик для начала редактирования
    const handleEdit = useCallback((item: AgendaItem) => {
        setIsEditing(item.id);
        setEditedTime(item.time);
        setEditedTask(item.task);
    }, []);

    // Обработчик для добавления нового события
    const handleAddItem = useCallback(() => {
        const newItem: AgendaItem = {
            id: Date.now().toString(), // Простой способ генерации уникального ID
            time: '08:00', // Время по умолчанию
            task: 'New Task', // Задача по умолчанию
        };
        setAgendaItems(prevItems => [...prevItems, newItem]);
        handleEdit(newItem); // Сразу переходим в режим редактирования нового элемента
    }, [handleEdit]);


    return (
        <div className="bg-white rounded-2xl p-6 flex flex-col shadow-lg h-64">
            <div className="flex justify-between items-center mb-4">
                <h3 className="font-semibold text-slate-800">Today's Agenda</h3>
                {/* Кнопка для добавления нового события */}
                <div className="flex items-center gap-2">
                    <button onClick={handleAddItem} aria-label="Add new item">
                        {/* Иконка плюса - делаем её серой */}
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-slate-400 hover:text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 6h6m-6 0H6" />
                        </svg>
                    </button>
                    {/* Иконка списка - уже серая */}
                    <ListIcon className="w-6 h-6 text-slate-400" />
                </div>
            </div>

            <div className="flex-grow overflow-y-auto pr-2">
                <ul className="space-y-3">
                    {agendaItems.map((item, index) => {
                        const isCurrent = index === currentItemIndex;
                        const isPast = index < currentItemIndex;
                        const isEditingItem = isEditing === item.id; // Проверяем, редактируется ли текущий элемент

                        return (
                            <li key={item.id} className={`flex items-center gap-4 py-1 pr-2 rounded ${isEditingItem ? 'bg-slate-100' : ''}`}>
                                {isEditingItem ? (
                                    // --- Форма редактирования ---
                                    <>
                                        <input
                                            type="time"
                                            value={editedTime}
                                            onChange={(e) => setEditedTime(e.target.value)}
                                            className="w-20 bg-transparent text-sm font-mono text-blue-600 font-bold focus:outline-none border-none p-0" 
                                            aria-label="Edit time"
                                        />
                                        <input
                                            type="text"
                                            value={editedTask}
                                            onChange={(e) => setEditedTask(e.target.value)}
                                            className="flex-grow text-sm text-black font-semibold focus:outline-none border-none p-0" 
                                            aria-label="Edit task"
                                            maxLength={50} // Ограничение длины задачи
                                        />
                                        <div className="flex items-center gap-1">
                                            <button onClick={() => handleSave(item.id)} aria-label="Save item">
                                                {/* Иконка галочки - теперь серая */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 hover:text-slate-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M16.707 4.293a1 1 0 00-1.414 0L9 10.586l-3.293-3.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l6-6a1 1 0 00-1.414-1.414z" clipRule="evenodd"/>
                                                </svg>
                                            </button>
                                            <button onClick={handleCancelEdit} aria-label="Cancel edit">
                                                {/* Иконка крестика - теперь серая */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 hover:text-slate-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                                                </svg>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    // --- Обычный вид элемента ---
                                    <>
                                        <span className={`font-mono text-sm ${isCurrent ? 'text-blue-600 font-bold' : isPast ? 'text-slate-400' : 'text-slate-500'}`}>
                                            {item.time}
                                        </span>
                                        <div className={`flex-grow border-t ${isCurrent ? 'border-blue-500' : 'border-slate-200'}`}></div>
                                        <span className={`text-sm ${isCurrent ? 'text-slate-800 font-semibold truncate max-w-xs' : isPast ? 'text-slate-400 line-through' : 'text-slate-600 truncate max-w-xs'}`}>
                                            {item.task}
                                        </span>
                                        
                                        {/* Блок с кнопками Edit/Delete, который появляется при наведении */}
                                        <div className="flex items-center gap-1 opacity-100 group-hover:opacity-100 transition-opacity duration-300">
                                            <button onClick={() => handleEdit(item)} aria-label="Edit item">
                                                {/* Иконка карандаша - теперь серая */}
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-500 hover:text-slate-600" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M13.586 3.586a2 2 0 012.828 0L17.414 4.586a2 2 0 010 2.828l-.793.793-3.414-3.414.793-.793zM11.379 7.793L15 4.172l3.414 3.414-3.414 3.414-1.172-1.172-3.414-3.414zM7.071 11.414a2 2 0 010 2.828L5.757 15H3a1 1 0 01-1-1v-3.414l3.293-3.293a1 1 0 011.414 0zM14.414 14.414a1 1 0 01-1.414 0L10 11.414l-1.172 1.172 3.414 3.414a1 1 0 011.414 0L17.414 16a1 1 0 000-1.414L14.414 12.586z"/>
                                                </svg>
                                            </button>
                                            
                                                {/* Иконка корзины - теперь серая */}
                                                <button onClick={() => handleDelete(item.id)} aria-label="Delete item">
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 20 20">
                                                <path
                                                           fillRule="evenodd"
                                                                  d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-2.982l-.723-2a1 1 0 00-.894-.553H9zM7 7a1 1 0 001 1h6a1 1 0 100-2H8a1 1 0 00-1 1v6z"
                                                             clipRule="evenodd"
                                                             />
                                                </svg>
                                                </button>

                                            
                                        </div>
                                    </>
                                )}
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
};

export default AgendaWidget;