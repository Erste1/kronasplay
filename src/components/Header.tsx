import React from 'react';
import { 
  Gamepad2, 
  Smartphone, 
  Monitor, 
  Download, 
  Plus, 
  FileCode, 
  Sparkles, 
  Menu, 
  X,
  ShieldCheck,
  Activity,
  Puzzle
} from 'lucide-react';
import { DeveloperProfile, Platform, ProjectType } from '../types';

interface HeaderProps {
  profile: DeveloperProfile;
  totalProjects: number;
  isAdmin: boolean;
  onOpenAdminAuth: () => void;
  onLogoutAdmin: () => void;
  onOpenAddModal: () => void;
  onOpenExportModal: () => void;
  onOpenAnalyticsModal?: () => void;
  onSelectPlatform: (platform: Platform) => void;
  onSelectType: (type: ProjectType) => void;
}

export const Header: React.FC<HeaderProps> = ({
  profile,
  totalProjects,
  isAdmin,
  onOpenAdminAuth,
  onLogoutAdmin,
  onOpenAddModal,
  onOpenExportModal,
  onOpenAnalyticsModal,
  onSelectPlatform,
  onSelectType
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [clickCount, setClickCount] = React.useState(0);
  const clickTimerRef = React.useRef<any>(null);

  const handleLogoClick = () => {
    if (isAdmin) return;

    const nextCount = clickCount + 1;
    if (nextCount >= 3) {
      setClickCount(0);
      onOpenAdminAuth();
    } else {
      setClickCount(nextCount);
    }

    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      setClickCount(0);
    }, 1200);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#060608]/95 backdrop-blur-md border-b border-neutral-800 text-neutral-100 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo & Brand */}
          <div 
            className="flex items-center space-x-3 cursor-pointer select-none"
            onClick={handleLogoClick}
            title={!isAdmin ? "Kronas Play" : undefined}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden border border-neutral-700/80 shadow-md shrink-0 bg-black">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <a href="#top" onClick={(e) => e.stopPropagation()} className="font-bold text-lg tracking-tight hover:text-white transition flex items-center gap-2 font-mono">
                {profile.name}
              </a>
              <p className="text-xs text-neutral-400 font-mono hidden sm:block">
                Windows & Android • {totalProjects} проектов
              </p>
            </div>
          </div>

          {/* Desktop Navigation Category Links (XL screens) */}
          <nav className="hidden xl:flex items-center space-x-1.5 text-xs font-medium">
            <button
              onClick={() => { onSelectPlatform('all'); onSelectType('all'); }}
              className="px-2.5 py-1.5 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition flex items-center gap-1.5 border border-transparent hover:border-neutral-700"
            >
              <Sparkles className="w-3.5 h-3.5 text-neutral-400" />
              Все проекты
            </button>

            <button
              onClick={() => { onSelectPlatform('windows'); }}
              className="px-2.5 py-1.5 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition flex items-center gap-1.5 border border-transparent hover:border-neutral-700"
            >
              <Monitor className="w-3.5 h-3.5 text-neutral-400" />
              Windows (ПК)
            </button>

            <button
              onClick={() => { onSelectPlatform('android'); }}
              className="px-2.5 py-1.5 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition flex items-center gap-1.5 border border-transparent hover:border-neutral-700"
            >
              <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
              Android
            </button>

            <button
              onClick={() => { onSelectType('game'); }}
              className="px-2.5 py-1.5 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition flex items-center gap-1.5 border border-transparent hover:border-neutral-700"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-neutral-400" />
              Игры
            </button>

            <button
              onClick={() => { onSelectType('app'); }}
              className="px-2.5 py-1.5 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition flex items-center gap-1.5 border border-transparent hover:border-neutral-700"
            >
              <Download className="w-3.5 h-3.5 text-neutral-400" />
              Программы
            </button>

            <button
              onClick={() => { onSelectType('extension'); }}
              className="px-2.5 py-1.5 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition flex items-center gap-1.5 border border-transparent hover:border-neutral-700"
            >
              <Puzzle className="w-3.5 h-3.5 text-neutral-400" />
              Расширения
            </button>

            <a
              href="#about"
              className="px-2.5 py-1.5 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800/80 transition border border-transparent hover:border-neutral-700 whitespace-nowrap"
            >
              О разработчике
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden xl:flex items-center space-x-2">
            {isAdmin && (
              <>
                <button
                  onClick={onOpenAnalyticsModal}
                  title="Открыть статистику и журнал визитов сайта"
                  className="px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800 transition flex items-center gap-1.5"
                >
                  <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                  Статистика
                </button>

                <button
                  onClick={onLogoutAdmin}
                  title="Выйти из режима админа"
                  className="px-2.5 py-1.5 text-xs font-mono font-medium rounded-md bg-neutral-900 text-emerald-400 border border-neutral-700 transition flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Админ
                </button>

                <button
                  onClick={onOpenExportModal}
                  title="Экспортировать статический HTML код сайта"
                  className="px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-700 transition flex items-center gap-1.5"
                >
                  <FileCode className="w-4 h-4 text-neutral-400" />
                  Экспорт HTML
                </button>

                <button
                  onClick={onOpenAddModal}
                  className="px-3.5 py-1.5 text-xs font-medium rounded-md bg-white hover:bg-neutral-200 text-black transition flex items-center gap-1 font-mono tracking-tight shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  Добавить проект
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="xl:hidden flex items-center gap-2">
            {isAdmin && (
              <button
                onClick={onOpenAddModal}
                className="p-2 text-xs font-semibold rounded-md bg-white text-black"
                title="Добавить проект"
              >
                <Plus className="w-4 h-4" />
              </button>
            )}

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded-md transition border border-neutral-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#060608] border-b border-neutral-800 px-4 pt-2 pb-4 space-y-2">
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-neutral-800">
            <button
              onClick={() => { onSelectPlatform('all'); onSelectType('all'); setMobileMenuOpen(false); }}
              className="p-2 text-left rounded-md bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-200 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-neutral-400" />
              Все проекты
            </button>
            <button
              onClick={() => { onSelectPlatform('windows'); setMobileMenuOpen(false); }}
              className="p-2 text-left rounded-md bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-200 flex items-center gap-2"
            >
              <Monitor className="w-4 h-4 text-neutral-400" />
              Windows ПК
            </button>
            <button
              onClick={() => { onSelectPlatform('android'); setMobileMenuOpen(false); }}
              className="p-2 text-left rounded-md bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-200 flex items-center gap-2"
            >
              <Smartphone className="w-4 h-4 text-neutral-400" />
              Android
            </button>
            <button
              onClick={() => { onSelectType('game'); setMobileMenuOpen(false); }}
              className="p-2 text-left rounded-md bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-200 flex items-center gap-2"
            >
              <Gamepad2 className="w-4 h-4 text-neutral-400" />
              Игры
            </button>
            <button
              onClick={() => { onSelectType('app'); setMobileMenuOpen(false); }}
              className="p-2 text-left rounded-md bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-200 flex items-center gap-2"
            >
              <Download className="w-4 h-4 text-neutral-400" />
              Программы
            </button>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 text-left rounded-md bg-neutral-900 border border-neutral-800 text-sm font-medium text-neutral-200 flex items-center justify-center"
            >
              О разработчике
            </a>
          </div>

          {isAdmin && (
            <div className="pt-2 flex flex-col gap-2">
              <button
                onClick={() => { onOpenAnalyticsModal?.(); setMobileMenuOpen(false); }}
                className="w-full py-2 px-3 rounded-md bg-emerald-950/80 text-emerald-300 border border-emerald-800 text-xs font-mono font-medium flex items-center justify-center gap-2"
              >
                <Activity className="w-4 h-4 text-emerald-400 animate-pulse" />
                Статистика сайта
              </button>
              <button
                onClick={() => { onOpenExportModal(); setMobileMenuOpen(false); }}
                className="w-full py-2 px-3 rounded-md bg-neutral-900 text-neutral-200 border border-neutral-700 text-xs font-mono font-medium flex items-center justify-center gap-2"
              >
                <FileCode className="w-4 h-4 text-neutral-400" />
                Экспорт HTML страницы сайта
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
