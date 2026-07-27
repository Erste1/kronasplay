import React from 'react';
import { 
  Monitor, 
  Smartphone, 
  Gamepad2, 
  Wrench, 
  Download, 
  Star, 
  Eye, 
  Edit3, 
  Trash2,
  Sparkles,
  Layers
} from 'lucide-react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
  onOpenModal: (p: Project) => void;
  onEditProject?: (p: Project) => void;
  onDeleteProject?: (id: string) => void;
  viewMode?: 'grid' | 'list';
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  project,
  onOpenModal,
  onEditProject,
  onDeleteProject,
  viewMode = 'grid'
}) => {
  const isWindows = project.platform === 'windows' || project.platform === 'both';
  const isAndroid = project.platform === 'android' || project.platform === 'both';
  const isBoth = project.platform === 'both';

  if (viewMode === 'list') {
    return (
      <div className="group bg-[#08080b] border border-neutral-800 hover:border-neutral-600 rounded-xl p-4 transition-all shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        
        {/* Banner & Title Block */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-black border border-neutral-800">
            <img 
              src={project.bannerUrl} 
              alt={project.title} 
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              loading="lazy"
            />
            <div className="absolute top-1 left-1 flex gap-1">
              {isWindows && (
                <span className="p-1 rounded bg-neutral-900/90 text-white text-[10px] border border-neutral-700" title="Windows">
                  <Monitor className="w-3 h-3" />
                </span>
              )}
              {isAndroid && (
                <span className="p-1 rounded bg-neutral-900/90 text-white text-[10px] border border-neutral-700" title="Android">
                  <Smartphone className="w-3 h-3" />
                </span>
              )}
            </div>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2 flex-wrap font-mono">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider bg-neutral-800 text-neutral-200 border border-neutral-700">
                {project.type === 'game' ? '🎮 Игра' : project.type === 'extension' ? '🧩 Расширение' : '🛠️ Софт'}
              </span>
              <span className="text-[10px] text-neutral-400 bg-neutral-900 px-2 py-0.5 rounded border border-neutral-800">
                {project.version}
              </span>
              {project.isNew && (
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-white text-black">
                  NEW
                </span>
              )}
            </div>

            <h3 
              onClick={() => onOpenModal(project)}
              className="font-bold text-base text-white hover:text-neutral-300 cursor-pointer transition"
            >
              {project.title}
            </h3>

            <p className="text-xs text-neutral-400 line-clamp-1 max-w-xl">
              {project.shortDescription}
            </p>

            <div className="flex items-center gap-2 pt-1 text-xs text-neutral-400 font-mono">
              <span className="flex items-center gap-1 text-amber-400 font-semibold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                {project.rating.toFixed(1)} / 5.0
              </span>
            </div>
          </div>
        </div>

        {/* Tags & Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 border-neutral-800 pt-3 sm:pt-0">
          <button
            onClick={() => onOpenModal(project)}
            className="px-3 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-xs font-mono font-medium transition flex items-center gap-1.5"
          >
            <Eye className="w-4 h-4 text-neutral-400" />
            Подробнее
          </button>

          {/* Download Buttons */}
          {project.downloadUrlExe && (
            <a
              href={project.downloadUrlExe}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-md bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold transition flex items-center gap-1.5"
              title="Скачать EXE для Windows"
            >
              <Monitor className="w-3.5 h-3.5" />
              EXE
            </a>
          )}

          {project.downloadUrlApk && (
            <a
              href={project.downloadUrlApk}
              target="_blank"
              rel="noreferrer"
              className="px-3.5 py-2 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono font-bold border border-neutral-600 transition flex items-center gap-1.5"
              title="Скачать APK для Android"
            >
              <Smartphone className="w-3.5 h-3.5" />
              APK
            </a>
          )}
        </div>

      </div>
    );
  }

  // Grid Mode Card
  return (
    <div className="group bg-[#08080b] border border-neutral-800 hover:border-neutral-600 rounded-xl overflow-hidden transition-all duration-300 shadow-sm flex flex-col justify-between relative">
      
      {/* Top Media Banner */}
      <div>
        <div className="relative h-44 w-full overflow-hidden bg-black">
          <img 
            src={project.bannerUrl} 
            alt={project.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition duration-500 opacity-90"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#08080b] via-transparent to-black/40" />

          {/* Top Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 font-mono">
            {isBoth ? (
              <span className="px-2 py-0.5 rounded bg-neutral-900/90 text-neutral-200 border border-neutral-700 text-xs font-semibold flex items-center gap-1 shadow-sm backdrop-blur-sm">
                <Layers className="w-3.5 h-3.5" /> WIN + APK
              </span>
            ) : (
              <>
                {isWindows && (
                  <span className="px-2 py-0.5 rounded bg-neutral-900/90 text-neutral-200 border border-neutral-700 text-xs font-semibold flex items-center gap-1 shadow-sm backdrop-blur-sm">
                    <Monitor className="w-3.5 h-3.5" /> Windows
                  </span>
                )}
                {isAndroid && (
                  <span className="px-2 py-0.5 rounded bg-neutral-900/90 text-neutral-200 border border-neutral-700 text-xs font-semibold flex items-center gap-1 shadow-sm backdrop-blur-sm">
                    <Smartphone className="w-3.5 h-3.5" /> Android
                  </span>
                )}
              </>
            )}

            <span className="px-2 py-0.5 rounded text-xs font-semibold bg-neutral-900/90 text-neutral-300 border border-neutral-800 backdrop-blur-sm">
              {project.type === 'game' ? '🎮 Игра' : project.type === 'extension' ? '🧩 Расширение' : '🛠️ Софт'}
            </span>
          </div>

          <div className="absolute top-3 right-3 flex gap-1 font-mono">
            <span className="text-[11px] bg-black/80 text-neutral-300 border border-neutral-800 px-2 py-0.5 rounded backdrop-blur-sm">
              {project.version}
            </span>
          </div>

          {/* Rating Overlay */}
          <div className="absolute bottom-2 left-3 flex items-center gap-1 text-xs font-mono font-bold text-amber-400 bg-black/80 px-2 py-0.5 rounded backdrop-blur-sm border border-neutral-800">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {project.rating.toFixed(1)} / 5.0
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 space-y-2.5">
          <div className="flex items-start justify-between gap-2">
            <h3 
              onClick={() => onOpenModal(project)}
              className="font-bold text-base text-white group-hover:text-neutral-300 transition cursor-pointer leading-snug"
            >
              {project.title}
            </h3>
          </div>

          <p className="text-xs text-neutral-400 line-clamp-2 leading-relaxed font-sans">
            {project.shortDescription}
          </p>

          {/* Tech Pills - show all tags cleanly */}
          <div className="flex flex-wrap gap-1.5 pt-1 font-mono">
            {project.tags.map((tag) => (
              <span 
                key={tag}
                className="text-[10px] px-2 py-0.5 rounded bg-neutral-900 text-neutral-300 border border-neutral-800 break-words whitespace-normal"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Card Actions Footer */}
      <div className="p-4 pt-0 mt-2 flex items-center gap-2 border-t border-neutral-800/80 pt-3">
        
        <button
          onClick={() => onOpenModal(project)}
          className="flex-1 py-1.5 px-3 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-200 border border-neutral-800 text-xs font-mono font-medium transition flex items-center justify-center gap-1.5"
        >
          <Eye className="w-3.5 h-3.5 text-neutral-400" />
          Подробнее
        </button>

        {/* Windows Download */}
        {project.downloadUrlExe && (
          <a
            href={project.downloadUrlExe}
            target="_blank"
            rel="noreferrer"
            className="py-1.5 px-3 rounded-md bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold transition flex items-center justify-center gap-1"
            title="Скачать для Windows (.exe)"
          >
            <Monitor className="w-3.5 h-3.5" />
            EXE
          </a>
        )}

        {/* Android Download */}
        {project.downloadUrlApk && (
          <a
            href={project.downloadUrlApk}
            target="_blank"
            rel="noreferrer"
            className="py-1.5 px-3 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono font-bold border border-neutral-600 transition flex items-center justify-center gap-1"
            title="Скачать для Android (.apk)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            APK
          </a>
        )}

        {/* Edit / Delete Options for Dev */}
        {onEditProject && (
          <button
            onClick={() => onEditProject(project)}
            className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-500 hover:text-white transition"
            title="Редактировать проект"
          >
            <Edit3 className="w-3.5 h-3.5" />
          </button>
        )}

        {onDeleteProject && (
          <button
            onClick={() => onDeleteProject(project.id)}
            className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-500 hover:text-rose-400 transition"
            title="Удалить проект"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        )}

      </div>

    </div>
  );
};
