import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faArrowRight,
  faBriefcase,
  faBuilding,
  faChartLine,
  faDiagramProject,
  faFileLines,
  faGraduationCap,
  faLayerGroup,
  faMagnifyingGlass,
  faPenNib,
  faPlug,
  faShieldHalved,
  faHourglassStart,
  faListCheck,
} from '@fortawesome/free-solid-svg-icons';
import BrandLogo from './BrandLogo';
import Footer from './Footer';
import Link from './Link';
import { ROUTES } from '../services/router';

interface LandingPageProps {
  isLoggedIn: boolean;
  onOpenPrivacy: () => void;
  onOpenTerms: () => void;
}

const container = 'w-full max-w-[1120px] mx-auto px-8 max-sm:px-5';
const primaryCta =
  'inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2F4858] hover:bg-[#3E6976] text-white font-brand text-[0.95rem] font-bold no-underline transition-colors shadow-[0_8px_20px_rgba(47,72,88,0.18)]';
const secondaryCta =
  'inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-[#2F4858] border border-solid border-[#D5DEE2] hover:border-[#518B91] font-brand text-[0.95rem] font-bold no-underline transition-colors';
const sectionTitle = 'font-brand text-[2rem] font-bold text-[#2F4858] tracking-tight m-0 max-sm:text-[1.6rem]';
const sectionLead = 'text-[1rem] text-slate-600 leading-relaxed m-0 mt-3 max-w-[640px]';

function IconBadge({ icon }: { icon: IconDefinition }) {
  return (
    <span className="w-11 h-11 rounded-xl bg-[#EAF3DE] text-[#3E6976] flex items-center justify-center flex-shrink-0">
      <FontAwesomeIcon icon={icon} className="text-[1.05rem]" />
    </span>
  );
}

const PROBLEMS = [
  {
    icon: faHourglassStart,
    title: 'Démarrer',
    text: 'La page blanche, à quelques mois du rendu, alors que le travail de l’année est bien là.',
  },
  {
    icon: faMagnifyingGlass,
    title: 'Retrouver ce que vous avez fait',
    text: 'Les preuves sont éparpillées entre Trello, Notion, GitHub, les mails et le Drive.',
  },
  {
    icon: faDiagramProject,
    title: 'Structurer',
    text: 'Transformer des mois de missions en un plan clair, conforme à ce qu’attend votre école.',
  },
];

const STEPS = [
  {
    title: 'Rassemblez',
    text: 'Connectez Trello, Notion ou GitHub dans le Centre de contexte : MemoFlow sait où se trouvent les traces de votre travail.',
  },
  {
    title: 'Structurez',
    text: 'Partez d’un modèle de mémoire ou de rapport, puis demandez à l’assistant un plan construit à partir de vos outils connectés.',
  },
  {
    title: 'Rédigez',
    text: 'Écrivez section par section sur une vraie page, en mode focus si besoin. Tout est enregistré automatiquement.',
  },
];

const FEATURES = [
  {
    icon: faPenNib,
    title: 'Espace d’écriture',
    text: 'Une page au format A4, découpée en sections, avec le nombre de mots et un mode focus sans distraction.',
  },
  {
    icon: faLayerGroup,
    title: 'Modèles',
    text: 'Partez d’une structure de mémoire ou de rapport prête à remplir, plutôt que d’un document vide.',
  },
  {
    icon: faPlug,
    title: 'Centre de contexte',
    text: 'Vos comptes Trello, Notion et GitHub reliés en quelques secondes, révocables à tout moment.',
  },
  {
    icon: faListCheck,
    title: 'Assistant de plan',
    text: 'Décrivez votre sujet : l’assistant propose un plan de chapitres nourri par vos outils connectés.',
  },
  {
    icon: faChartLine,
    title: 'Progression',
    text: 'Des missions quotidiennes, des jalons et de l’XP pour avancer un peu chaque jour plutôt que tout la dernière semaine.',
  },
  {
    icon: faShieldHalved,
    title: 'Vos travaux restent à vous',
    text: 'Vos textes vous appartiennent. MemoFlow ne conserve ni vos mots de passe ni les accès à vos outils connectés.',
  },
];

