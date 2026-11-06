import { useEffect, useState } from 'react';

export type PrivacyModalTab = 'overview' | 'data' | 'third-parties' | 'rights' | 'terms';

interface PrivacyDataModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: PrivacyModalTab;
}

const SECTIONS: { id: PrivacyModalTab; label: string }[] = [
  { id: 'overview', label: 'Présentation' },
  { id: 'data', label: 'Données collectées' },
  { id: 'third-parties', label: 'Sous-traitants' },
  { id: 'rights', label: 'Conservation et droits' },
  { id: 'terms', label: "Conditions d'utilisation" },
];

// Source : privacy-data-inventory.md (section 2)
const DATA_CATEGORIES = [
  {
    title: 'Compte et identité',
    fields: 'email, password_hash, display_name, role',
    purpose: "Authentification, gestion de session et contrôle d'accès.",
    storage: 'PostgreSQL — users',
  },
  {
    title: 'Questionnaire de bienvenue',
    fields:
      'statut (alternant, stagiaire…), type de document à rendre, date de rendu, niveau d’études, école (facultatif), outils utilisés, difficultés, canal par lequel vous avez connu MemoFlow, date d’envoi',
    purpose: 'Adapter l’espace (modèle proposé, connecteurs) et orienter les évolutions du produit.',
    storage: 'Backend MemoFlow — onboarding',
  },
  {
    title: 'Consentement aux communications',
    fields: 'accord pour être contacté par email (oui / non), date du dernier changement',
    purpose:
      'Savoir si vous acceptez de recevoir des conseils de méthodologie et des offres par email. Demandé à l’inscription, décoché par défaut, modifiable à tout moment dans Paramètres. Jusqu’à l’envoi du questionnaire de bienvenue, ce choix est seulement gardé dans votre navigateur.',
    storage: 'Backend MemoFlow — onboarding',
  },
  {
    title: 'Score d’intérêt',
    fields:
      'score, catégorie, action suggérée, détail des critères (échéance, statut, outils cités, application connectée, affichage de l’offre Pro lors d’un export)',
    purpose:
      'Aider l’équipe MemoFlow à choisir qui contacter en priorité. Visible uniquement par les administrateurs, jamais affiché aux utilisateurs. Sans votre accord aux communications, aucun contact n’est suggéré. Aucun email n’est envoyé automatiquement.',
    storage: 'Backend MemoFlow — lead scoring',
  },
  {
    title: 'Mesure d’audience (si vous l’acceptez)',
    fields:
      'pages consultées, durée et date des visites, source de la visite (site, réseau social, campagne), type d’appareil et de navigateur, pays, événements anonymes (inscription, connexion, outil connecté, plan généré), identifiant de cookie Google Analytics',
    purpose:
      'Comprendre comment MemoFlow est utilisé pour l’améliorer. Aucun cookie n’est déposé sans votre accord, aucune donnée publicitaire n’est activée, et aucun email, nom ou contenu de document n’est transmis. Choix modifiable dans Paramètres.',
    storage: 'Google Analytics 4 — cookies _ga (13 mois au plus)',
  },
  {
    title: 'Activité et progression',
    fields: 'last_active_at, xp, level',
    purpose: 'Suivi de la régularité, calcul du niveau et classement.',
    storage: 'PostgreSQL — users',
  },
  {
    title: 'Documents et contenus',
    fields: 'titres, types et statuts des documents, titres et textes des sections, modèles personnels',
    purpose: 'Rédaction et structuration de vos travaux.',
    storage: 'PostgreSQL — documents, sections, templates',
  },
  {
    title: 'Historique des versions',
    fields: 'copies des sections, libellé facultatif, identifiants utilisateur et document',
    purpose: 'Points de restauration de vos documents.',
    storage: 'MongoDB — document_versions',
  },
  {
    title: 'Assistance IA',
    fields: 'consignes, connecteurs sélectionnés, extraits de contexte, résultats, textes originaux et suggérés',
    purpose: 'Suggestions de reformulation et planification de chapitres.',
    storage: 'MongoDB — planning_jobs ; PostgreSQL — ai_suggestions',
  },
  {
    title: 'Applications connectées',
    fields: 'fournisseur (Trello, Notion, GitHub), identifiant de compte Composio, statut, date de connexion',
    purpose: 'Référence vers la connexion gérée par Composio. Aucun jeton OAuth n’est stocké par MemoFlow.',
    storage: 'PostgreSQL — connector_connections',
  },
  {
    title: 'Gamification',
    fields: 'jalons atteints, progression des missions quotidiennes',
    purpose: "Attribution de l'XP et validation des missions.",
    storage: 'PostgreSQL — milestones, mission_progress',
  },
  {
    title: "Journal d'audit",
    fields: "identifiant utilisateur, type d'action, métadonnées, horodatage",
    purpose:
      'Traçabilité des connexions, révocations de connecteurs et revues de suggestions. En cas de connexion échouée, l’email saisi est enregistré pour détecter les attaques par force brute. L’adresse IP n’est pas enregistrée.',
    storage: 'PostgreSQL — audit_logs',
  },
];

