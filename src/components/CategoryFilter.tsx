import React from 'react';
import { 
  Monitor, 
  Smartphone, 
  Gamepad2, 
  Wrench, 
  Puzzle,
  Search, 
  X, 
  Sparkles, 
  SlidersHorizontal,
  LayoutGrid,
  List
} from 'lucide-react';
import { Platform, ProjectType, SortOption } from '../types';

interface CategoryFilterProps {
  selectedPlatform: Platform;
  setSelectedPlatform: (p: Platform) => void;
  selectedType: ProjectType;
  setSelectedType: (t: ProjectType) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  sortOption: SortOption;
  setSortOption: (s: SortOption) => void;
  selectedTag: string | null;
  setSelectedTag: (tag: string | null) => void;
  allTags: string[];
  viewMode: 'grid' | 'list';
  setViewMode: (v: 'grid' | 'list') => void;
  totalFiltered: number;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedPlatform,
  setSelectedPlatform,
  selectedType,
  setSelectedType,
  searchQuery,
  setSearchQuery,
  sortOption,
  setSortOption,
  selectedTag,
  setSelectedTag,
  allTags,
  viewMode,
  setViewMode,
  totalFiltered
}) => {
  return (
    <div id="catalog" className="bg-[#060608] border-y border-neutral-800 py-4 sticky top-16 z-30 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
        
        {/* Main Category Tabs Container */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-3">
          
          {/* Category Menu: Platform & Type Switchers */}
          <div className="flex flex-wrap items-center gap-2 max-w-full">
            
            {/* PLATFORM FILTER MENU */}
            <div className="flex flex-wrap items-center bg-[#000000] p-1 rounded-lg border border-neutral-800 max-w-full">
              <button
                onClick={() => setSelectedPlatform('all')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                  selectedPlatform === 'all'
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
                Все
              </button>

              <button
                onClick={() => setSelectedPlatform('windows')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                  selectedPlatform === 'windows'
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5 text-neutral-400" />
                Windows ПК
              </button>

              <button
                onClick={() => {
                  setSelectedPlatform('android');
                  if (selectedType === 'extension') {
                    setSelectedType('all');
                  }
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                  selectedPlatform === 'android'
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
                Android
              </button>
            </div>

            <div className="h-6 w-px bg-neutral-800 hidden sm:block" />

            {/* TYPE FILTER MENU (GAMES vs APPS vs EXTENSIONS) */}
            <div className="flex flex-wrap items-center bg-[#000000] p-1 rounded-lg border border-neutral-800 max-w-full">
              <button
                onClick={() => setSelectedType('all')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-mono font-medium transition ${
                  selectedType === 'all'
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                Всё
              </button>

              <button
                onClick={() => setSelectedType('game')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                  selectedType === 'game'
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Gamepad2 className="w-3.5 h-3.5 text-neutral-400" />
                Игры
              </button>

              <button
                onClick={() => setSelectedType('app')}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                  selectedType === 'app'
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Wrench className="w-3.5 h-3.5 text-neutral-400" />
                Программы
              </button>

              <button
                onClick={() => {
                  setSelectedType('extension');
                  if (selectedPlatform === 'android') {
                    setSelectedPlatform('all');
                  }
                }}
                className={`px-2.5 sm:px-3 py-1.5 rounded-md text-xs font-mono font-medium transition flex items-center gap-1.5 ${
                  selectedType === 'extension'
                    ? 'bg-neutral-800 text-white border border-neutral-700'
                    : 'text-neutral-400 hover:text-white'
                }`}
              >
                <Puzzle className="w-3.5 h-3.5 text-neutral-400" />
                Расширения
              </button>
            </div>

          </div>

          {/* Search, Sort & View Controls */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
              <input
                type="text"
                placeholder="Поиск по названию или тегам..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-8 py-1.5 text-xs bg-[#000000] border border-neutral-800 rounded-lg text-neutral-100 placeholder-neutral-500 focus:outline-none focus:border-neutral-600 transition font-mono"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sort Options Dropdown */}
            <div className="flex items-center gap-1 bg-[#000000] px-2.5 py-1.5 rounded-lg border border-neutral-800 text-xs text-neutral-300 font-mono">
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value as SortOption)}
                className="bg-transparent text-neutral-200 focus:outline-none cursor-pointer"
              >
                <option value="newest" className="bg-neutral-900 text-neutral-200">Сначала новые</option>
                <option value="popular" className="bg-neutral-900 text-neutral-200">По скачиваниям</option>
                <option value="rating" className="bg-neutral-900 text-neutral-200">По рейтингу</option>
                <option value="title" className="bg-neutral-900 text-neutral-200">По алфавиту</option>
              </select>
            </div>

            {/* View Mode Switcher */}
            <div className="flex items-center bg-[#000000] p-1 rounded-lg border border-neutral-800">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-md transition ${
                  viewMode === 'grid' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-200'
                }`}
                title="Сетка"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-md transition ${
                  viewMode === 'list' ? 'bg-neutral-800 text-white' : 'text-neutral-500 hover:text-neutral-200'
                }`}
                title="Список"
              >
                <List className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>

        {/* Tech Tag Pills Row */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar font-mono">
          <span className="text-neutral-500 shrink-0 mr-1 text-[11px]">
            Теги:
          </span>
          <button
            onClick={() => setSelectedTag(null)}
            className={`px-2.5 py-1 rounded-md shrink-0 transition ${
              selectedTag === null
                ? 'bg-neutral-800 text-white border border-neutral-700 font-medium'
                : 'bg-[#000000] text-neutral-400 border border-neutral-800 hover:text-neutral-200'
            }`}
          >
            Все
          </button>
          {allTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
              className={`px-2.5 py-1 rounded-md shrink-0 transition ${
                selectedTag === tag
                  ? 'bg-white text-black font-semibold'
                  : 'bg-[#000000] text-neutral-300 border border-neutral-800 hover:border-neutral-700'
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>

        {/* Active Filter Summary Bar */}
        {(selectedPlatform !== 'all' || selectedType !== 'all' || selectedTag !== null || searchQuery !== '') && (
          <div className="flex items-center justify-between text-xs font-mono bg-[#000000] px-3 py-1.5 rounded-md border border-neutral-800">
            <div className="flex items-center gap-2 text-neutral-300">
              <span>Найдено: <strong className="text-white">{totalFiltered}</strong> файлов</span>
              <span className="text-neutral-700">•</span>
              <div className="flex items-center gap-1 flex-wrap">
                {selectedPlatform !== 'all' && (
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">
                    Платформа: {selectedPlatform === 'windows' ? 'Windows' : 'Android'}
                  </span>
                )}
                {selectedType !== 'all' && (
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">
                    Тип: {selectedType === 'game' ? 'Игры' : selectedType === 'extension' ? 'Расширения' : 'Программы'}
                  </span>
                )}
                {selectedTag && (
                  <span className="px-2 py-0.5 rounded bg-neutral-800 text-neutral-200 border border-neutral-700">
                    #{selectedTag}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                setSelectedPlatform('all');
                setSelectedType('all');
                setSelectedTag(null);
                setSearchQuery('');
              }}
              className="text-xs text-neutral-400 hover:text-white underline underline-offset-2 ml-2 shrink-0"
            >
              Сбросить
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
