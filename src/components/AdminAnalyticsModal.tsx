import React, { useState, useMemo } from 'react';
import { 
  X, 
  Activity, 
  Eye, 
  Download, 
  Search, 
  Users, 
  Trash2, 
  RefreshCw, 
  Globe, 
  Smartphone, 
  DownloadCloud,
  Clock,
  Filter,
  BarChart2
} from 'lucide-react';
import { AnalyticsEvent, getAnalyticsEvents, clearAnalyticsEvents } from '../utils/analytics';

interface AdminAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminAnalyticsModal: React.FC<AdminAnalyticsModalProps> = ({
  isOpen,
  onClose
}) => {
  const [events, setEvents] = useState<AnalyticsEvent[]>(() => getAnalyticsEvents());
  const [filterAction, setFilterAction] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleRefresh = () => {
    setEvents(getAnalyticsEvents());
  };

  const handleClear = () => {
    if (window.confirm('Очистить всю историю посещений и действий?')) {
      clearAnalyticsEvents();
      setEvents([]);
    }
  };

  // Filtered events
  const filteredEvents = events.filter(ev => {
    if (filterAction !== 'all' && ev.action !== filterAction) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      return (
        ev.details.toLowerCase().includes(q) ||
        ev.device.toLowerCase().includes(q) ||
        ev.location.toLowerCase().includes(q) ||
        ev.ipApprox.includes(q) ||
        ev.action.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Calculate Metrics
  const totalVisits = events.filter(e => e.action === 'Визит').length;
  const totalDownloads = events.filter(e => e.action === 'Скачивание').length;
  const totalViews = events.filter(e => e.action === 'Просмотр').length;
  const totalSearches = events.filter(e => e.action === 'Поиск').length;

  if (!isOpen) return null;

  const getActionBadgeClass = (action: string) => {
    switch (action) {
      case 'Скачивание':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'Просмотр':
        return 'bg-purple-950 text-purple-300 border-purple-800';
      case 'Поиск':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'Визит':
        return 'bg-blue-950 text-blue-300 border-blue-800';
      default:
        return 'bg-neutral-900 text-neutral-300 border-neutral-800';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#09090b] border border-neutral-800 rounded-2xl w-full max-w-5xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-neutral-200">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#0c0c0e]">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-950/80 border border-emerald-800/80 text-emerald-400">
              <Activity className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-white font-mono">Статистика и Посетители Сайта</h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-900/60 text-emerald-300 border border-emerald-700/80">
                  LIVE
                </span>
              </div>
              <p className="text-xs text-neutral-400">Журнал действия пользователей в реальном времени (Визиты, скачивания, поиск)</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-300 hover:text-white transition flex items-center gap-1.5 text-xs font-mono"
              title="Обновить лог"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              Обновить
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-lg bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1 font-sans">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono">
            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Визитов на сайт</span>
                <Globe className="w-4 h-4 text-blue-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">{totalVisits}</div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Скачиваний EXE/APK</span>
                <Download className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">{totalDownloads}</div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Просмотров проектов</span>
                <Eye className="w-4 h-4 text-purple-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">{totalViews}</div>
            </div>

            <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 space-y-1">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Поисков по сайту</span>
                <Search className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-extrabold text-white">{totalSearches}</div>
            </div>
          </div>

          {/* Filter & Search Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-neutral-950 p-3 rounded-xl border border-neutral-800 font-mono text-xs">
            
            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-neutral-500 mr-1 flex items-center gap-1">
                <Filter className="w-3.5 h-3.5" /> Фильтр:
              </span>
              {['all', 'Визит', 'Скачивание', 'Просмотр', 'Поиск'].map(act => (
                <button
                  key={act}
                  onClick={() => setFilterAction(act)}
                  className={`px-2.5 py-1 rounded-md transition ${
                    filterAction === act
                      ? 'bg-neutral-800 text-white font-bold border border-neutral-700'
                      : 'text-neutral-400 hover:text-white'
                  }`}
                >
                  {act === 'all' ? 'Все действия' : act}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Поиск по IP, устройству или действию..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-neutral-700 text-xs"
              />
            </div>
          </div>

          {/* Activity Events Table */}
          <div className="border border-neutral-800 rounded-xl overflow-hidden bg-neutral-950">
            <div className="px-4 py-3 bg-neutral-900/60 border-b border-neutral-800 flex items-center justify-between font-mono text-xs text-neutral-400">
              <span className="flex items-center gap-1.5 font-bold text-neutral-200">
                <BarChart2 className="w-4 h-4 text-emerald-400" />
                Журнал активности ({filteredEvents.length} записей)
              </span>
              <button
                onClick={handleClear}
                className="text-neutral-500 hover:text-rose-400 transition flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                Очистить лог
              </button>
            </div>

            {filteredEvents.length === 0 ? (
              <div className="p-8 text-center text-neutral-500 text-sm font-mono">
                Нет сохраненных записей за выбранный период.
              </div>
            ) : (
              <div className="divide-y divide-neutral-800/60 overflow-x-auto">
                <table className="w-full text-left text-xs font-mono">
                  <thead className="bg-neutral-900/40 text-neutral-400 uppercase tracking-wider text-[10px]">
                    <tr>
                      <th className="px-4 py-2.5">Время</th>
                      <th className="px-4 py-2.5">Действие</th>
                      <th className="px-4 py-2.5">Детали и Проект</th>
                      <th className="px-4 py-2.5">Устройство</th>
                      <th className="px-4 py-2.5">Локация / IP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-900">
                    {filteredEvents.map(ev => (
                      <tr key={ev.id} className="hover:bg-neutral-900/50 transition">
                        <td className="px-4 py-3 text-neutral-400 whitespace-nowrap flex items-center gap-1">
                          <Clock className="w-3 h-3 text-neutral-500" />
                          {ev.formattedTime}
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${getActionBadgeClass(ev.action)}`}>
                            {ev.action}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-white font-medium max-w-xs truncate">
                          {ev.details}
                        </td>
                        <td className="px-4 py-3 text-neutral-400 whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Smartphone className="w-3 h-3 text-neutral-500" />
                            {ev.device}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-neutral-400 whitespace-nowrap">
                          <div className="flex items-center gap-1 text-neutral-300">
                            <Globe className="w-3 h-3 text-neutral-500" />
                            {ev.location}
                            <span className="text-[10px] text-neutral-500">({ev.ipApprox})</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0c0c0e] border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-500 font-mono">
          <span>Данные аналитики сохраняются локально и доступны только администратору.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white font-medium transition"
          >
            Закрыть
          </button>
        </div>

      </div>
    </div>
  );
};