// Source : privacy-data-inventory.md (section 3)
const THIRD_PARTIES = [
  {
    name: 'Anthropic (Claude)',
    role: 'Génération IA',
    data: 'Consignes de planification avec leur contexte, texte des sections à reformuler.',
  },
  {
    name: 'Composio',
    role: 'Gestion des connexions OAuth',
    data: 'Identifiant utilisateur ; conserve les autorisations Notion, Trello et GitHub.',
  },
  {
    name: 'Render',
    role: "Hébergement de l'API",
    data: 'Requêtes HTTP (chiffrées en transit) et journaux d’exécution temporaires.',
  },
  {
    name: 'Neon',
    role: 'Base PostgreSQL',
    data: 'Comptes, documents, sections, suggestions, audit.',
  },
  {
    name: 'MongoDB Atlas',
    role: 'Base documentaire',
    data: 'Historique des versions et tâches de planification.',
  },
  {
    name: 'Upstash',
    role: "Files d'attente (Redis)",
    data: 'Identifiants techniques uniquement (jobId, userId).',
  },
  {
    name: 'CloudAMQP et n8n',
    role: 'Collecte du contexte',
    data: 'Identifiant de tâche, consigne, connecteurs ciblés et extraits importés.',
  },
  {
    name: 'Annuaire de l’enseignement supérieur (data.gouv)',
    role: 'Suggestions d’écoles',
    data: 'Le texte saisi dans le champ « Ton école » du questionnaire, pour proposer des noms d’établissements.',
  },
  {
    name: 'Google (Tag Manager et Analytics 4)',
    role: 'Mesure d’audience, seulement avec votre accord',
    data: 'Pages vues, événements d’usage, source de la visite, appareil et identifiant de cookie. Google LLC peut traiter ces données aux États-Unis (Data Privacy Framework).',
  },
  {
    name: 'Sentry',
    role: 'Suivi des erreurs',
    data: 'Traces techniques. Ni cookies, ni mots de passe, ni corps de requête.',
  },
];

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="font-brand text-[1.15rem] font-bold text-[#2F4858] tracking-tight mb-4">{children}</h3>;
}

function SubTitle({ children }: { children: React.ReactNode }) {
  return <h4 className="font-brand text-[0.92rem] font-bold text-[#2F4858] mt-6 mb-2">{children}</h4>;
}

const tableClass = 'w-full border-collapse text-left text-[0.8rem]';
const thClass = 'py-2.5 pr-4 font-brand text-[0.72rem] font-bold uppercase tracking-wide text-slate-500 border-b border-[#E5E9EB] align-bottom';
const tdClass = 'py-3 pr-4 border-b border-[#E5E9EB] align-top text-slate-600 leading-relaxed';

