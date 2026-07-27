import React, { useState } from 'react';
import { Lock, Key, X, Check } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => boolean;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onLogin
}) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = onLogin(password);
    if (success) {
      setPassword('');
      setError(false);
      onClose();
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md bg-[#08080b] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-6 font-mono text-neutral-100">
        
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2 text-white font-bold">
            <Lock className="w-5 h-5 text-neutral-300" />
            <span>Пароль администратора</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition border border-neutral-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            Введите пароль для включения режима редактирования проектов. В режиме гостя кнопки добавления и редактирования скрыты.
          </p>

          <div>
            <label className="block text-xs text-neutral-300 mb-1">Пароль администратора</label>
            <div className="relative">
              <input
                type="password"
                required
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                placeholder="••••••••"
                className={`w-full px-3 py-2 bg-black border ${error ? 'border-rose-500' : 'border-neutral-800'} rounded-md text-white text-xs focus:outline-none focus:border-neutral-600 pl-9`}
              />
              <Key className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
            </div>
            {error && (
              <p className="text-[11px] text-rose-400 mt-1">
                Неверный пароль. Попробуйте еще раз.
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 rounded-md bg-neutral-900 text-neutral-300 hover:bg-neutral-800 text-xs border border-neutral-800"
            >
              Отмена
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 rounded-md bg-white hover:bg-neutral-200 text-black text-xs font-bold transition flex items-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              Войти
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
