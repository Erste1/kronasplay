import React, { useState } from 'react';
import { X, Copy, Check, Github, FileText } from 'lucide-react';
import { Project, DeveloperProfile } from '../types';

interface GithubReadmeModalProps {
  isOpen: boolean;
  projects: Project[];
  profile: DeveloperProfile;
  onClose: () => void;
}

export const GithubReadmeModal: React.FC<GithubReadmeModalProps> = ({
  isOpen,
  projects,
  profile,
  onClose
}) => {
  if (!isOpen) return null;

  const [copied, setCopied] = useState(false);

  const generateReadmeMarkdown = (): string => {
    const windowsGames = projects.filter(p => (p.platform === 'windows' || p.platform === 'both') && p.type === 'game');
    const androidGames = projects.filter(p => (p.platform === 'android' || p.platform === 'both') && p.type === 'game');
    const windowsApps = projects.filter(p => (p.platform === 'windows' || p.platform === 'both') && p.type === 'app');
    const androidApps = projects.filter(p => (p.platform === 'android' || p.platform === 'both') && p.type === 'app');

    return `# 👋 Привет, я ${profile.name}!

> ${profile.tagline}

${profile.bio}

---

## 🛠️ Мой стек технологий
${profile.skills.map(s => `-\` ${s} \``).join(' ')}

---

## 💻 Игры для ПК (Windows)
| Игра | Версия | Описание | Скачать / GitHub |
| :--- | :---: | :--- | :--- |
${windowsGames.map(g => `| **${g.title}** | \`${g.version}\` | ${g.shortDescription} | [📥 EXE](${g.downloadUrlExe || '#'}) ${g.githubUrl ? `• [GitHub](${g.githubUrl})` : ''} |`).join('\n')}

---

## 🛠️ Программы для ПК (Windows)
| Программа | Версия | Описание | Скачать / GitHub |
| :--- | :---: | :--- | :--- |
${windowsApps.map(a => `| **${a.title}** | \`${a.version}\` | ${a.shortDescription} | [📥 EXE](${a.downloadUrlExe || '#'}) ${a.githubUrl ? `• [GitHub](${a.githubUrl})` : ''} |`).join('\n')}

---

## 📱 Игры для Android
| Игра | Версия | Описание | Скачать / GitHub |
| :--- | :---: | :--- | :--- |
${androidGames.map(g => `| **${g.title}** | \`${g.version}\` | ${g.shortDescription} | [📥 APK](${g.downloadUrlApk || '#'}) ${g.githubUrl ? `• [GitHub](${g.githubUrl})` : ''} |`).join('\n')}

---

## 📱 Приложения для Android
| Приложение | Версия | Описание | Скачать / GitHub |
| :--- | :---: | :--- | :--- |
${androidApps.map(a => `| **${a.title}** | \`${a.version}\` | ${a.shortDescription} | [📥 APK](${a.downloadUrlApk || '#'}) ${a.githubUrl ? `• [GitHub](${a.githubUrl})` : ''} |`).join('\n')}

---

## 📬 Контакты
- **GitHub:** [https://github.com/${profile.githubUsername}](https://github.com/${profile.githubUsername})
- **Telegram:** ${profile.telegramUsername || '@dev'}
- **Discord:** ${profile.discordTag || 'kronas#1337'}
`;
  };

  const markdownContent = generateReadmeMarkdown();

  const handleCopy = () => {
    navigator.clipboard.writeText(markdownContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl my-8 text-slate-100 max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900 sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <Github className="w-5 h-5 text-indigo-400" />
            <h2 className="text-lg font-bold text-white">
              Генератор README.md для профиля GitHub
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
        <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
          <p className="text-slate-300">
            Скопируйте сгенерированный Markdown текст ниже и вставьте его в файл <code className="bg-slate-950 px-1.5 py-0.5 rounded text-indigo-300">README.md</code> вашего профиля или репозитория на GitHub:
          </p>

          <pre className="p-4 bg-slate-950 border border-slate-800 rounded-2xl text-slate-200 font-mono text-[11px] overflow-x-auto max-h-80 whitespace-pre-wrap">
            {markdownContent}
          </pre>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleCopy}
              className="py-2.5 px-5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs transition flex items-center gap-2 shadow-md shadow-indigo-600/30"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Скопировано!' : 'Скопировать README.md'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
