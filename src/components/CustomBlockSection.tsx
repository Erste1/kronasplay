import React, { useState } from 'react';
import { Sparkles, Plus, Edit2, Trash2, Megaphone, Info, AlertTriangle, X, Check } from 'lucide-react';
import { CustomBlock } from '../types';

interface CustomBlockSectionProps {
  blocks: CustomBlock[];
  isAdmin: boolean;
  onAddBlock: (block: Omit<CustomBlock, 'id'>) => void;
  onEditBlock: (block: CustomBlock) => void;
  onDeleteBlock: (id: string) => void;
}

export const CustomBlockSection: React.FC<CustomBlockSectionProps> = ({
  blocks,
  isAdmin,
  onAddBlock,
  onEditBlock,
  onDeleteBlock
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<CustomBlock | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<'announcement' | 'info' | 'warning'>('announcement');

  const openCreateModal = () => {
    setEditingBlock(null);
    setTitle('');
    setContent('');
    setType('announcement');
    setIsModalOpen(true);
  };

  const openEditModal = (b: CustomBlock) => {
    setEditingBlock(b);
    setTitle(b.title);
    setContent(b.content);
    setType(b.type);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    if (editingBlock) {
      onEditBlock({
        ...editingBlock,
        title: title.trim(),
        content: content.trim(),
        type
      });
    } else {
      onAddBlock({
        title: title.trim(),
        content: content.trim(),
        type,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    }

    setIsModalOpen(false);
  };

  if (blocks.length === 0 && !isAdmin) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      
      {/* Header if admin or if there are blocks */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Megaphone className="w-4 h-4 text-neutral-400" />
          <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wider">
            Новости и Объявления
          </h3>
        </div>

        {isAdmin && (
          <button
            onClick={openCreateModal}
            className="px-3 py-1.5 text-xs font-mono font-medium rounded-md bg-neutral-900 hover:bg-neutral-800 text-white border border-neutral-700 transition flex items-center gap-1.5 shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            Добавить блок / текст
          </button>
        )}
      </div>

      {blocks.length === 0 ? (
        <div className="p-6 rounded-xl border border-dashed border-neutral-800 text-center bg-[#060608]">
          <p className="text-xs text-neutral-500 font-mono">
            Здесь нет информационных блоков. Как администратор, вы можете добавить новость или текстовую заметку.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {blocks.map((b) => (
            <div
              key={b.id}
              className="relative group p-5 rounded-xl bg-[#08080b] border border-neutral-800 hover:border-neutral-700 transition flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                    b.type === 'announcement'
                      ? 'bg-neutral-900 text-neutral-300 border border-neutral-800'
                      : b.type === 'warning'
                      ? 'bg-amber-950/60 text-amber-300 border border-amber-800/80'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                  }`}>
                    {b.type === 'announcement' && <Megaphone className="w-3 h-3" />}
                    {b.type === 'warning' && <AlertTriangle className="w-3 h-3" />}
                    {b.type === 'info' && <Info className="w-3 h-3" />}
                    {b.type === 'announcement' ? 'Новость' : b.type === 'warning' ? 'Важное' : 'Инфо'}
                  </span>

                  <span className="text-[10px] font-mono text-neutral-500">{b.date}</span>
                </div>

                <h4 className="font-bold text-sm text-white mb-1.5">{b.title}</h4>
                <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-line">{b.content}</p>
              </div>

              {/* Admin Actions */}
              {isAdmin && (
                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-end gap-2">
                  <button
                    onClick={() => openEditModal(b)}
                    className="p-1.5 text-xs text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded transition flex items-center gap-1 font-mono"
                    title="Редактировать этот блок"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                    Редактировать
                  </button>
                  <button
                    onClick={() => onDeleteBlock(b.id)}
                    className="p-1.5 text-xs text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-900/50 rounded transition flex items-center gap-1 font-mono"
                    title="Удалить этот блок"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    Удалить
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal for Creating / Editing Custom Block */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
          <div className="relative w-full max-w-lg bg-[#08080b] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-6 font-sans text-neutral-100">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <h3 className="font-bold text-sm text-white font-mono">
                {editingBlock ? 'Редактировать блок' : 'Добавить текстовый блок / новость'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-md bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              <div>
                <label className="block text-neutral-300 font-mono mb-1">Заголовок блока</label>
                <input
                  type="text"
                  required
                  placeholder="Например: Анонс обновления v2.0"
                  value={title}
                  onChange={e => setTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div>
                <label className="block text-neutral-300 font-mono mb-1">Тип сообщения</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as any)}
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600 font-mono"
                >
                  <option value="announcement">Новость / Анонс</option>
                  <option value="info">Информация</option>
                  <option value="warning">Важное объявление</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-mono mb-1">Текст сообщения</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Текст вашего объявления или информация..."
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-neutral-800">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-neutral-900 text-neutral-300 hover:bg-neutral-800 font-mono"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-white hover:bg-neutral-200 text-black font-bold font-mono transition"
                >
                  {editingBlock ? 'Сохранить' : 'Опубликовать'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
