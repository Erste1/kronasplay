import React, { useState } from 'react';
import { 
  Send, 
  Mail, 
  MessageSquare, 
  Code2, 
  Gamepad2, 
  Cpu, 
  Check, 
  ExternalLink,
  Award,
  Terminal,
  Globe,
  Edit2
} from 'lucide-react';
import { DeveloperProfile } from '../types';

interface DeveloperAboutProps {
  profile: DeveloperProfile;
  isAdmin?: boolean;
  onOpenProfileEditor?: () => void;
}

export const DeveloperAbout: React.FC<DeveloperAboutProps> = ({
  profile,
  isAdmin,
  onOpenProfileEditor
}) => {
  const [msgSent, setMsgSent] = useState(false);

  const [senderName, setSenderName] = useState('');
  const [senderContact, setSenderContact] = useState('');
  const [senderMsg, setSenderMsg] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderMsg) return;
    setMsgSent(true);
    setTimeout(() => {
      setMsgSent(false);
      setSenderName('');
      setSenderContact('');
      setSenderMsg('');
    }, 4000);
  };

  return (
    <section id="about" className="bg-[#030304] border-t border-neutral-800 py-16 text-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Section Heading */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <span className="px-3.5 py-1 rounded-full bg-neutral-900 text-neutral-300 text-xs font-mono border border-neutral-800">
            Developer Information
          </span>
          <h2 className="text-3xl font-extrabold text-white">
            Инди-Студия & Разработка
          </h2>
          <p className="text-sm text-neutral-400">
            Создание инди-игр, системного программного обеспечения и кроссплатформенных приложений.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Developer Card & Skills */}
          <div className="lg:col-span-7 bg-[#08080b] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-6">
            
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
              <img 
                src={profile.avatarUrl} 
                alt={profile.name} 
                className="w-20 h-20 rounded-xl object-cover border border-neutral-700 shadow-sm"
              />
              <div className="space-y-1">
                <h3 className="text-xl font-bold text-white flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  {profile.name}
                  <span className="text-[10px] font-mono font-medium text-neutral-300 bg-neutral-900 border border-neutral-700 px-2 py-0.5 rounded">
                    Active Dev
                  </span>
                  {isAdmin && onOpenProfileEditor && (
                    <button
                      onClick={onOpenProfileEditor}
                      className="text-[11px] font-mono font-medium text-emerald-300 bg-emerald-950/80 border border-emerald-800 hover:bg-emerald-900 px-2 py-0.5 rounded transition flex items-center gap-1"
                      title="Редактировать информацию и навыки"
                    >
                      <Edit2 className="w-3 h-3" />
                      Редактировать
                    </button>
                  )}
                </h3>
                <p className="text-xs font-mono text-neutral-400">{profile.tagline}</p>
                <p className="text-xs text-neutral-400 leading-relaxed pt-1">
                  {profile.bio}
                </p>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="space-y-3 pt-2 font-mono">
              <h4 className="text-xs uppercase font-bold tracking-wider text-neutral-400 flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-neutral-400" />
                Основной стек и инструменты:
              </h4>
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill) => (
                  <span 
                    key={skill}
                    className="px-3 py-1.5 rounded-md bg-black text-neutral-200 text-xs border border-neutral-800 flex items-center gap-1.5"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-neutral-400" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="pt-2 border-t border-neutral-800 flex flex-wrap gap-3 font-mono">
              {profile.telegramUsername && (
                <a
                  href={`https://t.me/${profile.telegramUsername.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-3.5 py-2 rounded-md bg-black hover:bg-neutral-900 text-neutral-300 text-xs border border-neutral-800 transition flex items-center gap-2"
                >
                  <Send className="w-4 h-4 text-neutral-400" />
                  {profile.telegramUsername}
                </a>
              )}

              {profile.discordTag && (
                <span className="px-3.5 py-2 rounded-md bg-black text-neutral-300 text-xs border border-neutral-800 flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-neutral-400" />
                  Discord: {profile.discordTag}
                </span>
              )}
            </div>

          </div>

          {/* Quick Contact Form */}
          <div className="lg:col-span-5 bg-[#08080b] border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-4">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-neutral-300" />
              Связаться с разработчиком
            </h3>
            <p className="text-xs text-neutral-400">
              Есть предложение о сотрудничестве, вопрос по релизу или баг-репорт? Напишите напрямую.
            </p>

            {msgSent ? (
              <div className="p-4 rounded-lg bg-neutral-900 border border-neutral-700 text-neutral-200 text-xs font-mono flex items-center gap-2">
                <Check className="w-5 h-5 text-white shrink-0" />
                <span>Спасибо! Ваше сообщение успешно отправлено разработчику.</span>
              </div>
            ) : (
              <form onSubmit={handleSendMessage} className="space-y-3 text-xs">
                <div>
                  <label className="block text-neutral-300 font-mono mb-1">Ваше имя / Никнейм</label>
                  <input
                    type="text"
                    required
                    placeholder="Например: Иван"
                    value={senderName}
                    onChange={(e) => setSenderName(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-mono mb-1">Telegram / Email для ответа</label>
                  <input
                    type="text"
                    required
                    placeholder="@username или email@example.com"
                    value={senderContact}
                    onChange={(e) => setSenderContact(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-neutral-300 font-mono mb-1">Сообщение</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Здравствуйте, интересует игра/приложение..."
                    value={senderMsg}
                    onChange={(e) => setSenderMsg(e.target.value)}
                    className="w-full px-3 py-2 bg-black border border-neutral-800 rounded-md text-white placeholder-neutral-600 focus:outline-none focus:border-neutral-600 font-mono"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 rounded-md bg-white hover:bg-neutral-200 text-black font-mono font-bold text-xs transition flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Отправить сообщение
                </button>
              </form>
            )}
          </div>

        </div>

      </div>
    </section>
  );
};
