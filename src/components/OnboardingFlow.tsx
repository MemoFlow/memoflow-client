import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import BrandLogo from './BrandLogo';
import {
  PERSONA_CHOICES,
  DELIVERABLE_CHOICES,
  LEVEL_CHOICES,
  WORK_TOOL_CHOICES,
  BLOCKER_CHOICES,
  CHANNEL_CHOICES,
  SCHOOL_NAME_MAX_LENGTH,
  localTodayIso,
  searchSchools,
  submitOnboarding,
  getSignupConsent,
  forgetSignupConsent,
} from '../services/onboarding';
import type {
  AcademicLevel,
  AcquisitionChannel,
  Blocker,
  Choice,
  DeliverableType,
  OnboardingAnswers,
  Persona,
  WorkTool,
} from '../services/onboarding';

interface OnboardingFlowProps {
  userId: string;
  userName: string;
  userEmail: string;
  /** Answers sent (or queued for retry) */
  onComplete: () => void;
  /** "Plus tard": closes for this session only, asked again next time */
  onPostpone: () => void;
}

interface Draft {
  persona?: Persona;
  deliverable_type?: DeliverableType;
  due_date?: string;
  academic_level?: AcademicLevel;
  school_name: string;
  work_tools: WorkTool[];
  blockers: Blocker[];
  acquisition_channel?: AcquisitionChannel;
  marketing_opt_in: boolean;
}

type SingleField = 'persona' | 'deliverable_type' | 'academic_level' | 'acquisition_channel';
type MultiField = 'work_tools' | 'blockers';

type Step =
  | { kind: 'single'; field: SingleField; question: string; choices: Choice<string>[] }
  | { kind: 'multi'; field: MultiField; question: string; choices: Choice<string>[]; allowEmpty: boolean }
  | { kind: 'date'; question: string }
  | { kind: 'school'; question: string };

const STEPS: Step[] = [
  { kind: 'single', field: 'persona', question: 'Tu es…', choices: PERSONA_CHOICES },
  { kind: 'single', field: 'deliverable_type', question: 'Tu dois rendre quoi ?', choices: DELIVERABLE_CHOICES },
  { kind: 'date', question: "C'est pour quand ?" },
  { kind: 'single', field: 'academic_level', question: 'Ton niveau', choices: LEVEL_CHOICES },
  { kind: 'school', question: 'Ton école' },
  { kind: 'multi', field: 'work_tools', question: 'Où sont les traces de ton travail ?', choices: WORK_TOOL_CHOICES, allowEmpty: true },
  { kind: 'multi', field: 'blockers', question: "Qu'est-ce qui te bloque ?", choices: BLOCKER_CHOICES, allowEmpty: false },
  { kind: 'single', field: 'acquisition_channel', question: 'Comment nous as-tu connus ?', choices: CHANNEL_CHOICES },
];

const optionClass = (selected: boolean) =>
  `w-full text-left px-4 py-3 rounded-xl border border-solid cursor-pointer transition-colors font-sans text-[0.9rem] font-semibold flex items-center justify-between gap-3 ${
    selected
      ? 'bg-[#EAF3DE] border-[#94D2B8] text-[#2F4858]'
      : 'bg-white border-[#E5E9EB] text-slate-600 hover:border-[#94D2B8] hover:text-[#2F4858]'
  }`;

const inputClass =
  'w-full px-4 py-3 rounded-xl border border-solid border-[#E5E9EB] bg-white text-[0.9rem] text-[#2F4858] focus:outline-none focus:border-[#518B91] focus:ring-1 focus:ring-[#518B91]/30';

const primaryBtn =
  'px-5 py-2.5 rounded-xl bg-[#2F4858] hover:bg-[#3E6976] text-white font-brand text-[0.85rem] font-bold border-none cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed';

function CheckSquare({ checked }: { checked: boolean }) {
  return (
    <span
      className={`w-5 h-5 rounded-md border border-solid flex items-center justify-center flex-shrink-0 ${
        checked ? 'bg-[#518B91] border-[#518B91] text-white' : 'bg-white border-slate-300'
      }`}
    >
      {checked && <FontAwesomeIcon icon={faCheck} className="text-[0.65rem]" />}
    </span>
  );
}

