import { useState, useEffect } from 'react';
import masterGradeImg from '../assets/master_grade.png';
import professionalGradeImg from '../assets/professional_grade.png';
import doctoralGradeImg from '../assets/doctoral_grade.png';
import { apiFetch } from '../services/api';
import type { TemplateResponseDto } from '../services/api';

interface TemplatesPageProps {
  onUseTemplate: (template: TemplateResponseDto | { id: string; title: string; docType: string }) => void;
  onConsultGuide: () => void;
  onContactExpert: () => void;
}

export default function TemplatesPage({
  onUseTemplate,
  onConsultGuide,
  onContactExpert,
}: TemplatesPageProps) {
  const [templatesList, setTemplatesList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const staticTemplates = [
    {
      id: 'mock-master-2',
      badge: 'Master',
      title: 'Mémoire Master 2',
      image: masterGradeImg,
      description:
        "Structure complète incluant l'introduction problématique, le cadre théorique, la méthodologie et l'analyse empirique.",
      pages: '62 Pages standard',
      docType: 'thesis',
    },
    {
      id: 'mock-rapport-stage',
      badge: 'Professionnel',
      title: 'Rapport de Stage',
      image: professionalGradeImg,
      description:
        "Optimisé pour la présentation des missions professionnelles et l'auto-évaluation critique des compétences acquises.",
      pages: '15-30 Pages',
      docType: 'report',
    },
    {
      id: 'mock-these-doctorat',
      badge: 'Doctorat',
      title: 'Thèse de Doctorat',
      image: doctoralGradeImg,
      description:
        "L'architecture ultime pour les recherches de longue haleine. Gestion avancée des chapitres, index et bibliographies complexes.",
      pages: '200+ Pages',
      docType: 'thesis',
    },
  ];

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await apiFetch<TemplateResponseDto[]>('/templates');
        if (data && data.length > 0) {
          // Map backend templates and set metadata
          const mapped = data.map((t) => {
            const lowTitle = t.title.toLowerCase();
            let image = masterGradeImg;
            let badge = 'Recherche';
            let pages = `${t.sections?.length || 0} Sections`;

            if (lowTitle.includes('stage') || t.doc_type === 'report') {
              image = professionalGradeImg;
              badge = 'Professionnel';
            } else if (lowTitle.includes('thèse') || t.doc_type === 'doctoral') {
              image = doctoralGradeImg;
              badge = 'Doctorat';
            }

            return {
              id: t.id,
              badge,
              title: t.title,
              image,
              description: t.scope === 'personal' 
                ? 'Modèle personnel créé par vous.' 
                : `Structure académique préconfigurée avec ${t.sections?.length || 0} sections.`,
              pages,
              docType: t.doc_type,
            };
          });
          setTemplatesList(mapped);
        } else {
          setTemplatesList(staticTemplates);
        }
      } catch (err) {
        console.warn('Could not fetch templates from backend, falling back to static:', err);
        setTemplatesList(staticTemplates);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTemplates();
  }, []);

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
          <h2 className="text-[1.8rem] font-bold text-[#2F4858] tracking-tight font-brand">
            Bibliothèque de Modèles
          </h2>
          <p className="text-[0.88rem] text-slate-500 max-w-[800px] leading-relaxed font-medium">
            Accédez à une collection rigoureusement sélectionnée de structures académiques prêtes à l'emploi.
            Chaque modèle respecte les normes de mise en page, de citation et de hiérarchie des universités
            européennes, vous permettant de vous concentrer exclusivement sur votre réflexion intellectuelle.
          </p>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="w-8 h-8 border-3 border-[#94D2B8]/30 border-t-[#518B91] rounded-full animate-spin"></div>
        </div>
      ) : (
        /* Templates Grid */
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
                  <p className="text-[0.78rem] text-slate-500 leading-relaxed font-medium">
                    {tpl.description}
                  </p>
                </div>

                {/* Card Footer */}
                <div className="flex justify-between items-center pt-2 border-t border-slate-100">
                  <span className="text-[0.78rem] font-bold text-slate-400">
                    {tpl.pages}
                  </span>
                  <button
                    onClick={() => onUseTemplate(tpl)}
                    className="bg-[#94D2B8] hover:bg-[#6DAEA7] text-[#0F4C3A] font-brand text-[0.8rem] font-bold px-4 py-1.5 rounded-lg transition-all cursor-pointer border-none shadow-[0_2px_8px_rgba(148,210,184,0.15)] active:scale-95"
                  >
                    Utiliser
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Help Banner */}
      <div className="bg-[#F1F5F7]/80 border border-[#E5E9EB] rounded-2xl p-6 flex justify-between items-center gap-6 max-md:flex-col max-md:text-center mt-4 shadow-[0_2px_12px_rgba(0,0,0,0.01)]">
        <div className="flex flex-col gap-1.5 text-left max-md:text-center">
          <h4 className="text-[0.92rem] font-bold text-[#2F4858] tracking-tight">
            Vous ne trouvez pas votre bonheur ?
          </h4>
          <p className="text-[0.78rem] text-slate-500 font-medium leading-relaxed max-w-[600px]">
            Notre équipe d'experts peut vous aider à configurer une structure sur mesure pour vos besoins spécifiques de recherche.
          </p>
        </div>
        <div className="flex items-center gap-3.5 flex-wrap justify-center">
          <button
            onClick={onConsultGuide}
            className="bg-white hover:bg-slate-50 text-[#2F4858] border border-solid border-slate-200 font-brand text-[0.8rem] font-bold px-4 py-2 rounded-xl transition-all cursor-pointer active:scale-95"
          >
            Consulter le Guide
          </button>
          <button
            onClick={onContactExpert}
            className="bg-[#2F4858] hover:bg-[#3E6976] text-white font-brand text-[0.8rem] font-bold px-4 py-2 rounded-xl transition-all cursor-pointer border-none active:scale-95 shadow-[0_2px_8px_rgba(47,72,88,0.1)]"
          >
            Contacter un expert
          </button>
        </div>
      </div>
    </div>
  );
}