const AUDIENCES = [
  { icon: faBriefcase, title: 'Alternants', text: 'Rapport d’alternance ou mémoire, en parallèle de l’entreprise.' },
  { icon: faBuilding, title: 'Stagiaires', text: 'Rapport de stage à rendre à la fin de la mission.' },
  { icon: faGraduationCap, title: 'Étudiants de L3 à M2', text: 'Mémoire de recherche ou professionnel.' },
];

/** Illustration of the writing space (not real data) */
function HeroPreview() {
  return (
    <div aria-hidden="true" className="relative w-full max-w-[460px] mx-auto">
      <div className="absolute -inset-6 bg-[#94D2B8]/25 blur-3xl rounded-full" />
      <div className="relative bg-[#E9EDEF] rounded-2xl p-5 border border-[#DCE3E6] shadow-[0_24px_60px_rgba(47,72,88,0.18)]">
        <div className="flex items-center gap-2 mb-4">
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5E9EB]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5E9EB]" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#E5E9EB]" />
          <span className="ml-3 text-[0.7rem] font-semibold text-slate-500">Mes documents / Rapport d’alternance</span>
        </div>
        <div className="bg-white rounded-[4px] border border-[#E5E9EB] shadow-sm px-8 py-7 flex flex-col gap-5">
          <p className="font-brand text-[1.15rem] font-bold text-[#2F4858] m-0">Rapport d’alternance</p>
          {['1. Introduction', '2. Présentation de l’entreprise', '3. Missions réalisées'].map((title, i) => (
            <div key={title} className="flex flex-col gap-2">
              <p className="font-brand text-[0.85rem] font-bold text-[#3E6976] m-0">{title}</p>
              <span className="h-2 rounded-full bg-[#EEF2F4] w-full" />
              <span className="h-2 rounded-full bg-[#EEF2F4]" style={{ width: `${88 - i * 14}%` }} />
              {i < 2 && <span className="h-2 rounded-full bg-[#EEF2F4] w-[60%]" />}
            </div>
          ))}
        </div>
        <div className="absolute -right-5 -bottom-6 max-sm:right-2 bg-white rounded-xl border border-[#E5E9EB] shadow-lg px-4 py-3 flex items-center gap-3">
          <FontAwesomeIcon icon={faPlug} className="text-[#518B91]" />
          <div className="flex flex-col">
            <span className="text-[0.65rem] font-bold uppercase tracking-wider text-slate-400">Sources connectées</span>
            <span className="text-[0.8rem] font-semibold text-[#2F4858]">Trello · Notion · GitHub</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function LandingPage({ isLoggedIn, onOpenPrivacy, onOpenTerms }: LandingPageProps) {
  return (
    <div className="min-h-screen w-full bg-[#F8FAFB] flex flex-col">
      {/* Navigation */}
      <header className="sticky top-0 z-40 bg-[#F8FAFB]/90 backdrop-blur border-b border-[#E5E9EB]/70">
        <nav className={`${container} h-[72px] flex items-center justify-between gap-6`}>
          <Link to={ROUTES.home} className="flex items-center gap-2.5 no-underline" aria-label="MemoFlow, accueil">
            <BrandLogo size={36} />
            <span className="font-brand text-[1.3rem] font-bold text-[#2F4858] tracking-tight">MemoFlow</span>
          </Link>
          <div className="flex items-center gap-7 max-md:hidden">
            {[
              ['#concept', 'Le concept'],
              ['#fonctionnalites', 'Fonctionnalités'],
              ['#pour-qui', 'Pour qui'],
            ].map(([href, label]) => (
              <a key={href} href={href} className="text-[0.85rem] font-semibold text-slate-600 hover:text-[#2F4858] no-underline">
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2.5">
            {isLoggedIn ? (
              <Link to={ROUTES.templates} className={`${primaryCta} !px-4 !py-2.5 !text-[0.85rem] !shadow-none`}>
                Ouvrir mon espace
              </Link>
            ) : (
              <>
                <Link
                  to={ROUTES.login}
                  className="px-3 py-2.5 text-[0.85rem] font-bold text-[#2F4858] no-underline hover:underline max-sm:hidden"
                >
                  Se connecter
                </Link>
                <Link to={ROUTES.signup} className={`${primaryCta} !px-4 !py-2.5 !text-[0.85rem] !shadow-none`}>
                  Créer un compte
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero */}
        <section className={`${container} grid grid-cols-[1.1fr_1fr] gap-14 items-center py-20 max-lg:grid-cols-1 max-lg:py-14`}>
          <div className="flex flex-col gap-6">
            <span className="self-start px-3 py-1 rounded-full bg-[#EAF3DE] text-[#3E6976] text-[0.75rem] font-bold">
              Pour les alternants, stagiaires et étudiants de L3 à M2
            </span>
            <h1 className="font-brand text-[3.1rem] leading-[1.08] font-bold text-[#2F4858] tracking-tight m-0 max-sm:text-[2.2rem]">
              Rédigez votre mémoire sans repartir d’une page blanche.
            </h1>
            <p className="text-[1.08rem] text-slate-600 leading-relaxed m-0 max-w-[560px]">
              MemoFlow rassemble les traces de votre année (Trello, Notion, GitHub), vous aide à construire un plan
              solide et vous accompagne section par section jusqu’au rendu.
            </p>
            <div className="flex gap-3 flex-wrap">
              {isLoggedIn ? (
                <Link to={ROUTES.templates} className={primaryCta}>
                  Ouvrir mon espace <FontAwesomeIcon icon={faArrowRight} />
                </Link>
              ) : (
                <>
                  <Link to={ROUTES.signup} className={primaryCta}>
                    Créer mon compte <FontAwesomeIcon icon={faArrowRight} />
                  </Link>
                  <Link to={ROUTES.writing} className={secondaryCta}>
                    Essayer sans compte
                  </Link>
                </>
              )}
            </div>
            {!isLoggedIn && (
              <p className="text-[0.8rem] text-slate-500 m-0">
                Le mode invité permet de tester l’espace d’écriture : rien n’est enregistré tant que vous n’avez pas de
                compte.
              </p>
            )}
          </div>
          <HeroPreview />
        </section>

        {/* Problem */}
        <section id="concept" className="bg-white border-y border-[#E5E9EB] py-20 max-sm:py-14 scroll-mt-[72px]">
          <div className={container}>
            <p className="text-[0.75rem] font-bold uppercase tracking-wider text-[#518B91] m-0">Le concept</p>
            <h2 className={`${sectionTitle} mt-2`}>Le travail est fait. Il reste à l’écrire.</h2>
            <p className={sectionLead}>
              Après des mois en entreprise ou en stage, le plus dur n’est pas d’avoir des choses à dire, c’est de les
              retrouver et de les organiser. MemoFlow part de ce que vous avez déjà produit.
            </p>
            <div className="grid grid-cols-3 gap-5 mt-10 max-md:grid-cols-1">
              {PROBLEMS.map((p) => (
                <div key={p.title} className="p-6 rounded-2xl bg-[#F8FAFB] border border-[#E5E9EB] flex flex-col gap-3">
                  <IconBadge icon={p.icon} />
                  <h3 className="font-brand text-[1.05rem] font-bold text-[#2F4858] m-0">{p.title}</h3>
                  <p className="text-[0.88rem] text-slate-600 leading-relaxed m-0">{p.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className={`${container} py-20 max-sm:py-14`}>
          <p className="text-[0.75rem] font-bold uppercase tracking-wider text-[#518B91] m-0">Comment ça marche</p>
          <h2 className={`${sectionTitle} mt-2`}>Trois étapes, de vos outils au document final</h2>
          <ol className="grid grid-cols-3 gap-5 mt-10 list-none p-0 max-md:grid-cols-1">
            {STEPS.map((s, i) => (
              <li key={s.title} className="relative p-6 rounded-2xl bg-white border border-[#E5E9EB] flex flex-col gap-3">
                <span className="w-9 h-9 rounded-full bg-[#2F4858] text-white font-brand font-bold flex items-center justify-center">
                  {i + 1}
                </span>
                <h3 className="font-brand text-[1.05rem] font-bold text-[#2F4858] m-0">{s.title}</h3>
                <p className="text-[0.88rem] text-slate-600 leading-relaxed m-0">{s.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Features */}
        <section id="fonctionnalites" className="bg-white border-y border-[#E5E9EB] py-20 max-sm:py-14 scroll-mt-[72px]">
          <div className={container}>
            <p className="text-[0.75rem] font-bold uppercase tracking-wider text-[#518B91] m-0">Fonctionnalités</p>
            <h2 className={`${sectionTitle} mt-2`}>Tout ce qu’il faut pour aller jusqu’au rendu</h2>
            <div className="grid grid-cols-3 gap-5 mt-10 max-lg:grid-cols-2 max-sm:grid-cols-1">
              {FEATURES.map((f) => (
                <div key={f.title} className="p-6 rounded-2xl border border-[#E5E9EB] flex flex-col gap-3">
                  <IconBadge icon={f.icon} />
                  <h3 className="font-brand text-[1rem] font-bold text-[#2F4858] m-0">{f.title}</h3>
                  <p className="text-[0.86rem] text-slate-600 leading-relaxed m-0">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Audience */}
        <section id="pour-qui" className={`${container} py-20 max-sm:py-14 scroll-mt-[72px]`}>
          <p className="text-[0.75rem] font-bold uppercase tracking-wider text-[#518B91] m-0">Pour qui</p>
          <h2 className={`${sectionTitle} mt-2`}>Pensé pour celles et ceux qui écrivent en travaillant</h2>
          <div className="grid grid-cols-3 gap-5 mt-10 max-md:grid-cols-1">
            {AUDIENCES.map((a) => (
              <div key={a.title} className="p-6 rounded-2xl bg-white border border-[#E5E9EB] flex items-start gap-4">
                <IconBadge icon={a.icon} />
                <div className="flex flex-col gap-1.5">
                  <h3 className="font-brand text-[1rem] font-bold text-[#2F4858] m-0">{a.title}</h3>
                  <p className="text-[0.86rem] text-slate-600 leading-relaxed m-0">{a.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Final call to action */}
        <section className={`${container} pb-20 max-sm:pb-14`}>
          <div className="rounded-3xl bg-[#2F4858] px-12 py-14 max-sm:px-6 max-sm:py-10 flex items-center justify-between gap-8 max-md:flex-col max-md:items-start">
            <div className="flex flex-col gap-3 max-w-[560px]">
              <h2 className="font-brand text-[1.8rem] font-bold text-white tracking-tight m-0 max-sm:text-[1.45rem]">
                Votre prochain rendu commence ici.
              </h2>
              <p className="text-[0.95rem] text-[#C9DDE2] leading-relaxed m-0">
                <FontAwesomeIcon icon={faFileLines} className="mr-2 text-[#94D2B8]" />
                Créez votre compte, choisissez un modèle et écrivez votre première section aujourd’hui.
              </p>
            </div>
            <Link
              to={isLoggedIn ? ROUTES.templates : ROUTES.signup}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#94D2B8] hover:bg-[#A9DEC7] text-[#2F4858] font-brand text-[0.95rem] font-bold no-underline transition-colors flex-shrink-0"
            >
              {isLoggedIn ? 'Ouvrir mon espace' : 'Créer mon compte'} <FontAwesomeIcon icon={faArrowRight} />
            </Link>
          </div>
        </section>
      </main>

      <Footer onOpenPrivacy={onOpenPrivacy} onOpenTerms={onOpenTerms} />
    </div>
  );
}
