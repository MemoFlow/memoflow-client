import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileCirclePlus, faPenToSquare, faListCheck, faCalendarCheck } from '@fortawesome/free-solid-svg-icons';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { apiFetch } from '../services/api';
import type { GamificationMeResponseDto, LeaderboardEntryResponseDto } from '../services/api';

interface ProgressionPageProps {
  /** null for guests */
  userId: string | null;
  onRequestLogin: () => void;
  onRequestSignup: () => void;
}

const XP_RULES: { icon: IconDefinition; label: string; description: string; reward: string }[] = [
  { icon: faFileCirclePlus, label: 'Créer un document', description: 'Démarrer un mémoire, une thèse ou un rapport.', reward: '+50 XP' },
  { icon: faPenToSquare, label: 'Rédiger une section', description: 'Ajouter et compléter les parties de votre plan.', reward: '+25 XP' },
  { icon: faListCheck, label: 'Missions du jour', description: 'Atteindre les objectifs proposés chaque jour.', reward: '+150 à +200 XP' },
  { icon: faCalendarCheck, label: 'Régularité', description: "Écrire plusieurs jours d'affilée.", reward: 'Bonus de série' },
];

// Seed accounts created by the backend for development: not real users
const HIDDEN_LEADERBOARD_NAMES = new Set(['writer dev', 'admin dev']);

const cardClass ='bg-white border border-[#E5E9EB] rounded-xl p-6 shadow-[0_4px_20px_rgba(47,72,88,0.04)]';
const eyebrowClass = 'text-[0.68rem] font-bold text-slate-500 tracking-wider uppercase';

const MILESTONE_FR_MAP: Record<string, string> = {
  // Document milestones
  document_created: 'Document créé',
  first_document: 'Premier document créé',
  first_document_created: 'Premier document créé',
  document_completed: 'Document finalisé',
  document_exported: 'Document exporté',
  document_saved: 'Document sauvegardé',

  // Section milestones
  first_section: 'Première section',
  first_section_created: 'Première section rédigée',
  section_created: 'Section créée',
  section_completed: 'Section finalisée',

  // Word count & Writing activity
  words_written: 'Mots rédigés',
  words_100: '100 mots rédigés',
  words_500: '500 mots rédigés',
  words_1000: '1 000 mots rédigés',
  words_5000: '5 000 mots rédigés',
  words_10000: '10 000 mots rédigés',
  word_count: 'Cap de mots atteint',
  word_count_milestone: 'Objectif de volume atteint',

  // Templates
  template_applied: 'Modèle appliqué',
  template_used: 'Modèle appliqué',
  first_template: 'Premier modèle utilisé',
  first_template_applied: 'Premier modèle appliqué',
  template_created: 'Modèle personnalisé créé',

  // AI & Suggestions
  suggestion_applied: 'Suggestion IA appliquée',
  first_suggestion: 'Première suggestion acceptée',
  first_suggestion_applied: 'Première suggestion acceptée',
  planning_generated: 'Plan de rédaction généré',
  first_planning: 'Premier plan IA généré',
  ai_used: 'Assistance IA sollicitée',

  // Connectors
  connector_connected: 'Connecteur associé',
  connector_linked: 'Connecteur associé',
  first_connector: 'Premier connecteur configuré',
  first_connector_connected: 'Premier connecteur configuré',

  // Streaks & Engagement
  daily_streak: 'Série quotidienne',
  streak_3: 'Série de 3 jours',
  streak_7: 'Série de 7 jours',
  streak_14: 'Série de 14 jours',
  streak_30: 'Série de 30 jours',
  first_active_day: 'Première session d\'écriture',

  // Account
  first_login: 'Première connexion',
  account_created: 'Compte créé',
  level_up: 'Nouveau niveau atteint',
  challenge_completed: 'Défi complété',
};

function formatMilestoneType(type: string): string {
  if (!type) return 'Jalon atteint';
  const clean = type.toLowerCase().replace(/[\s-]+/g, '_').trim();

  if (MILESTONE_FR_MAP[clean]) {
    return MILESTONE_FR_MAP[clean];
  }

  // Dynamic fallback word substitutions
  const fr = clean
    .replace(/^document_created$/i, 'Document créé')
    .replace(/^first_section$/i, 'Première section')
    .replace(/^first_document$/i, 'Premier document')
    .replace(/_created$/i, ' créé(e)')
    .replace(/^first_/i, 'Premier(ère) ')
    .replace(/_completed$/i, ' terminé(e)')
    .replace(/_applied$/i, ' appliqué(e)')
    .replace(/_connected$/i, ' connecté(e)')
    .replace(/_linked$/i, ' associé(e)')
    .replace(/_exported$/i, ' exporté(e)')
    .replace(/document/gi, 'document')
    .replace(/section/gi, 'section')
    .replace(/template/gi, 'modèle')
    .replace(/connector/gi, 'connecteur')
    .replace(/streak/gi, 'série')
    .replace(/words?/gi, 'mots')
    .replace(/_+/g, ' ')
    .trim();

  return fr.charAt(0).toUpperCase() + fr.slice(1);
}

