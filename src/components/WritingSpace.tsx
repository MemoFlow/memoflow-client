import { useState, useEffect, useRef } from 'react';
import {
  getToken,
  connectSocket,
  disconnectSocket,
  subscribeToJob,
  apiFetch
} from '../services/api';
import type { ConnectorResponseDto, PlanningJobResponseDto } from '../services/api';

interface Message {
  id: number;
  sender: 'user' | 'assistant';
  text: string;
}

interface WritingSpaceProps {
  isFocusMode: boolean;
  onToggleFocusMode: (focus: boolean) => void;
  userName: string;
  addToast: (type: 'success' | 'assistant' | 'warning' | 'error', title: string, message: string) => void;
}

export default function WritingSpace({
  isFocusMode,
  onToggleFocusMode,
  userName,
  addToast,
}: WritingSpaceProps) {
  // Planning States
  const [activeConnectors, setActiveConnectors] = useState<string[]>([]);
  const [selectedConnectors, setSelectedConnectors] = useState<string[]>([]);
  const [planningPrompt, setPlanningPrompt] = useState('');
  const [jobStatus, setJobStatus] = useState<'pending' | 'running' | 'completed' | 'failed' | null>(null);
  const [jobResult, setJobResult] = useState<unknown>(null);
  const [jobError, setJobError] = useState<string | null>(null);
  const [isSubmittingJob, setIsSubmittingJob] = useState(false);

  const activeJobIdRef = useRef<string | null>(null);
  const pollIntervalRef = useRef<number | null>(null);

  // Load active connectors to display checkboxes
  useEffect(() => {
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
        }),
      });

      activeJobIdRef.current = res.job_id;

      // Subscribe over WebSocket
      subscribeToJob(res.job_id);

      // Start REST polling fallback
      startPollInterval(res.job_id);
    } catch (err: unknown) {
      console.error('Error starting planning job:', err);
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
  // Document states
  const [editorText, setEditorText] = useState(
    `La relation entre les stimuli environnementaux et l'état de « flux » dans la recherche académique reste une pierre angulaire de l'ergonomie cognitive moderne. Historiquement, les chercheurs ont été confrontés au paradoxe de la densité de l'information par rapport à la charge cognitive. Au fur et à mesure que les espaces de travail numériques évoluent, la transition de la prise de notes linéaire vers la cartographie des connaissances en réseau offre une perspective unique sur la manière dont le cerveau humain traite les ensembles de données complexes.`
  );

  const [frameworkText, setFrameworkText] = useState(
    `Pour mesurer l'efficacité de ce protocole, nous avons mené une étude sur 12 mois impliquant 150 étudiants de troisième cycle. Les participants ont été répartis en deux cohortes : la cohorte A a utilisé une interface minimaliste sans distraction avec un système contextuel automatisé, tandis que la cohorte B a utilisé des méthodes d'organisation traditionnelles.`
  );

  const [documentTitle, setDocumentTitle] = useState(
    "L'Impact du Flux Neural sur l'Élasticité Cognitive : Une Étude Longitudinale de l'Interactivité des Espaces de Travail Numériques"
  );

  // Assistant chatbot states
  const [chatMessages, setChatMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'assistant',
      text: `Bonjour ${userName}. Je peux vous aider à reformuler vos phrases, vérifier vos citations ou analyser la structure de votre document. Que souhaitez-vous faire ?`,
    },
  ]);
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Interactive Checklist States
  const [checks, setChecks] = useState([
    {
      id: 1,
      text: "L'introduction définit clairement l'« Élasticité Cognitive ».",
      completed: true,
    },
    {
      id: 2,
      text: "Pensez à ajouter une transition entre « Méthodologie » et « Résultats ».",
      completed: false,
    },
  ]);

  // Scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isTyping]);

  const handleApplySuggestion = () => {
    setEditorText(
      `Les universitaires s'intéressent depuis longtemps à la tension entre la densité d'information et la capacité cognitive. Avec l'évolution des espaces de travail numériques, le passage de la prise de notes linéaire traditionnelle à la cartographie des connaissances en réseau offre un angle d'observation privilégié sur le traitement des données multidimensionnelles par le cerveau humain.`
    );
    // Add assistant toast message
    setChatMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        sender: 'assistant',
        text: 'La suggestion de reformulation a été appliquée avec succès dans votre paragraphe.',
      },
    ]);
  };

  const handleSendChatMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userMsg: Message = {
      id: Date.now(),
      sender: 'user',
      text: chatInput,
    };

    setChatMessages((prev) => [...prev, userMsg]);
    const currentInput = chatInput.trim().toLowerCase();
    setChatInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      let reply = "Je peux analyser votre texte pour y ajouter des citations adaptées.";

      if (currentInput.includes('reformule') || currentInput.includes('suggestion')) {
        reply = "Je vous conseille d'appliquer la suggestion de reformulation disponible dans le panneau latéral droit. Elle simplifie la structure de votre paragraphe.";
      } else if (currentInput.includes('titre')) {
        reply = "Voici une suggestion de titre alternatif : 'Flux Neural et Élasticité Cognitive : Analyse de l'interactivité des espaces numériques'. Qu'en pensez-vous ?";
      } else if (currentInput.includes('kahneman') || currentInput.includes('reference')) {
        reply = "J'ai trouvé la référence suivante dans votre base de données : Kahneman, D. (2011) 'Thinking, Fast and Slow'. Souhaitez-vous que je l'insère ?";
      } else if (currentInput.includes('focus')) {
        reply = "Le mode focus masque la barre latérale et l'assistant pour vous laisser vous concentrer uniquement sur votre rédaction. Cliquez sur 'Mode Focus' dans la barre flottante du bas pour l'essayer.";
      } else {
        reply = `J'ai bien reçu votre message. Je surveille la structure de votre document (${documentTitle.split(':')[0]}). N'hésitez pas à me demander de reformuler des passages complexes !`;
      }

      setChatMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          sender: 'assistant',
          text: reply,
        },
      ]);
    }, 1000);
  };

  const toggleCheck = (id: number) => {
    setChecks(
      checks.map((c) => (c.id === id ? { ...c, completed: !c.completed } : c))
    );
  };

  return (
    <div className="flex-1 flex flex-col h-full overflow-hidden bg-[#F8FAFB]">
      {/* Writing Space Sub-Header */}
      {!isFocusMode && (
        <header className="h-[76px] px-8 flex-shrink-0 border-b border-[#E5E9EB] bg-white flex justify-between items-center z-20 shadow-[0_1px_4px_rgba(0,0,0,0.01)] transition-all duration-300">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2.5 text-slate-500 font-brand text-[0.88rem] font-semibold">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-slate-400"
            >
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
            </svg>
            <span>Neuroscience</span>
            <span className="text-slate-300">/</span>
            <span className="text-slate-400 font-medium">Brouillons</span>
          </div>

          {/* Reference Search bar */}
          <div className="relative w-[300px]">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </span>
            <input
              type="text"
              placeholder="Rechercher des références..."
              className="w-full pl-10 pr-4 py-2 text-[0.85rem] bg-[#F1F5F7] border border-[#E5E9EB] rounded-xl text-slate-800 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-[#518B91] transition-all"
            />
          </div>

          {/* Right Profile / Widgets */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-500 hover:text-[#2F4858] hover:bg-slate-100 rounded-xl transition-all border-none bg-transparent cursor-pointer">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
            </button>
            <button className="p-2 text-slate-500 hover:text-[#2F4858] hover:bg-slate-100 rounded-xl transition-all border-none bg-transparent cursor-pointer">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="8" r="7" />
                <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
              </svg>
            </button>
            <div className="h-8 w-8 rounded-full overflow-hidden bg-[#94D2B8]/30 border border-[#94D2B8]/40 flex items-center justify-center text-[#2F4858] font-bold text-sm">
              {userName.charAt(0)}
            </div>
          </div>
        </header>
      )}

      {/* Main Workspace split */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* LEFT COLUMN: EDITOR */}
        <div
          className={`flex-1 overflow-y-auto custom-scrollbar flex flex-col p-8 transition-all duration-300 relative ${
            isFocusMode ? 'max-w-[800px] mx-auto px-4 py-16' : ''
          }`}
        >
          {/* Main Document Content */}
          <div className="flex flex-col gap-6 max-w-[760px] mx-auto w-full pb-28">
            {/* Version Badge */}
            <div>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-[0.68rem] font-bold uppercase tracking-wider bg-[#EAF3DE] text-[#639922] border border-[#639922]/10">
                Brouillon V2.4
              </span>
            </div>

            {/* Editable Title */}
            <input
              type="text"
              value={documentTitle}
              onChange={(e) => setDocumentTitle(e.target.value)}
              className="w-full text-[2rem] font-extrabold text-[#2F4858] tracking-tight leading-tight border-none outline-none bg-transparent font-brand"
            />

            {/* Meta Row */}
            <div className="flex items-center gap-5 text-slate-400 text-[0.78rem] font-semibold flex-wrap">
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Mis à jour le 24 oct. 2023
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10 9 9 9 8 9" />
                </svg>
                1 248 Mots
              </span>
              <span className="flex items-center gap-1.5">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
                8 min de lecture
              </span>
            </div>

            <hr className="border-0 border-b border-solid border-[#E5E9EB] my-1" />

            {/* Paragraph 1 */}
            <textarea
              value={editorText}
              onChange={(e) => setEditorText(e.target.value)}
              className="w-full text-[0.92rem] text-[#2F4858] leading-relaxed font-medium bg-transparent border-none outline-none resize-none h-[150px] focus:ring-0 focus:outline-none"
            />

            {/* Quote block */}
            <div className="bg-[#F8FAFA] border-l-4 border-solid border-[#518B91] rounded-r-xl p-5 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
              <p className="text-[0.9rem] italic text-slate-700 leading-relaxed font-medium">
                "L'élasticité cognitive n'est pas simplement la capacité de stocker des informations, mais la capacité de restructurer les associations neurales en temps réel lorsqu'elles sont exposées à divers points d'ancrage contextuels."
              </p>
              <p className="text-[0.8rem] text-[#3E6976] mt-2 font-bold uppercase tracking-wider pl-0.5">
                — Dr. Elena Vance (2022)
              </p>
            </div>

            {/* Subtitle */}
            <h3 className="text-[1.35rem] font-bold text-[#2F4858] font-brand tracking-tight mt-4">
              Cadre Méthodologique
            </h3>

            {/* Paragraph 2 */}
            <textarea
              value={frameworkText}
              onChange={(e) => setFrameworkText(e.target.value)}
              className="w-full text-[0.92rem] text-[#2F4858] leading-relaxed font-medium bg-transparent border-none outline-none resize-none h-[180px] focus:ring-0 focus:outline-none"
            />
          </div>

          {/* FLOATING TEXT FORMATTING BAR */}
          <div
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#2F4858] text-white shadow-2xl px-5 py-3 rounded-2xl flex items-center gap-5 transition-all duration-300 z-30 ${
              isFocusMode ? 'scale-105' : ''
            }`}
          >
            {/* Bold */}
            <button className="bg-transparent hover:bg-slate-700/60 p-1.5 rounded-lg border-none text-slate-300 hover:text-white cursor-pointer transition-colors font-bold text-sm w-8 h-8 flex items-center justify-center">
              G
            </button>
            {/* Italic */}
            <button className="bg-transparent hover:bg-slate-700/60 p-1.5 rounded-lg border-none text-slate-300 hover:text-white cursor-pointer transition-colors italic text-sm w-8 h-8 flex items-center justify-center">
              I
            </button>
            {/* List */}
            <button className="bg-transparent hover:bg-slate-700/60 p-1.5 rounded-lg border-none text-slate-300 hover:text-white cursor-pointer transition-colors w-8 h-8 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <line x1="8" y1="6" x2="21" y2="6" />
                <line x1="8" y1="12" x2="21" y2="12" />
                <line x1="8" y1="18" x2="21" y2="18" />
                <line x1="3" y1="6" x2="3.01" y2="6" />
                <line x1="3" y1="12" x2="3.01" y2="12" />
                <line x1="3" y1="18" x2="3.01" y2="18" />
              </svg>
            </button>
            {/* Link */}
            <button className="bg-transparent hover:bg-slate-700/60 p-1.5 rounded-lg border-none text-slate-300 hover:text-white cursor-pointer transition-colors w-8 h-8 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
                <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
              </svg>
            </button>
            {/* Blockquote */}
            <button className="bg-transparent hover:bg-slate-700/60 p-1.5 rounded-lg border-none text-slate-300 hover:text-white cursor-pointer transition-colors w-8 h-8 flex items-center justify-center">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
            </button>

            <div className="w-[1px] h-6 bg-slate-600"></div>

            {/* Focus Mode button */}
            <button
              onClick={() => onToggleFocusMode(!isFocusMode)}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-brand flex items-center gap-1.5 cursor-pointer border-none transition-all ${
                isFocusMode
                  ? 'bg-white hover:bg-slate-100 text-[#2F4858]'
                  : 'bg-[#94D2B8] hover:bg-[#6DAEA7] text-[#0F4C3A] shadow-md shadow-[#94D2B8]/10'
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
        <aside
          className={`w-[360px] border-l border-solid border-[#E5E9EB] bg-white flex flex-col justify-between overflow-hidden transition-all duration-350 ${
            isFocusMode ? 'w-0 opacity-0 border-none pointer-events-none' : 'opacity-100'
          }`}
        >
          {/* Assistant Header & Widgets */}
          <div className="flex-1 flex flex-col gap-5 p-5 overflow-y-auto custom-scrollbar">
            {/* Assistant Brand Title */}
            <div className="flex items-center gap-2 text-[#518B91]">
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

            {/* Section 1: Structural Guide */}
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-[0.68rem] font-bold text-slate-400 tracking-wider uppercase">
                  Guide Structurel
                </span>
                <span className="inline-flex items-center px-2 py-0.5 rounded-md text-[0.62rem] font-bold bg-[#EAF3DE] text-[#639922]">
                  75% Complété
                </span>
              </div>

              {/* Checks */}
              <div className="flex flex-col gap-2.5">
                {checks.map((chk) => (
                  <button
                    key={chk.id}
                    onClick={() => toggleCheck(chk.id)}
                    className="w-full text-left p-3.5 bg-[#F8FAFB] hover:bg-slate-50/80 border border-solid border-[#E5E9EB] rounded-xl flex gap-3 items-start transition-all cursor-pointer"
                  >
                    <span
                      className={`flex-shrink-0 w-4 h-4 rounded-full border border-solid flex items-center justify-center mt-0.5 transition-all ${
                        chk.completed
                          ? 'bg-[#EAF3DE] border-[#639922] text-[#639922]'
                          : 'border-slate-300 bg-transparent text-transparent'
                      }`}
                    >
                      {chk.completed && (
                        <svg
                          width="10"
                          height="10"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      )}
                    </span>
                    <span
                      className={`text-[0.78rem] leading-snug font-medium transition-all ${
                        chk.completed ? 'text-slate-500' : 'text-slate-700'
                      }`}
                    >
                      {chk.text}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Section 2: Planificateur de Rédaction (Async Planning Jobs) */}
            <div className="flex flex-col gap-3">
              <span className="text-[0.68rem] font-bold text-slate-400 tracking-wider uppercase">
                Planificateur de Rédaction (IA)
              </span>
              
              <div className="bg-[#F8FAFB] border border-solid border-[#E5E9EB] rounded-xl p-4 flex flex-col gap-3.5 relative overflow-hidden">
                {jobStatus === null ? (
                  <form onSubmit={handleLaunchPlanning} className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1">
                      <label className="text-[0.7rem] font-bold text-[#2F4858]">Consigne / Prompt :</label>
                      <textarea
                        value={planningPrompt}
                        onChange={(e) => setPlanningPrompt(e.target.value)}
                        placeholder="Ex: Rédige le plan détaillé du chapitre 3..."
                        className="w-full min-h-[70px] p-2.5 text-[0.78rem] bg-white border border-[#E5E9EB] rounded-xl resize-none focus:border-[#518B91]"
                      />
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className="text-[0.7rem] font-bold text-[#2F4858]">Connecteurs de contexte actifs :</label>
                      {activeConnectors.length === 0 ? (
                        <span className="text-[0.7rem] text-slate-400 italic mt-0.5">
                          Aucun connecteur actif. Configurez-les dans le Centre de Contexte.
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
                      className="w-full bg-[#2F4858] hover:bg-[#3E6976] text-white font-brand text-[0.78rem] font-bold py-2.5 rounded-xl border-none cursor-pointer disabled:opacity-50 transition-all flex items-center justify-center gap-1.5"
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
                            onClick={() => {
                              const resultStr = typeof jobResult === 'object' ? JSON.stringify(jobResult, null, 2) : String(jobResult);
                              setEditorText((prev) => `${prev}\n\n[Plan Généré]\n${resultStr}`);
                              addToast('success', 'Plan inséré', 'Le plan généré a été ajouté à votre espace d\'écriture.');
                            }}
                            className="flex-1 bg-[#518B91] hover:bg-[#3E6976] text-white font-brand text-[0.72rem] font-bold py-2 rounded-lg border-none cursor-pointer transition-all text-center"
                          >
                            Insérer dans le brouillon
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

            {/* Section 3: Reformulation Suggestions */}
            <div className="flex flex-col gap-3">
              <span className="text-[0.68rem] font-bold text-slate-400 tracking-wider uppercase">
                Suggestions de Reformulation
              </span>

              {/* Reformulation card */}
              <div className="bg-[#F1F5F7] border border-solid border-[#E5E9EB] rounded-xl p-4 flex flex-col gap-3.5 relative overflow-hidden">
                <div className="flex flex-col gap-1">
                  <span className="text-[0.68rem] font-bold text-slate-400">
                    Texte sélectionné :
                  </span>
                  <p className="text-[0.75rem] text-slate-500 italic font-medium leading-relaxed">
                    "Historically, researchers have grappled with the paradox..."
                  </p>
                </div>

                <div className="bg-white border border-solid border-slate-200/80 rounded-lg p-3.5 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <p className="text-[0.78rem] text-[#2F4858] font-semibold leading-relaxed">
                    "Les universitaires s'intéressent depuis longtemps à la tension entre la densité d'information et la capacité cognitive..."
                  </p>
                </div>

                <div className="flex justify-end">
                  <button
                    onClick={handleApplySuggestion}
                    className="bg-transparent hover:text-[#518B91] text-[#639922] font-brand text-[0.72rem] font-bold tracking-wider cursor-pointer border-none flex items-center gap-1.5 transition-colors uppercase"
                  >
                    Appliquer la suggestion
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Section 3: Contextual References */}
            <div className="flex flex-col gap-3">
              <span className="text-[0.68rem] font-bold text-slate-400 tracking-wider uppercase">
                Références Contextuelles
              </span>

              <div className="flex flex-col gap-2.5">
                {/* Ref 1 */}
                <div className="p-3.5 bg-white border border-solid border-[#E5E9EB] rounded-xl flex flex-col gap-1 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <h4 className="text-[0.8rem] font-bold text-[#2F4858]">
                    Vance, E. (2022)
                  </h4>
                  <p className="text-[0.72rem] text-slate-500 leading-normal font-medium">
                    "Échafaudages neuronaux dans les environnements d'apprentissage numériques : Une étude d'expérience utilisateur."
                  </p>
                </div>

                {/* Ref 2 */}
                <div className="p-3.5 bg-white border border-solid border-[#E5E9EB] rounded-xl flex flex-col gap-1 shadow-[0_2px_8px_rgba(0,0,0,0.01)]">
                  <h4 className="text-[0.8rem] font-bold text-[#2F4858]">
                    Kahneman, D. (2011)
                  </h4>
                  <p className="text-[0.72rem] text-slate-500 leading-normal font-medium">
                    "Système 1, Système 2 : Les deux vitesses de la pensée."
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Assistant chatbot input area */}
          <div className="border-t border-solid border-[#E5E9EB] p-4 bg-[#F8FAFB]">
            {/* Mini Message feed */}
            <div className="max-h-[140px] overflow-y-auto flex flex-col gap-2.5 mb-3.5 p-1 custom-scrollbar text-[0.75rem]">
              {chatMessages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col gap-0.5 max-w-[85%] ${
                    msg.sender === 'user' ? 'self-end items-end' : 'self-start'
                  }`}
                >
                  <span className="text-[0.62rem] text-slate-400 font-bold">
                    {msg.sender === 'user' ? userName : 'Assistant'}
                  </span>
                  <div
                    className={`p-2.5 rounded-xl font-medium leading-relaxed ${
                      msg.sender === 'user'
                        ? 'bg-[#2F4858] text-white rounded-tr-none shadow-[0_2px_6px_rgba(47,72,88,0.1)]'
                        : 'bg-white text-slate-700 border border-solid border-[#E5E9EB] rounded-tl-none shadow-[0_2px_6px_rgba(0,0,0,0.01)]'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="self-start flex flex-col gap-0.5">
                  <span className="text-[0.62rem] text-slate-400 font-bold">
                    Assistant
                  </span>
                  <div className="p-2 bg-white text-slate-400 border border-solid border-[#E5E9EB] rounded-xl rounded-tl-none flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                    <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>

            {/* Input field */}
            <form
              onSubmit={handleSendChatMessage}
              className="relative flex items-center bg-white border border-solid border-[#E5E9EB] rounded-xl p-1 shadow-sm"
            >
              <input
                type="text"
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Demander à l'assistant..."
                className="flex-1 pl-3 pr-10 py-2 text-[0.8rem] text-slate-800 placeholder-slate-400 focus:outline-none border-none"
              />
              <button
                type="submit"
                className="absolute right-1 w-8 h-8 rounded-lg bg-[#2F4858] hover:bg-[#3E6976] text-white flex items-center justify-center border-none transition-colors cursor-pointer"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>
        </aside>
      </div>
    </div>
  );
}
