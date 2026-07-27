import React from 'react';
import { ProjectCard } from './ProjectCard';
import { Project } from '../types';
import { SearchX, Plus, Gamepad2, Monitor, Smartphone, Wrench } from 'lucide-react';

interface ProjectGridProps {
  projects: Project[];
  onOpenModal: (p: Project) => void;
  onEditProject?: (p: Project) => void;
  onDeleteProject?: (id: string) => void;
  onOpenAddModal: () => void;
  viewMode: 'grid' | 'list';
  onResetFilters: () => void;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({
  projects,
  onOpenModal,
  onEditProject,
  onDeleteProject,
  onOpenAddModal,
  viewMode,
  onResetFilters
}) => {
  if (projects.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <div className="max-w-md mx-auto p-8 rounded-2xl bg-[#09090b] border border-neutral-800 space-y-4 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-300 mx-auto">
            <SearchX className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-white font-mono">
            Проекты не найдены
          </h3>
          <p className="text-xs text-neutral-400 leading-relaxed font-sans">
            В выбранной категории или по вашему поисковому запросу ничего не нашлось. Сбросьте фильтры, чтобы увидеть весь список приложений, игр и расширений.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 pt-2">
            <button
              onClick={onResetFilters}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono font-medium transition border border-neutral-700"
            >
              Сбросить все фильтры
            </button>
            <button
              onClick={onOpenAddModal}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-white hover:bg-neutral-200 text-black text-xs font-mono font-bold transition flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              Добавить проект
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={onOpenModal}
              onEditProject={onEditProject}
              onDeleteProject={onDeleteProject}
              viewMode="grid"
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {projects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onOpenModal={onOpenModal}
              onEditProject={onEditProject}
              onDeleteProject={onDeleteProject}
              viewMode="list"
            />
          ))}
        </div>
      )}
    </section>
  );
};