export default function PrivacyDataModal({ isOpen, onClose, initialTab = 'overview' }: PrivacyDataModalProps) {
  const [activeTab, setActiveTab] = useState<PrivacyModalTab>(initialTab);

  // Close with Escape
  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-[#2F4858]/40 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-xl border border-[#E5E9EB] w-full max-w-5xl h-[85vh] flex flex-col overflow-hidden text-[#2F4858]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="privacy-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER */}
        <div className="px-6 py-4 border-b border-[#E5E9EB] flex items-center justify-between gap-4">
          <h2 id="privacy-modal-title" className="font-brand text-[1.1rem] font-bold tracking-tight">
            Confidentialité et données personnelles
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg border-none bg-transparent text-slate-400 hover:text-[#2F4858] hover:bg-slate-100 flex items-center justify-center cursor-pointer transition-colors"
            aria-label="Fermer"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="flex-1 flex min-h-0 max-md:flex-col">
          {/* TABLE OF CONTENTS */}
          <nav className="w-[220px] flex-shrink-0 border-r border-[#E5E9EB] bg-[#F8FAFB] p-4 flex flex-col gap-0.5 max-md:w-full max-md:border-r-0 max-md:border-b max-md:flex-row max-md:flex-wrap max-md:p-3">
            {SECTIONS.map((section) => {
              const isActive = activeTab === section.id;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveTab(section.id)}
                  className={`text-left px-3 py-2 rounded-lg border-none cursor-pointer font-brand text-[0.84rem] transition-colors ${
                    isActive
                      ? 'bg-[#EAF3DE] text-[#2F4858] font-bold'
                      : 'bg-transparent text-slate-500 font-semibold hover:text-[#2F4858] hover:bg-slate-100'
                  }`}
                >
                  {section.label}
                </button>
              );
            })}
          </nav>

          {/* CONTENT */}
          <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar px-8 py-7 max-sm:px-5 text-[0.86rem] text-slate-600 leading-relaxed select-text">
            {activeTab === 'overview' && (
              <section>
                <SectionTitle>Présentation</SectionTitle>
                <p>
                  MemoFlow aide les étudiants et chercheurs à rédiger leurs mémoires et thèses. Cette page décrit les
                  données que nous enregistrons, pourquoi nous les utilisons, avec quels prestataires elles sont
                  partagées et comment exercer vos droits.
                </p>

                <SubTitle>Mode invité</SubTitle>
                <p>
                  Sans compte, vous pouvez utiliser l'espace d'écriture en mode invité. Dans ce mode, vos documents
                  restent dans votre navigateur le temps de la session : rien n'est envoyé ni enregistré sur nos
                  serveurs, et tout est perdu à la fermeture ou au rechargement de la page.
                </p>

                <SubTitle>Ce que nous ne collectons pas</SubTitle>
                <ul className="list-disc pl-5 space-y-1.5">
                  <li>
                    <strong className="text-[#2F4858]">Jetons d'accès tiers</strong> — vos autorisations Notion, Trello
                    ou GitHub sont conservées par Composio ; MemoFlow ne garde qu'une référence vers la connexion.
                  </li>
                  <li>
                    <strong className="text-[#2F4858]">Mots de passe en clair</strong> — seule une empreinte (bcrypt)
                    de votre mot de passe est enregistrée.
                  </li>
                  <li>
                    <strong className="text-[#2F4858]">Adresses IP</strong> — elles ne sont pas enregistrées en base de
                    données.
                  </li>
                </ul>

                <SubTitle>Périmètre</SubTitle>
                <p>
                  Ces informations correspondent à la version de développement actuellement déployée de MemoFlow. Elles
                  seront mises à jour lors du passage en production. Les tables <code className="text-[0.8rem]">prompts</code>{' '}
                  et <code className="text-[0.8rem]">daily_missions</code> sont des catalogues internes et ne contiennent
                  aucune donnée personnelle.
                </p>
              </section>
            )}

            {activeTab === 'data' && (
              <section>
                <SectionTitle>Données collectées</SectionTitle>
                <p className="mb-5">
                  Le tableau ci-dessous liste les données enregistrées lorsque vous utilisez MemoFlow avec un compte.
                </p>
                <div className="overflow-x-auto">
                  <table className={tableClass}>
                    <thead>
                      <tr>
                        <th className={thClass}>Catégorie</th>
                        <th className={thClass}>Données</th>
                        <th className={thClass}>Finalité</th>
                        <th className={thClass}>Stockage</th>
                      </tr>
                    </thead>
                    <tbody>
                      {DATA_CATEGORIES.map((cat) => (
                        <tr key={cat.title}>
                          <td className={`${tdClass} font-semibold text-[#2F4858] whitespace-nowrap`}>{cat.title}</td>
                          <td className={tdClass}>{cat.fields}</td>
                          <td className={tdClass}>{cat.purpose}</td>
                          <td className={`${tdClass} text-slate-500 text-[0.76rem]`}>{cat.storage}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === 'third-parties' && (
              <section>
                <SectionTitle>Sous-traitants</SectionTitle>
                <p className="mb-5">
                  MemoFlow ne vend pas vos données. Les prestataires suivants interviennent uniquement pour faire
                  fonctionner le service : hébergement, stockage, files de traitement, assistance IA et suivi des
                  erreurs.
                </p>
                <div className="overflow-x-auto">
                  <table className={tableClass}>
                    <thead>
                      <tr>
                        <th className={thClass}>Prestataire</th>
                        <th className={thClass}>Rôle</th>
                        <th className={thClass}>Données transmises</th>
                      </tr>
                    </thead>
                    <tbody>
                      {THIRD_PARTIES.map((tp) => (
                        <tr key={tp.name}>
                          <td className={`${tdClass} font-semibold text-[#2F4858] whitespace-nowrap`}>{tp.name}</td>
                          <td className={`${tdClass} whitespace-nowrap`}>{tp.role}</td>
                          <td className={tdClass}>{tp.data}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            )}

            {activeTab === 'rights' && (
              <section>
                <SectionTitle>Conservation et droits</SectionTitle>

                <SubTitle>Durée de conservation</SubTitle>
                <p>
                  Les versions de documents et le journal d'audit n'ont pas encore de durée d'expiration automatique :
                  ils sont conservés tant que votre compte existe.
                </p>

                <SubTitle>Suppression</SubTitle>
                <p>
                  Vous pouvez supprimer vous-même vos documents, sections, modèles et connecteurs. La suppression
                  complète du compte se fait pour l'instant sur demande auprès de l'équipe : elle efface vos données
                  PostgreSQL, puis l'historique des versions (MongoDB) et la connexion Composio associée.
                </p>

                <SubTitle>Vos droits</SubTitle>
                <p>
                  Conformément au RGPD, vous disposez d'un droit d'accès, de rectification, de portabilité,
                  d'opposition et d'effacement de vos données. Vos documents sont consultables à tout moment dans
                  l'espace d'écriture, et vous pouvez retirer votre accord aux communications par email dans
                  Paramètres ; pour toute autre demande, contactez l'équipe MemoFlow.
                </p>
              </section>
            )}

            {activeTab === 'terms' && (
              <section>
                <SectionTitle>Conditions d'utilisation</SectionTitle>

                <SubTitle>1. Propriété de vos travaux</SubTitle>
                <p>
                  Les textes, plans et documents que vous rédigez dans MemoFlow restent votre propriété exclusive.
                  MemoFlow ne revendique aucun droit sur vos contenus.
                </p>

                <SubTitle>2. Utilisation de l'assistance IA</SubTitle>
                <p>
                  Les suggestions et reformulations sont des aides à la rédaction. Il vous appartient de vérifier
                  l'exactitude de vos propos, de respecter les règles anti-plagiat de votre établissement et de valider
                  chaque modification proposée.
                </p>

                <SubTitle>3. Applications connectées</SubTitle>
                <p>
                  En connectant Notion, Trello ou GitHub, vous autorisez MemoFlow à lire les informations utiles à la
                  préparation de vos plans. Vos jetons d'accès ne sont pas conservés par MemoFlow.
                </p>

                <SubTitle>4. Disponibilité du service</SubTitle>
                <p>
                  MemoFlow met en œuvre des moyens raisonnables pour assurer la disponibilité du service et la
                  conservation de vos documents, notamment grâce à l'historique des versions. En mode invité, aucune
                  donnée n'est conservée.
                </p>
              </section>
            )}
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-6 py-3.5 border-t border-[#E5E9EB] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl bg-[#2F4858] hover:bg-[#3E6976] text-white font-brand text-[0.82rem] font-bold transition-colors cursor-pointer border-none"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
