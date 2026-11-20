import { useState, useEffect, useRef, useCallback } from 'react';
import {
  acceptAiConsent,
  ApiError,
  getToken,
  connectSocket,
  disconnectSocket,
  subscribeToJob,
  apiFetch,
  hasGuestDraftContent,
  isAiConsentRequiredError,
} from '../services/api';
import type {
  AiConsentDto,
  ConnectorResponseDto,
  PlanningJobResponseDto,
  DocumentResponseDto,
  SectionResponseDto,
  UserResponseDto,
} from '../services/api';
import { trackPlanGenerated } from '../services/analytics';
import { registerNavigationGuard } from '../services/router';

type SaveState = 'idle' | 'saving' | 'saved' | 'error';

interface WritingSpaceProps {
  isGuest: boolean;
  isFocusMode: boolean;
  onToggleFocusMode: (focus: boolean) => void;
  userName: string;
  addToast: (type: 'success' | 'assistant' | 'warning' | 'error', title: string, message: string) => void;
  selectedDocumentId: string | null;
  onSelectDocument: (docId: string | null) => void;
  documents: DocumentResponseDto[];
  onRefreshDocuments: () => Promise<void>;
  onCreateDocument: () => void;
  onOpenSettings: () => void;
  onRequestLogin: () => void;
  onRequestSignup: () => void;
}

function AutoResizingTextarea({
  value,
  onChange,
  className,
  placeholder,
  ariaLabel,
}: {
  value: string;
  onChange: (val: string) => void;
  className?: string;
  placeholder?: string;
  ariaLabel: string;
}) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const resize = () => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = 'auto';
      el.style.height = `${el.scrollHeight}px`;
    }
  };

  useEffect(() => {
    resize();
  }, [value]);

  return (
    <textarea
      ref={textareaRef}
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
        resize();
      }}
      className={className}
      placeholder={placeholder}
      aria-label={ariaLabel}
      rows={1}
      style={{ overflow: 'hidden', resize: 'none' }}
    />
  );
}

function GuestDemoDialog({
  onClose,
  onCreateDocument,
}: {
  onClose: () => void;
  onCreateDocument: () => void;
}) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyFocusedElement =
      document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialogRef.current?.focus();
    const handleDialogKeys = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      const focusable = Array.from(
        dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input, textarea, select')
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (!first || !last) return;

      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialogRef.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener('keydown', handleDialogKeys);
    return () => {
      window.removeEventListener('keydown', handleDialogKeys);
      previouslyFocusedElement?.focus();
    };
  }, [onClose]);

  const sources = [
    { name: 'Trello · simulation', description: 'Checklist fictive des étapes d’accueil et retours de l’équipe.' },
    { name: 'Notion · simulation', description: 'Guide d’intégration et procédure RH inventés pour cet exemple.' },
    { name: 'GitHub · simulation', description: 'README et tickets fictifs d’une maquette de portail d’accueil.' },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-[#2F4858]/55 p-4">
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="guest-demo-title"
        tabIndex={-1}
        className="w-full max-w-[860px] max-h-[90vh] overflow-y-auto rounded-2xl border border-[#E5E9EB] bg-white p-5 shadow-2xl sm:p-7"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="m-0 text-[0.72rem] font-semibold uppercase tracking-wide text-[#3E6976]">Démonstration</p>
            <h2 id="guest-demo-title" className="mt-1 font-brand text-[1.25rem] font-semibold text-[#2F4858]">
              Exemple de rapport d’alternance
            </h2>
          </div>
          <button type="button" onClick={onClose} className="mf-button mf-button--secondary !min-h-9 !px-3">
            Fermer
          </button>
        </div>

        <p className="mt-3 rounded-xl border border-[#F0D8A8] bg-[#FFF8E8] p-3 text-[0.8rem] leading-relaxed text-[#6B4E16]">
          Tout ce qui suit est fictif : aucun compte externe n’est connecté, aucune requête IA n’est lancée et rien n’est sauvegardé.
        </p>

        <div className="mt-5 grid gap-5 md:grid-cols-[0.9fr_1.1fr]">
          <section aria-labelledby="guest-demo-sources" className="rounded-xl border border-[#E5E9EB] bg-[#F8FAFB] p-4">
            <h3 id="guest-demo-sources" className="font-brand text-[0.95rem] font-semibold text-[#2F4858]">
              Sources simulées
            </h3>
            <p className="mt-1 text-[0.78rem] leading-relaxed text-slate-600">
              Sujet d’exemple : digitaliser l’accueil des nouveaux salariés dans une PME.
            </p>
            <ul className="mt-3 space-y-3 p-0 text-[0.78rem] leading-relaxed text-slate-600 list-none">
              {sources.map((source) => (
                <li key={source.name}>
                  <strong className="font-semibold text-[#2F4858]">{source.name}</strong>
                  <p className="m-0 mt-0.5">{source.description}</p>
                </li>
              ))}
            </ul>
          </section>

          <section aria-labelledby="guest-demo-plan" className="rounded-xl border border-[#E5E9EB] p-4">
            <h3 id="guest-demo-plan" className="font-brand text-[0.95rem] font-semibold text-[#2F4858]">
              Exemple de plan que l’assistant pourrait proposer
            </h3>
            <ol className="mt-3 space-y-2 pl-5 text-[0.8rem] leading-relaxed text-slate-600">
              <li>Analyser le parcours d’intégration actuel et ses difficultés.</li>
              <li>Concevoir un parcours numérique adapté aux besoins de la PME.</li>
              <li>Évaluer les effets sur la prise de poste et le travail de l’équipe RH.</li>
            </ol>
          </section>
        </div>

        <div className="mt-6 flex justify-end">
          <button type="button" onClick={onCreateDocument} className="mf-button mf-button--primary max-sm:w-full">
            Créer mon document vierge
          </button>
        </div>
      </div>
    </div>
  );
}

