import React, { useState } from 'react';
import { X, Save, User, FileText, Image as ImageIcon, Terminal, Globe, Send, MessageSquare, Mail, Sparkles, Plus, Trash2 } from 'lucide-react';
import { DeveloperProfile } from '../types';

interface ProfileEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: DeveloperProfile;
  onSaveProfile: (updated: DeveloperProfile) => void;
}

export const ProfileEditorModal: React.FC<ProfileEditorModalProps> = ({
  isOpen,
  onClose,
  profile,
  onSaveProfile
}) => {
  const [formData, setFormData] = useState<DeveloperProfile>({ ...profile });
  const [newSkill, setNewSkill] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile(formData);
    onClose();
  };

  const handleAddSkill = () => {
    if (!newSkill.trim()) return;
    if (formData.skills.includes(newSkill.trim())) return;
    setFormData(prev => ({ ...prev, skills: [...prev.skills, newSkill.trim()] }));
    setNewSkill('');
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({ ...prev, skills: prev.skills.filter(s => s !== skillToRemove) }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#08080b] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl my-8 font-sans text-neutral-100">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/50">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-neutral-300" />
            <h2 className="text-base font-bold text-white font-mono">Редактирование профиля и текста сайта</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition border border-neutral-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 text-xs">
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-neutral-300 font-mono mb-1">Название студии / Имя</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
              />
            </div>

            <div>
              <label className="block text-neutral-300 font-mono mb-1">Краткий слоган (Tagline)</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={e => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-mono mb-1">Аватар / Логотип (URL)</label>
            <input
              type="text"
              value={formData.avatarUrl}
              onChange={e => setFormData({ ...formData, avatarUrl: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600 font-mono text-[11px]"
            />
          </div>

          {/* Hero Section Headlines */}
          <div className="pt-3 border-t border-neutral-800/80 space-y-3">
            <h3 className="text-xs font-mono font-bold text-neutral-300">Заголовки шапки сайта (Hero):</h3>
            
            <div>
              <label className="block text-neutral-400 font-mono mb-1">Заголовок на главной (Hero Title)</label>
              <input
                type="text"
                value={formData.heroTitle || ''}
                onChange={e => setFormData({ ...formData, heroTitle: e.target.value })}
                placeholder="Разработка Игр и Приложений"
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600 font-bold"
              />
            </div>

            <div>
              <label className="block text-neutral-400 font-mono mb-1">Подзаголовок на главной (Hero Subtitle)</label>
              <textarea
                rows={2}
                value={formData.heroSubtitle || ''}
                onChange={e => setFormData({ ...formData, heroSubtitle: e.target.value })}
                placeholder="Официальный сайт для скачивания приложений и инди-игр."
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>

          {/* Footer Text */}
          <div className="pt-3 border-t border-neutral-800/80 space-y-3">
            <h3 className="text-xs font-mono font-bold text-neutral-300">Подвал сайта (Footer):</h3>
            
            <div>
              <label className="block text-neutral-400 font-mono mb-1">Текст копирайта и подвала</label>
              <input
                type="text"
                value={formData.footerText || ''}
                onChange={e => setFormData({ ...formData, footerText: e.target.value })}
                placeholder="Все права защищены. Каталог игр и программного обеспечения."
                className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-neutral-300 font-mono mb-1">Главное описание о себе (Bio в блоке "О разработчике")</label>
            <textarea
              rows={3}
              value={formData.bio}
              onChange={e => setFormData({ ...formData, bio: e.target.value })}
              className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
            />
          </div>

          {/* Social Links */}
          <div className="pt-3 border-t border-neutral-800/80 space-y-3">
            <h3 className="text-xs font-mono font-bold text-neutral-300">Контакты и социальные сети:</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-neutral-400 font-mono mb-1">Telegram username</label>
                <input
                  type="text"
                  value={formData.telegramUsername || ''}
                  onChange={e => setFormData({ ...formData, telegramUsername: e.target.value })}
                  placeholder="@kronas_play"
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1">Discord Tag</label>
                <input
                  type="text"
                  value={formData.discordTag || ''}
                  onChange={e => setFormData({ ...formData, discordTag: e.target.value })}
                  placeholder="kronasplay"
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email || ''}
                  onChange={e => setFormData({ ...formData, email: e.target.value })}
                  placeholder="kronas@example.com"
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1">Ссылка ВКонтакте (VK)</label>
                <input
                  type="url"
                  value={formData.vkUrl || ''}
                  onChange={e => setFormData({ ...formData, vkUrl: e.target.value })}
                  placeholder="https://vk.com/..."
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1">Ссылка YouTube</label>
                <input
                  type="url"
                  value={formData.youtubeUrl || ''}
                  onChange={e => setFormData({ ...formData, youtubeUrl: e.target.value })}
                  placeholder="https://youtube.com/..."
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div>
                <label className="block text-neutral-400 font-mono mb-1">Ссылка Itch.io</label>
                <input
                  type="url"
                  value={formData.itchioUrl || ''}
                  onChange={e => setFormData({ ...formData, itchioUrl: e.target.value })}
                  placeholder="https://itch.io/..."
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
                />
              </div>
            </div>
          </div>

          {/* Skills Management */}
          <div className="pt-3 border-t border-neutral-800/80 space-y-3">
            <h3 className="text-xs font-mono font-bold text-neutral-300">Навыки и технологический стек:</h3>
            
            <div className="flex flex-wrap gap-2">
              {formData.skills.map(skill => (
                <span key={skill} className="px-2.5 py-1 bg-neutral-900 border border-neutral-800 rounded text-neutral-200 text-xs flex items-center gap-1.5 font-mono">
                  {skill}
                  <button
                    type="button"
                    onClick={() => handleRemoveSkill(skill)}
                    className="text-neutral-500 hover:text-rose-400"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={newSkill}
                onChange={e => setNewSkill(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); }}}
                placeholder="Добавить новый навык (например: C++, Unreal Engine 5)"
                className="flex-1 px-3 py-1.5 bg-black border border-neutral-800 rounded-md text-white text-xs focus:outline-none focus:border-neutral-600"
              />
              <button
                type="button"
                onClick={handleAddSkill}
                className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-white rounded-md text-xs font-mono flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                Добавить
              </button>
            </div>
          </div>

          {/* Form Controls */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-800">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-300 font-mono text-xs border border-neutral-800"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-md bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs flex items-center gap-1.5 transition shadow-sm"
            >
              <Save className="w-4 h-4" />
              Сохранить изменения
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};
