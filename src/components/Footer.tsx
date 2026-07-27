import React from 'react';
import { Gamepad2, ArrowUp, Edit2 } from 'lucide-react';
import { DeveloperProfile, Platform, ProjectType } from '../types';

interface FooterProps {
  profile: DeveloperProfile;
  isAdmin?: boolean;
  onOpenProfileEditor?: () => void;
  onSelectPlatform: (platform: Platform) => void;
  onSelectType: (type: ProjectType) => void;
}

export const Footer: React.FC<FooterProps> = ({
  profile,
  isAdmin,
  onOpenProfileEditor,
  onSelectPlatform,
  onSelectType
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#030304] border-t border-neutral-800 text-neutral-400 text-xs py-10 font-mono">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-md bg-neutral-900 border border-neutral-700 flex items-center justify-center text-white">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-neutral-200 text-sm block">{profile.name}</span>
              <span className="text-[11px] text-neutral-500">{profile.tagline || "Портфолио игр и софта ПК & Android"}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-neutral-300">
            <button onClick={() => onSelectPlatform('windows')} className="hover:text-white transition">
              Windows (ПК)
            </button>
            <button onClick={() => onSelectPlatform('android')} className="hover:text-white transition">
              Android
            </button>
            <button onClick={() => onSelectType('game')} className="hover:text-white transition">
              Игры
            </button>
            <button onClick={() => onSelectType('app')} className="hover:text-white transition">
              Программы
            </button>
            <a href="#about" className="hover:text-white transition">
              О разработчике
            </a>
          </div>

          <div className="flex items-center gap-2">
            {isAdmin && onOpenProfileEditor && (
              <button
                onClick={onOpenProfileEditor}
                className="p-2.5 rounded-md bg-emerald-950/80 border border-emerald-800 text-emerald-300 hover:bg-emerald-900 transition flex items-center gap-1.5 text-xs font-medium"
                title="Редактировать текст подвала и профиля"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Редактировать подвал
              </button>
            )}

            <button
              onClick={scrollToTop}
              className="p-2.5 rounded-md bg-neutral-900 border border-neutral-800 hover:border-neutral-700 text-neutral-300 hover:text-white transition flex items-center gap-1.5 text-xs font-medium"
            >
              Наверх
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

        <div className="pt-6 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-neutral-500">
          <p>© {new Date().getFullYear()} {profile.name}. {profile.footerText || "Все права защищены. Каталог игр и программного обеспечения."}</p>
          <p className="flex items-center gap-1">
            Kronas Play Engine
          </p>
        </div>

      </div>
    </footer>
  );
};
