import { useState, useEffect, useCallback } from 'react';
import TemplatesPage from './TemplatesPage';
import WritingSpace from './WritingSpace';
import ContextCenter from './ContextCenter';
import ConnectorsManager from './ConnectorsManager';
import ProgressionPage from './ProgressionPage';
import SettingsPage from './SettingsPage';
import EmailVerificationBanner from './EmailVerificationBanner';
import BrandLogo from './BrandLogo';
import Link from './Link';
import { ROUTES, navigate as goTo } from '../services/router';
import { apiFetch } from '../services/api';
import type { DocumentResponseDto, UserResponseDto } from '../services/api';

interface DashboardProps {
  /** Current URL: decides the page shown (see ROUTES) */
  path: string;
  /** null when browsing as a guest (nothing is saved) */
  user: UserResponseDto | null;
  userName: string;
  onLogout: () => void;
  onRequestLogin: () => void;
  onRequestSignup: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

interface Toast {
  id: number;
  type: 'success' | 'assistant' | 'warning' | 'error';
  title: string;
  message: string;
}

export interface TemplateChoice {
  id: string;
  title: string;
  docType: string;
}

const MENU_PROGRESS = 'Ma Progression';
const MENU_TEMPLATES = 'Modèles';
const MENU_WRITING = "Espace d'Écriture";
const MENU_CONTEXT = 'Centre de Contexte';
const MENU_SETTINGS = 'Paramètres';

const settingsIcon = (size: number) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const NAV_ITEMS = [
  { name: MENU_PROGRESS, short: 'Progression', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </svg>
  )},
  { name: MENU_TEMPLATES, short: 'Modèles', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 17 12 22 22 17" />
      <path d="M2 12 12 17 22 12" />
      <path d="M12 2 2 7 12 12 22 7Z" />
    </svg>
  )},
  { name: MENU_WRITING, short: 'Écriture', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" />
      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
    </svg>
  )},
  { name: MENU_CONTEXT, short: 'Contexte', icon: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z" />
      <path d="M6 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3z" />
      <line x1="9" y1="6" x2="15" y2="6" />
      <line x1="9" y1="12" x2="15" y2="12" />
      <line x1="9" y1="18" x2="15" y2="18" />
    </svg>
  )},
];

const MOBILE_NAV_ITEMS = [...NAV_ITEMS, { name: MENU_SETTINGS, short: 'Paramètres', icon: settingsIcon(18) }];

// Each page has its own URL
const MENU_PATHS: Record<string, string> = {
  [MENU_PROGRESS]: ROUTES.progression,
  [MENU_TEMPLATES]: ROUTES.templates,
  [MENU_WRITING]: ROUTES.writing,
  [MENU_CONTEXT]: ROUTES.context,
  [MENU_SETTINGS]: ROUTES.settings,
};

function menuForPath(path: string): string {
  if (path === ROUTES.connectors) return MENU_CONTEXT;
  return Object.keys(MENU_PATHS).find((menu) => MENU_PATHS[menu] === path) ?? MENU_WRITING;
}