function formatMissionDescription(desc: string): string {
  if (!desc) return '';
  const trimmed = desc.trim();
  const lower = trimmed.toLowerCase();

  const MISSION_FR_MAP: Record<string, string> = {
    'write 500 words': 'Écrire 500 mots',
    'write 1000 words': 'Écrire 1 000 mots',
    'read 3 articles': 'Lire 3 articles de recherche',
    'create a document': 'Créer un document',
    'create your first document': 'Créer votre premier document',
    'create a section': 'Créer une section',
    'apply a suggestion': 'Appliquer une suggestion de reformulation',
    'generate a plan': 'Générer un plan de rédaction',
    'connect an app': 'Associer une application externe',
  };

  if (MISSION_FR_MAP[lower]) {
    return MISSION_FR_MAP[lower];
  }

  return trimmed
    .replace(/write (\d+) words/gi, 'Écrire $1 mots')
    .replace(/read (\d+) articles/gi, 'Lire $1 articles')
    .replace(/create a new document/gi, 'Créer un nouveau document')
    .replace(/create a new section/gi, 'Créer une nouvelle section')
    .replace(/apply a suggestion/gi, 'Appliquer une suggestion');
}

function EmptyState({ children }: { children: React.ReactNode }) {
  return <p className="text-[0.8rem] text-slate-400 font-medium italic py-2">{children}</p>;
}

