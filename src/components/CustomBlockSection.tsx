import React, { useState } from 'react';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Megaphone, 
  Info, 
  AlertTriangle, 
  X, 
  Check, 
  Code, 
  ExternalLink, 
  Image as ImageIcon, 
  Layout, 
  Sparkles,
  MousePointer
} from 'lucide-react';
import { CustomBlock, BlockPosition, BlockType } from '../types';

interface CustomBlockSectionProps {
  blocks: CustomBlock[];
  isAdmin: boolean;
  targetPosition?: BlockPosition;
  onAddBlock: (block: Omit<CustomBlock, 'id'>) => void;
  onEditBlock: (block: CustomBlock) => void;
  onDeleteBlock: (id: string) => void;
}

export const CustomBlockSection: React.FC<CustomBlockSectionProps> = ({
  blocks,
  isAdmin,
  targetPosition = 'under_news',
  onAddBlock,
  onEditBlock,
  onDeleteBlock
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBlock, setEditingBlock] = useState<CustomBlock | null>(null);

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<BlockType>('announcement');
  const [position, setPosition] = useState<BlockPosition>(targetPosition);
  const [targetUrl, setTargetUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [hideTitle, setHideTitle] = useState(false);

  // Filter blocks for this position (or fallback to 'under_news' for untagged legacy blocks)
  const positionBlocks = blocks.filter(b => {
    const blockPos = b.position || 'under_news';
    return blockPos === targetPosition;
  });

  const openCreateModal = () => {
    setEditingBlock(null);
    setTitle('');
    setContent('');
    setType('announcement');
    setPosition(targetPosition);
    setTargetUrl('');
    setImageUrl('');
    setHideTitle(false);
    setIsModalOpen(true);
  };

  const openEditModal = (b: CustomBlock) => {
    setEditingBlock(b);
    setTitle(b.title);
    setContent(b.content);
    setType(b.type || 'announcement');
    setPosition(b.position || targetPosition);
    setTargetUrl(b.targetUrl || '');
    setImageUrl(b.imageUrl || '');
    setHideTitle(!!b.hideTitle);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (type !== 'embed_code' && !title.trim()) return;

    if (editingBlock) {
      onEditBlock({
        ...editingBlock,
        title: title.trim() || 'Рекламный блок',
        content: content.trim(),
        type,
        position,
        targetUrl: targetUrl.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
        hideTitle
      });
    } else {
      onAddBlock({
        title: title.trim() || 'Рекламный блок',
        content: content.trim(),
        type,
        position,
        targetUrl: targetUrl.trim() || undefined,
        imageUrl: imageUrl.trim() || undefined,
        hideTitle,
        date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })
      });
    }

    setIsModalOpen(false);
  };

  if (positionBlocks.length === 0 && !isAdmin) return null;

  const positionLabels: Record<BlockPosition, string> = {
    under_header: 'Под шапкой сайта',
    under_hero: 'Под промо-блоком (Hero)',
    under_news: 'Новости и Объявления',
    under_filter: 'Под фильтрами каталога',
    under_catalog: 'Под каталогом проектов',
    under_about: 'Под блоком «О разработчике»',
    before_footer: 'Перед подвалом сайта'
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 my-2">
      
      {/* Header if admin or if there are blocks */}
      {(positionBlocks.length > 0 || isAdmin) && (
        <div className="flex items-center justify-between mb-3 border-b border-neutral-800/60 pb-2">
          <div className="flex items-center gap-2">
            <Megaphone className="w-4 h-4 text-neutral-400" />
            <h3 className="text-xs font-bold text-neutral-300 font-mono uppercase tracking-wider">
              {positionLabels[targetPosition]}
            </h3>
            {positionBlocks.length > 0 && (
              <span className="text-[10px] font-mono bg-neutral-900 border border-neutral-800 text-neutral-400 px-2 py-0.5 rounded-full">
                {positionBlocks.length}
              </span>
            )}
          </div>

          {isAdmin && (
            <button
              onClick={openCreateModal}
              className="px-3 py-1 text-[11px] font-mono font-medium rounded bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 border border-emerald-800/80 transition flex items-center gap-1.5 shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              + Добавить блок / рекламу
            </button>
          )}
        </div>
      )}

      {/* Render Blocks */}
      {positionBlocks.length === 0 ? (
        isAdmin && (
          <div className="p-4 rounded-xl border border-dashed border-neutral-800/80 text-center bg-[#060608]">
            <p className="text-[11px] text-neutral-500 font-mono mb-2">
              Секция «{positionLabels[targetPosition]}». Нажмите ниже, чтобы встроить сюда рекламный код, баннер или объявление.
            </p>
            <button
              onClick={openCreateModal}
              className="px-3 py-1 text-xs font-mono bg-neutral-900 hover:bg-neutral-800 text-neutral-300 border border-neutral-700 rounded transition inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              Разместить блок / рекламу здесь
            </button>
          </div>
        )
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {positionBlocks.map((b) => (
            <div
              key={b.id}
              className="relative group p-4 rounded-xl bg-[#08080b] border border-neutral-800 hover:border-neutral-700 transition flex flex-col justify-between space-y-3 overflow-hidden shadow-sm"
            >
              <div>
                {/* Badge Header */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider flex items-center gap-1 ${
                    b.type === 'announcement'
                      ? 'bg-neutral-900 text-neutral-300 border border-neutral-800'
                      : b.type === 'warning'
                      ? 'bg-amber-950/60 text-amber-300 border border-amber-800/80'
                      : b.type === 'ad_banner'
                      ? 'bg-emerald-950/60 text-emerald-300 border border-emerald-800/80'
                      : b.type === 'embed_code'
                      ? 'bg-purple-950/60 text-purple-300 border border-purple-800/80'
                      : 'bg-neutral-900 text-neutral-400 border border-neutral-800'
                  }`}>
                    {b.type === 'announcement' && <Megaphone className="w-3 h-3" />}
                    {b.type === 'warning' && <AlertTriangle className="w-3 h-3" />}
                    {b.type === 'info' && <Info className="w-3 h-3" />}
                    {b.type === 'ad_banner' && <Sparkles className="w-3 h-3 text-emerald-400" />}
                    {b.type === 'embed_code' && <Code className="w-3 h-3 text-purple-400" />}
                    
                    {b.type === 'announcement' ? 'Новость' 
                      : b.type === 'warning' ? 'Важное' 
                      : b.type === 'ad_banner' ? 'Реклама / Спонсор' 
                      : b.type === 'embed_code' ? 'Встраиваемый код' 
                      : 'Инфо'}
                  </span>

                  <span className="text-[10px] font-mono text-neutral-500">{b.date}</span>
                </div>

                {/* Banner Image */}
                {b.type === 'ad_banner' && b.imageUrl && (
                  <div className="w-full h-32 rounded-lg overflow-hidden border border-neutral-800 mb-3 bg-black">
                    <img 
                      src={b.imageUrl} 
                      alt={b.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                )}

                {/* Title */}
                {!b.hideTitle && (
                  <h4 className="font-bold text-sm text-white mb-1.5">{b.title}</h4>
                )}

                {/* Content Rendering */}
                {b.type === 'embed_code' ? (
                  <div className="p-2.5 rounded bg-black border border-neutral-900 overflow-x-auto text-xs font-mono text-neutral-200">
                    <div 
                      dangerouslySetInnerHTML={{ __html: b.content }} 
                      className="embed-code-container"
                    />
                  </div>
                ) : (
                  <p className="text-xs text-neutral-300 leading-relaxed whitespace-pre-line">{b.content}</p>
                )}

                {/* Action Button for Ad Banner */}
                {b.type === 'ad_banner' && b.targetUrl && (
                  <a
                    href={b.targetUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 w-full py-2 px-3 rounded bg-emerald-950 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 text-xs font-mono font-bold transition flex items-center justify-center gap-1.5"
                  >
                    <span>Перейти на сайт</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Admin Control Bar */}
              {isAdmin && (
                <div className="pt-2 border-t border-neutral-800/80 flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono text-neutral-500 truncate">
                    Позиция: {positionLabels[b.position || 'under_news']}
                  </span>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => openEditModal(b)}
                      className="p-1 text-xs text-neutral-400 hover:text-white bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded transition flex items-center gap-1 font-mono"
                      title="Редактировать этот блок"
                    >
                      <Edit2 className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onDeleteBlock(b.id)}
                      className="p-1 text-xs text-rose-400 hover:text-rose-300 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-900/50 rounded transition flex items-center gap-1 font-mono"
                      title="Удалить этот блок"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Modal for Adding/Editing Block or Embed Code */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
          <div className="relative w-full max-w-lg bg-[#08080b] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-6 font-sans text-neutral-100 my-8">
            
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
              <div className="flex items-center gap-2 font-mono font-bold text-sm text-white">
                <Layout className="w-4 h-4 text-emerald-400" />
                <span>{editingBlock ? 'Редактировать блок' : 'Добавить информационный или рекламный блок'}</span>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-md bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4 text-xs">
              
              <div>
                <label className="block text-neutral-300 font-mono mb-1">Позиция на странице</label>
                <select
                  value={position}
                  onChange={e => setPosition(e.target.value as BlockPosition)}
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white font-mono focus:outline-none focus:border-neutral-600"
                >
                  <option value="under_header">Под шапкой сайта</option>
                  <option value="under_hero">Под промо-блоком (Hero)</option>
                  <option value="under_news">Секция новостей и объявлений</option>
                  <option value="under_filter">Под фильтрами каталога</option>
                  <option value="under_catalog">Под каталогом проектов</option>
                  <option value="under_about">Под блоком «О разработчике»</option>
                  <option value="before_footer">Перед подвалом сайта</option>
                </select>
              </div>

              <div>
                <label className="block text-neutral-300 font-mono mb-1">Тип содержимого</label>
                <select
                  value={type}
                  onChange={e => setType(e.target.value as BlockType)}
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white font-mono focus:outline-none focus:border-neutral-600"
                >
                  <option value="announcement">Новость / Анонс</option>
                  <option value="info">Информация</option>
                  <option value="warning">Важное объявление</option>
                  <option value="ad_banner">Рекламный баннер (Картинка + Ссылка)</option>
                  <option value="embed_code">Код встраивания (HTML / iFrame / РСЯ / AdSense)</option>
                </select>
              </div>

              {type !== 'embed_code' && (
                <div>
                  <label className="block text-neutral-300 font-mono mb-1">Заголовок блока</label>
                  <input
                    type="text"
                    required={type !== 'embed_code'}
                    placeholder="Заголовок блока или название акции..."
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600"
                  />
                </div>
              )}

              {type === 'ad_banner' && (
                <>
                  <div>
                    <label className="block text-neutral-300 font-mono mb-1">URL баннера (Картинка)</label>
                    <input
                      type="url"
                      placeholder="https://example.com/banner.png"
                      value={imageUrl}
                      onChange={e => setImageUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600 font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-300 font-mono mb-1">Целевая ссылка (при клике)</label>
                    <input
                      type="url"
                      placeholder="https://example.com"
                      value={targetUrl}
                      onChange={e => setTargetUrl(e.target.value)}
                      className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600 font-mono"
                    />
                  </div>
                </>
              )}

              <div>
                <label className="block text-neutral-300 font-mono mb-1">
                  {type === 'embed_code' ? 'HTML / JS / iFrame код для встраивания' : 'Текст / Описание'}
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder={type === 'embed_code' ? '<iframe src="..." ...></iframe> или <script>...</script>' : 'Текст сообщения или описание...'}
                  value={content}
                  onChange={e => setContent(e.target.value)}
                  className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white focus:outline-none focus:border-neutral-600 font-mono"
                />
              </div>

              {type === 'embed_code' && (
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="checkbox"
                    id="hideTitle"
                    checked={hideTitle}
                    onChange={e => setHideTitle(e.target.checked)}
                    className="rounded border-neutral-800 bg-black text-emerald-500 focus:ring-0"
                  />
                  <label htmlFor="hideTitle" className="text-neutral-400 font-mono text-[11px] select-none">
                    Скрыть стандартный заголовок (отображать только встроенный код)
                  </label>
                </div>
              )}

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-neutral-800 font-mono">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-3 py-1.5 rounded bg-neutral-900 text-neutral-300 hover:bg-neutral-800"
                >
                  Отмена
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded bg-white hover:bg-neutral-200 text-black font-bold transition flex items-center gap-1.5"
                >
                  <Check className="w-4 h-4" />
                  {editingBlock ? 'Сохранить изменения' : 'Опубликовать блок'}
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </section>
  );
};
