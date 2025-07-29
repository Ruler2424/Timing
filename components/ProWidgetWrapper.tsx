// components/ProWidgetWrapper.tsx
'use client'
import React from 'react';
import { LockIcon } from './icons';

const ProWidgetWrapper = ({ children, isPro, onUpgradeClick }: { children: React.ReactNode, isPro: boolean, onUpgradeClick: () => void }) => {
    // Получаем дочерний элемент, чтобы извлечь заголовок
    // Это может быть немного хрупким, если структура пропсов children изменится.
    // Более надежный способ - передавать заголовок как отдельный пропс, но для демонстрации используем этот.
    let widgetTitle = '';
    try {
        // Пытаемся найти заголовок внутри children. Предполагаем, что он является первым элементом h3.
        const element = children as React.ReactElement;
        if (element && element.props && element.props.children) {
            // Ищем заголовок внутри children. Это может потребовать более сложного парсинга,
            // но для примера попробуем найти первый h3.
            const childrenArray = React.Children.toArray(element.props.children);
            const titleElement = childrenArray.find(
                (child: any) => child.type === 'div' && child.props.children.some((subChild: any) => subChild.type === 'h3')
            );
            if (titleElement) {
                const titleDiv = titleElement.props.children.find((subChild: any) => subChild.type === 'div');
                if (titleDiv) {
                    const titleContent = titleDiv.props.children.find((subChild: any) => typeof subChild === 'string' || subChild.type === React.Fragment);
                    if (typeof titleContent === 'string') {
                        widgetTitle = titleContent.trim();
                    } else if (titleContent && titleContent.props && typeof titleContent.props.children === 'string') {
                         widgetTitle = titleContent.props.children.trim();
                    }
                }
            }
        }
    } catch (error) {
        console.error("Could not extract widget title:", error);
    }

    if (isPro) {
        return <>{children}</>;
    }

    return (
        <div
            className="relative rounded-2xl shadow-lg h-64 overflow-hidden group cursor-pointer transition-all duration-300 hover:shadow-xl"
            onClick={onUpgradeClick}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => { if (e.key === 'Enter' || e.key === ' ') onUpgradeClick() }}
        >
            {/* Размытый и обесцвеченный оригинал виджета */}
            <div className="absolute inset-0 blur-sm grayscale select-none -m-2 pointer-events-none">
                {children}
            </div>
            
            {/* Затемненный оверлей с приглашением к апгрейду */}
            <div className="absolute inset-0 bg-slate-200/60 dark:bg-slate-900/70 flex items-center justify-center transition-colors duration-300 group-hover:bg-slate-300/60 dark:group-hover:bg-slate-900/80">
                <div className="text-center p-5 bg-[var(--card-bg-color)]/90 backdrop-blur-sm rounded-xl shadow-xl border border-black/10">
                    <LockIcon className="w-8 h-8 mx-auto mb-2 text-yellow-500 animate-bounce" />
                    
                    {/* Явно указываем, что это PRO */}
                    <h4 className="text-lg font-bold text-yellow-500 mb-1">PRO Feature</h4> 
                    
                    {/* Формируем заголовок с упоминанием PRO */}
                    {widgetTitle && (
                        <p className="text-lg font-bold text-white mb-2 truncate" title={`Unlock ${widgetTitle}`}>
                            Unlock {widgetTitle}
                        </p>
                    )}

                    <p className="text-sm text-white group-hover:underline">Click to upgrade</p>
                 </div>
            </div>
        </div>
    );
};

export default ProWidgetWrapper;