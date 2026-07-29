import React, { useState, useEffect } from 'react';
import { 
  X, 
  Monitor, 
  Smartphone, 
  Download, 
  Star, 
  Calendar, 
  Layers, 
  Cpu, 
  ExternalLink,
  MessageSquare,
  CheckCircle2,
  Sparkles,
  Info,
  Edit2,
  Trash2,
  Check,
  ShieldCheck
} from 'lucide-react';
import { Project, Review } from '../types';
import { trackEvent } from '../utils/analytics';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
  reviews: Review[];
  onAddReview: (review: Omit<Review, 'id' | 'date'>) => void;
  onEditReview?: (review: Review) => void;
  onDeleteReview?: (id: string) => void;
  isAdmin?: boolean;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ 
  project, 
  onClose,
  reviews,
  onAddReview,
  onEditReview,
  onDeleteReview,
  isAdmin = false
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [newReviewName, setNewReviewName] = useState('');
  const [newReviewText, setNewReviewText] = useState('');
  const [newReviewRating, setNewReviewRating] = useState<number>(5);

  // Editing state for admin
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editRating, setEditRating] = useState(5);
  const [editComment, setEditComment] = useState('');

  useEffect(() => {
    setActiveImageIndex(0);
    if (project) {
      trackEvent('Просмотр', `Просмотр карточки: "${project.title}" (${project.type.toUpperCase()})`);
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [project, onClose]);

  if (!project) return null;

  const projectReviews = reviews.filter(r => r.projectId === project.id);

  const rawImages = project.screenshots && project.screenshots.length > 0 
    ? project.screenshots 
    : [project.bannerUrl];
  
  const images = rawImages.filter(Boolean).length > 0 ? rawImages.filter(Boolean) : [project.bannerUrl];
  const safeImageIndex = activeImageIndex >= images.length ? 0 : activeImageIndex;
  const currentImageUrl = images[safeImageIndex] || project.bannerUrl;

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewName.trim() || !newReviewText.trim()) return;

    onAddReview({
      projectId: project.id,
      authorName: newReviewName.trim(),
      rating: newReviewRating,
      comment: newReviewText.trim()
    });

    setNewReviewName('');
    setNewReviewText('');
    setNewReviewRating(5);
  };

  const startEditReview = (rev: Review) => {
    setEditingReviewId(rev.id);
    setEditName(rev.authorName);
    setEditRating(rev.rating);
    setEditComment(rev.comment);
  };

  const saveEditReview = (rev: Review) => {
    if (onEditReview) {
      onEditReview({
        ...rev,
        authorName: editName.trim() || rev.authorName,
        rating: editRating,
        comment: editComment.trim() || rev.comment
      });
    }
    setEditingReviewId(null);
  };

  const isWindows = project.platform === 'windows' || project.platform === 'both';
  const isAndroid = project.platform === 'android' || project.platform === 'both';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#08080b] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl my-8 text-neutral-100 max-h-[90vh] flex flex-col">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-[#08080b] sticky top-0 z-20 font-mono">
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-neutral-900 text-neutral-200 border border-neutral-700 uppercase tracking-wider">
              {project.type === 'game' ? '🎮 Игра' : project.type === 'extension' ? '🧩 Расширение' : '🛠️ Софт'}
            </span>
            <span className="text-xs text-neutral-400 bg-black px-2 py-1 rounded border border-neutral-800">
              {project.version}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition border border-neutral-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto space-y-8 flex-1">
          
          {/* Main Screenshot / Banner Gallery */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-96 w-full rounded-lg overflow-hidden bg-black border border-neutral-800">
              <img 
                src={images[activeImageIndex]} 
                alt={project.title} 
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>

            {images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`relative h-16 w-24 rounded-md overflow-hidden border transition shrink-0 ${
                      activeImageIndex === idx ? 'border-white scale-105' : 'border-neutral-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Скриншот ${idx + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Project Title & Metadata */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-neutral-800 pb-6">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
                {project.title}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-neutral-400">
                <div className="flex items-center gap-1 text-amber-400 font-bold">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{project.rating.toFixed(1)} / 5.0</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4 text-neutral-500" />
                  <span>Релиз: {project.releaseDate}</span>
                </div>
              </div>
            </div>

            {/* Download Buttons */}
            <div className="flex flex-wrap gap-2.5 font-mono">
              {project.downloadUrlExe && (
                <a
                  href={project.downloadUrlExe}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('Скачивание', `Скачивание файла EXE/ZIP: "${project.title}"`)}
                  className="flex-1 md:flex-none px-5 py-3 rounded-md bg-white hover:bg-neutral-200 text-black font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <Monitor className="w-4 h-4" />
                  Скачать {project.type === 'extension' ? 'Расширение (ZIP)' : 'EXE (Windows)'}
                </a>
              )}

              {project.downloadUrlApk && (
                <a
                  href={project.downloadUrlApk}
                  target="_blank"
                  rel="noreferrer"
                  onClick={() => trackEvent('Скачивание', `Скачивание файла APK: "${project.title}"`)}
                  className="flex-1 md:flex-none px-5 py-3 rounded-md bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-600 font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <Smartphone className="w-4 h-4" />
                  Скачать APK (Android)
                </a>
              )}
            </div>
          </div>

          {/* Detailed Description */}
          <div className="space-y-3">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Info className="w-4 h-4 text-neutral-400" />
              Описание проекта
            </h3>
            <p className="text-sm text-neutral-300 leading-relaxed whitespace-pre-line bg-black p-4 rounded-lg border border-neutral-800 font-sans">
              {project.fullDescription}
            </p>
          </div>

          {/* Tech Stack & Tags */}
          <div className="space-y-2 font-mono">
            <h3 className="text-xs uppercase font-bold tracking-wider text-neutral-400">
              Технологии и стек:
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span 
                  key={tag}
                  className="px-3 py-1 rounded bg-neutral-900 text-neutral-300 text-xs border border-neutral-800"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>

          {/* System Requirements */}
          {project.requirements && (
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-neutral-400" />
                Системные требования
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs bg-black p-4 rounded-lg border border-neutral-800 font-mono">
                {project.requirements.os && (
                  <div>
                    <span className="text-neutral-500">Операционная система:</span>
                    <p className="text-neutral-200 font-semibold">{project.requirements.os}</p>
                  </div>
                )}
                {project.requirements.androidVersion && (
                  <div>
                    <span className="text-neutral-500">Версия Android:</span>
                    <p className="text-white font-semibold">{project.requirements.androidVersion}</p>
                  </div>
                )}
                {project.requirements.processor && (
                  <div>
                    <span className="text-neutral-500">Процессор:</span>
                    <p className="text-neutral-200 font-semibold">{project.requirements.processor}</p>
                  </div>
                )}
                {project.requirements.ram && (
                  <div>
                    <span className="text-neutral-500">Оперативная память (RAM):</span>
                    <p className="text-neutral-200 font-semibold">{project.requirements.ram}</p>
                  </div>
                )}
                {project.requirements.graphics && (
                  <div>
                    <span className="text-neutral-500">Видеокарта:</span>
                    <p className="text-neutral-200 font-semibold">{project.requirements.graphics}</p>
                  </div>
                )}
                {project.requirements.storage && (
                  <div>
                    <span className="text-neutral-500">Место на диске / Память:</span>
                    <p className="text-neutral-200 font-semibold">{project.requirements.storage}</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Changelog / History */}
          {project.changelog && project.changelog.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-neutral-400" />
                История обновлений (Changelog)
              </h3>
              <ul className="space-y-2 text-xs bg-black p-4 rounded-lg border border-neutral-800 font-mono">
                {project.changelog.map((log, i) => (
                  <li key={i} className="flex items-start gap-2 text-neutral-300">
                    <CheckCircle2 className="w-4 h-4 text-white shrink-0 mt-0.5" />
                    <span>{log}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Community Reviews & Feedback */}
          <div className="space-y-4 pt-4 border-t border-neutral-800">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-neutral-400" />
                Отзывы и оценки ({projectReviews.length})
              </h3>

              {isAdmin && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-amber-500/10 text-amber-400 text-xs font-mono border border-amber-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Админ: редактирование отзывов включено
                </span>
              )}
            </div>

            {/* Leave a review form (No registration required!) */}
            <form onSubmit={handleAddReview} className="p-4 rounded-lg bg-black border border-neutral-800 space-y-3 font-mono">
              <p className="text-xs font-bold text-neutral-300 flex items-center gap-1.5">
                <span>Написать отзыв и поставить оценку (без регистрации)</span>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <input 
                  type="text"
                  placeholder="Ваше имя / Никнейм"
                  value={newReviewName}
                  onChange={(e) => setNewReviewName(e.target.value)}
                  required
                  className="px-3 py-2 bg-neutral-900 border border-neutral-800 rounded text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600"
                />

                {/* Interactive 1 to 5 Stars selector */}
                <div className="flex items-center gap-2">
                  <span className="text-xs text-neutral-400">Ваша оценка (1-5):</span>
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button
                        type="button"
                        key={s}
                        onClick={() => setNewReviewRating(s)}
                        className="p-1 hover:scale-125 transition"
                        title={`Поставить ${s} из 5`}
                      >
                        <Star className={`w-4 h-4 ${s <= newReviewRating ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'}`} />
                      </button>
                    ))}
                  </div>
                  <span className="text-xs text-amber-400 font-bold font-mono ml-1">{newReviewRating}/5</span>
                </div>
              </div>

              <textarea
                placeholder="Напишите ваш отзыв или впечатление..."
                value={newReviewText}
                onChange={(e) => setNewReviewText(e.target.value)}
                required
                rows={2}
                className="w-full px-3 py-2 bg-neutral-900 border border-neutral-800 rounded text-xs text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-sans"
              />

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-4 py-2 bg-white text-black text-xs font-bold rounded transition hover:bg-neutral-200"
                >
                  Оставить отзыв
                </button>
              </div>
            </form>

            {/* Existing Reviews List */}
            <div className="space-y-3">
              {projectReviews.length === 0 ? (
                <p className="text-xs text-neutral-500 font-mono py-2">
                  Пока нет отзывов. Будьте первым, кто оставит отзыв и оценку!
                </p>
              ) : (
                projectReviews.map((rev) => (
                  <div key={rev.id} className="p-4 rounded-lg bg-black border border-neutral-800 space-y-2 font-mono">
                    {editingReviewId === rev.id ? (
                      /* Admin Edit Mode */
                      <div className="space-y-3">
                        <div className="flex items-center justify-between text-xs font-bold text-amber-400">
                          <span>Редактирование отзыва ({rev.id})</span>
                          <button
                            type="button"
                            onClick={() => setEditingReviewId(null)}
                            className="text-neutral-400 hover:text-white"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={editName}
                            onChange={(e) => setEditName(e.target.value)}
                            className="px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded text-xs text-white"
                            placeholder="Имя автора"
                          />

                          <div className="flex items-center gap-2">
                            <span className="text-xs text-neutral-400">Оценка:</span>
                            <div className="flex items-center gap-1">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <button
                                  type="button"
                                  key={s}
                                  onClick={() => setEditRating(s)}
                                  className="p-1"
                                >
                                  <Star className={`w-4 h-4 ${s <= editRating ? 'text-amber-400 fill-amber-400' : 'text-neutral-600'}`} />
                                </button>
                              ))}
                            </div>
                          </div>
                        </div>

                        <textarea
                          value={editComment}
                          onChange={(e) => setEditComment(e.target.value)}
                          rows={2}
                          className="w-full px-3 py-1.5 bg-neutral-900 border border-neutral-700 rounded text-xs text-white font-sans"
                        />

                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => saveEditReview(rev)}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded flex items-center gap-1"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Сохранить
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Normal Review Display */
                      <>
                        <div className="flex items-center justify-between text-xs">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-neutral-200">{rev.authorName}</span>
                            <div className="flex items-center gap-0.5 text-amber-400">
                              {[1, 2, 3, 4, 5].map((s) => (
                                <Star
                                  key={s}
                                  className={`w-3.5 h-3.5 ${s <= rev.rating ? 'text-amber-400 fill-amber-400' : 'text-neutral-700'}`}
                                />
                              ))}
                            </div>
                          </div>

                          <div className="flex items-center gap-2">
                            <span className="text-neutral-500 text-[11px]">{rev.date}</span>

                            {isAdmin && (
                              <div className="flex items-center gap-1 ml-2">
                                <button
                                  type="button"
                                  onClick={() => startEditReview(rev)}
                                  title="Редактировать отзыв"
                                  className="p-1 text-neutral-400 hover:text-white hover:bg-neutral-800 rounded transition"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>
                                <button
                                  type="button"
                                  onClick={() => onDeleteReview && onDeleteReview(rev.id)}
                                  title="Удалить отзыв"
                                  className="p-1 text-neutral-400 hover:text-rose-400 hover:bg-neutral-800 rounded transition"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-neutral-300 font-sans leading-relaxed">
                          {rev.comment}
                        </p>
                      </>
                    )}
                  </div>
                ))
              )}
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