export default function ProgressionPage({ userId, onRequestLogin, onRequestSignup }: ProgressionPageProps) {
  const [profile, setProfile] = useState<GamificationMeResponseDto | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntryResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(userId !== null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!userId) return;
    let cancelled = false;

    Promise.allSettled([
      apiFetch<GamificationMeResponseDto>('/gamification/me'),
      apiFetch<LeaderboardEntryResponseDto[]>('/gamification/leaderboard'),
    ]).then(([me, board]) => {
      if (cancelled) return;
      if (me.status === 'fulfilled') setProfile(me.value);
      else setError('Impossible de récupérer votre progression.');
      if (board.status === 'fulfilled') {
        setLeaderboard(
          (board.value || []).filter((e) => !HIDDEN_LEADERBOARD_NAMES.has(e.display_name.trim().toLowerCase()))
        );
      }
      setIsLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  if (!userId) {
    return (
      <div className="max-w-[640px] mx-auto mt-10 bg-white border border-[#E5E9EB] rounded-2xl p-10 text-center flex flex-col items-center gap-3 shadow-[0_4px_20px_rgba(47,72,88,0.04)]">
        <h2 className="text-[1.3rem] font-bold text-[#2F4858] tracking-tight">Suivez votre progression</h2>
        <p className="text-[0.85rem] text-slate-500 leading-relaxed max-w-[460px]">
          L'XP, les niveaux, les missions quotidiennes et le classement sont réservés aux comptes MemoFlow.
          En mode invité, aucune donnée n'est enregistrée.
        </p>
        <div className="flex gap-2.5 mt-3">
          <button
            onClick={onRequestLogin}
            className="px-4 py-2 rounded-xl text-[0.82rem] font-bold bg-white text-[#2F4858] border border-solid border-slate-200 hover:bg-slate-50 cursor-pointer"
          >
            Se connecter
          </button>
          <button
            onClick={onRequestSignup}
            className="px-4 py-2 rounded-xl text-[0.82rem] font-bold bg-[#2F4858] hover:bg-[#3E6976] text-white border-none cursor-pointer"
          >
            Créer un compte
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="w-8 h-8 border-3 border-[#94D2B8]/30 border-t-[#518B91] rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="max-w-[640px] mx-auto mt-10 p-4 bg-[#FCEBEB] border border-[#E24B4A]/25 text-[#E24B4A] rounded-xl text-[0.85rem] font-medium">
        {error}
      </div>
    );
  }

  const missions = profile.today_missions || [];
  const milestones = profile.milestones || [];

  return (
    <div className="max-w-[1200px] mx-auto grid grid-cols-12 gap-6">
      {/* LEFT: level + milestones + how to earn XP */}
      <div className="col-span-8 flex flex-col gap-6 max-lg:col-span-12">
        <div className={cardClass}>
          <span className={eyebrowClass}>Niveau actuel</span>
          <div className="flex justify-between items-end mt-1 gap-4 flex-wrap">
            <h2 className="text-[1.75rem] font-bold text-[#2F4858] tracking-tight">Niveau {profile.level}</h2>
            <span className="text-[0.8rem] font-semibold text-slate-500">
              <strong className="text-[#2F4858] text-[1.1rem] font-bold">{profile.xp.toLocaleString('fr-FR')}</strong> XP
            </span>
          </div>
        </div>

        {/* Comment gagner de l'XP */}
        <div className={cardClass}>
          <h3 className="text-[0.98rem] font-bold text-[#2F4858] tracking-tight">Comment gagner de l'XP</h3>
          <p className="text-[0.8rem] text-slate-500 mt-1 mb-2">
            L'XP récompense la régularité et l'avancement de vos documents.
          </p>

          <ul className="divide-y divide-[#E5E9EB]">
            {XP_RULES.map((rule) => (
              <li key={rule.label} className="flex items-center gap-4 py-3.5">
                <span className="w-9 h-9 flex-shrink-0 rounded-lg bg-[#F1F5F7] text-[#518B91] flex items-center justify-center">
                  <FontAwesomeIcon icon={rule.icon} className="text-[0.95rem]" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[0.85rem] font-semibold text-[#2F4858] m-0">{rule.label}</p>
                  <p className="text-[0.75rem] text-slate-500 m-0 mt-0.5">{rule.description}</p>
                </div>
                <span className="flex-shrink-0 text-[0.8rem] font-bold text-[#3E6976] whitespace-nowrap">{rule.reward}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className={cardClass}>
          <span className={eyebrowClass}>Jalons atteints</span>
          <div className="flex flex-col gap-3 mt-4">
            {milestones.length === 0 ? (
              <EmptyState>Aucun jalon atteint pour le moment. Continuez à rédiger !</EmptyState>
            ) : (
              milestones.map((m) => (
                <div key={m.id} className="flex justify-between items-center gap-3 p-3.5 rounded-xl border border-[#E5E9EB] bg-[#F8FAFB]">
                  <div className="flex flex-col">
                    <span className="text-[0.85rem] font-bold text-[#2F4858]">{formatMilestoneType(m.milestone_type)}</span>
                    <span className="text-[0.72rem] text-slate-400 font-medium">
                      {new Date(m.created_at).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                  <span className="text-[0.78rem] font-bold text-[#518B91]">+{m.xp_awarded} XP</span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* RIGHT: leaderboard + daily missions */}
      <div className="col-span-4 flex flex-col gap-6 max-lg:col-span-12">
        <div className={cardClass}>
          <h3 className="text-[0.98rem] font-bold text-[#2F4858] tracking-tight mb-5">Classement</h3>
          <div className="flex flex-col gap-3">
            {leaderboard.length === 0 ? (
              <EmptyState>Le classement n'est pas disponible.</EmptyState>
            ) : (
              leaderboard.map((entry, index) => {
                const isSelf = entry.user_id === userId;
                return (
                  <div
                    key={entry.user_id}
                    className={`flex items-center justify-between gap-2 p-2.5 rounded-xl transition-all ${
                      isSelf
                        ? 'bg-[#EAF3DE]/40 border border-[#94D2B8]/40 text-[#2F4858]'
                        : 'bg-[#F8FAFB] border border-slate-100 text-slate-600'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <span className={`text-[0.8rem] font-bold w-4 text-center ${index === 0 ? 'text-[#3E6976]' : 'text-slate-400'}`}>
                        {index + 1}
                      </span>
                      <div className={`w-7 h-7 flex-shrink-0 rounded-full flex items-center justify-center font-bold text-xs ${
                        isSelf ? 'bg-[#94D2B8]/30 border border-[#94D2B8]/50 text-[#2F4858]' : 'bg-slate-200 border border-slate-300 text-slate-500'
                      }`}>
                        {entry.display_name.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-[0.82rem] font-bold truncate" title={entry.display_name}>
                        {entry.display_name}{isSelf ? ' (Vous)' : ''}
                      </span>
                    </div>
                    <span className="flex-shrink-0 text-[0.8rem] font-bold text-[#3E6976]">
                      {entry.xp.toLocaleString('fr-FR')} <span className="text-[0.62rem] text-slate-400 font-medium">XP</span>
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>

        <div className={cardClass}>
          <span className={eyebrowClass}>Missions du jour</span>
          <div className="flex flex-col gap-4 mt-5">
            {missions.length === 0 ? (
              <EmptyState>Aucune mission disponible aujourd'hui.</EmptyState>
            ) : (
              missions.map(({ mission, completed }) => (
                <div key={mission.id} className="flex items-start justify-between gap-3">
                  <div className="flex flex-col gap-0.5">
                    <span className={`text-[0.82rem] font-semibold leading-tight ${completed ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                      {formatMissionDescription(mission.description)}
                    </span>
                    <span className="text-[0.7rem] text-[#518B91] font-bold">Récompense : +{mission.xp_reward} XP</span>
                  </div>
                  <span
                    aria-label={completed ? 'Mission terminée' : 'Mission en cours'}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border border-solid flex items-center justify-center ${
                      completed ? 'bg-[#94D2B8] border-[#94D2B8] text-[#0f4c3a]' : 'border-slate-300'
                    }`}
                  >
                    {completed && (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.5">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
