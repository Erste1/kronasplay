import React, { useState } from 'react';
import { X, Copy, Download, Check, FileCode, Github, Sparkles } from 'lucide-react';
import { Project, DeveloperProfile } from '../types';

interface ExportHtmlModalProps {
  isOpen: boolean;
  projects: Project[];
  profile: DeveloperProfile;
  onClose: () => void;
}

export const ExportHtmlModal: React.FC<ExportHtmlModalProps> = ({
  isOpen,
  projects,
  profile,
  onClose
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Generate self-contained standalone single HTML document
  const generateStandaloneHtml = (): string => {
    const projectsJson = JSON.stringify(projects, null, 2);
    
    return `<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${profile.name} — Игры и Приложения (Windows & Android)</title>
    <!-- Tailwind CSS CDN -->
    <script src="https://cdn.tailwindcss.com"></script>
    <!-- Lucide Icons -->
    <script src="https://unpkg.com/lucide@latest"></script>
    <style>
      body { background-color: #020617; color: #f8fafc; font-family: system-ui, -apple-system, sans-serif; }
      .no-scrollbar::-webkit-scrollbar { display: none; }
      .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
    </style>
</head>
<body class="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased">

    <!-- Header -->
    <header className="sticky top-0 z-40 bg-slate-900/90 backdrop-blur border-b border-slate-800">
        <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-500 p-0.5 shadow-lg">
                    <div class="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center font-bold text-indigo-400">
                        🎮
                    </div>
                </div>
                <div>
                    <h1 class="font-bold text-lg text-white">${profile.name}</h1>
                    <p class="text-xs text-slate-400">Игры и Приложения для Windows ПК & Android</p>
                </div>
            </div>
            
            <a href="https://github.com/${profile.githubUsername}" target="_blank" class="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition flex items-center gap-1.5">
                <i data-lucide="github" class="w-4 h-4"></i> GitHub Profile
            </a>
        </div>
    </header>

    <!-- Hero Banner -->
    <section class="py-12 bg-slate-900 border-b border-slate-800 text-center px-4">
        <div class="max-w-3xl mx-auto space-y-4">
            <span class="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-semibold border border-indigo-500/30">
                🟢 GitHub Indie Developer Portfolio
            </span>
            <h2 class="text-3xl sm:text-5xl font-extrabold text-white">
                Разработка Игр и Софта для ПК & Android
            </h2>
            <p class="text-slate-300 text-sm sm:text-base leading-relaxed">
                ${profile.bio}
            </p>
        </div>
    </section>

    <!-- Category Filter Menu -->
    <section class="sticky top-16 z-30 bg-slate-900/95 backdrop-blur border-b border-slate-800 py-4">
        <div class="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-between gap-4">
            
            <!-- Category Tabs -->
            <div class="flex flex-wrap items-center gap-2">
                <button onclick="filterPlatform('all')" id="btn-all" class="px-3 py-1.5 rounded-xl bg-indigo-600 text-white text-xs font-bold transition">
                    Все проекты
                </button>
                <button onclick="filterPlatform('windows')" id="btn-windows" class="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition">
                    💻 Windows (ПК)
                </button>
                <button onclick="filterPlatform('android')" id="btn-android" class="px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 text-xs font-semibold transition">
                    📱 Android
                </button>
                <div class="h-4 w-px bg-slate-800"></div>
                <button onclick="filterType('game')" id="btn-games" class="px-3 py-1.5 rounded-xl bg-slate-800 text-purple-300 hover:bg-slate-700 text-xs font-semibold transition">
                    🎮 Игры
                </button>
                <button onclick="filterType('app')" id="btn-apps" class="px-3 py-1.5 rounded-xl bg-slate-800 text-cyan-300 hover:bg-slate-700 text-xs font-semibold transition">
                    🛠️ Программы
                </button>
                <button onclick="filterType('extension')" id="btn-extensions" class="px-3 py-1.5 rounded-xl bg-slate-800 text-amber-300 hover:bg-slate-700 text-xs font-semibold transition">
                    🧩 Расширения
                </button>
            </div>

            <!-- Search Input -->
            <div class="w-full sm:w-64">
                <input type="text" id="searchInput" oninput="renderProjects()" placeholder="Поиск проектов..." class="w-full px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white focus:outline-none focus:border-indigo-500">
            </div>

        </div>
    </section>

    <!-- Project Cards Grid -->
    <main class="max-w-7xl mx-auto px-4 py-8 flex-1 w-full">
        <div id="projectsGrid" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <!-- Projects dynamically injected by JS below -->
        </div>
    </main>

    <!-- Footer -->
    <footer class="bg-slate-900 border-t border-slate-800 py-6 text-center text-xs text-slate-400">
        <p>© ${new Date().getFullYear()} ${profile.name}. Hosted on GitHub Pages.</p>
    </footer>

    <!-- Interactive Data Script -->
    <script>
        const PROJECTS_DATA = ${projectsJson};

        let currentPlatform = 'all';
        let currentType = 'all';

        function filterPlatform(p) {
            currentPlatform = p;
            renderProjects();
        }

        function filterType(t) {
            currentType = (currentType === t) ? 'all' : t;
            renderProjects();
        }

        function renderProjects() {
            const query = document.getElementById('searchInput').value.toLowerCase();
            const grid = document.getElementById('projectsGrid');
            
            const filtered = PROJECTS_DATA.filter(p => {
                const matchPlatform = currentPlatform === 'all' || p.platform === currentPlatform || p.platform === 'both';
                const matchType = currentType === 'all' || p.type === currentType;
                const matchSearch = p.title.toLowerCase().includes(query) || p.shortDescription.toLowerCase().includes(query) || p.tags.some(t => t.toLowerCase().includes(query));
                return matchPlatform && matchType && matchSearch;
            });

            if (filtered.length === 0) {
                grid.innerHTML = '<div class="col-span-full py-12 text-center text-slate-400">Проекты не найдены</div>';
                return;
            }

            grid.innerHTML = filtered.map(p => \`
                <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between">
                    <div>
                        <div class="relative h-44 bg-slate-950">
                            <img src="\${p.bannerUrl}" alt="\${p.title}" class="w-full h-full object-cover">
                            <div class="absolute top-3 left-3 flex gap-1">
                                \${(p.platform === 'windows' || p.platform === 'both') ? '<span class="px-2 py-0.5 rounded bg-blue-600 text-white text-[10px] font-bold">Windows</span>' : ''}
                                \${(p.platform === 'android' || p.platform === 'both') ? '<span class="px-2 py-0.5 rounded bg-emerald-600 text-white text-[10px] font-bold">Android</span>' : ''}
                                <span class="px-2 py-0.5 rounded bg-purple-900/80 text-purple-200 text-[10px] font-bold">\${p.type === 'game' ? '🎮 Игра' : p.type === 'extension' ? '🧩 Расширение' : '🛠️ Программа'}</span>
                            </div>
                        </div>
                        <div class="p-5 space-y-2">
                            <h3 class="font-bold text-lg text-white">\${p.title}</h3>
                            <p class="text-xs text-slate-400 line-clamp-2">\${p.shortDescription}</p>
                            <div class="flex flex-wrap gap-1 pt-1">
                                \${p.tags.map(t => \`<span class="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded">#\${t}</span>\`).join('')}
                            </div>
                        </div>
                    </div>
                    <div class="p-5 pt-0 mt-2 flex items-center gap-2">
                        \${p.downloadUrlExe ? \`<a href="\${p.downloadUrlExe}" target="_blank" class="flex-1 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold text-center">Скачать EXE</a>\` : ''}
                        \${p.downloadUrlApk ? \`<a href="\${p.downloadUrlApk}" target="_blank" class="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold text-center">Скачать APK</a>\` : ''}
                        \${p.githubUrl ? \`<a href="\${p.githubUrl}" target="_blank" class="p-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white">GitHub</a>\` : ''}
                    </div>
                </div>
            \`).join('');

            lucide.createIcons();
        }

        renderProjects();
    </script>
</body>
</html>`;
  };

  const htmlContent = generateStandaloneHtml();

  const handleCopyCode = () => {
    navigator.clipboard.writeText(htmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadHtml = () => {
    const blob = new Blob([htmlContent], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <FileCode className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">
              Экспорт автономного HTML сайта
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-xs flex-1">
          
          <div className="p-4 rounded-2xl bg-indigo-950/30 border border-indigo-500/20 text-indigo-200 space-y-2">
            <h3 className="font-bold text-sm text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" />
              Готовый статический HTML сайт
            </h3>
            <p className="leading-relaxed text-slate-300">
              Этот генератор создает единый автономный файл <code className="bg-slate-950 px-1.5 py-0.5 rounded text-indigo-400">index.html</code> со всеми вашими проектами для Windows и Android, фильтрами категорий и адаптивным дизайном. Вы можете разместить его на любом веб-сервере или хостинге!
            </p>
          </div>

          {/* Step-by-step instructions */}
          <div className="space-y-3 bg-slate-950 p-4 rounded-2xl border border-slate-800">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              Как запустить сайт:
            </h3>

            <ol className="space-y-2 text-slate-300 list-decimal list-inside pl-1">
              <li>
                Скачайте файл <strong className="text-white">index.html</strong> нажатием кнопки ниже.
              </li>
              <li>
                Загрузите файл на любой хостинг или открывайте его локально в браузере.
              </li>
              <li>
                Сайт полностью автономен и не требует дополнительных серверов или настроек.
              </li>
            </ol>
          </div>

          {/* HTML Preview Box */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="font-semibold text-slate-300">Предпросмотр HTML кода:</label>
              <span className="text-[10px] text-slate-500">Автономный код • Tailwind CSS CDN</span>
            </div>
            <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-indigo-300 font-mono text-[11px] overflow-x-auto max-h-48 scrollbar-thin">
              {htmlContent.slice(0, 1000)}...
            </pre>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <button
              onClick={handleDownloadHtml}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <Download className="w-4 h-4" />
              Скачать index.html
            </button>

            <button
              onClick={handleCopyCode}
              className="w-full sm:w-1/2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs transition flex items-center justify-center gap-2 border border-slate-700"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              {copied ? 'Скопировано в буфер!' : 'Скопировать HTML код'}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