export default function Dashboard({
  path,
  user,
  userName,
  onLogout,
  onRequestLogin,
  onRequestSignup,
  onOpenPrivacy,
  onOpenTerms,
}: DashboardProps) {
  const isGuest = user === null;

  // Navigation states
  const activeMenu = menuForPath(path);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const contextTab: 'cadrage' | 'connectors' = path === ROUTES.connectors ? 'connectors' : 'cadrage';

  // Documents API states
  const [documents, setDocuments] = useState<DocumentResponseDto[]>([]);
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);

  // Toast notifications state
  const [toasts, setToasts] = useState<Toast[]>([]);

  // Close profile dropdown on click outside
  useEffect(() => {
    const handleClickOutside = () => setShowProfileDropdown(false);
    window.addEventListener('click', handleClickOutside);
    return () => window.removeEventListener('click', handleClickOutside);
  }, []);

  const addToast = useCallback((type: Toast['type'], title: string, message: string) => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const fetchDocuments = useCallback(async () => {
    try {
      const list = (await apiFetch<DocumentResponseDto[]>('/documents')) || [];
      setDocuments(list);
      setSelectedDocumentId((current) =>
        current && list.some((d) => d.id === current) ? current : list[0]?.id ?? null
      );
    } catch (err) {
      console.error('Error fetching documents:', err);
    }
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchDocuments();
  }, [fetchDocuments]);

  const navigate = (menu: string) => {
    goTo(MENU_PATHS[menu]);
    setShowProfileDropdown(false);
  };

  const handleUseTemplate = async (template: TemplateChoice) => {
    try {
      const newDoc = await apiFetch<DocumentResponseDto>('/documents', {
        method: 'POST',
        body: JSON.stringify({
          title: `Nouveau document - ${template.title}`,
          docType: template.docType || 'thesis',
        }),
      });

      await apiFetch(`/templates/${template.id}/apply`, {
        method: 'POST',
        body: JSON.stringify({ documentId: newDoc.id }),
      });
      addToast('success', 'Modèle appliqué', `Le modèle "${template.title}" a été créé.`);

      await fetchDocuments();
      setSelectedDocumentId(newDoc.id);
      goTo(ROUTES.writing);
    } catch (err: unknown) {
      console.error('Error applying template:', err);
      addToast('error', 'Erreur', err instanceof Error ? err.message : 'Impossible de créer le document.');
    }
  };

  const handleCreateNewDocument = async () => {
    try {
      const newDoc = await apiFetch<DocumentResponseDto>('/documents', {
        method: 'POST',
        body: JSON.stringify({ title: 'Document sans titre', docType: 'thesis' }),
      });

      await apiFetch(`/documents/${newDoc.id}/sections`, {
        method: 'POST',
        body: JSON.stringify({ title: 'Introduction', content: '' }),
      });

      await fetchDocuments();
      setSelectedDocumentId(newDoc.id);
      goTo(ROUTES.writing);
      addToast(
        'success',
        'Document créé',
        isGuest ? 'Mode invité : ce document ne sera pas sauvegardé.' : 'Un nouveau document a été généré.'
      );
    } catch (err: unknown) {
      console.error('Error creating document:', err);
      addToast('error', 'Erreur', err instanceof Error ? err.message : 'Impossible de créer le document.');
    }
  };

  const sidebarLinkClass =
    'w-full flex items-center gap-3 px-3 py-2 text-[0.85rem] font-semibold rounded-lg cursor-pointer border-none bg-transparent text-left transition-all text-slate-500 hover:text-[#2F4858] hover:bg-slate-100/50';
  const dropdownItemClass =
    'w-full text-left px-4 py-2 text-[0.82rem] transition-all cursor-pointer border-none bg-transparent flex items-center gap-2.5 text-slate-700 hover:bg-slate-50 hover:text-[#2F4858]';

  return (
    <div className="flex h-screen w-screen overflow-hidden font-sans select-none antialiased transition-all duration-300 bg-[#F8FAFB] text-[#2F4858]">

      {/* SIDEBAR */}
      <aside className={`w-[260px] flex-shrink-0 flex flex-col justify-between p-6 max-lg:hidden shadow-[0_0_15px_rgba(0,0,0,0.02)] transition-all duration-300 bg-white border-r border-[#E5E9EB] ${
        isFocusMode ? 'w-0 opacity-0 !p-0 border-none overflow-hidden pointer-events-none' : ''
      }`}>
        <div className="flex flex-col gap-8">
          {/* Logo Section */}
          <div className="flex flex-col gap-1">
            <Link to={ROUTES.home} className="flex items-center gap-2.5 no-underline" aria-label="MemoFlow, accueil">
              <BrandLogo size={40} />
              <span className="font-brand text-[1.4rem] font-bold tracking-tight leading-none flex items-center gap-1.5 transition-colors text-[#2F4858]">
                MemoFlow
              </span>
            </Link>
            <span className="text-[0.68rem] uppercase tracking-wider text-slate-500 font-bold font-brand pl-0.5">
              Espace Académique
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            {NAV_ITEMS.map((item) => {
              const isActive = activeMenu === item.name;
              return (
                <Link
                  key={item.name}
                  to={MENU_PATHS[item.name]}
                  aria-current={isActive ? 'page' : undefined}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-brand text-[0.88rem] font-semibold transition-all duration-200 cursor-pointer border-none no-underline ${
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
                    <span className="w-1.5 h-1.5 rounded-full shadow-[0_0_6px_rgba(81,139,145,0.4)] bg-[#518B91]"></span>
                  )}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="flex flex-col gap-4">
          {isGuest && (
            <button
              onClick={onRequestSignup}
              className="w-full font-brand text-[0.88rem] font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all cursor-pointer border-none active:scale-[0.98] bg-[#2F4858] hover:bg-[#3E6976] text-white shadow-lg shadow-slate-200"
            >
              Créer un compte
            </button>
          )}

          <div className="h-[1px] my-1 transition-colors bg-slate-200/70"></div>

          <div className="flex flex-col gap-1">
            <Link
              to={ROUTES.settings}
              aria-current={activeMenu === MENU_SETTINGS ? 'page' : undefined}
              className={`${sidebarLinkClass} no-underline ${activeMenu === MENU_SETTINGS ? '!bg-[#EAF3DE]/70 !text-[#2F4858]' : ''}`}
            >
              {settingsIcon(16)}
              <span>Paramètres & Données</span>
            </Link>

            {onOpenPrivacy && (
              <button onClick={onOpenPrivacy} className={sidebarLinkClass}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>Confidentialité</span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* MAIN CONTAINER */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto custom-scrollbar">

        {/* GUEST BANNER */}
        {isGuest && !isFocusMode && (
          <div className="flex-shrink-0 flex items-center justify-between gap-4 px-8 py-2.5 bg-[#FAEEDA] border-b border-[#BA7517]/20 text-[#7A4D0F] max-sm:px-4 max-sm:flex-col max-sm:items-start max-sm:gap-2">
            <p className="text-[0.8rem] font-semibold leading-snug m-0">
              Mode invité : vos documents ne sont pas sauvegardés et seront perdus à la fermeture ou au rechargement de la page.
            </p>
            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={onRequestLogin}
                className="px-3 py-1.5 rounded-lg text-[0.75rem] font-bold bg-white text-[#2F4858] border border-solid border-[#BA7517]/25 hover:bg-slate-50 cursor-pointer transition-all"
              >
                Se connecter
              </button>
              <button
                onClick={onRequestSignup}
                className="px-3 py-1.5 rounded-lg text-[0.75rem] font-bold bg-[#2F4858] hover:bg-[#3E6976] text-white border-none cursor-pointer transition-all"
              >
                Créer un compte
              </button>
            </div>
          </div>
        )}

        {/* EMAIL VERIFICATION BANNER */}
        {user && user.email_verified === false && !isFocusMode && <EmailVerificationBanner email={user.email} />}

        {/* HEADER */}
        {activeMenu !== MENU_WRITING && (
          <header className="h-[76px] px-8 flex-shrink-0 border-b flex justify-between items-center z-20 max-sm:px-4 transition-all duration-350 bg-white border-[#E5E9EB] shadow-[0_1px_4px_rgba(0,0,0,0.01)]">
            <div className="flex items-center gap-2">
              <Link to={ROUTES.home} className="lg:hidden flex" aria-label="MemoFlow, accueil">
                <BrandLogo size={32} />
              </Link>
              <span className="font-brand font-bold text-[#2F4858] tracking-tight text-[1.05rem]">
                <span className="lg:hidden">MemoFlow · </span>{activeMenu}
              </span>
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-4">
              <button
                onClick={handleCreateNewDocument}
                className="font-brand text-[0.82rem] font-bold px-4 py-2 rounded-xl transition-all cursor-pointer border-none active:scale-[0.97] bg-[#2F4858] hover:bg-[#3E6976] text-white shadow-[0_2px_8px_rgba(47,72,88,0.12)] max-sm:px-3"
              >
                Nouveau Document
              </button>

              <div className="h-6 w-[1px] transition-colors bg-slate-200"></div>

              {/* Profile widget */}
              <div className="relative">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowProfileDropdown(!showProfileDropdown);
                  }}
                  className="flex items-center gap-3.5 pl-2 pr-1.5 py-1 rounded-xl border transition-all cursor-pointer bg-slate-50 hover:bg-slate-100 border-[#E5E9EB]"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-[#94D2B8]/30 border border-[#94D2B8]/40 flex items-center justify-center text-[#2F4858] font-bold text-sm">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                  <div className="text-left max-sm:hidden">
                    <p className="text-[0.82rem] font-bold leading-tight text-[#2F4858]">{userName}</p>
                    <p className="text-[0.68rem] text-slate-500 leading-none font-medium">{isGuest ? 'Non connecté' : 'Vous'}</p>
                  </div>
                  <span className="text-slate-400 max-sm:hidden">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9" />
                    </svg>
                  </span>
                </button>

                {/* Profile Dropdown */}
                {showProfileDropdown && (
                  <div
                    onClick={(e) => e.stopPropagation()}
                    className="absolute right-0 mt-2 w-56 bg-white border border-[#E5E9EB] rounded-xl shadow-xl z-50 py-1.5 animate-fade-in text-[#2F4858]"
                  >
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-[0.8rem] text-slate-400 font-medium">{isGuest ? 'Session :' : 'Identifiant :'}</p>
                      <p className="text-[0.72rem] truncate font-semibold text-[#518B91]">
                        {isGuest ? 'Mode invité (sans sauvegarde)' : user.email}
                      </p>
                    </div>
                    <button onClick={() => navigate(MENU_SETTINGS)} className={dropdownItemClass}>
                      {settingsIcon(14)}
                      <span>Paramètres</span>
                    </button>
                    {onOpenPrivacy && (
                      <button
                        onClick={() => {
                          setShowProfileDropdown(false);
                          onOpenPrivacy();
                        }}
                        className={dropdownItemClass}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                        <span>Confidentialité & RGPD</span>
                      </button>
                    )}
                    {isGuest ? (
                      <>
                        <button onClick={onRequestLogin} className={dropdownItemClass}>
                          <span>Se connecter</span>
                        </button>
                        <button onClick={onRequestSignup} className={dropdownItemClass}>
                          <span>Créer un compte</span>
                        </button>
                      </>
                    ) : (
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
                    )}
                  </div>
                )}
              </div>
            </div>
          </header>
        )}

        {/* CONTENT SPACE */}
        <main className={`flex-1 overflow-y-auto custom-scrollbar transition-all duration-350 ${
          activeMenu === MENU_WRITING ? 'p-0 overflow-hidden bg-white max-lg:pb-16' : 'p-8 max-sm:p-4 max-lg:pb-24'
        }`}>
          {activeMenu === MENU_TEMPLATES && (
            <TemplatesPage
              isGuest={isGuest}
              onUseTemplate={handleUseTemplate}
              onCreateBlankDocument={handleCreateNewDocument}
              onRequestLogin={onRequestLogin}
            />
          )}

          {activeMenu === MENU_WRITING && (
            <WritingSpace
              isGuest={isGuest}
              isFocusMode={isFocusMode}
              onToggleFocusMode={setIsFocusMode}
              userName={userName}
              addToast={addToast}
              selectedDocumentId={selectedDocumentId}
              onSelectDocument={setSelectedDocumentId}
              documents={documents}
              onRefreshDocuments={fetchDocuments}
              onCreateDocument={handleCreateNewDocument}
              onOpenSettings={() => navigate(MENU_SETTINGS)}
            />
          )}

          {activeMenu === MENU_CONTEXT && (
            <div className="flex flex-col gap-6">
              {/* Context sub-navigation tabs */}
              <div className="flex border-b border-[#E5E9EB] pb-3 gap-6">
                {([
                  ['cadrage', 'Cadrage de Projet'],
                  ['connectors', 'Intégrations & Connecteurs'],
                ] as const).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => goTo(key === 'connectors' ? ROUTES.connectors : ROUTES.context)}
                    className={`font-brand text-sm font-bold pb-2 transition-all border-none bg-transparent cursor-pointer relative ${
                      contextTab === key ? 'text-[#2F4858]' : 'text-slate-400 hover:text-[#2F4858]'
                    }`}
                  >
                    {label}
                    {contextTab === key && (
                      <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#518B91] rounded-full"></span>
                    )}
                  </button>
                ))}
              </div>

              {contextTab === 'cadrage' ? (
                <ContextCenter onAddToast={addToast} />
              ) : isGuest ? (
                <div className="max-w-[1000px] mx-auto w-full bg-white border border-[#E5E9EB] rounded-2xl p-10 text-center flex flex-col items-center gap-3">
                  <h3 className="text-[1.05rem] font-bold text-[#2F4858]">Connecteurs réservés aux comptes</h3>
                  <p className="text-[0.85rem] text-slate-500 max-w-[480px]">
                    Connectez-vous pour lier Notion, Trello ou GitHub à votre espace MemoFlow.
                  </p>
                  <button
                    onClick={onRequestLogin}
                    className="mt-2 px-4 py-2 rounded-xl text-[0.82rem] font-bold bg-[#2F4858] hover:bg-[#3E6976] text-white border-none cursor-pointer"
                  >
                    Se connecter
                  </button>
                </div>
              ) : (
                <ConnectorsManager addToast={addToast} onOpenPrivacy={onOpenPrivacy} />
              )}
            </div>
          )}

          {activeMenu === MENU_PROGRESS && (
            <ProgressionPage
              userId={user?.id ?? null}
              onRequestLogin={onRequestLogin}
              onRequestSignup={onRequestSignup}
            />
          )}

          {activeMenu === MENU_SETTINGS && (
            <SettingsPage
              user={user}
              onLogout={onLogout}
              onRequestLogin={onRequestLogin}
              onRequestSignup={onRequestSignup}
              onOpenPrivacy={onOpenPrivacy}
              onOpenTerms={onOpenTerms}
            />
          )}
        </main>
      </div>

      {/* MOBILE / TABLET NAVIGATION (sidebar is hidden below lg) */}
      {!isFocusMode && (
        <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E5E9EB] flex justify-around px-1 py-1.5 shadow-[0_-2px_10px_rgba(0,0,0,0.03)]">
          {MOBILE_NAV_ITEMS.map((item) => {
            const isActive = activeMenu === item.name;
            return (
              <Link
                key={item.name}
                to={MENU_PATHS[item.name]}
                aria-current={isActive ? 'page' : undefined}
                className={`flex-1 flex flex-col items-center gap-0.5 py-1.5 rounded-lg border-none bg-transparent cursor-pointer text-[0.65rem] font-bold transition-colors no-underline ${
                  isActive ? 'text-[#3E6976]' : 'text-slate-400 hover:text-[#2F4858]'
                }`}
              >
                {item.icon}
                <span>{item.short}</span>
              </Link>
            );
          })}
        </nav>
      )}

      {/* TOAST CONTAINER */}
      <div className="fixed bottom-6 left-6 z-50 flex flex-col gap-3 max-w-[420px] max-sm:left-4 max-sm:right-4 max-lg:bottom-20">
        {toasts.map((toast) => {
          let barBg = 'bg-[#518B91]';
          let icon = (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#518B91" strokeWidth="2.5">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
            </svg>
          );

          if (toast.type === 'success') {
            barBg = 'bg-[#639922]';
            icon = (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#639922" strokeWidth="3">
                <polyline points="20 6 9 17 4 12" />
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
