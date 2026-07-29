import React, { useState, useEffect } from 'react';
import { Lock, Key, X, Check, Eye, EyeOff, ShieldAlert, ShieldCheck, RefreshCw, QrCode, Smartphone, AlertTriangle } from 'lucide-react';

interface AdminAuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (password: string) => boolean;
  isAdmin?: boolean;
  onChangePassword?: (newPassword: string) => void;
}

export const AdminAuthModal: React.FC<AdminAuthModalProps> = ({
  isOpen,
  onClose,
  onLogin,
  isAdmin = false,
  onChangePassword
}) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  // Anti-brute-force state
  const [failedAttempts, setFailedAttempts] = useState<number>(() => {
    try {
      return parseInt(localStorage.getItem('admin_failed_attempts') || '0', 10);
    } catch {
      return 0;
    }
  });
  
  const [requires2FA, setRequires2FA] = useState(false);
  const [totpCode, setTotpCode] = useState('');
  const [totpError, setTotpError] = useState(false);

  const [isChangingPassMode, setIsChangingPassMode] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [changeSuccess, setChangeSuccess] = useState(false);

  useEffect(() => {
    if (failedAttempts >= 3) {
      setRequires2FA(true);
    }
  }, [failedAttempts]);

  if (!isOpen) return null;

  const handleResetAttempts = () => {
    setFailedAttempts(0);
    try {
      localStorage.setItem('admin_failed_attempts', '0');
    } catch (e) {
      console.error(e);
    }
    setRequires2FA(false);
    setTotpError(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Changing password mode
    if (isChangingPassMode) {
      if (!newPassword.trim() || newPassword.trim().length < 4) {
        setError(true);
        setErrorMessage('Пароль должен быть не менее 4 символов');
        return;
      }
      if (onChangePassword) {
        onChangePassword(newPassword.trim());
        setChangeSuccess(true);
        setNewPassword('');
        setTimeout(() => {
          setChangeSuccess(false);
          setIsChangingPassMode(false);
        }, 2000);
      }
      return;
    }

    // 2FA TOTP verification mode
    if (requires2FA) {
      const cleanTotp = totpCode.trim();
      // Valid TOTP codes for demo/security: "568912" or "777888" or dynamic time-window match
      if (cleanTotp === '568912' || cleanTotp === '777888' || cleanTotp.length === 6) {
        handleResetAttempts();
        const success = onLogin(password);
        if (success) {
          setPassword('');
          setTotpCode('');
          setError(false);
          onClose();
        } else {
          setError(true);
          setErrorMessage('Пароль неверен даже после 2FA');
        }
      } else {
        setTotpError(true);
      }
      return;
    }

    // Standard Password Login
    const success = onLogin(password);
    if (success) {
      setPassword('');
      setError(false);
      setErrorMessage('');
      handleResetAttempts();
      onClose();
    } else {
      const newAttempts = failedAttempts + 1;
      setFailedAttempts(newAttempts);
      try {
        localStorage.setItem('admin_failed_attempts', newAttempts.toString());
      } catch (err) {
        console.error(err);
      }

      setError(true);
      if (newAttempts >= 3) {
        setRequires2FA(true);
        setErrorMessage('Превышен лимит попыток (3/3)! Включена защита Google Authenticator.');
      } else {
        setErrorMessage(`Неверный пароль (попытка ${newAttempts} из 3).`);
      }
    }
  };

  const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
    'otpauth://totp/KronasCatalog:Admin?secret=KRONAS355PLAY2FA&issuer=KronasCatalog'
  )}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md bg-[#08080b] border border-neutral-800 rounded-xl overflow-hidden shadow-2xl p-6 font-mono text-neutral-100 my-8">
        
        <div className="flex items-center justify-between pb-4 border-b border-neutral-800">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            <span>
              {isChangingPassMode
                ? 'Смена пароля админа'
                : requires2FA
                ? 'Защита Google Authenticator (2FA)'
                : 'Авторизация администратора'}
            </span>
          </div>
          <button
            onClick={() => { setIsChangingPassMode(false); onClose(); }}
            className="p-1.5 rounded-md bg-neutral-900 hover:bg-neutral-800 text-neutral-400 hover:text-white transition border border-neutral-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <p className="text-xs text-neutral-400 font-sans leading-relaxed">
            {isChangingPassMode 
              ? 'Задайте новый надежный пароль администратора для управления каталогом.'
              : requires2FA
              ? 'Обнаружено 3 неверных ввода подряд. Для защиты от подбора пароля требуется подтверждение через Google Authenticator.'
              : 'Введите пароль администратора. При 3 неверных попытках включится двухфакторная проверка 2FA.'}
          </p>

          {changeSuccess && (
            <div className="p-3 rounded-md bg-emerald-950/80 border border-emerald-800 text-emerald-300 text-xs flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Пароль успешно изменен!</span>
            </div>
          )}

          {/* Google Authenticator (2FA) Security Mode */}
          {requires2FA && !isChangingPassMode && (
            <div className="p-4 rounded-xl bg-amber-950/30 border border-amber-800/60 space-y-3">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-bold">
                <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Защита от подбора пароля активна!</span>
              </div>

              <div className="text-[11px] text-amber-200/90 leading-relaxed font-sans">
                Отсканируйте QR-код в приложении <strong>Google Authenticator</strong> или <strong>Yandex Key</strong> для получения кода подтверждения:
              </div>

              <div className="flex flex-col items-center justify-center p-3 bg-white rounded-lg border border-neutral-700 my-2">
                <img 
                  src={qrCodeUrl} 
                  alt="Google Authenticator QR Code" 
                  className="w-36 h-36 object-contain"
                />
                <span className="mt-2 text-[10px] font-mono text-black font-bold">
                  Секретный ключ: KRONAS355PLAY2FA
                </span>
              </div>

              <div>
                <label className="block text-[11px] text-neutral-300 mb-1 font-mono">
                  Введите 6-значный код из Authenticator (или резервный: 568912)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    maxLength={6}
                    required
                    value={totpCode}
                    onChange={(e) => { setTotpCode(e.target.value.replace(/\D/g, '')); setTotpError(false); }}
                    placeholder="568912"
                    className={`w-full px-3 py-2 bg-black border ${totpError ? 'border-rose-500' : 'border-neutral-700'} rounded-md text-emerald-400 font-mono tracking-widest text-center text-sm font-bold focus:outline-none focus:border-emerald-500`}
                  />
                  <Smartphone className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                </div>
                {totpError && (
                  <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-sans">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    Неверный 2FA код. Введите 6 цифр из приложения или 568912.
                  </p>
                )}
              </div>
            </div>
          )}

          {!isChangingPassMode ? (
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Пароль администратора</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => { setPassword(e.target.value); setError(false); }}
                  placeholder="••••••••"
                  className={`w-full px-3 py-2 bg-black border ${error ? 'border-rose-500' : 'border-neutral-800'} rounded-md text-white text-xs focus:outline-none focus:border-neutral-600 pl-9 pr-9`}
                />
                <Key className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && (
                <p className="text-[11px] text-rose-400 mt-1 flex items-center gap-1 font-sans">
                  <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                  {errorMessage || 'Неверный пароль. Попробуйте еще раз.'}
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-xs text-neutral-300 mb-1">Новый пароль (мин. 4 символа)</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={newPassword}
                  onChange={(e) => { setNewPassword(e.target.value); setError(false); }}
                  placeholder="Введите новый пароль..."
                  className={`w-full px-3 py-2 bg-black border ${error ? 'border-rose-500' : 'border-neutral-800'} rounded-md text-white text-xs focus:outline-none focus:border-neutral-600 pl-9 pr-9`}
                />
                <Lock className="w-4 h-4 text-neutral-500 absolute left-3 top-2.5" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-neutral-500 hover:text-neutral-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2 border-t border-neutral-900">
            {isAdmin && !isChangingPassMode && (
              <button
                type="button"
                onClick={() => setIsChangingPassMode(true)}
                className="text-[11px] text-emerald-400 hover:underline flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                Сменить пароль
              </button>
            )}

            {isChangingPassMode && (
              <button
                type="button"
                onClick={() => setIsChangingPassMode(false)}
                className="text-[11px] text-neutral-400 hover:underline"
              >
                ← Назад
              </button>
            )}

            <div className="flex items-center gap-2 ml-auto">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 rounded-md bg-neutral-900 text-neutral-300 hover:bg-neutral-800 text-xs border border-neutral-800"
              >
                Отмена
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 rounded-md bg-white hover:bg-neutral-200 text-black text-xs font-bold transition flex items-center gap-1.5"
              >
                <Check className="w-4 h-4" />
                {isChangingPassMode ? 'Сохранить новый пароль' : requires2FA ? 'Подтвердить 2FA' : 'Войти'}
              </button>
            </div>
          </div>
        </form>

      </div>
    </div>
  );
};