function AiConsentNotice({
  version,
  isAccepting,
  error,
  onAccept,
}: {
  version: string;
  isAccepting: boolean;
  error: string | null;
  onAccept: () => void;
}) {
  const [hasConfirmed, setHasConfirmed] = useState(false);

  return (
    <form onSubmit={(event) => { event.preventDefault(); onAccept(); }} className="flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl bg-[#EAF3DE] text-[#3E6976]" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="m9 12 2 2 4-4" />
          </svg>
        </span>
        <div>
          <h4 className="m-0 font-brand text-[0.9rem] font-bold text-[#2F4858]">Votre accord est nécessaire</h4>
          <p className="m-0 mt-1 text-[0.75rem] leading-relaxed text-slate-600">
            Pour créer un plan, votre consigne et les extraits des connecteurs que vous choisissez sont transmis à
            Anthropic Claude. Les résultats sont enregistrés dans votre compte. Cet accord est distinct des cookies et
            peut être retiré dans Paramètres.
          </p>
        </div>
      </div>
      <label className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-[#DDE3E6] bg-white p-3 text-[0.75rem] leading-relaxed text-[#2F4858]">
        <input
          type="checkbox"
          checked={hasConfirmed}
          disabled={isAccepting}
          onChange={(event) => setHasConfirmed(event.target.checked)}
          className="mt-0.5 h-4 w-4 flex-shrink-0 accent-[#518B91]"
        />
        <span>J’ai pris connaissance de cet avis et j’accepte l’utilisation des fonctions d’intelligence artificielle.</span>
      </label>
      {error && (
        <p role="alert" className="m-0 rounded-lg border border-red-100 bg-[#FCEBEB] p-2.5 text-[0.74rem] leading-relaxed text-red-600">
          {error}
        </p>
      )}
      <button type="submit" disabled={!hasConfirmed || isAccepting} className="mf-button mf-button--primary w-full">
        {isAccepting ? 'Enregistrement de votre choix…' : 'Accepter et activer l’assistant'}
      </button>
      <span className="text-center text-[0.65rem] text-slate-400">Avis IA · version {version}</span>
    </form>
  );
}

export default function WritingSpace({
  isGuest,
  isFocusMode,
  onToggleFocusMode,
  userName,
  addToast,
  selectedDocumentId,
  onSelectDocument,
  documents,
  onRefreshDocuments,
  onCreateDocument,
  onOpenSettings,
  onRequestLogin,
  onRequestSignup,
}: WritingSpaceProps) {
  // Sections states
  const [sections, setSections] = useState<SectionResponseDto[]>([]);
  const [isLoadingSections, setIsLoadingSections] = useState(false);
  const [localDocTitle, setLocalDocTitle] = useState('');
  const [saveState, setSaveState] = useState<SaveState>('idle');

  // Planning States
  const [activeConnectors, setActiveConnectors] = useState<string[]>([]);
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([]);
  const [planningPrompt, setPlanningPrompt] = useState('');
  const [jobStatus, setJobStatus] = useState<'pending' | 'running' | 'completed' | 'failed' | null>(null);
  const [jobResult, setJobResult] = useState<unknown>(null);
  const [jobError, setJobError] = useState<string | null>(null);
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);
  const [aiConsent, setAiConsent] = useState<AiConsentDto | null>(null);
  const [aiConsentLoadState, setAiConsentLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [aiConsentLoadError, setAiConsentLoadError] = useState<string | null>(null);
  const [aiConsentActionError, setAiConsentActionError] = useState<string | null>(null);
  const [isAcceptingAiConsent, setIsAcceptingAiConsent] = useState(false);
  const [isAssistantOpen, setIsAssistantOpen] = useState(false);
  const [isGuestDemoOpen, setIsGuestDemoOpen] = useState(false);
  const closeGuestDemo = useCallback(() => setIsGuestDemoOpen(false), []);
  const createGuestDocument = useCallback(() => {
    closeGuestDemo();
    onCreateDocument();
  }, [closeGuestDemo, onCreateDocument]);
  const isMobileAssistantOpen = isAssistantOpen && !isFocusMode;
  const hasUnsavedGuestText =
    isGuest &&
    (hasGuestDraftContent() ||
      (localDocTitle.trim() !== '' && localDocTitle.trim() !== 'Document sans titre') ||
      sections.some(
        (section) =>
          section.content.trim() ||
          (section.title.trim() && !['Introduction', 'Nouvelle section'].includes(section.title.trim()))
      ));

  const activeJobIdRef = useRef<string | null>(null);
  const pollIntervalRef = useRef<number | null>(null);
  const debounceTimersRef = useRef<{ [sectionId: string]: number }>({});
  const pendingSectionUpdatesRef = useRef<{ [sectionId: string]: { title?: string; content?: string } }>({});
  const docTitleTimerRef = useRef<number | null>(null);

  const loadAiConsent = useCallback(async () => {
    try {
      const currentUser = await apiFetch<UserResponseDto>('/users/me');
      if (!currentUser.ai_consent) throw new Error('Le statut du consentement IA est indisponible.');
      setAiConsent(currentUser.ai_consent);
      setAiConsentLoadState('ready');
      setAiConsentLoadError(null);
    } catch (err) {
      setAiConsentLoadState('error');
      setAiConsentLoadError(err instanceof Error ? err.message : 'Impossible de vérifier le consentement IA.');
      throw err;
    }
  }, []);

  useEffect(() => {
    if (isGuest) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- Consent is loaded asynchronously after mount.
    void loadAiConsent().catch((err: unknown) => {
      console.error('Error fetching AI consent:', err);
    });
  }, [isGuest, loadAiConsent]);

  const handleAcceptAiConsent = async () => {
    if (!aiConsent) return;
    setIsAcceptingAiConsent(true);
    setAiConsentActionError(null);
    try {
      const updatedUser = await acceptAiConsent(aiConsent.current_version);
      if (!updatedUser.ai_consent) throw new Error('Le serveur n’a pas confirmé votre consentement IA.');
      setAiConsent(updatedUser.ai_consent);
      setAiConsentLoadState('ready');
    } catch (err) {
      if (err instanceof ApiError && err.statusCode === 409) {
        try {
          await loadAiConsent();
          setAiConsentActionError('L’avis a été actualisé. Relisez-le, puis confirmez à nouveau votre choix.');
        } catch (refreshError) {
          console.error('Error refreshing AI notice after version conflict:', refreshError);
          setAiConsentActionError(
            refreshError instanceof Error ? refreshError.message : 'Impossible de charger le nouvel avis IA.'
          );
        }
      } else {
        console.error('Error accepting AI consent:', err);
        setAiConsentActionError(err instanceof Error ? err.message : 'Impossible d’enregistrer votre accord.');
      }
    } finally {
      setIsAcceptingAiConsent(false);
    }
  };

  useEffect(() => {
    if (!isMobileAssistantOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsAssistantOpen(false);
    };
    window.addEventListener('keydown', closeOnEscape);
    return () => window.removeEventListener('keydown', closeOnEscape);
  }, [isMobileAssistantOpen]);

  useEffect(() => {
    if (!hasUnsavedGuestText) return;

    const confirmLeave = () =>
      window.confirm('Votre brouillon invité ne sera pas sauvegardé. Voulez-vous vraiment quitter cette page ?');
    const warnBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = '';
    };
    const unregisterNavigationGuard = registerNavigationGuard(confirmLeave);
    window.addEventListener('beforeunload', warnBeforeUnload);

    return () => {
      unregisterNavigationGuard();
      window.removeEventListener('beforeunload', warnBeforeUnload);
    };
  }, [hasUnsavedGuestText]);

  // Fetch sections function
  const fetchSections = useCallback(async (docId: string) => {
    setIsLoadingSections(true);
    try {
      const data = await apiFetch<SectionResponseDto[]>(`/documents/${docId}/sections`);
      const sorted = (data || []).sort((a, b) => a.order - b.order);
      setSections(sorted);
    } catch (err) {
      console.error('Error fetching sections:', err);
    } finally {
      setIsLoadingSections(false);
    }
  }, []);

  // Sync sections when active document changes
  useEffect(() => {
    if (selectedDocumentId) {
      fetchSections(selectedDocumentId);
    } else {
      setSections([]);
    }
  }, [selectedDocumentId, fetchSections]);

  // Sync local title state when active document changes
  useEffect(() => {
    const activeDoc = documents.find((d) => d.id === selectedDocumentId);
    if (activeDoc) {
      setLocalDocTitle(activeDoc.title);
    } else {
      setLocalDocTitle('');
    }
  }, [selectedDocumentId, documents]);

  // Load active connectors to display checkboxes (accounts only)
  useEffect(() => {
    if (isGuest) return;
    const loadConnectors = async () => {
      try {
        const list = await apiFetch<ConnectorResponseDto[]>('/connectors');
        const activeKeys = list.filter((c) => c.status === 'active').map((c) => c.provider);
        setActiveConnectors(activeKeys);
      } catch (err) {
        console.error('Error fetching connectors for writing space:', err);
      }
    };
    loadConnectors();
  }, [isGuest]);

  // Clear debounces and timers on unmount
  useEffect(() => {
    return () => {
      Object.values(debounceTimersRef.current).forEach((t) => window.clearTimeout(t));
      if (docTitleTimerRef.current) window.clearTimeout(docTitleTimerRef.current);
    };
  }, []);

  const clearPollInterval = () => {
    if (pollIntervalRef.current) {
      clearInterval(pollIntervalRef.current);
      pollIntervalRef.current = null;
    }
  };

  const startPollInterval = (jobId: string) => {
    clearPollInterval();
    pollIntervalRef.current = window.setInterval(async () => {
      try {
        const job = await apiFetch<PlanningJobResponseDto>(`/planning-jobs/${jobId}`);
        if (job.status === 'completed') {
          setJobStatus('completed');
          setJobResult(job.result);
          trackPlanGenerated(jobId);
          clearPollInterval();
        } else if (job.status === 'failed') {
          setJobStatus('failed');
          setJobError(job.error_message || job.error_code || 'Une erreur est survenue.');
          clearPollInterval();
        } else {
          setJobStatus(job.status);
        }
      } catch (err) {
        console.error('Error polling planning job status:', err);
      }
    }, 3000);
  };

  const handleLaunchPlanning = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!planningPrompt.trim()) return;

    setIsSubmittingJob(true);
    setJobError(null);
    setJobResult(null);
    setJobStatus('pending');

    try {
      const res = await apiFetch<PlanningJobResponseDto>('/planning-jobs', {
        method: 'POST',
        body: JSON.stringify({
          prompt: planningPrompt,
          connectors: selectedConnectors,
          documentId: selectedDocumentId || undefined,
        }),
      });

      activeJobIdRef.current = res.job_id;

      // Subscribe over WebSocket
      subscribeToJob(res.job_id);

      // Start REST polling fallback
      startPollInterval(res.job_id);
    } catch (err: unknown) {
      console.error('Error starting planning job:', err);
      if (isAiConsentRequiredError(err)) {
        setJobStatus(null);
        setJobError(null);
        setAiConsentLoadState('loading');
        setAiConsentLoadError(null);
        try {
          await loadAiConsent();
        } catch (refreshError) {
          console.error('Error refreshing AI consent after planning rejection:', refreshError);
        }
        return;
      }
      setJobStatus('failed');
      const errorMsg = err instanceof Error ? err.message : 'Impossible de lancer la planification.';
      setJobError(errorMsg);
    } finally {
      setIsSubmittingJob(false);
    }
  };

  // Connect WebSocket & configure handlers
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    connectSocket(token, {
      onReady: () => {
        if (activeJobIdRef.current) {
          subscribeToJob(activeJobIdRef.current);
        }
      },
      onStatus: ({ jobId, status }) => {
        if (jobId === activeJobIdRef.current) {
          setJobStatus(status);
        }
      },
      onCompleted: ({ jobId, status, result }) => {
        if (jobId === activeJobIdRef.current) {
          setJobStatus(status);
          setJobResult(result);
          if (status === 'completed') trackPlanGenerated(jobId);
          clearPollInterval();
        }
      },
      onFailed: ({ jobId, status, errorCode, errorMessage }) => {
        if (jobId === activeJobIdRef.current) {
          setJobStatus(status);
          setJobError(errorMessage || errorCode || 'La planification a échoué.');
          clearPollInterval();
        }
      },
      onError: ({ jobId, message }) => {
        if (jobId === activeJobIdRef.current) {
          setJobError(message);
        }
      },
    });

    return () => {
      disconnectSocket();
      clearPollInterval();
    };
  }, []);

  // Update section content / title local state and debounce to server
  const handleUpdateSectionLocal = (sectionId: string, updates: { title?: string; content?: string }) => {
    setSections((prev) =>
      prev.map((sec) => (sec.id === sectionId ? { ...sec, ...updates } : sec))
    );

    if (debounceTimersRef.current[sectionId]) {
      window.clearTimeout(debounceTimersRef.current[sectionId]);
    }

    // Accumulate edits so a title change isn't lost when the content is edited right after
    pendingSectionUpdatesRef.current[sectionId] = {
      ...pendingSectionUpdatesRef.current[sectionId],
      ...updates,
    };
    setSaveState('saving');

    debounceTimersRef.current[sectionId] = window.setTimeout(async () => {
      const pending = pendingSectionUpdatesRef.current[sectionId];
      delete pendingSectionUpdatesRef.current[sectionId];
      try {
        if (!selectedDocumentId || !pending) return;
        await apiFetch<SectionResponseDto>(`/documents/${selectedDocumentId}/sections/${sectionId}`, {
          method: 'PATCH',
          body: JSON.stringify(pending),
        });
        setSaveState('saved');
      } catch (err) {
        console.error('Error auto-saving section:', err);
        setSaveState('error');
      }
    }, 1000);
  };

  // Update document title and debounce to server
  const handleUpdateDocTitle = (newTitle: string) => {
    setLocalDocTitle(newTitle);

    if (docTitleTimerRef.current) {
      window.clearTimeout(docTitleTimerRef.current);
    }

    setSaveState('saving');
    docTitleTimerRef.current = window.setTimeout(async () => {
      try {
        if (!selectedDocumentId) return;
        await apiFetch<DocumentResponseDto>(`/documents/${selectedDocumentId}`, {
          method: 'PATCH',
          body: JSON.stringify({ title: newTitle }),
        });
        setSaveState('saved');
        onRefreshDocuments();
      } catch (err) {
        console.error('Error saving document title:', err);
        setSaveState('error');
      }
    }, 1000);
  };

  // Add section in backend and refresh local list
  const handleAddSection = async () => {
    if (!selectedDocumentId) return;
    try {
      await apiFetch<SectionResponseDto>(`/documents/${selectedDocumentId}/sections`, {
        method: 'POST',
        body: JSON.stringify({
          title: `Nouvelle Section`,
          content: '',
        }),
      });
      addToast('success', 'Section ajoutée', 'Une nouvelle section vide a été ajoutée.');
      fetchSections(selectedDocumentId);
    } catch (err) {
      console.error('Error adding section:', err);
      addToast('error', 'Erreur', 'Impossible de créer la section.');
    }
  };

  // Delete section in backend and refresh local list
  const handleDeleteSection = async (sectionId: string) => {
    if (!selectedDocumentId || !confirm('Voulez-vous vraiment supprimer cette section ?')) return;
    try {
      await apiFetch<void>(`/documents/${selectedDocumentId}/sections/${sectionId}`, {
        method: 'DELETE',
      });
      addToast('success', 'Section supprimée', 'La section a été retirée du document.');
      fetchSections(selectedDocumentId);
    } catch (err) {
      console.error('Error deleting section:', err);
      addToast('error', 'Erreur', 'Impossible de supprimer la section.');
    }
  };

  // Word counter & Read time
  const totalWords = sections.reduce((acc, sec) => {
    const words = sec.content ? sec.content.trim().split(/\s+/).filter(Boolean).length : 0;
    return acc + words;
  }, 0);
  const readTime = Math.ceil(totalWords / 200);
  const activeDocument = documents.find((d) => d.id === selectedDocumentId) ?? null;

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFB]">
      {isGuest && isGuestDemoOpen && (
        <GuestDemoDialog
          onClose={closeGuestDemo}
          onCreateDocument={createGuestDocument}
        />
      )}
      {/* Writing Space Sub-Header */}
      {!isFocusMode && (
        <header className="h-[76px] px-8 max-sm:px-4 flex-shrink-0 border-b border-[#E5E9EB] bg-white flex justify-between items-center gap-4 z-20 shadow-[0_1px_4px_rgba(0,0,0,0.01)] transition-all duration-300">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2.5 text-slate-500 font-brand text-[0.88rem] font-semibold min-w-0 flex-1">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-400 flex-shrink-0"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <span className="flex-shrink-0">{isGuest ? 'Documents (invité)' : 'Mes documents'}</span>
            {activeDocument && (
              <>
                <span className="text-slate-300">/</span>
                <span className="text-slate-400 font-medium truncate" title={localDocTitle}>
                  {localDocTitle || 'Sans titre'}
                </span>
              </>
            )}
          </div>

          <div className="flex flex-shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={() => setIsAssistantOpen((open) => !open)}
              aria-expanded={isMobileAssistantOpen}
              aria-controls="writing-assistant-panel"
              aria-label={isMobileAssistantOpen ? "Fermer l'assistant" : "Ouvrir l'assistant"}
              className="mf-button mf-button--secondary !min-h-9 !px-3 text-xs xl:hidden max-sm:!px-2"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 3a6 6 0 0 0-6 6v2a4 4 0 0 0 4 4h1v-5H8" />
                <path d="M12 3a6 6 0 0 1 6 6v2a4 4 0 0 1-4 4h-1v-5h3" />
                <path d="M12 15v2a3 3 0 0 1-3 3" />
              </svg>
              <span>Assistant</span>
            </button>
            <button
              onClick={onOpenSettings}
              title="Paramètres"
              aria-label="Ouvrir les paramètres"
              className="flex-shrink-0 h-8 w-8 rounded-full overflow-hidden bg-[#94D2B8]/30 border border-[#94D2B8]/40 flex items-center justify-center text-[#2F4858] font-bold text-sm cursor-pointer hover:bg-[#94D2B8]/50 transition-colors"
            >
              {userName.charAt(0).toUpperCase()}
            </button>
          </div>
        </header>
      )}

      {/* Main Workspace split */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT COLUMN: EDITOR */}
        {/* Grey "desk" behind the page, like a word processor. Always full width so the
            scrollbar stays on the window edge; hidden in focus mode. */}
        <div
          className={`flex-1 overflow-y-auto flex flex-col bg-[#E9EDEF] px-8 py-8 max-sm:px-3 max-sm:py-4 transition-all duration-300 relative ${
            isFocusMode ? 'no-scrollbar pt-12' : 'custom-scrollbar'
          }`}
        >
          {/* Main Document Content */}
          <div className="flex flex-col gap-4 max-w-[794px] mx-auto w-full pb-28">

            {/* Active Document Selector row */}
            {documents.length > 0 && (
              <div className="flex justify-between items-center gap-4 bg-white border border-[#DDE3E6] px-4 py-3 rounded-xl max-sm:flex-col max-sm:items-stretch">
                <div className="flex items-center gap-2.5">
                  <label htmlFor="active-document-select" className="text-[0.7rem] text-slate-600 font-semibold">
                    Document actif
                  </label>
                  <select
                    id="active-document-select"
                    value={selectedDocumentId || ''}
                    onChange={(e) => onSelectDocument(e.target.value || null)}
                    className="text-[0.8rem] font-bold text-[#2F4858] bg-white border border-slate-200 px-3 py-1 rounded-xl outline-none focus:border-[#518B91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E6976] focus-visible:outline-offset-2"
                  >
                    {documents.map((doc) => (
                      <option key={doc.id} value={doc.id}>
                        {doc.title}
                      </option>
                    ))}
                  </select>
                </div>
                <button
                  onClick={handleAddSection}
                  className="mf-button mf-button--accent !min-h-9 !px-3 shadow-xs hover:shadow-sm"
                >
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                  </svg>
                  Ajouter une section
                </button>
              </div>
            )}

            {!selectedDocumentId ? (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                    <polyline points="14 2 14 8 20 8" />
                  </svg>
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="text-[1.1rem] font-bold text-[#2F4858]">Aucun document ouvert</h3>
                  <p className="text-[0.82rem] text-slate-500 font-medium">
                    {isGuest
                      ? 'Créez un document vierge ou consultez une démonstration fictive.'
                      : 'Sélectionnez un modèle ou créez un nouveau document pour commencer.'}
                  </p>
                </div>
                <button
                  onClick={onCreateDocument}
                  className="mf-button mf-button--primary"
                >
                  Nouveau document
                </button>
                {isGuest && (
                  <button
                    type="button"
                    onClick={() => setIsGuestDemoOpen(true)}
                    className="mf-button mf-button--secondary"
                  >
                    Voir une démonstration fictive
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Status line (outside the page) */}
                <div className="flex items-center justify-between gap-4 flex-wrap px-1">
                  {isGuest ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[0.68rem] font-bold uppercase tracking-wider bg-[#FAEEDA] text-[#BA7517] border border-[#BA7517]/15">
                      Non sauvegardé — mode invité
                    </span>
                  ) : saveState === 'error' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[0.68rem] font-bold uppercase tracking-wider bg-[#FCEBEB] text-[#E24B4A] border border-[#E24B4A]/15">
                      Erreur d'enregistrement
                    </span>
                  ) : saveState === 'saving' ? (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[0.68rem] font-bold uppercase tracking-wider bg-slate-100 text-slate-500 border border-slate-200">
                      Enregistrement…
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[0.68rem] font-bold uppercase tracking-wider bg-[#EAF3DE] text-[#639922] border border-[#639922]/10">
                      {saveState === 'saved' ? 'Enregistré' : 'Synchronisé'}
                    </span>
                  )}
                  <span className="text-slate-500 text-[0.75rem] font-semibold">
                    {totalWords} mot{totalWords > 1 ? 's' : ''} · {readTime} min de lecture
                  </span>
                </div>

                {/* PAGE SHEET (A4 proportions: 794px wide, ~2.3cm margins) */}
                <div className="bg-white w-full min-h-[1123px] rounded-[3px] border border-[#DDE3E6] shadow-[0_1px_3px_rgba(47,72,88,0.08),0_8px_24px_rgba(47,72,88,0.08)] px-[88px] py-[88px] max-md:px-12 max-md:py-14 max-sm:px-5 max-sm:py-8 max-sm:min-h-0 flex flex-col gap-6">
                {/* Editable Title */}
                <div className="relative group/document-title">
                  <input
                    type="text"
                    value={localDocTitle}
                    onChange={(e) => handleUpdateDocTitle(e.target.value)}
                    aria-label="Titre du document"
                    className="w-full pr-8 text-[2rem] font-extrabold text-[#2F4858] tracking-tight leading-tight border-none outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E6976] focus-visible:outline-offset-2 bg-transparent font-brand"
                    placeholder="Titre du document..."
                  />
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="pointer-events-none absolute right-1 top-3 h-4 w-4 text-slate-400 opacity-60 transition-opacity group-hover/document-title:opacity-100"
                  >
                    <path d="M12 20h9" />
                    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                  </svg>
                </div>

                {isLoadingSections ? (
                  <div className="flex justify-center items-center py-10">
                    <div className="w-6 h-6 border-2 border-[#94D2B8]/30 border-t-[#518B91] rounded-full animate-spin"></div>
                  </div>
                ) : sections.length === 0 ? (
                  <div className="text-center py-8 text-slate-400 text-sm italic">
                    Ce document n'a pas encore de section. Cliquez sur "Ajouter une section" pour commencer.
                  </div>
                ) : (
                  sections.map((sec) => (
                    <div key={sec.id} className="flex flex-col gap-2 group/section mt-4 relative">
                      {/* Section Header */}
                      <div className="flex justify-between items-center gap-3">
                        <input
                          type="text"
                          value={sec.title}
                          onChange={(e) => handleUpdateSectionLocal(sec.id, { title: e.target.value })}
                          aria-label={`Titre de la section ${sec.title || 'sans titre'}`}
                          className="text-[1.35rem] font-bold text-[#2F4858] font-brand tracking-tight border-none outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E6976] focus-visible:outline-offset-2 bg-transparent w-full focus:ring-0 focus:outline-none"
                          placeholder="Titre de la section..."
                        />
                        <button
                          onClick={() => handleDeleteSection(sec.id)}
                          className="opacity-0 group-hover/section:opacity-100 group-focus-within/section:opacity-100 p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg border-none bg-transparent cursor-pointer transition-all"
                          title="Supprimer la section"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                          </svg>
                        </button>
                      </div>

                      {/* Section Content */}
                      <AutoResizingTextarea
                        value={sec.content || ''}
                        onChange={(val) => handleUpdateSectionLocal(sec.id, { content: val })}
                        ariaLabel={`Contenu de la section ${sec.title || 'sans titre'}`}
                        className="w-full text-[0.92rem] text-[#2F4858] leading-relaxed font-medium bg-transparent border-none outline-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E6976] focus-visible:outline-offset-2 focus:ring-0 focus:outline-none placeholder-slate-300 min-h-[100px]"
                        placeholder="Rédigez le contenu de cette section ici..."
                      />
                    </div>
                  ))
                )}
                </div>
              </>
            )}
          </div>

          {/* FLOATING FOCUS MODE BAR */}
          <div
            className={`fixed bottom-8 max-lg:bottom-20 left-1/2 -translate-x-1/2 bg-[#2F4858] text-white shadow-2xl p-2 rounded-2xl flex items-center gap-5 transition-all duration-300 z-30 ${
              isFocusMode ? 'scale-105' : ''
            }`}
          >
            {/* Focus Mode button */}
            <button
              onClick={() => onToggleFocusMode(!isFocusMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-brand flex items-center gap-1.5 cursor-pointer border-none transition-all ${
                isFocusMode
                  ? 'bg-white hover:bg-slate-100 text-[#2F4858]'
                  : 'bg-[#94D2B8] hover:bg-[#C4F4C7] text-[#0F4C3A] hover:text-[#0A382A] shadow-md shadow-[#94D2B8]/10'
              }`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                {isFocusMode ? (
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                ) : (
                  <>
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </>
                )}
              </svg>
              <span>{isFocusMode ? 'Quitter le Focus' : 'Mode Focus'}</span>
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: ASSISTANT PANEL */}
        {isMobileAssistantOpen && (
          <button
            type="button"
            className="mf-writing-assistant-backdrop xl:hidden"
            aria-label="Fermer le panneau de l'assistant"
            onClick={() => setIsAssistantOpen(false)}
          />
        )}
        <aside
          id="writing-assistant-panel"
          aria-label="Assistant MemoFlow"
          className={`w-[clamp(360px,30vw,420px)] border-l border-solid border-[#E5E9EB] bg-white flex flex-col justify-between overflow-hidden transition-all duration-350 ${
            isFocusMode ? 'w-0 opacity-0 border-none pointer-events-none' : 'opacity-100'
          } ${isMobileAssistantOpen ? 'max-xl:flex' : 'max-xl:hidden'} mf-writing-assistant-panel`}
        >
          <div className="xl:hidden flex items-center justify-between gap-3 px-4 py-3 border-b border-[#E5E9EB]">
            <h3 className="m-0 font-brand text-sm font-semibold text-[#2F4858]">Assistant MemoFlow</h3>
            <button
              type="button"
              onClick={() => setIsAssistantOpen(false)}
              aria-label="Fermer l'assistant"
              className="h-9 w-9 flex-shrink-0 rounded-lg border-none bg-transparent text-slate-500 hover:bg-slate-100 cursor-pointer flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <path d="m18 6-12 12M6 6l12 12" />
              </svg>
            </button>
          </div>
          {/* Assistant Header & Widgets */}
          <div className="flex-1 flex flex-col gap-5 p-5 overflow-y-auto custom-scrollbar">
            {/* Assistant Brand Title */}
            <div className="hidden xl:flex items-center gap-2 text-[#518B91]">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <h3 className="text-[0.98rem] font-extrabold font-brand text-[#2F4858]">
                Assistant MemoFlow
              </h3>
            </div>

            {/* Planificateur de Rédaction (Async Planning Jobs) */}
            <div className="flex flex-col gap-3">
              <span className="text-[0.68rem] font-bold text-slate-400 tracking-wider uppercase">
                Planificateur de Rédaction (IA)
              </span>
              
              <div className="bg-[#F8FAFB] border border-solid border-[#E5E9EB] rounded-xl p-4 flex flex-col gap-3.5 relative overflow-hidden">
                {isGuest ? (
                    <div className="flex flex-col items-start gap-3">
                      <p className="text-[0.75rem] text-slate-600 leading-relaxed m-0">
                        Pour utiliser l’assistant de plan, créez un compte puis connectez vos outils.
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        <button type="button" onClick={onRequestSignup} className="mf-button mf-button--primary !min-h-9 !px-3 text-xs">
                          Créer un compte
                        </button>
                        <button type="button" onClick={onRequestLogin} className="mf-button mf-button--secondary !min-h-9 !px-3 text-xs">
                          Se connecter
                        </button>
                      </div>
                    </div>
                ) : aiConsentLoadState === 'loading' ? (
                  <div className="flex items-center gap-2 text-[0.75rem] text-slate-500" role="status">
                    <span className="h-4 w-4 rounded-full border-2 border-[#94D2B8]/40 border-t-[#518B91] animate-spin" />
                    Vérification de votre accord…
                  </div>
                ) : aiConsentLoadState === 'error' ? (
                  <div className="flex flex-col items-start gap-3">
                    <p role="alert" className="m-0 text-[0.75rem] leading-relaxed text-red-600">
                      {aiConsentLoadError}
                    </p>
                    <button type="button" onClick={() => {
                      setAiConsentLoadState('loading');
                      setAiConsentLoadError(null);
                      void loadAiConsent().catch((err: unknown) => console.error('Error retrying AI consent lookup:', err));
                    }} className="mf-button mf-button--secondary !min-h-9 !px-3 text-xs">
                      Réessayer
                    </button>
                  </div>
                ) : aiConsent?.required ? (
                  <AiConsentNotice
                    key={aiConsent.current_version}
                    version={aiConsent.current_version}
                    isAccepting={isAcceptingAiConsent}
                    error={aiConsentActionError}
                    onAccept={() => void handleAcceptAiConsent()}
                  />
                ) : jobStatus === null ? (
                  <form onSubmit={handleLaunchPlanning} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label htmlFor="planning-prompt" className="text-[0.7rem] font-bold text-[#2F4858]">Votre consigne</label>
                      <textarea
                        id="planning-prompt"
                        value={planningPrompt}
                        onChange={(e) => setPlanningPrompt(e.target.value)}
                        placeholder="Ex: Rédige le plan détaillé du chapitre 3..."
                        className="w-full min-h-[70px] p-2.5 text-[0.78rem] bg-white border border-[#E5E9EB] rounded-xl resize-none focus:border-[#518B91] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#3E6976] focus-visible:outline-offset-2"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[0.7rem] font-bold text-[#2F4858]">Connecteurs de contexte actifs :</label>
                      {activeConnectors.length === 0 ? (
                        <span className="text-[0.7rem] text-slate-400 italic mt-0.5">
                          Aucun connecteur actif. Configurez-les dans Intégrations & Connecteurs.
                        </span>
                      ) : (
                        <div className="flex gap-3 flex-wrap mt-1">
                          {activeConnectors.map((prov) => (
                            <label key={prov} className="flex items-center gap-1.5 cursor-pointer text-[0.72rem] text-slate-600 font-semibold select-none">
                              <input
                                type="checkbox"
                                value={prov}
                                checked={selectedConnectors.includes(prov)}
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    setSelectedConnectors([...selectedConnectors, prov]);
                                  } else {
                                    setSelectedConnectors(selectedConnectors.filter(c => c !== prov));
                                  }
                                }}
                                className="accent-[#518B91] rounded border-slate-200"
                              />
                              <span className="capitalize">{prov}</span>
                            </label>
                          ))}
                        </div>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmittingJob || !planningPrompt.trim()}
                      className="mf-button mf-button--primary w-full"
                    >
                      {isSubmittingJob ? (
                        <span className="w-4 h-4 border-2 border-white/25 border-t-white rounded-full animate-spin"></span>
                      ) : (
                        <>
                          <svg className="stroke-white" width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                          </svg>
                          <span>Générer le Plan</span>
                        </>
                      )}
                    </button>
                    <span className="text-[0.62rem] text-slate-400 text-center block leading-tight">
                      Traité par Anthropic Claude avec les extraits des connecteurs sélectionnés.
                    </span>
                  </form>
                ) : (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[0.7rem] text-slate-400 font-bold">Statut du Job :</span>
                      <span className={`px-2 py-0.5 rounded text-[0.62rem] font-bold uppercase tracking-wide ${
                        jobStatus === 'completed'
                          ? 'bg-[#EAF3DE] text-[#639922]'
                          : jobStatus === 'failed'
                          ? 'bg-[#FCEBEB] text-[#E24B4A]'
                          : 'bg-[#FAEEDA] text-[#BA7517] animate-pulse'
                      }`}>
                        {jobStatus === 'pending' && 'En attente'}
                        {jobStatus === 'running' && 'Génération...'}
                        {jobStatus === 'completed' && 'Terminé'}
                        {jobStatus === 'failed' && 'Échoué'}
                      </span>
                    </div>

                    {(jobStatus === 'pending' || jobStatus === 'running') && (
                      <div className="flex flex-col gap-2">
                        <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden relative">
                          <div className="absolute inset-y-0 left-0 bg-[#518B91] w-1/3 rounded-full animate-pulse-slow"></div>
                        </div>
                        <span className="text-[0.68rem] text-slate-500 font-medium">
                          {jobStatus === 'pending' ? 'Le planificateur se prépare...' : 'Le planificateur rassemble le contexte et rédige le plan...'}
                        </span>
                      </div>
                    )}

                    {jobStatus === 'failed' && (
                      <div className="flex flex-col gap-2">
                        <p className="text-[0.72rem] text-red-500 font-medium leading-relaxed bg-[#FCEBEB] p-2.5 border border-red-100 rounded-lg">
                          {jobError || 'Échec de la tâche de planification.'}
                        </p>
                        <button
                          onClick={() => {
                            setJobStatus(null);
                            setJobResult(null);
                            setJobError(null);
                          }}
                          className="text-[#518B91] hover:text-[#3E6976] text-[0.72rem] font-bold cursor-pointer bg-transparent border-none text-left flex items-center gap-1 mt-1.5"
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            <path d="M23 4v6h-6M1 20v-6h6" />
                            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15" />
                          </svg>
                          <span>Réessayer</span>
                        </button>
                      </div>
                    )}

                    {jobStatus === 'completed' && (
                      <div className="flex flex-col gap-3">
                        <div className="text-[0.72rem] text-slate-600 leading-normal font-sans">
                          <div className="font-bold text-slate-700 mb-1">Résultat :</div>
                          <pre className="font-mono text-[0.68rem] leading-relaxed bg-white border border-[#E5E9EB] rounded-xl p-3 max-h-[180px] overflow-y-auto custom-scrollbar select-text text-[#2F4858]">
                            {typeof jobResult === 'object' ? JSON.stringify(jobResult, null, 2) : String(jobResult)}
                          </pre>
                        </div>

                        <div className="flex gap-2 mt-1">
                          <button
                            onClick={async () => {
                              let contentToInsert = '';
                              if (jobResult && typeof jobResult === 'object' && 'suggestions' in jobResult && Array.isArray((jobResult as any).suggestions)) {
                                contentToInsert = (jobResult as any).suggestions.join('\n');
                              } else {
                                contentToInsert = typeof jobResult === 'object' ? JSON.stringify(jobResult, null, 2) : String(jobResult);
                              }

                              if (selectedDocumentId) {
                                try {
                                  await apiFetch<any>(`/documents/${selectedDocumentId}/sections`, {
                                    method: 'POST',
                                    body: JSON.stringify({
                                      title: 'Plan Généré par l\'IA',
                                      content: contentToInsert,
                                    }),
                                  });
                                  addToast('success', 'Plan inséré', 'Le plan généré a été ajouté comme nouvelle section.');
                                  fetchSections(selectedDocumentId);
                                } catch (err) {
                                  console.error('Error inserting generated plan:', err);
                                  addToast('error', 'Erreur', 'Impossible d\'insérer le plan.');
                                }
                              }
                            }}
                            className="flex-1 bg-[#518B91] hover:bg-[#3E6976] text-white font-brand text-[0.72rem] font-bold py-2 rounded-lg border-none cursor-pointer transition-all text-center"
                          >
                            Insérer dans le document
                          </button>
                          
                          <button
                            onClick={() => {
                              setJobStatus(null);
                              setJobResult(null);
                              setJobError(null);
                              setPlanningPrompt('');
                            }}
                            className="bg-transparent border border-solid border-slate-200 hover:bg-slate-100 text-slate-600 font-brand text-[0.72rem] font-bold px-3 py-2 rounded-lg cursor-pointer transition-all"
                          >
                            Nouveau
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