export default function OnboardingFlow({ userId, userName, userEmail, onComplete, onPostpone }: OnboardingFlowProps) {
  const [stepIndex, setStepIndex] = useState(0);
  const [draft, setDraft] = useState<Draft>(() => ({
    school_name: '',
    work_tools: [],
    blockers: [],
    // Never pre-ticked by default: only reflects the choice made on the signup form
    marketing_opt_in: getSignupConsent(userEmail),
  }));
  const [isSubmitting, setIsSubmitting] = useState(false);

  // School autocomplete
  const [schoolSuggestions, setSchoolSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const schoolAbortRef = useRef<AbortController | null>(null);

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  useEffect(() => {
    if (step.kind !== 'school') return;
    const query = draft.school_name;
    const timer = window.setTimeout(() => {
      schoolAbortRef.current?.abort();
      const controller = new AbortController();
      schoolAbortRef.current = controller;
      searchSchools(query, controller.signal)
        .then(setSchoolSuggestions)
        .catch(() => setSchoolSuggestions([]));
    }, 250);
    return () => window.clearTimeout(timer);
  }, [draft.school_name, step.kind]);

  const update = (patch: Partial<Draft>) => setDraft((d) => ({ ...d, ...patch }));

  const submittedRef = useRef(false);

  const finish = async () => {
    if (submittedRef.current) return;
    submittedRef.current = true;
    setIsSubmitting(true);
    const school = draft.school_name.trim().slice(0, SCHOOL_NAME_MAX_LENGTH);
    const answers: OnboardingAnswers = {
      persona: draft.persona!,
      deliverable_type: draft.deliverable_type!,
      due_date: draft.due_date!,
      academic_level: draft.academic_level!,
      school_name: school || null,
      work_tools: draft.work_tools,
      blockers: draft.blockers,
      acquisition_channel: draft.acquisition_channel!,
      marketing_opt_in: draft.marketing_opt_in,
    };
    await submitOnboarding(userId, answers);
    forgetSignupConsent(userEmail);
    onComplete();
  };

  const next = () => setStepIndex((i) => Math.min(STEPS.length - 1, i + 1));
  const back = () => setStepIndex((i) => Math.max(0, i - 1));

  const renderStep = () => {
    switch (step.kind) {
      case 'single': {
        const value = draft[step.field];
        return (
          <>
            <div className="flex flex-col gap-2.5">
              {step.choices.map((choice) => (
                <button
                  key={choice.value}
                  type="button"
                  className={optionClass(value === choice.value)}
                  onClick={() => {
                    update({ [step.field]: choice.value } as Partial<Draft>);
                    // One click is enough, except on the last screen (consent + "Terminer")
                    if (!isLast) next();
                  }}
                >
                  <span>{choice.label}</span>
                  {value === choice.value && <FontAwesomeIcon icon={faCheck} className="text-[#518B91]" />}
                </button>
              ))}
            </div>

            {isLast && (
              <>
                <label className="flex items-start gap-3 mt-6 p-4 rounded-xl border border-solid border-[#E5E9EB] bg-white cursor-pointer">
                  <input
                    type="checkbox"
                    checked={draft.marketing_opt_in}
                    onChange={(e) => update({ marketing_opt_in: e.target.checked })}
                    className="sr-only"
                  />
                  <CheckSquare checked={draft.marketing_opt_in} />
                  <span className="text-[0.82rem] text-slate-600 leading-relaxed">
                    J'accepte que MemoFlow me contacte par email (conseils de méthodologie, offres adaptées à mon
                    échéance). Facultatif, modifiable à tout moment dans les paramètres.
                  </span>
                </label>
                <div className="flex justify-end mt-5">
                  <button
                    type="button"
                    className={primaryBtn}
                    disabled={!value || isSubmitting}
                    onClick={() => void finish()}
                  >
                    Terminer
                  </button>
                </div>
              </>
            )}
          </>
        );
      }

      case 'multi': {
        const field = step.field;
        const selectedValues = draft[field] as string[];
        const toggle = (v: string) =>
          update({
            [field]: selectedValues.includes(v) ? selectedValues.filter((x) => x !== v) : [...selectedValues, v],
          } as Partial<Draft>);
        const empty = selectedValues.length === 0;
        return (
          <>
            <div className="grid grid-cols-2 gap-2.5 max-sm:grid-cols-1">
              {step.choices.map((choice) => {
                const selected = selectedValues.includes(choice.value);
                return (
                  <button key={choice.value} type="button" className={optionClass(selected)} onClick={() => toggle(choice.value)}>
                    <span>{choice.label}</span>
                    <CheckSquare checked={selected} />
                  </button>
                );
              })}
            </div>
            <div className="flex justify-end mt-5">
              <button type="button" className={primaryBtn} disabled={empty && !step.allowEmpty} onClick={next}>
                {empty && step.allowEmpty ? 'Aucun de ceux-là' : 'Continuer'}
              </button>
            </div>
          </>
        );
      }

      case 'date':
        return (
          <>
            <input
              type="date"
              min={localTodayIso()}
              value={draft.due_date ?? ''}
              onChange={(e) => update({ due_date: e.target.value })}
              className={inputClass}
            />
            <div className="flex justify-end mt-5">
              <button
                type="button"
                className={primaryBtn}
                disabled={!draft.due_date || draft.due_date < localTodayIso()}
                onClick={next}
              >
                Continuer
              </button>
            </div>
          </>
        );

      case 'school':
        return (
          <>
            <div className="relative">
              <input
                type="text"
                autoFocus
                maxLength={SCHOOL_NAME_MAX_LENGTH}
                value={draft.school_name}
                onChange={(e) => {
                  update({ school_name: e.target.value });
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => window.setTimeout(() => setShowSuggestions(false), 150)}
                onKeyDown={(e) => e.key === 'Enter' && next()}
                placeholder="Commence à taper le nom de ton école"
                className={inputClass}
                autoComplete="off"
              />
              {showSuggestions && schoolSuggestions.length > 0 && (
                <ul className="absolute z-10 left-0 right-0 mt-1.5 bg-white border border-[#E5E9EB] rounded-xl shadow-lg py-1 max-h-60 overflow-y-auto custom-scrollbar list-none m-0 p-0">
                  {schoolSuggestions.map((name) => (
                    <li key={name}>
                      <button
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          update({ school_name: name.slice(0, SCHOOL_NAME_MAX_LENGTH) });
                          setShowSuggestions(false);
                        }}
                        className="w-full text-left px-4 py-2.5 text-[0.85rem] text-slate-700 hover:bg-[#F1F5F7] bg-transparent border-none cursor-pointer"
                      >
                        {name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <div className="flex justify-end items-center gap-3 mt-5">
              <button
                type="button"
                onClick={() => {
                  update({ school_name: '' });
                  next();
                }}
                className="px-4 py-2.5 rounded-xl bg-transparent border-none text-slate-500 hover:text-[#2F4858] font-brand text-[0.85rem] font-semibold cursor-pointer"
              >
                Passer
              </button>
              <button type="button" className={primaryBtn} disabled={!draft.school_name.trim()} onClick={next}>
                Continuer
              </button>
            </div>
          </>
        );
    }
  };

  const progress = Math.round((stepIndex / STEPS.length) * 100);

  return (
    <div className="min-h-screen w-full bg-[#F8FAFB] flex flex-col">
      {/* Top bar */}
      <header className="h-16 px-8 max-sm:px-4 flex items-center justify-between border-b border-[#E5E9EB] bg-white">
        <span className="flex items-center gap-2.5">
          <BrandLogo size={34} />
          <span className="font-brand text-[1.2rem] font-bold text-[#2F4858] tracking-tight">MemoFlow</span>
        </span>
        <button
          type="button"
          onClick={onPostpone}
          disabled={isSubmitting}
          className="bg-transparent border-none text-slate-500 hover:text-[#2F4858] font-brand text-[0.82rem] font-semibold cursor-pointer"
        >
          Plus tard
        </button>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 py-12 max-sm:py-8">
        <div className="w-full max-w-[560px]">
          <p className="font-brand text-[0.78rem] font-bold uppercase tracking-wider text-[#518B91] m-0">
            Personnalise ton espace
          </p>
          {stepIndex === 0 && (
            <p className="text-[0.9rem] text-slate-500 mt-1.5 mb-0">
              Bienvenue {userName} ! Quelques questions rapides pour adapter MemoFlow à ton projet.
            </p>
          )}

          {/* Progress */}
          <div className="flex items-center gap-3 mt-6">
            <div className="flex-1 h-1.5 bg-[#E5E9EB] rounded-full overflow-hidden">
              <div className="h-full bg-[#518B91] rounded-full transition-all duration-300" style={{ width: `${progress}%` }} />
            </div>
            <span className="text-[0.75rem] font-semibold text-slate-500 whitespace-nowrap">
              {stepIndex + 1} / {STEPS.length}
            </span>
          </div>

          {/* Question */}
          <div className="mt-8">
            <div className="flex items-baseline gap-2 mb-5">
              <h1 className="font-brand text-[1.6rem] font-bold text-[#2F4858] tracking-tight m-0 max-sm:text-[1.35rem]">
                {step.question}
              </h1>
              {step.kind === 'school' && <span className="text-[0.85rem] text-slate-400 font-medium">(facultatif)</span>}
            </div>
            {step.kind === 'multi' && <p className="text-[0.82rem] text-slate-500 -mt-3 mb-4">Plusieurs choix possibles.</p>}

            {renderStep()}
          </div>

          {stepIndex > 0 && (
            <button
              type="button"
              onClick={back}
              disabled={isSubmitting}
              className="mt-8 bg-transparent border-none p-0 text-slate-500 hover:text-[#2F4858] font-brand text-[0.82rem] font-semibold cursor-pointer flex items-center gap-2"
            >
              <FontAwesomeIcon icon={faArrowLeft} />
              Question précédente
            </button>
          )}

          {isSubmitting && (
            <p className="mt-6 text-[0.82rem] text-slate-500">Enregistrement de tes réponses…</p>
          )}
        </div>
      </main>
    </div>
  );
}
