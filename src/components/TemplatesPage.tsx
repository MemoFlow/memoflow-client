import { useState, useEffect } from 'react';
import masterGradeImg from '../assets/master_grade-card.webp';
import masterDegreeImg from '../assets/1_master_degree.jpg';
import collegeDegreeImg from '../assets/college_degree-card.webp';
import { apiFetch } from '../services/api';
import type { TemplateResponseDto } from '../services/api';

interface TemplatesPageProps {
  isGuest: boolean;
  onUseTemplate: (template: TemplateChoice) => void;
  onCreateBlankDocument: () => void;
  onRequestLogin: () => void;
}

export interface TemplateChoice {
  id: string;
  title: string;
  docType: string;
}

interface TemplateCard extends TemplateChoice {
  badge: string;
  image: string;
  description: string;
  sectionsLabel: string;
}

function pluralSections(count: number): string {
  return `${count} section${count > 1 ? 's' : ''}`;
}

function toCard(t: TemplateResponseDto): TemplateCard {
  const lowTitle = t.title.toLowerCase();
  let image = masterGradeImg;
  let badge = 'Recherche';

  if (lowTitle.includes('stage') || t.doc_type === 'report') {
    image = masterDegreeImg;
    badge = 'Professionnel';
  } else if (lowTitle.includes('thèse') || t.doc_type === 'doctoral') {
    image = collegeDegreeImg;
    badge = 'Doctorat';
  }

  const count = t.sections?.length || 0;
  return {
    id: t.id,
    title: t.title,
    docType: t.doc_type,
    badge,
    image,
    description:
      t.scope === 'personal'
        ? 'Modèle personnel créé par vous.'
        : `Structure académique préconfigurée avec ${pluralSections(count)}.`,
    sectionsLabel: pluralSections(count),
  };
}

export default function TemplatesPage({
  isGuest,
  onUseTemplate,
  onCreateBlankDocument,
  onRequestLogin,
}: TemplatesPageProps) {
  const [templatesList, setTemplatesList] = useState<TemplateCard[]>([]);
  const [isLoading, setIsLoading] = useState(!isGuest);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isGuest) return;
    apiFetch<TemplateResponseDto[]>('/templates')
      .then((data) => setTemplatesList((data || []).map(toCard)))
      .catch((err) => {
        console.error('Could not fetch templates:', err);
        setError('Impossible de récupérer les modèles.');
      })
      .finally(() => setIsLoading(false));
  }, [isGuest]);

  const blankDocButton = (
    <button
      onClick={onCreateBlankDocument}
      className="mf-button mf-button--secondary max-sm:w-full"
    >
      Commencer un document vierge
    </button>
  );

  const renderBody = () => {
    if (isGuest) {
      return (
        <div className="bg-white border border-[#E5E9EB] rounded-2xl p-10 text-center flex flex-col items-center gap-3">
          <h3 className="text-[1.05rem] font-bold text-[#2F4858]">Modèles réservés aux comptes</h3>
          <p className="text-[0.85rem] text-slate-500 max-w-[480px]">
            Connectez-vous pour accéder à la bibliothèque de modèles. En mode invité, vous pouvez tout de même rédiger
            un document vierge (non sauvegardé).
          </p>
          <div className="flex gap-2.5 mt-2 flex-wrap justify-center max-sm:w-full max-sm:flex-col">
            {blankDocButton}
            <button
              onClick={onRequestLogin}
              className="mf-button mf-button--primary max-sm:w-full"
            >
              Se connecter
            </button>
          </div>
        </div>
      );
    }

    if (isLoading) {
      return (
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-3 border-[#94D2B8]/30 border-t-[#518B91] rounded-full animate-spin"></div>
        </div>
      );
    }

    if (error || templatesList.length === 0) {
      return (
        <div className="bg-white border border-[#E5E9EB] rounded-2xl p-10 text-center flex flex-col items-center gap-3">
          <h3 className="text-[1.05rem] font-bold text-[#2F4858]">{error || 'Aucun modèle disponible'}</h3>
          <p className="text-[0.85rem] text-slate-500">Vous pouvez commencer à partir d'un document vierge.</p>
          <div className="mt-2">{blankDocButton}</div>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-3 gap-6 max-lg:grid-cols-2 max-sm:grid-cols-1">
        {templatesList.map((tpl) => (
          <div
            key={tpl.id}
            className="bg-white border border-[#E5E9EB] rounded-2xl overflow-hidden flex flex-col justify-between shadow-[0_4px_20px_rgba(47,72,88,0.02)] hover:shadow-[0_10px_30px_rgba(47,72,88,0.06)] hover:border-[#94D2B8]/40 transition-all duration-300 group"
          >
            {/* Card Header (Image + Badge) */}
            <div className="relative h-48 w-full overflow-hidden bg-slate-100">
              <img
                src={tpl.image}
                alt={tpl.title}
                width={768}
                height={432}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-xs text-[#2F4858] text-[0.72rem] font-bold px-3 py-1 rounded-md shadow-xs border border-white/20">
                {tpl.badge}
              </span>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <h3 className="text-[1.1rem] font-bold text-[#2F4858] tracking-tight group-hover:text-[#3E6976] transition-colors">
                  {tpl.title}
                </h3>
                <p className="text-[0.78rem] text-slate-500 leading-relaxed font-medium">{tpl.description}</p>
              </div>

              {/* Card Footer */}
              <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                <span className="text-[0.78rem] font-bold text-slate-400">{tpl.sectionsLabel}</span>
                <button
                  onClick={() => onUseTemplate(tpl)}
                  className="mf-button mf-button--accent shadow-[0_2px_8px_rgba(148,210,184,0.15)] hover:shadow-md"
                >
                  Utiliser
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in">
      {/* Intro section */}
      <div className="flex flex-col gap-3">
        <div>
          <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[0.68rem] font-bold uppercase tracking-wider bg-[#EAF3DE] text-[#639922] border border-[#639922]/10">
            Ressources Académiques
          </span>
        </div>
        <div className="flex flex-col gap-1.5">
          <h2 className="text-[1.8rem] font-bold text-[#2F4858] tracking-tight font-brand">Bibliothèque de Modèles</h2>
          <p className="text-[0.88rem] text-slate-500 max-w-[800px] leading-relaxed font-medium">
            Démarrez votre document à partir d'une structure académique prête à l'emploi.
          </p>
        </div>
      </div>

      {renderBody()}
    </div>
  );
}
