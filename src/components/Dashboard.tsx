import { useState, useEffect } from 'react';
import TemplatesPage from './TemplatesPage';
import WritingSpace from './WritingSpace';

interface DashboardProps {
  userName?: string;
  userEmail?: string;
  onLogout: () => void;
}

interface Toast {
  id: number;
  type: 'success' | 'assistant' | 'warning' | 'error';
  title: string;
  message: string;
}

export default function Dashboard({ userName = 'Mélanie', userEmail, onLogout }: DashboardProps) {
  // Navigation states
  const [activeMenu, setActiveMenu] = useState('Modèles');
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);

  // Gamification & Progression interactive states
  const [challenge1Checked, setChallenge1Checked] = useState(false);
  const [challenge2Checked, setChallenge2Checked] = useState(true);
  
  // Calculate dynamic XP
  const baseXP = 12100;
  const challenge1XP = 200;
  const challenge2XP = 150;
  const currentXP = baseXP + (challenge1Checked ? challenge1XP : 0) + (challenge2Checked ? challenge2XP : 0);
  const targetXP = 15000;
  const xpPercentage = Math.round((currentXP / targetXP) * 100);

  // Toast notifications state
  const [toasts, setToasts] = useState<Toast[]>([]);
  
  // Chart interaction state
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(null);

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowProfileDropdown(false);
    };
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  // Add toast helper
  const addToast = (type: Toast['type'], title: string, message: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    // Auto-remove after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Trigger initial helper notification on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      addToast(
        'assistant',
        'Suggestion de l\'assistant',
        'Une reformulation est disponible pour votre introduction de thèse.'
      );
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleCheckbox1Change = () => {
    const nextState = !challenge1Checked;
    setChallenge1Checked(nextState);
    if (nextState) {
      addToast('success', 'Défi complété !', `Vous avez obtenu +${challenge1XP} XP pour l'écriture de 500 mots.`);
    }
  };

  const handleCheckbox2Change = () => {
    const nextState = !challenge2Checked;
    setChallenge2Checked(nextState);
    if (nextState) {
      addToast('success', 'Défi complété !', `Vous avez obtenu +${challenge2XP} XP pour la lecture de 3 articles.`);
    }
  };

  const handleFABClick = () => {
    addToast(
      'assistant',
      'Action rapide activée',
      'Création d\'un espace de réflexion temporaire pour vos notes de recherche.'
    );
  };

  const handleUseTemplate = (templateName: string) => {
    addToast('success', 'Modèle activé', `Le modèle "${templateName}" a été chargé dans votre espace d'écriture.`);
  };

  const handleConsultGuide = () => {
    addToast('assistant', 'Guide d\'utilisation', 'Ouverture du guide méthodologique...');
  };

  const handleContactExpert = () => {
    addToast('assistant', 'Expertise académique', 'Connexion avec un expert en méthodologie de recherche...');
  };

  // Mock bar chart data
  const writingData = [
    { day: 'Lun', words: 350 },
    { day: 'Mar', words: 520 },
    { day: 'Mer', words: 210 },
    { day: 'Jeu', words: 890, highlight: true },
    { day: 'Ven', words: 1200 },
    { day: 'Sam', words: 450 },
    { day: 'Dim', words: 710 },
  ];

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#F8FAFB] text-[#2F4858] font-sans select-none antialiased">
      
      {/* SIDEBAR */}
      <aside className={`w-[260px] flex-shrink-0 bg-white border-r border-[#E5E9EB] flex flex-col justify-between p-6 max-lg:hidden shadow-[0_0_15px_rgba(0,0,0,0.02)] transition-all duration-300 ${isFocusMode ? 'w-0 opacity-0 !p-0 border-none overflow-hidden pointer-events-none' : ''}`}>
        <div className="flex flex-col gap-8">
          {/* Logo Section */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2.5">
              <div className="bg-[#EAF3DE] p-2 rounded-lg border border-[#94D2B8]/30 flex items-center justify-center">
                {/* Logo Icon */}
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" className="stroke-[#3E6976]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5" />
                  <path d="M2 12l10 5 10-5" />
                </svg>
              </div>
            <span className="font-brand text-[1.4rem] font-bold text-[#2F4858] tracking-tight leading-none flex items-center gap-1.5">
              MemoFlow
            </span>
          </div>
          <span className="text-[0.68rem] uppercase tracking-wider text-slate-400 font-bold font-brand pl-0.5">
            Espace Académique
          </span>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-1.5">
          {[
            { name: 'Ma Progression', icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="20" x2="18" y2="10" />
                <line x1="12" y1="20" x2="12" y2="4" />
                <line x1="6" y1="20" x2="6" y2="14" />
              </svg>
            )},
            { name: 'Modèles', icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 17 12 22 22 17" />
                <path d="M2 12 12 17 22 12" />
                <path d="M12 2 2 7 12 12 22 7Z" />
              </svg>
            )},
            { name: "Espace d'Écriture", icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 20h9" />
                <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
              </svg>
            )},
            { name: 'Centre de Contexte', icon: (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z" />
                <path d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z" />
                <line x1="9" y1="6" x2="15" y2="6" />
                <line x1="9" y1="12" x2="15" y2="12" />
                <line x1="9" y1="18" x2="15" y2="18" />
              </svg>
            )},
          ].map((item) => {
              const isActive = activeMenu === item.name;
              return (
                <button
                  key={item.name}
                  onClick={() => setActiveMenu(item.name)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-brand text-[0.88rem] font-semibold transition-all duration-200 cursor-pointer border-none ${
                    isActive
                      ? 'bg-[#EAF3DE]/70 text-[#2F4858] border border-solid border-[#94D2B8]/20 shadow-[0_2px_8px_rgba(148,210,184,0.08)]'
                      : 'bg-transparent text-slate-500 hover:text-[#2F4858] hover:bg-[#F8FAFB]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={isActive ? 'text-[#3E6976]' : 'text-slate-400'}>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <span className="w-1.5 h-1.5 bg-[#518B91] rounded-full shadow-[0_0_6px_rgba(81,139,145,0.4)]"></span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => addToast('assistant', 'Nouveau Workspace', 'Création d\'un espace de travail collaboratif...')}
            className="w-full bg-[#2F4858] hover:bg-[#3E6976] text-white font-brand text-[0.88rem] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-slate-200 border-none active:scale-[0.98]"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Nouveau Workspace</span>
          </button>

          <div className="h-[1px] bg-slate-200/70 my-1"></div>

          <div className="flex flex-col gap-1">
            <button 
              onClick={() => addToast('assistant', 'Paramètres', 'Ouverture de l\'onglet de configuration.')}
              className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-[#2F4858] text-[0.85rem] font-semibold rounded-lg hover:bg-slate-100/50 cursor-pointer border-none bg-transparent text-left"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
              </svg>
              <span>Paramètres</span>
            </button>
            
            <a 
              href="#help" 
              className="w-full flex items-center gap-3 px-3 py-2 text-slate-500 hover:text-[#2F4858] text-[0.85rem] font-semibold rounded-lg hover:bg-slate-100/50 cursor-pointer text-decoration-none"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <span>Aide</span>
            </a>
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">
        
        {/* HEADER */}
        {activeMenu !== "Espace d'Écriture" && (
          <header className="h-[76px] px-8 flex-shrink-0 border-b border-[#E5E9EB] bg-white flex justify-between items-center z-20 max-sm:px-4 shadow-[0_1px_4px_rgba(0,0,0,0.01)]">
          {/* Search bar */}
          <div className="relative w-[340px] max-md:w-[200px] max-sm:hidden">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Rechercher un modèle..."
              className="w-full pl-10 pr-4 py-2 text-[0.88rem] bg-[#F1F5F7] border border-[#E5E9EB] rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#518B91] focus:ring-1 focus:ring-[#518B91]/35 transition-all duration-200"
            />
          </div>
          <div className="hidden max-sm:flex items-center gap-2">
            {/* Small Logo for Mobile */}
            <div className="bg-[#EAF3DE] p-1.5 rounded-lg border border-[#94D2B8]/30">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="stroke-[#3E6976]" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z" />
              </svg>
            </div>
            <span className="font-brand font-bold text-[#2F4858] tracking-tight">MemoFlow</span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            <button 
              onClick={() => addToast('success', 'Document créé', 'Un nouveau document a été généré dans votre espace.')}
              className="bg-[#2F4858] hover:bg-[#3E6976] text-white font-brand text-[0.82rem] font-bold px-4 py-2 rounded-xl transition-all cursor-pointer border-none shadow-[0_2px_8px_rgba(47,72,88,0.12)] active:scale-[0.97]"
            >
              Nouveau Document
            </button>

            {/* Notification button */}
            <button 
              onClick={() => addToast('assistant', 'Notification', 'Vous n\'avez pas de nouvelles notifications.')}
              className="relative p-2 text-slate-500 hover:text-[#2F4858] hover:bg-slate-100 rounded-xl transition-all cursor-pointer border-none bg-transparent"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#518B91] rounded-full ring-2 ring-white animate-pulse"></span>
            </button>

            <div className="h-6 w-[1px] bg-slate-200"></div>

            {/* Profile widget */}
            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileDropdown(!showProfileDropdown);
                }}
                className="flex items-center gap-3.5 pl-2 pr-1.5 py-1 rounded-xl bg-slate-50 hover:bg-slate-100 border border-[#E5E9EB] transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full overflow-hidden bg-[#94D2B8]/30 border border-[#94D2B8]/40 flex items-center justify-center text-[#2F4858] font-bold text-sm">
                  {userName.charAt(0)}
                </div>
                <div className="text-left max-sm:hidden">
                  <p className="text-[0.82rem] font-bold text-[#2F4858] leading-tight">{userName}</p>
                  <p className="text-[0.68rem] text-slate-500 leading-none font-medium">Mélanie (Vous)</p>
                </div>
                <span className="text-slate-400 max-sm:hidden">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9" />
                  </svg>
                </span>
              </button>

              {/* Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-[#E5E9EB] rounded-xl shadow-xl z-50 py-1.5 animate-fade-in">
                  <div className="px-4 py-2 border-b border-slate-100">
                    <p className="text-[0.8rem] text-slate-400 font-medium">Identifiant :</p>
                    <p className="text-[0.72rem] text-[#518B91] truncate font-semibold">{userEmail || 'melanie@memoflow.edu'}</p>
                  </div>
                  <button
                    onClick={() => {
                      addToast('assistant', 'Mon Compte', 'Accès aux paramètres du profil...');
                    }}
                    className="w-full text-left px-4 py-2 text-[0.82rem] text-slate-700 hover:bg-slate-50 hover:text-[#2F4858] transition-all cursor-pointer border-none bg-transparent flex items-center gap-2.5"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                    <span>Mon Profil</span>
                  </button>
                  <button
                    onClick={onLogout}
                    className="w-full text-left px-4 py-2 text-[0.82rem] text-red-500 hover:bg-red-50/10 hover:text-red-600 transition-all cursor-pointer border-none bg-transparent flex items-center gap-2.5"
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                    <span>Se déconnecter</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        )}

        {/* CONTENT SPACE */}
        <main className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-300 ${
          activeMenu === "Espace d'Écriture" ? 'p-0 overflow-hidden bg-white' : 'p-8 max-sm:p-4 max-sm:pb-24'
        }`}>
          {activeMenu === 'Modèles' && (
            <TemplatesPage
              onUseTemplate={handleUseTemplate}
              onConsultGuide={handleConsultGuide}
              onContactExpert={handleContactExpert}
            />
          )}

          {activeMenu === "Espace d'Écriture" && (
            <WritingSpace
              isFocusMode={isFocusMode}
              onToggleFocusMode={setIsFocusMode}
              userName={userName}
              userEmail={userEmail}
            />
          )}

          {activeMenu === 'Centre de Contexte' && (
            <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in bg-white border border-[#E5E9EB] rounded-2xl p-8 shadow-[0_4px_20px_rgba(47,72,88,0.02)] m-8">
              <div className="bg-[#EAF3DE] p-4 rounded-full mb-4 border border-[#94D2B8]/30 flex items-center justify-center">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3E6976" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="16" x2="12" y2="12" />
                  <line x1="12" y1="8" x2="12.01" y2="8" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-[#2F4858] font-brand mb-1">Espace en cours de développement</h3>
              <p className="text-sm text-slate-500 max-w-[400px] leading-relaxed font-medium">Cette section sera disponible très prochainement pour compléter votre flux de travail académique.</p>
            </div>
          )}

          {activeMenu === 'Ma Progression' && (
            <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-6">
              
              {/* LEFT SECTION (Progression + Timeline + Bar Charts) */}
              <div className="col-span-8 flex flex-col gap-6 max-lg:col-span-12">
              
              {/* CURRENT LEVEL CARD */}
              <div className="bg-white border border-[#E5E9EB] rounded-xl p-6 relative overflow-hidden shadow-[0_4px_20px_rgba(47,72,88,0.04)] hover:border-[#94D2B8]/40 transition-all duration-300">
                {/* Background accent icon */}
                <div className="absolute right-6 bottom-[-20px] opacity-[0.02] text-[#2F4858]">
                  <svg width="160" height="160" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="8" r="7" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                </div>

                <div className="flex flex-col gap-4">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col">
                      <span className="text-[0.68rem] font-bold text-slate-400 tracking-wider uppercase">
                        Niveau Actuel : 24
                      </span>
                      <h2 className="text-[1.75rem] font-bold text-[#2F4858] tracking-tight mt-1">
                        Architecte de Thèse
                      </h2>
                    </div>
                    <div className="text-right">
                      <span className="text-[0.8rem] font-semibold text-slate-500">
                        <strong className="text-[#2F4858] text-[1.1rem] font-bold">{currentXP.toLocaleString()}</strong> / {targetXP.toLocaleString()} XP
                      </span>
                    </div>
                  </div>

                  {/* Progress bar container */}
                  <div className="relative">
                    <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-gradient-to-r from-[#518B91] to-[#94D2B8] rounded-full transition-all duration-700 ease-out shadow-[0_0_8px_rgba(148,210,184,0.3)]"
                        style={{ width: `${xpPercentage}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between text-[0.68rem] text-slate-400 mt-2 font-medium">
                      <span>{currentXP.toLocaleString()} XP</span>
                      <span>{targetXP - currentXP} XP pour le niveau Master</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* QUEST ROADMAP */}
              <div className="bg-white border border-[#E5E9EB] rounded-xl p-6 shadow-[0_4px_20px_rgba(47,72,88,0.04)]">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex flex-col">
                    <span className="text-[0.68rem] font-bold text-slate-400 tracking-wider uppercase">Feuille de Route</span>
                    <h3 className="text-[1.1rem] font-bold text-[#2F4858] tracking-tight mt-0.5">
                      Mémoire de Master en Linguistique Neurologique
                    </h3>
                  </div>
                  <button 
                    onClick={() => addToast('assistant', 'Feuille de Route', 'Ajustement de l\'itinéraire de recherche en cours...')}
                    className="bg-transparent border border-slate-200 hover:border-slate-300 text-slate-600 hover:text-[#2F4858] px-3.5 py-1.5 rounded-lg text-[0.75rem] font-semibold cursor-pointer transition-all active:scale-[0.98]"
                  >
                    Ajuster la feuille de route
                  </button>
                </div>

                {/* Timeline Nodes */}
                <div className="relative pl-10 flex flex-col gap-8">
                  
                  {/* Timeline vertical bar */}
                  <div className="absolute left-[19px] top-4 bottom-4 w-[2px] bg-slate-100"></div>

                  {/* Node 1: Completed */}
                  <div className="relative flex gap-5 items-start group">
                    <div className="absolute left-[-30px] w-[20px] h-[20px] rounded-full bg-[#EAF3DE] border-2 border-[#639922] flex items-center justify-center text-[#639922] z-10">
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    
                    <div className="flex-1 bg-white border border-[#E5E9EB] rounded-xl p-4 hover:border-slate-300 transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                      <div className="flex justify-between items-start">
                        <h4 className="text-[0.88rem] font-bold text-[#2F4858]">Revue de Littérature</h4>
                        <span className="text-[0.68rem] font-bold uppercase text-[#639922] bg-[#EAF3DE] px-2 py-0.5 rounded-md border border-[#639922]/20">Terminé</span>
                      </div>
                      <p className="text-[0.78rem] text-slate-500 mt-1 leading-relaxed font-medium">
                        142 sources indexées • Synthèse complète
                      </p>
                    </div>
                  </div>

                  {/* Node 2: Active */}
                  <div className="relative flex gap-5 items-start group">
                    <div className="absolute left-[-33px] w-[26px] h-[26px] rounded-full bg-[#EAF3DE] border-2 border-[#518B91] flex items-center justify-center text-[#518B91] z-10 shadow-md">
                      {/* Brain/Gear SVG */}
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                        <path d="M12 6v6l4 2" />
                      </svg>
                    </div>
                    
                    <div className="flex-1 bg-[#EAF3DE]/35 border border-[#94D2B8]/40 rounded-xl p-5 hover:border-[#94D2B8]/60 transition-all duration-300 relative shadow-[0_4px_12px_rgba(148,210,184,0.05)]">
                      <div className="flex justify-between items-start">
                        <h4 className="text-[0.88rem] font-bold text-[#2F4858]">Conception de la Méthodologie</h4>
                        <span className="text-[0.68rem] font-bold uppercase text-[#518B91] bg-white px-2 py-0.5 rounded-md tracking-wider border border-[#518B91]/25 animate-pulse-slow shadow-sm">
                          En cours
                        </span>
                      </div>
                      <p className="text-[0.78rem] text-slate-700 mt-1.5 leading-relaxed font-medium">
                        Conception du protocole EEG et critères de sélection des sujets
                      </p>
                      
                      {/* Active progress bar inside card */}
                      <div className="mt-4">
                        <div className="flex justify-between text-[0.68rem] text-slate-500 mb-1 font-semibold">
                          <span>Avancement</span>
                          <span className="text-[#518B91]">65%</span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-200/60 rounded-full overflow-hidden">
                          <div className="h-full bg-[#518B91] rounded-full" style={{ width: '65%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Node 3: Locked */}
                  <div className="relative flex gap-5 items-start opacity-60 group">
                    <div className="absolute left-[-29px] w-[18px] h-[18px] rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-400 z-10">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                        <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                      </svg>
                    </div>
                    
                    <div className="flex-1 bg-slate-50/50 border border-slate-200/60 rounded-xl p-4 hover:border-slate-200 transition-all duration-300">
                      <h4 className="text-[0.88rem] font-bold text-slate-500">Collecte de Données</h4>
                      <p className="text-[0.78rem] text-slate-400 mt-1 leading-relaxed">
                        Verrouillé jusqu'à la finalisation de la méthodologie
                      </p>
                    </div>
                  </div>

                  {/* Node 4: Locked */}
                  <div className="relative flex gap-5 items-start opacity-60 group">
                    <div className="absolute left-[-29px] w-[18px] h-[18px] rounded-full bg-slate-100 border-2 border-slate-300 flex items-center justify-center text-slate-400 z-10">
                      <svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                    </div>
                    
                    <div className="flex-1 bg-slate-50/50 border border-slate-200/60 rounded-xl p-4 hover:border-slate-200 transition-all duration-300">
                      <h4 className="text-[0.88rem] font-bold text-slate-500">Soutenance Finale</h4>
                      <p className="text-[0.78rem] text-slate-400 mt-1 leading-relaxed">
                        Date d'achèvement estimée : Mai 2024
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* BOTTOM DOUBLE ROW CARDS */}
              <div className="grid grid-cols-2 gap-6 max-sm:grid-cols-1">
                
                {/* WRITING VOLUME BAR CHART */}
                <div className="bg-white border border-[#E5E9EB] rounded-xl p-6 shadow-[0_4px_20px_rgba(47,72,88,0.04)]">
                  <div className="flex justify-between items-start mb-6">
                    <div className="flex flex-col">
                      <span className="text-[0.68rem] font-bold text-slate-400 tracking-wider uppercase">7 Derniers Jours</span>
                      <h3 className="text-[0.98rem] font-bold text-[#2F4858] tracking-tight mt-0.5">
                        Volume d'Écriture
                      </h3>
                    </div>
                    <span className="text-[0.65rem] text-slate-500 font-bold px-2 py-0.5 rounded bg-slate-100">Mots</span>
                  </div>

                  {/* CSS bar chart */}
                  <div className="h-32 flex items-end justify-between gap-2.5 px-2 pt-6 relative">
                    {/* Horizontal gridlines */}
                    <div className="absolute left-0 right-0 bottom-0 h-[1px] bg-slate-100"></div>
                    <div className="absolute left-0 right-0 bottom-1/2 h-[1px] bg-slate-100/70 border-dashed"></div>
                    <div className="absolute left-0 right-0 bottom-[100%] h-[1px] bg-slate-100/40"></div>

                    {writingData.map((bar, idx) => {
                      const maxWords = 1200;
                      const percentage = (bar.words / maxWords) * 100;
                      const isHovered = hoveredBarIndex === idx;
                      
                      return (
                        <div 
                          key={bar.day} 
                          className="flex-1 flex flex-col items-center gap-2 group relative cursor-pointer"
                          onMouseEnter={() => setHoveredBarIndex(idx)}
                          onMouseLeave={() => setHoveredBarIndex(null)}
                        >
                          {/* Tooltip on hover */}
                          {isHovered && (
                            <div className="absolute bottom-full mb-1.5 bg-[#2F4858] border border-slate-700 text-white text-[0.68rem] px-2 py-1 rounded shadow-lg z-20 pointer-events-none whitespace-nowrap animate-fade-in font-semibold">
                              {bar.words} mots
                            </div>
                          )}

                          {/* Bar Fill */}
                          <div 
                            className={`w-full rounded-t-[4px] transition-all duration-300 ease-out origin-bottom ${
                              bar.highlight
                                ? 'bg-[#94D2B8] shadow-[0_0_8px_rgba(148,210,184,0.25)]'
                                : isHovered ? 'bg-[#518B91]' : 'bg-[#E5E9EB]'
                            }`}
                            style={{ height: `${percentage}%` }}
                          ></div>
                          
                          <span className={`text-[0.68rem] font-bold transition-all ${
                            bar.highlight || isHovered ? 'text-[#2F4858]' : 'text-slate-400'
                          }`}>
                            {bar.day}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* FOCUS EFFICIENCY */}
                <div className="bg-white border border-[#E5E9EB] rounded-xl p-6 shadow-[0_4px_20px_rgba(47,72,88,0.04)] flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div className="flex flex-col">
                      <span className="text-[0.68rem] font-bold text-slate-400 tracking-wider uppercase">Mesures de concentration</span>
                      <h3 className="text-[0.98rem] font-bold text-[#2F4858] tracking-tight mt-0.5">
                        Efficacité de Concentration
                      </h3>
                    </div>
                    <span className="p-1.5 rounded-lg bg-[#518B91]/10 text-[#518B91]">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polygon points="12 2 2 7 12 12 22 7 12 2 12 2" />
                        <polyline points="2 17 12 22 22 17" />
                        <polyline points="2 12 12 17 22 12" />
                      </svg>
                    </span>
                  </div>

                  <div className="my-6">
                    <h2 className="text-[3.2rem] font-extrabold text-[#2F4858] tracking-tight leading-none">
                      88%
                    </h2>
                    <p className="text-[0.78rem] text-slate-500 mt-2 flex items-center gap-1.5 font-semibold">
                      <span className="text-[#639922] bg-[#EAF3DE] px-1.5 py-0.5 rounded flex items-center font-bold text-[0.7rem] border border-[#639922]/10">
                        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5" className="mr-0.5">
                          <polyline points="18 15 12 9 6 15" />
                        </svg>
                        +12%
                      </span> 
                      par rapport à la semaine dernière
                    </p>
                  </div>

                  {/* Micro timeline summary */}
                  <div className="h-[3px] w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-[#94D2B8] rounded-full w-[88%]"></div>
                  </div>
                </div>

              </div>

            </div>

            {/* RIGHT SECTION (Streak + Leaderboard + Daily Challenges) */}
            <div className="col-span-4 flex flex-col gap-6 max-lg:col-span-12">
              
              {/* 12 DAY STREAK */}
              <div className="bg-white border border-[#E5E9EB] rounded-xl p-6 shadow-[0_4px_20px_rgba(47,72,88,0.04)] flex flex-col items-center justify-center text-center relative overflow-hidden">
                {/* Fire Animation Effect */}
                <div className="relative mb-3 flex items-center justify-center">
                  <div className="absolute w-12 h-12 bg-[#94D2B8]/10 rounded-full blur-md animate-pulse"></div>
                  <div className="text-[#94D2B8] animate-pulse-slow">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor" className="stroke-none">
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 0 1-2.827 0l-4.244-4.243a8 8 0 1 1 11.314 0z" />
                      <path d="M15 11a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                    </svg>
                  </div>
                </div>

                <h3 className="text-[2.2rem] font-bold text-[#2F4858] tracking-tight leading-none mb-1">
                  12
                </h3>
                <span className="text-[0.72rem] font-bold text-slate-400 tracking-wider uppercase mb-4">
                  Jours Consécutifs
                </span>

                {/* Day status indicator dots */}
                <div className="flex gap-2">
                  {[true, true, true, true, false].map((active, i) => (
                    <span 
                      key={i} 
                      className={`w-2 h-2 rounded-full transition-all ${
                        active 
                          ? 'bg-[#94D2B8] shadow-[0_0_6px_rgba(148,210,184,0.4)]' 
                          : 'bg-slate-200 border border-slate-300/30'
                      }`}
                    ></span>
                  ))}
                </div>
              </div>

              {/* FRIENDS LEADERBOARD */}
              <div className="bg-white border border-[#E5E9EB] rounded-xl p-6 shadow-[0_4px_20px_rgba(47,72,88,0.04)]">
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[#518B91]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <h3 className="text-[0.98rem] font-bold text-[#2F4858] tracking-tight">
                    Classement des Amis
                  </h3>
                </div>

                {/* Leaderboard list */}
                <div className="flex flex-col gap-3">
                  {[
                    { rank: 1, name: userName, xp: currentXP, isSelf: true, avatar: userName.charAt(0) },
                    { rank: 2, name: 'Alexandre R.', xp: 11920, isSelf: false, avatar: 'A' },
                    { rank: 3, name: 'Sarah Chen', xp: 10500, isSelf: false, avatar: 'S' },
                    { rank: 4, name: 'Thomas V.', xp: 9840, isSelf: false, avatar: 'T' },
                  ].map((friend) => (
                    <div 
                      key={friend.name}
                      className={`flex items-center justify-between p-2.5 rounded-xl transition-all ${
                        friend.isSelf 
                          ? 'bg-[#EAF3DE]/40 border border-[#94D2B8]/40 text-[#2F4858] shadow-[0_2px_8px_rgba(148,210,184,0.05)]' 
                          : 'bg-[#F8FAFB] border border-slate-100 hover:border-slate-200 text-slate-600'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className={`text-[0.8rem] font-bold w-4 text-center ${
                          friend.rank === 1 ? 'text-[#3E6976]' : 'text-slate-400'
                        }`}>
                          {friend.rank}
                        </span>
                        
                        {/* Avatar */}
                        <div className={`w-7.5 h-7.5 rounded-full flex items-center justify-center font-bold text-xs ${
                          friend.isSelf 
                            ? 'bg-[#94D2B8]/30 border border-[#94D2B8]/50 text-[#2F4858]' 
                            : 'bg-slate-200 border border-slate-300 text-slate-500'
                        }`}>
                          {friend.avatar}
                        </div>
                        
                        <span className={`text-[0.82rem] font-bold truncate max-w-[110px] ${
                          friend.isSelf ? 'text-[#2F4858]' : ''
                        }`}>
                          {friend.name} {friend.isSelf ? '(Vous)' : ''}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 font-bold text-[0.8rem]">
                        <span className="text-[#3E6976]">{friend.xp.toLocaleString()} <span className="text-[0.62rem] text-slate-400 font-medium">XP</span></span>
                        {friend.isSelf && (
                          <span className="text-[#518B91]">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                              <polyline points="18 15 12 9 6 15" />
                            </svg>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button 
                  onClick={() => addToast('assistant', 'Classement', 'Ouverture du classement général de la ligue...')}
                  className="w-full mt-4 bg-white hover:bg-slate-50 border border-solid border-slate-200 text-slate-700 hover:text-[#2F4858] py-2 rounded-xl text-[0.78rem] font-bold transition-all cursor-pointer text-center active:scale-[0.98]"
                >
                  Voir le classement général
                </button>
              </div>

              {/* DAILY CHALLENGES */}
              <div className="bg-white border border-[#E5E9EB] rounded-xl p-6 shadow-[0_4px_20px_rgba(47,72,88,0.04)]">
                <div className="flex items-center justify-between mb-5">
                  <span className="text-[0.68rem] font-bold text-slate-400 tracking-wider uppercase">
                    Défis Quotidiens
                  </span>
                  <span className="text-[0.65rem] text-slate-400 font-bold">Réinitialisation dans 12h</span>
                </div>

                <div className="flex flex-col gap-4">
                  {/* Challenge 1 */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-[0.82rem] font-semibold leading-tight ${challenge1Checked ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        Écrire 500 mots
                      </span>
                      <span className="text-[0.7rem] text-[#518B91] font-bold">Récompense : +200 XP</span>
                    </div>
                    <button 
                      onClick={handleCheckbox1Change}
                      className={`flex-shrink-0 w-5 h-5 rounded-full border border-solid flex items-center justify-center transition-all cursor-pointer ${
                        challenge1Checked 
                          ? 'bg-[#94D2B8] border-[#94D2B8] text-[#0f4c3a]' 
                          : 'border-slate-300 hover:border-[#518B91] bg-transparent'
                      }`}
                    >
                      {challenge1Checked && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  </div>

                  <div className="h-[1px] bg-slate-100"></div>

                  {/* Challenge 2 */}
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-0.5">
                      <span className={`text-[0.82rem] font-semibold leading-tight ${challenge2Checked ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                        Lire 3 articles de recherche
                      </span>
                      <span className="text-[0.7rem] text-[#518B91] font-bold">Récompense : +150 XP</span>
                    </div>
                    <button 
                      onClick={handleCheckbox2Change}
                      className={`flex-shrink-0 w-5 h-5 rounded-full border border-solid flex items-center justify-center transition-all cursor-pointer ${
                        challenge2Checked 
                          ? 'bg-[#94D2B8] border-[#94D2B8] text-[#0f4c3a]' 
                          : 'border-slate-300 hover:border-[#518B91] bg-transparent'
                      }`}
                    >
                      {challenge2Checked && (
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

            </div>

          </div>
          )}
        </main>
      </div>

      {/* FLOATING ACTION BUTTON */}
      <button 
        onClick={handleFABClick}
        className="fixed bottom-6 right-6 w-12 h-12 rounded-full bg-[#94D2B8] hover:bg-[#C4F4C7] text-[#0F4C3A] flex items-center justify-center shadow-lg shadow-[#94D2B8]/20 border-none cursor-pointer transition-all duration-300 hover:scale-105 active:scale-95 z-40"
        aria-label="Assistant rapide"
      >
        {/* Lightning bolt svg */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
      </button>

      {/* TOAST CONTAINER */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 max-w-[420px] max-sm:left-4 max-sm:right-4">
        {toasts.map((toast) => {
          // Color styles from the semantic guidelines (Page 5)
          let barBg = 'bg-[#518B91]';
          let icon = (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="12 2 2 7 12 12 22 7 12 2 12 2" />
            </svg>
          );

          if (toast.type === 'success') {
            barBg = 'bg-[#639922]'; // success text color from style guide
            icon = (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#639922" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            );
          } else if (toast.type === 'assistant') {
            barBg = 'bg-[#518B91]';
            icon = (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#518B91" strokeWidth="2.5">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
            );
          } else if (toast.type === 'warning') {
            barBg = 'bg-[#BA7517]';
            icon = (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#BA7517" strokeWidth="2.5">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            );
          } else if (toast.type === 'error') {
            barBg = 'bg-[#E24B4A]';
            icon = (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E24B4A" strokeWidth="2.5">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            );
          }

          return (
            <div 
              key={toast.id}
              className="bg-white border border-[#E5E9EB] rounded-xl shadow-xl flex overflow-hidden animate-fade-in relative transition-all duration-300"
            >
              {/* Left Color Indicator Bar */}
              <div className={`w-1.5 flex-shrink-0 ${barBg}`}></div>
              
              <div className="p-4 flex gap-3.5 items-start">
                <div className="bg-slate-50 p-2 rounded-lg flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                
                <div className="text-left flex-1">
                  <h5 className="text-[0.82rem] font-bold text-[#2F4858]">{toast.title}</h5>
                  <p className="text-[0.75rem] text-slate-500 mt-0.5 leading-relaxed font-medium">{toast.message}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
