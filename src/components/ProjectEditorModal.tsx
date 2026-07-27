import React, { useState, useEffect } from 'react';
import { X, Save, Plus, Trash2, Monitor, Smartphone, Gamepad2, Wrench, Link } from 'lucide-react';
import { Project } from '../types';

interface ProjectEditorModalProps {
  isOpen: boolean;
  projectToEdit: Project | null;
  onSave: (project: Project) => void;
  onClose: () => void;
}

export const ProjectEditorModal: React.FC<ProjectEditorModalProps> = ({
  isOpen,
  projectToEdit,
  onSave,
  onClose
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [platform, setPlatform] = useState<'windows' | 'android' | 'both'>('windows');
  const [type, setType] = useState<'game' | 'app'>('game');
  const [version, setVersion] = useState('v1.0.0');
  const [rating, setRating] = useState(5.0);
  const [downloadsCount, setDownloadsCount] = useState(100);
  const [tagsInput, setTagsInput] = useState('');
  const [bannerUrl, setBannerUrl] = useState('');
  const [screenshotsInput, setScreenshotsInput] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [downloadUrlExe, setDownloadUrlExe] = useState('');
  const [downloadUrlApk, setDownloadUrlApk] = useState('');

  useEffect(() => {
    if (projectToEdit) {
      setTitle(projectToEdit.title);
      setShortDescription(projectToEdit.shortDescription);
      setFullDescription(projectToEdit.fullDescription);
      setPlatform(projectToEdit.platform);
      setType(projectToEdit.type);
      setVersion(projectToEdit.version);
      setRating(projectToEdit.rating);
      setDownloadsCount(projectToEdit.downloadsCount);
      setTagsInput(projectToEdit.tags.join(', '));
      setBannerUrl(projectToEdit.bannerUrl);
      setScreenshotsInput(projectToEdit.screenshots.join('\n'));
      setGithubUrl(projectToEdit.githubUrl || '');
      setDownloadUrlExe(projectToEdit.downloadUrlExe || '');
      setDownloadUrlApk(projectToEdit.downloadUrlApk || '');
    } else {
      // Reset form
      setTitle('');
      setShortDescription('');
      setFullDescription('');
      setPlatform('windows');
      setType('game');
      setVersion('v1.0.0');
      setRating(4.9);
      setDownloadsCount(500);
      setTagsInput('Unity, C#, Indie');
      setBannerUrl('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80');
      setScreenshotsInput('https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80');
      setGithubUrl('');
      setDownloadUrlExe('');
      setDownloadUrlApk('');
    }
  }, [projectToEdit, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !shortDescription.trim()) return;

    const tagsArr = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const screenshotsArr = screenshotsInput
      .split('\n')
      .map(s => s.trim())
      .filter(s => s.length > 0);

    const newProject: Project = {
      id: projectToEdit ? projectToEdit.id : `proj-${Date.now()}`,
      title,
      shortDescription,
      fullDescription: fullDescription || shortDescription,
      platform,
      type,
      version,
      releaseDate: projectToEdit ? projectToEdit.releaseDate : new Date().toISOString().split('T')[0],
      rating: Number(rating),
      downloadsCount: Number(downloadsCount),
      starsCount: projectToEdit ? projectToEdit.starsCount : 10,
      tags: tagsArr.length > 0 ? tagsArr : ['Indie'],
      bannerUrl: bannerUrl || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&auto=format&fit=crop&q=80',
      screenshots: screenshotsArr.length > 0 ? screenshotsArr : [bannerUrl],
      githubUrl: githubUrl.trim() || undefined,
      downloadUrlExe: downloadUrlExe.trim() || undefined,
      downloadUrlApk: downloadUrlApk.trim() || undefined,
      isNew: !projectToEdit
    };

    onSave(newProject);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#08080b] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl my-8 text-neutral-100 max-h-[90vh] flex flex-col font-sans">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#08080b] sticky top-0 z-20 font-mono">
          <h2 className="text-base font-bold text-white flex items-center gap-2">
            <Plus className="w-5 h-5 text-neutral-300" />
            {projectToEdit ? 'Редактировать проект' : 'Добавить новый проект'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition border border-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 text-xs flex-1 font-mono">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Title */}
            <div className="space-y-1 sm:col-span-2">
              <label className="font-semibold text-neutral-300">Название игры или программы *</label>
              <input
                type="text"
                placeholder="Например: Cyber Exodus 2099"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
              />
            </div>

            {/* Platform Selection */}
            <div className="space-y-1">
              <label className="font-semibold text-neutral-300">Платформа *</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value as any)}
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600 cursor-pointer"
              >
                <option value="windows">💻 Windows (ПК)</option>
                <option value="android">📱 Android</option>
                <option value="both">🌐 Windows + Android</option>
              </select>
            </div>

            {/* Type Selection */}
            <div className="space-y-1">
              <label className="font-semibold text-neutral-300">Тип проекта *</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600 cursor-pointer"
              >
                <option value="game">🎮 Игра</option>
                <option value="app">🛠️ Программа / Утилита</option>
                <option value="extension">🧩 Расширение для браузера</option>
              </select>
            </div>

            {/* Version */}
            <div className="space-y-1">
              <label className="font-semibold text-neutral-300">Версия</label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="v1.0.0"
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
              />
            </div>

            {/* Rating */}
            <div className="space-y-1">
              <label className="font-semibold text-neutral-300">Начальный рейтинг (1.0 - 5.0)</label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="5"
                value={rating}
                onChange={(e) => setRating(parseFloat(e.target.value) || 5)}
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
              />
            </div>

          </div>

          {/* Short Description */}
          <div className="space-y-1">
            <label className="font-semibold text-neutral-300">Краткое описание (для карточки) *</label>
            <input
              type="text"
              placeholder="Коротко о чем игра или программа..."
              value={shortDescription}
              onChange={(e) => setShortDescription(e.target.value)}
              required
              className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600 font-sans"
            />
          </div>

          {/* Full Description */}
          <div className="space-y-1">
            <label className="font-semibold text-neutral-300">Полное описание (для модального окна)</label>
            <textarea
              rows={3}
              placeholder="Детальное описание фич, особенностей и сюжета..."
              value={fullDescription}
              onChange={(e) => setFullDescription(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600 font-sans"
            />
          </div>

          {/* Download URLs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="space-y-1">
              <label className="font-semibold text-neutral-300 flex items-center gap-1">
                <Monitor className="w-3.5 h-3.5 text-neutral-400" />
                Ссылка на скачивание EXE (Windows)
              </label>
              <input
                type="url"
                placeholder="https://github.com/.../release.exe"
                value={downloadUrlExe}
                onChange={(e) => setDownloadUrlExe(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-neutral-300 flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-neutral-400" />
                Ссылка на скачивание APK (Android)
              </label>
              <input
                type="url"
                placeholder="https://example.com/app.apk"
                value={downloadUrlApk}
                onChange={(e) => setDownloadUrlApk(e.target.value)}
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-1">
            <label className="font-semibold text-neutral-300">Теги и технологии (через запятую)</label>
            <input
              type="text"
              placeholder="Unity, C#, Action, 2D"
              value={tagsInput}
              onChange={(e) => setTagsInput(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          {/* Banner URL */}
          <div className="space-y-1">
            <label className="font-semibold text-neutral-300">Ссылка на обложку (Image URL)</label>
            <input
              type="url"
              placeholder="https://..."
              value={bannerUrl}
              onChange={(e) => setBannerUrl(e.target.value)}
              className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-800 font-medium"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-white hover:bg-neutral-200 text-black font-bold flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              Сохранить проект
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
