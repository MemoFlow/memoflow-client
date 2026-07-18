import { useState } from 'react';

interface Tag {
  id: string;
  name: string;
}

interface Persona {
  id: string;
  title: string;
  description: string;
}

interface SourceFile {
  id: string;
  name: string;
  size: string;
  progress: number;
  relevance: string;
  status: 'uploading' | 'completed' | 'failed';
}

interface ContextCenterProps {
  onAddToast: (
    type: 'success' | 'assistant' | 'warning' | 'error',
    title: string,
    message: string
  ) => void;
}

export default function ContextCenter({ onAddToast }: ContextCenterProps) {
  // Tags State
  const [tags, setTags] = useState<Tag[]>([
    { id: '1', name: '#ETHIQUE_IA' },
    { id: '2', name: '#NEURO_DIVERSITE' },
    { id: '3', name: '#ANALYSE_SYSTEMIQUE' },
  ]);
  const [newTagInput, setNewTagInput] = useState('');
  const [showTagInput, setShowTagInput] = useState(false);

  // Hypothesis State
  const [hypothesis, setHypothesis] = useState(
    "Déterminer l'influence de l'interactivité numérique sur l'élasticité cognitive à travers un protocole expérimental basé sur l'usage quotidien d'espaces de travail en réseau."
  );

  // Personas State
  const [personas, setPersonas] = useState<Persona[]>([
    {
      id: '1',
      title: 'Pairs Académiques',
      description:
        'Chercheurs en linguistique computationnelle nécessitant des détails techniques profonds.',
    },
    {
      id: '2',
      title: 'Décideurs Politiques',
      description:
        'Synthèses exécutives axées sur les implications éthiques et réglementaires.',
    },
  ]);
  const [newPersonaTitle, setNewPersonaTitle] = useState('');
  const [newPersonaDesc, setNewPersonaDesc] = useState('');
  const [showPersonaForm, setShowPersonaForm] = useState(false);

  // Source Files State
  const [files, setFiles] = useState<SourceFile[]>([
    {
      id: '1',
      name: 'Cognitive_Bias_Study_2023.pdf',
      size: '12.4 MB',
      progress: 100,
      relevance: 'Analysé : 92%',
      status: 'completed',
    },
    {
      id: '2',
      name: 'Interview_Transcripts_Final.docx',
      size: '4.8 MB',
      progress: 100,
      relevance: 'Analysé : 94%',
      status: 'completed',
    },
  ]);

  // Creativity slider
  const [creativity, setCreativity] = useState(2); // 1 = Rigoureux, 2 = Équilibré, 3 = Créatif
  const creativityLevels = ['Rigoureux', 'Équilibré', 'Créatif'];

  // Checkbox Rules
  const [rules, setRules] = useState({
    harvardCitation: false,
    avoidPassive: false,
    scientificNeutrality: true,
  });

  // Adding Tag
  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTagInput.trim()) return;

    let formattedTag = newTagInput.trim().toUpperCase();
    if (!formattedTag.startsWith('#')) {
      formattedTag = '#' + formattedTag;
    }

    if (tags.some((t) => t.name === formattedTag)) {
      onAddToast('warning', 'Tag existant', 'Ce tag est déjà présent.');
      return;
    }

    setTags([...tags, { id: Date.now().toString(), name: formattedTag }]);
    setNewTagInput('');
    setShowTagInput(false);
    onAddToast('success', 'Tag ajouté', `Le tag ${formattedTag} a été enregistré.`);
  };

  const handleRemoveTag = (id: string) => {
    const removedTag = tags.find((t) => t.id === id);
    setTags(tags.filter((t) => t.id !== id));
    if (removedTag) {
      onAddToast('assistant', 'Tag supprimé', `Le tag ${removedTag.name} a été retiré.`);
    }
  };

  // Adding Persona
  const handleAddPersona = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPersonaTitle.trim() || !newPersonaDesc.trim()) {
      onAddToast('error', 'Erreur de saisie', 'Veuillez remplir tous les champs du Persona.');
      return;
    }

    const newPers: Persona = {
      id: Date.now().toString(),
      title: newPersonaTitle.trim(),
      description: newPersonaDesc.trim(),
    };

    setPersonas([...personas, newPers]);
    setNewPersonaTitle('');
    setNewPersonaDesc('');
    setShowPersonaForm(false);
    onAddToast('success', 'Persona défini', `Le public cible "${newPers.title}" a été ajouté.`);
  };

  const handleRemovePersona = (id: string) => {
    const removed = personas.find((p) => p.id === id);
    setPersonas(personas.filter((p) => p.id !== id));
    if (removed) {
      onAddToast('assistant', 'Persona retiré', `Le public "${removed.title}" a été retiré.`);
    }
  };

  // Simulated File Upload
  const handleSimulateUpload = () => {
    const fileNames = [
      'Neural_Elasticity_Draft.pdf',
      'Cognitive_Load_Survey.docx',
      'Literature_Review_Notes.txt',
    ];
    const randomName = fileNames[Math.floor(Math.random() * fileNames.length)];
    const randomSize = (Math.random() * 15 + 1).toFixed(1) + ' MB';
    const fileId = Date.now().toString();

    const newFile: SourceFile = {
      id: fileId,
      name: randomName,
      size: randomSize,
      progress: 0,
      relevance: 'Analyse en cours...',
      status: 'uploading',
    };

    setFiles((prev) => [...prev, newFile]);
    onAddToast('assistant', 'Téléversement', `Début du traitement de ${randomName}...`);

    // Simulate progress
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 20;
      setFiles((prev) =>
        prev.map((f) => {
          if (f.id === fileId) {
            const isDone = currentProgress >= 100;
            return {
              ...f,
              progress: Math.min(currentProgress, 100),
              status: isDone ? 'completed' : 'uploading',
              relevance: isDone ? 'Analysé : 95%' : 'Analyse en cours...',
            };
          }
          return f;
        })
      );

      if (currentProgress >= 100) {
        clearInterval(interval);
        onAddToast('success', 'Fichier indexé', `${randomName} est prêt et intégré au contexte.`);
      }
    }, 400);
  };

  const handleRemoveFile = (id: string) => {
    const file = files.find((f) => f.id === id);
    setFiles(files.filter((f) => f.id !== id));
    if (file) {
      onAddToast('assistant', 'Fichier retiré', `${file.name} a été supprimé de la bibliothèque.`);
    }
  };

  const handleInitializeEngine = () => {
    onAddToast('success', 'Moteur Intelligent Initialisé', 'Les paramètres de contexte de recherche ont été synchronisés avec le moteur de génération.');
  };

  return (
    <div className="flex flex-col gap-8 animate-fade-in font-sans text-[#2F4858]">
      {/* Intro Header */}
      <div className="flex justify-between items-start gap-6 max-md:flex-col">
        <div className="flex flex-col gap-2">
          <div>
            <span className="inline-flex items-center px-2.5 py-1 rounded-md text-[0.68rem] font-bold uppercase tracking-wider bg-[#EAF3DE] text-[#0F4C3A] border border-[#94D2B8]/30">
              Cadrage de Projet
            </span>
          </div>
          <h2 className="text-[1.8rem] font-bold text-[#2F4858] tracking-tight font-brand">
            Centre de Contexte (Context Center)
          </h2>
          <p className="text-[0.88rem] text-slate-500 max-w-[800px] leading-relaxed font-medium">
            Centralisez vos paramètres de recherche pour aligner le moteur d'IA de MemoFlow avec vos objectifs académiques et votre ton spécifiques.
          </p>
        </div>

        {/* Top Actions */}
        <div className="flex items-center gap-3.5 flex-shrink-0 self-end max-md:self-start">
          <button
            onClick={() => onAddToast('assistant', 'Instantanés', 'Ouverture de l\'historique des instantanés...')}
            className="bg-white hover:bg-slate-50 text-[#2F4858] border border-solid border-[#E5E9EB] font-brand text-[0.8rem] font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all cursor-pointer active:scale-95 shadow-xs"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <circle cx="12" cy="12" r="10" />
              <polyline points="12 6 12 12 16 14" />
            </svg>
            <span>Instantanés</span>
          </button>
          <button
            onClick={() => onAddToast('success', 'Contexte synchronisé', 'Le contexte global a été actualisé et synchronisé.')}
            className="bg-[#94D2B8] hover:bg-[#6DAEA7] text-[#0F4C3A] font-brand text-[0.8rem] font-bold px-4 py-2 rounded-xl flex items-center gap-2 transition-all border-none cursor-pointer active:scale-95 shadow-[0_4px_12px_rgba(148,210,184,0.15)]"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
            </svg>
            <span>Synchronisation du contexte</span>
          </button>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-12 gap-6 max-w-[1200px]">
        
        {/* LEFT COLUMN: Objectives & Audience */}
        <div className="col-span-7 flex flex-col gap-6 max-lg:col-span-12">
          
          {/* Research Objective Card */}
          <div className="bg-white border border-solid border-[#E5E9EB] rounded-2xl p-6 relative overflow-hidden group hover:border-[#6DAEA7]/40 transition-all duration-300 shadow-[0_4px_20px_rgba(47,72,88,0.02)]">
            {/* Background concentric rings ornament */}
            <div className="absolute right-6 top-6 opacity-[0.05] text-[#2F4858]">
              <svg width="120" height="120" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="10" />
                <circle cx="12" cy="12" r="6" />
                <circle cx="12" cy="12" r="2" />
              </svg>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-[#6DAEA7]/10 text-[#6DAEA7]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <circle cx="12" cy="12" r="10" />
                    <circle cx="12" cy="12" r="6" />
                    <circle cx="12" cy="12" r="2" />
                  </svg>
                </span>
                <h3 className="text-[1rem] font-bold text-[#2F4858] tracking-tight font-brand">
                  Objectif de Recherche
                </h3>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <span className="text-[0.62rem] font-bold text-slate-500 tracking-wider uppercase">
                  Hypothèse Principale / Thèse
                </span>
                <textarea
                  value={hypothesis}
                  onChange={(e) => setHypothesis(e.target.value)}
                  className="w-full bg-[#F8FAFB] border border-solid border-[#E5E9EB] hover:border-[#6DAEA7]/30 focus:border-[#6DAEA7] focus:bg-white rounded-xl p-4 text-[0.88rem] leading-relaxed text-[#2F4858] resize-none h-[110px] focus:outline-none transition-all font-medium custom-scrollbar"
                />
              </div>

              {/* Tags Area */}
              <div className="flex flex-wrap gap-2.5 items-center mt-2">
                {tags.map((tag) => (
                  <span
                    key={tag.id}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[0.72rem] font-bold bg-[#F1F5F7] text-slate-700 border border-[#E5E9EB] hover:border-red-500/30 transition-all shadow-xs"
                  >
                    {tag.name}
                    <button
                      onClick={() => handleRemoveTag(tag.id)}
                      className="bg-transparent border-none text-slate-400 hover:text-red-500 cursor-pointer p-0 text-[0.78rem]"
                    >
                      ×
                    </button>
                  </span>
                ))}

                {showTagInput ? (
                  <form onSubmit={handleAddTag} className="inline-flex items-center">
                    <input
                      type="text"
                      autoFocus
                      value={newTagInput}
                      onChange={(e) => setNewTagInput(e.target.value)}
                      onBlur={() => setShowTagInput(false)}
                      placeholder="#NouveauTag"
                      className="px-2.5 py-1 rounded-lg text-[0.72rem] bg-white border border-solid border-[#6DAEA7] text-[#518B91] w-[100px] outline-none"
                    />
                  </form>
                ) : (
                  <button
                    onClick={() => setShowTagInput(true)}
                    className="inline-flex items-center px-3 py-1 rounded-lg text-[0.72rem] font-bold bg-transparent border border-dashed border-[#6DAEA7]/30 hover:border-[#6DAEA7]/65 hover:bg-[#6DAEA7]/5 text-[#518B91] transition-all cursor-pointer"
                  >
                    + Ajouter un tag
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Target Audience Card */}
          <div className="bg-white border border-solid border-[#E5E9EB] rounded-2xl p-6 hover:border-[#6DAEA7]/40 transition-all duration-300 shadow-[0_4px_20px_rgba(47,72,88,0.02)]">
            <div className="flex flex-col gap-5">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <span className="p-2 rounded-lg bg-[#6DAEA7]/10 text-[#6DAEA7]">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </span>
                  <h3 className="text-[1rem] font-bold text-[#2F4858] tracking-tight font-brand">
                    Public Cible (Target Audience)
                  </h3>
                </div>
                <span className="text-[0.68rem] font-bold text-slate-500">
                  {personas.length} Personas Définis
                </span>
              </div>

              {/* Personas list */}
              <div className="grid grid-cols-2 gap-4 max-sm:grid-cols-1">
                {personas.map((p) => (
                  <div
                    key={p.id}
                    className="p-4 bg-[#F8FAFB] border border-solid border-[#E5E9EB] rounded-xl flex flex-col gap-2 relative group/item hover:border-[#6DAEA7]/30 hover:bg-white transition-all shadow-xs"
                  >
                    <button
                      onClick={() => handleRemovePersona(p.id)}
                      className="absolute top-2.5 right-2.5 opacity-0 group-hover/item:opacity-100 bg-transparent border-none text-slate-400 hover:text-red-500 cursor-pointer p-1 text-[0.8rem] transition-opacity"
                      title="Supprimer"
                    >
                      ×
                    </button>
                    <h4 className="text-[0.82rem] font-bold text-[#2F4858]">{p.title}</h4>
                    <p className="text-[0.72rem] text-slate-500 leading-relaxed font-medium">
                      {p.description}
                    </p>
                  </div>
                ))}
              </div>

              {/* Add Persona Form / Button */}
              {showPersonaForm ? (
                <form
                  onSubmit={handleAddPersona}
                  className="p-4 bg-[#F8FAFB] border border-solid border-[#E5E9EB] rounded-xl flex flex-col gap-3"
                >
                  <input
                    type="text"
                    required
                    placeholder="Nom du Persona (ex: Experts en IA)"
                    value={newPersonaTitle}
                    onChange={(e) => setNewPersonaTitle(e.target.value)}
                    className="w-full px-3 py-2 text-[0.78rem] bg-white border border-solid border-[#E5E9EB] rounded-lg text-[#2F4858] focus:outline-none focus:border-[#6DAEA7] transition-all"
                  />
                  <textarea
                    required
                    placeholder="Description (ex: Lecteurs intéressés par l'évaluation éthique des algorithmes...)"
                    value={newPersonaDesc}
                    onChange={(e) => setNewPersonaDesc(e.target.value)}
                    className="w-full px-3 py-2 text-[0.78rem] bg-white border border-solid border-[#E5E9EB] rounded-lg text-[#2F4858] focus:outline-none focus:border-[#6DAEA7] transition-all resize-none h-16"
                  />
                  <div className="flex justify-end gap-2.5">
                    <button
                      type="button"
                      onClick={() => setShowPersonaForm(false)}
                      className="px-3 py-1.5 rounded-lg text-[0.72rem] font-bold bg-white text-slate-500 border border-solid border-[#E5E9EB] cursor-pointer hover:bg-slate-50 transition-colors"
                    >
                      Annuler
                    </button>
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg text-[0.72rem] font-bold bg-[#94D2B8] hover:bg-[#6DAEA7] text-[#0F4C3A] border-none cursor-pointer transition-colors"
                    >
                      Ajouter
                    </button>
                  </div>
                </form>
              ) : (
                <button
                  onClick={() => setShowPersonaForm(true)}
                  className="w-full py-3 rounded-xl border border-dashed border-[#E5E9EB] hover:border-[#6DAEA7]/50 hover:bg-[#6DAEA7]/5 bg-transparent text-[0.78rem] font-bold text-slate-500 hover:text-[#2F4858] flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.98]"
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                    <circle cx="8.5" cy="7" r="4" />
                    <line x1="20" y1="8" x2="20" y2="14" />
                    <line x1="17" y1="11" x2="23" y2="11" />
                  </svg>
                  <span>Définir un nouveau Persona</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Sources & Style settings */}
        <div className="col-span-5 flex flex-col gap-6 max-lg:col-span-12">
          
          {/* Source Library Card */}
          <div className="bg-white border border-solid border-[#E5E9EB] rounded-2xl p-6 hover:border-[#6DAEA7]/40 transition-all duration-300 shadow-[0_4px_20px_rgba(47,72,88,0.02)] flex flex-col gap-5">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="p-2 rounded-lg bg-[#6DAEA7]/10 text-[#6DAEA7]">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                  </svg>
                </span>
                <h3 className="text-[1rem] font-bold text-[#2F4858] tracking-tight font-brand">
                  Bibliothèque de Sources 
                </h3>
              </div>
              <button
                onClick={() => onAddToast('assistant', 'Options', 'Ouverture des options de bibliothèque...')}
                className="bg-transparent border-none text-slate-400 hover:text-slate-600 cursor-pointer p-1"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="12" cy="12" r="1" />
                  <circle cx="12" cy="5" r="1" />
                  <circle cx="12" cy="19" r="1" />
                </svg>
              </button>
            </div>

            {/* Dotted Drop Zone */}
            <div className="border border-dashed border-[#E5E9EB] hover:border-[#6DAEA7]/40 rounded-xl p-6 bg-[#F8FAFB] flex flex-col items-center justify-center text-center gap-3 transition-colors group/drop">
              <div className="w-10 h-10 rounded-full bg-white border border-[#E5E9EB] flex items-center justify-center text-[#6DAEA7] group-hover/drop:scale-105 transition-transform duration-300 shadow-xs">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-[0.78rem] font-bold text-[#2F4858]">Déposer vos fichiers PDF de recherche ici</p>
                <p className="text-[0.65rem] text-slate-500 font-medium">Taille maximale : 50 Mo (Supports .pdf, .docx, .txt)</p>
              </div>
              <button
                onClick={handleSimulateUpload}
                className="mt-1.5 bg-white hover:bg-slate-50 text-[#2F4858] font-brand text-[0.72rem] font-bold px-4 py-1.5 rounded-full border border-solid border-[#E5E9EB] transition-all cursor-pointer active:scale-95 shadow-xs"
              >
                Parcourir les fichiers
              </button>
            </div>

            {/* Uploaded Files list */}
            <div className="flex flex-col gap-3">
              {files.map((file) => (
                <div
                  key={file.id}
                  className="p-3.5 bg-[#F8FAFB] border border-solid border-[#E5E9EB] rounded-xl flex gap-3 items-center justify-between group/file hover:border-[#6DAEA7]/30 hover:bg-white transition-all shadow-xs"
                >
                  <div className="flex items-center gap-3 overflow-hidden">
                    <span className="p-2 rounded-lg bg-[#E24B4A]/10 text-[#E24B4A] flex-shrink-0">
                      {file.name.endsWith('.pdf') ? (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                          <line x1="9" y1="15" x2="15" y2="15" />
                        </svg>
                      ) : (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-400">
                          <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      )}
                    </span>
                    <div className="text-left overflow-hidden">
                      <h4 className="text-[0.78rem] font-bold text-[#2F4858] truncate max-w-[170px]" title={file.name}>
                        {file.name}
                      </h4>
                      <p className="text-[0.62rem] text-slate-500 font-semibold mt-0.5">
                        {file.size} • {file.relevance}
                      </p>
                    </div>
                  </div>

                  {file.status === 'uploading' ? (
                    <div className="w-10 h-1 bg-slate-200 rounded-full overflow-hidden flex-shrink-0">
                      <div className="h-full bg-[#6DAEA7] transition-all duration-300" style={{ width: `${file.progress}%` }}></div>
                    </div>
                  ) : (
                    <button
                      onClick={() => handleRemoveFile(file.id)}
                      className="bg-transparent border-none text-slate-400 hover:text-red-500 cursor-pointer p-1 text-[0.85rem] transition-colors"
                      title="Retirer la source"
                    >
                      ×
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Creativity and Style Parameters */}
          <div className="bg-white border border-solid border-[#E5E9EB] rounded-2xl p-6 hover:border-[#6DAEA7]/40 transition-all duration-300 shadow-[0_4px_20px_rgba(47,72,88,0.02)] flex flex-col gap-6">
            
            {/* Slider Section */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center text-[0.68rem] font-bold text-slate-500 tracking-wider uppercase">
                <span>Créativité / Pensée Latérale</span>
                <span className="text-[#6DAEA7] font-extrabold">{creativityLevels[creativity - 1]}</span>
              </div>
              <input
                type="range"
                min="1"
                max="3"
                value={creativity}
                onChange={(e) => setCreativity(parseInt(e.target.value))}
                className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#94D2B8]"
              />
              <div className="flex justify-between text-[0.62rem] text-slate-500 font-semibold px-0.5">
                <span>Rigoureux</span>
                <span>Équilibré</span>
                <span>Créatif</span>
              </div>
            </div>

            <hr className="border-0 border-b border-solid border-slate-100 my-1" />

            {/* Checkbox Rules */}
            <div className="flex flex-col gap-3.5">
              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rules.harvardCitation}
                  onChange={(e) => setRules({ ...rules, harvardCitation: e.target.checked })}
                  className="w-4 h-4 rounded border-[#E5E9EB] bg-[#F8FAFB] text-[#6DAEA7] focus:ring-0 cursor-pointer"
                />
                <span className="text-[0.78rem] font-medium text-[#2F4858]">Imposer le style de citation Harvard</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rules.avoidPassive}
                  onChange={(e) => setRules({ ...rules, avoidPassive: e.target.checked })}
                  className="w-4 h-4 rounded border-[#E5E9EB] bg-[#F8FAFB] text-[#6DAEA7] focus:ring-0 cursor-pointer"
                />
                <span className="text-[0.78rem] font-medium text-[#2F4858]">Éviter la voix passive</span>
              </label>

              <label className="flex items-center gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={rules.scientificNeutrality}
                  onChange={(e) => setRules({ ...rules, scientificNeutrality: e.target.checked })}
                  className="w-4 h-4 rounded border-[#E5E9EB] bg-[#F8FAFB] text-[#6DAEA7] focus:ring-0 cursor-pointer"
                />
                <span className="text-[0.78rem] font-medium text-[#2F4858]">Neutralité scientifique</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Integrity Banner */}
      <div className="max-w-[1200px] mt-6 bg-gradient-to-r from-white to-[#F8FAFB] border border-solid border-[#E5E9EB] rounded-2xl p-5 flex justify-between items-center gap-6 max-md:flex-col max-md:text-center shadow-[0_4px_20px_rgba(47,72,88,0.02)] hover:border-[#6DAEA7]/40 transition-all duration-300">
        <div className="flex flex-col gap-1 text-left max-md:text-center">
          <h4 className="text-[0.92rem] font-bold text-[#2F4858] tracking-tight">
            Intégrité du Contexte : 92%
          </h4>
          <p className="text-[0.78rem] text-slate-500 font-medium leading-relaxed max-w-[700px]">
            Vos paramètres de recherche sont hautement définis. La génération d'IA sera d'une précision chirurgicale.
          </p>
        </div>
        <button
          onClick={handleInitializeEngine}
          className="bg-[#94D2B8] hover:bg-[#6DAEA7] text-[#0F4C3A] font-brand text-[0.8rem] font-bold px-5 py-2.5 rounded-xl flex items-center gap-2.5 transition-all border-none cursor-pointer active:scale-95 shadow-[0_4px_12px_rgba(148,210,184,0.1)]"
        >
          <span>Initialiser le Moteur Intelligent</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M22 2l-7 20-4-9-9-4 20-7z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
