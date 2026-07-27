import React from 'react';
import { Monitor, Smartphone, Gamepad2, Wrench, Download, Star, Code2, ArrowRight, Edit2 } from 'lucide-react';
import { DeveloperProfile, Project } from '../types';

interface HeroProps {
  profile: DeveloperProfile;
  projects: Project[];
  isAdmin?: boolean;
  onOpenProfileEditor?: () => void;
  onSelectPlatform: (platform: 'all' | 'windows' | 'android') => void;
  onSelectType: (type: 'all' | 'game' | 'app') => void;
  onSelectQuickPreset: (platform: 'windows' | 'android', type: 'game' | 'app') => void;
}

export const Hero: React.FC<HeroProps> = ({
  profile,
  projects,
  isAdmin,
  onOpenProfileEditor,
  onSelectPlatform,
  onSelectType,
  onSelectQuickPreset
}) => {
  const totalDownloads = projects.reduce((acc, p) => acc + p.downloadsCount, 0);
  const windowsProjectsCount = projects.filter(p => p.platform === 'windows' || p.platform === 'both').length;
  const androidProjectsCount = projects.filter(p => p.platform === 'android' || p.platform === 'both').length;

  return (
    <section className="relative overflow-hidden bg-[#050507] text-neutral-100 py-12 lg:py-16 border-b border-neutral-800">
      {/* Background Subtle Noir Accent */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-neutral-800/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Main Info Header */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-900 border border-neutral-700/70 text-xs font-mono text-neutral-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Каталог Игр & Программного Обеспечения</span>
              </div>

              {isAdmin && onOpenProfileEditor && (
                <button
                  onClick={onOpenProfileEditor}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-950/80 text-emerald-300 border border-emerald-800 hover:bg-emerald-900 text-xs font-mono transition"
                  title="Редактировать тексты и информацию о студии"
                >
                  <Edit2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Редактировать шапку и тексты</span>
                </button>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {profile.heroTitle || "Разработка Игр и Приложений"}
            </h1>

            <p className="text-base sm:text-lg text-neutral-400 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {profile.heroSubtitle || profile.bio}
            </p>

            {/* Live Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 sm:gap-3 pt-2 max-w-lg mx-auto lg:mx-0 text-left font-mono">
              <div className="p-3 rounded-lg bg-[#0a0a0d] border border-neutral-800">
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-medium mb-1">
                  <Gamepad2 className="w-3.5 h-3.5" />
                  Всего проектов
                </div>
                <div className="text-base sm:text-xl font-bold text-white">
                  {projects.length} <span className="text-xs font-normal text-neutral-500">релизов</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#0a0a0d] border border-neutral-800">
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-medium mb-1">
                  <Monitor className="w-3.5 h-3.5" />
                  Windows ПК
                </div>
                <div className="text-base sm:text-xl font-bold text-white">
                  {windowsProjectsCount} <span className="text-xs font-normal text-neutral-500">релизов</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-[#0a0a0d] border border-neutral-800">
                <div className="flex items-center gap-1.5 text-neutral-400 text-xs font-medium mb-1">
                  <Smartphone className="w-3.5 h-3.5" />
                  Android
                </div>
                <div className="text-base sm:text-xl font-bold text-white">
                  {androidProjectsCount} <span className="text-xs font-normal text-neutral-500">приложений</span>
                </div>
              </div>
            </div>

          </div>

          {/* Quick Category Menu Cards */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 sm:gap-4">
            
            {/* ПК Игры */}
            <button
              onClick={() => onSelectQuickPreset('windows', 'game')}
              className="group p-4 rounded-xl bg-[#08080b] border border-neutral-800 hover:border-neutral-600 transition text-left relative overflow-hidden shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-700/60 flex items-center justify-center text-neutral-200 group-hover:bg-neutral-800 transition">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
                  WIN
                </span>
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-neutral-200 transition">
                Игры для ПК
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Windows (.EXE), Unity
              </p>
              <div className="mt-3 flex items-center text-xs font-mono text-neutral-400 group-hover:text-white transition">
                Каталог <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Android Игры */}
            <button
              onClick={() => onSelectQuickPreset('android', 'game')}
              className="group p-4 rounded-xl bg-[#08080b] border border-neutral-800 hover:border-neutral-600 transition text-left relative overflow-hidden shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-700/60 flex items-center justify-center text-neutral-200 group-hover:bg-neutral-800 transition">
                  <Smartphone className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
                  APK
                </span>
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-neutral-200 transition">
                Игры Android
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Мобильные (.APK)
              </p>
              <div className="mt-3 flex items-center text-xs font-mono text-neutral-400 group-hover:text-white transition">
                Каталог <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* ПК Программы */}
            <button
              onClick={() => onSelectQuickPreset('windows', 'app')}
              className="group p-4 rounded-xl bg-[#08080b] border border-neutral-800 hover:border-neutral-600 transition text-left relative overflow-hidden shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-700/60 flex items-center justify-center text-neutral-200 group-hover:bg-neutral-800 transition">
                  <Wrench className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
                  WIN
                </span>
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-neutral-200 transition">
                Программы ПК
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                C#, WPF, .NET Утилиты
              </p>
              <div className="mt-3 flex items-center text-xs font-mono text-neutral-400 group-hover:text-white transition">
                Каталог <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

            {/* Android Программы */}
            <button
              onClick={() => onSelectQuickPreset('android', 'app')}
              className="group p-4 rounded-xl bg-[#08080b] border border-neutral-800 hover:border-neutral-600 transition text-left relative overflow-hidden shadow-sm"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-neutral-900 border border-neutral-700/60 flex items-center justify-center text-neutral-200 group-hover:bg-neutral-800 transition">
                  <Code2 className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800">
                  APK
                </span>
              </div>
              <h3 className="font-bold text-sm text-white group-hover:text-neutral-200 transition">
                Android Софт
              </h3>
              <p className="text-xs text-neutral-500 mt-1">
                Kotlin, Jetpack, APK
              </p>
              <div className="mt-3 flex items-center text-xs font-mono text-neutral-400 group-hover:text-white transition">
                Каталог <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </button>

          </div>

        </div>
      </div>
    </section>
  );
};
